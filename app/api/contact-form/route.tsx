import { NextRequest, NextResponse } from "next/server";

const GHL_API_KEY = process.env.GHL_API_KEY!;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID!;
const GHL_API = "https://services.leadconnectorhq.com";

// GHL custom field IDs for Lighthouse PM (Location: GxxmZBnjTGnUy9yDC0QW)
const FIELD_IDS = {
  smsConsent: "mszyYFKruvDEjBL9E52A",
  smsTransactional: "1fujwHIch7ibTnUgyECJ",
  smsMarketing: "yk9WjPQfqH5GQCp6n36x",
  leadSource: "7XZ87B6iqjmwkblTrIKT",
  message: "Wyr9AUXQY5pISYkSr0yh",
  googleClickId: "xaIO77LRR2Aym8wnFtog",
  fbClickId: "6rwZ4Zdfwnuc73hgUZCo",
  utmSource: "1InrYXZw8u32pjAD2bXX",
  utmMedium: "82lABIoB7gpQrjk5Sd5m",
  utmCampaign: "yV9KZvKhACPXyKfw0muf",
  utmTerm: "X7kj5UXYsF2qjjrjVnEg",
  utmContent: "RcUOaZpfqgjsvPrNPakQ",
};

const SOURCE_LABELS: Record<string, string> = {
  ads_hero_form: "Lighthouse Get Started Page",
  ads_contact_form: "Lighthouse Get Started Page",
  hero_form: "Lighthouse Landing Page",
  contact_form: "Lighthouse Landing Page",
};

const SOURCE_TAGS: Record<string, string[]> = {
  ads_hero_form: ["get-started-page", "hero-form"],
  ads_contact_form: ["get-started-page", "bottom-form"],
  hero_form: ["landing-page", "hero-form"],
  contact_form: ["landing-page", "bottom-form"],
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    name, email, phone, message,
    smsTransactional, smsMarketing, source,
    gclid, fbclid,
    utm_source, utm_medium, utm_campaign, utm_term, utm_content,
  } = body;

  const leadSource = SOURCE_LABELS[source] ?? source ?? "Lighthouse Landing Page";

  // ── 1. Upsert contact in GHL ──────────────────────────────────────────
  let contactId: string | null = null;
  try {
    const customFields = [
      { id: FIELD_IDS.smsConsent, field_value: (smsTransactional || smsMarketing) ? ["True"] : ["False"] },
      { id: FIELD_IDS.smsTransactional, field_value: smsTransactional ? ["Yes"] : ["No"] },
      { id: FIELD_IDS.smsMarketing, field_value: smsMarketing ? ["Yes"] : ["No"] },
      { id: FIELD_IDS.leadSource, field_value: leadSource },
      message ? { id: FIELD_IDS.message, field_value: message } : null,
      gclid ? { id: FIELD_IDS.googleClickId, field_value: gclid } : null,
      fbclid ? { id: FIELD_IDS.fbClickId, field_value: fbclid } : null,
      utm_source ? { id: FIELD_IDS.utmSource, field_value: utm_source } : null,
      utm_medium ? { id: FIELD_IDS.utmMedium, field_value: utm_medium } : null,
      utm_campaign ? { id: FIELD_IDS.utmCampaign, field_value: utm_campaign } : null,
      utm_term ? { id: FIELD_IDS.utmTerm, field_value: utm_term } : null,
      utm_content ? { id: FIELD_IDS.utmContent, field_value: utm_content } : null,
    ].filter(Boolean);

    const upsertRes = await fetch(`${GHL_API}/contacts/upsert`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GHL_API_KEY}`,
        "Content-Type": "application/json",
        Version: "2021-07-28",
      },
      body: JSON.stringify({
        locationId: GHL_LOCATION_ID,
        name,
        email,
        phone,
        source: leadSource,
        customFields,
      }),
    });
    const upsertData = await upsertRes.json();
    contactId = upsertData?.contact?.id ?? null;
    console.log("GHL upsert:", upsertRes.status, contactId ?? "no contactId");
  } catch (err) {
    console.error("GHL upsert failed:", err);
  }

  // ── 2. Tag the contact ─────────────────────────────────────────────────
  if (contactId) {
    const tags = SOURCE_TAGS[source] ?? ["landing-page"];
    try {
      const tagRes = await fetch(`${GHL_API}/contacts/${contactId}/tags`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GHL_API_KEY}`,
          "Content-Type": "application/json",
          Version: "2021-07-28",
        },
        body: JSON.stringify({ tags }),
      });
      console.log("GHL tags:", tagRes.status, tags);
    } catch (err) {
      console.error("GHL tags failed:", err);
    }
  }

  // ── 3. Send confirmation email via GHL ────────────────────────────────
  if (contactId) {
    const isGetStarted = source === "ads_hero_form" || source === "ads_contact_form";

    const emailSubject = isGetStarted
      ? "Thanks for reaching out to Lighthouse Property Management"
      : "Your Free Rental Analysis from Lighthouse Property Management";

    const emailHtml = isGetStarted
      ? `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; color: #1A1A1A; max-width: 560px; margin: 0 auto;">
          <p>Hi ${name},</p>
          <p>Thanks for reaching out. We know finding the right property manager matters — it's your investment, your income, and your peace of mind on the line.</p>
          <p>Here's what you can expect from us:</p>
          <ul>
            <li><strong>A dedicated rep who knows your name</strong> — no call centers, no ticket systems</li>
            <li><strong>Next business day response</strong> — guaranteed in writing</li>
            <li><strong>No hidden fees or mark-ups</strong> — you pay what the vendor charges, period</li>
            <li><strong>No-hassle cancellation</strong> — no lock-in, no penalties</li>
          </ul>
          <p>These are 4 of the 9 written guarantees we include in every management contract. We'll walk you through the rest when we talk.</p>
          <p>One of our team members will reach out within one business day. If you'd like to talk sooner, call me directly.</p>
          <p>Talk soon,</p>
          <p>
            <strong>Stephanie Myers</strong><br/>
            Lighthouse Property Management &amp; Realty, LLC<br/>
            <a href="tel:9048227661" style="color: #C9A84C;">(904) 822-7661</a>
          </p>
        </div>
      `
      : `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; color: #1A1A1A; max-width: 560px; margin: 0 auto;">
          <p>Hi ${name},</p>
          <p>Thank you for requesting your free rental analysis! Your personalized PDF report with market data for your property is on its way.</p>
          <p>The report includes:</p>
          <ul>
            <li>Comparable rental rates in your neighborhood</li>
            <li>Estimated monthly rent range for your property</li>
            <li>Local market demand data</li>
          </ul>
          <p>We'll follow up within one business day to walk you through the numbers and answer any questions about managing your property.</p>
          <p>In the meantime, here's what sets us apart: 9 written guarantees in every contract, a dedicated representative (no call centers), and zero hidden fees or mark-ups.</p>
          <p>Talk soon,</p>
          <p>
            <strong>Stephanie Myers</strong><br/>
            Lighthouse Property Management &amp; Realty, LLC<br/>
            <a href="tel:9048227661" style="color: #C9A84C;">(904) 822-7661</a>
          </p>
        </div>
      `;

    try {
      const emailRes = await fetch(`${GHL_API}/conversations/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GHL_API_KEY}`,
          "Content-Type": "application/json",
          Version: "2021-07-28",
        },
        body: JSON.stringify({
          type: "Email",
          contactId,
          subject: emailSubject,
          html: emailHtml,
        }),
      });
      console.log("GHL email:", emailRes.status);
    } catch (err) {
      console.error("GHL email failed:", err);
    }
  }

  return NextResponse.json({ success: true });
}
