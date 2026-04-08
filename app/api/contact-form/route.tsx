import { NextRequest, NextResponse } from "next/server";

const GHL_API_KEY = process.env.GHL_API_KEY!;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID!;
const GHL_API = "https://services.leadconnectorhq.com";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, message, smsTransactional, smsMarketing, source } = body;

  // ── 1. Upsert contact in GHL ──────────────────────────────────────────
  let contactId: string | null = null;
  try {
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
        source: "General Contact Page",
        customFields: [
          message ? { key: "notes", field_value: message } : null,
          { id: "mszyYFKruvDEjBL9E52A", field_value: (smsTransactional || smsMarketing) ? ["True"] : ["False"] },
          { id: "1fujwHIch7ibTnUgyECJ", field_value: smsTransactional ? ["Yes"] : ["No"] },
          { id: "yk9WjPQfqH5GQCp6n36x", field_value: smsMarketing ? ["Yes"] : ["No"] },
        ].filter(Boolean),
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
