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

  // ── 2. Send confirmation email via GHL ────────────────────────────────
  if (contactId) {
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
          subject: "Thanks for reaching out to Lighthouse Property Management",
          html: `
            <div style="font-family: 'Helvetica Neue', Arial, sans-serif; color: #1A1A1A; max-width: 560px; margin: 0 auto;">
              <p>Hi ${name},</p>
              <p>Thank you for reaching out to Lighthouse Property Management &amp; Realty! We received your inquiry and one of our team members will be in touch within one business day.</p>
              <p>In the meantime, here's what sets us apart:</p>
              <ul>
                <li>9 written guarantees in every management contract</li>
                <li>A dedicated representative — no call centers</li>
                <li>No hidden fees or maintenance mark-ups</li>
                <li>No-hassle cancellation, no lock-in</li>
              </ul>
              <p>If you'd like to speak with us sooner, feel free to call me directly at (904) 822-7661.</p>
              <p>Talk soon,</p>
              <p>
                <strong>Stephanie Myers</strong><br/>
                Lighthouse Property Management &amp; Realty, LLC<br/>
                (904) 822-7661
              </p>
            </div>
          `,
        }),
      });
      console.log("GHL email:", emailRes.status);
    } catch (err) {
      console.error("GHL email failed:", err);
    }
  }

  return NextResponse.json({ success: true });
}
