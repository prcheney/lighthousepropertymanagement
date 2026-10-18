import { NextRequest, NextResponse } from "next/server";
import { CALL_CALENDAR_ID, CALL_MINUTES, GHL_API, ghlHeaders } from "@/lib/booking";

// Only a contact the report form created in the last two hours can be booked,
// so this endpoint cannot be used to put calls on Stephanie's calendar for
// arbitrary contacts.
const MAX_CONTACT_AGE_MS = 2 * 60 * 60 * 1000;

export async function POST(req: NextRequest) {
  const { contactId, startTime } = await req.json().catch(() => ({}));
  const start = Date.parse(startTime);
  if (typeof contactId !== "string" || !/^[A-Za-z0-9]{10,40}$/.test(contactId) || Number.isNaN(start)) {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  if (start < Date.now()) {
    return NextResponse.json({ ok: false, error: "slot_taken" }, { status: 409 });
  }

  const contactRes = await fetch(`${GHL_API}/contacts/${contactId}`, {
    headers: ghlHeaders("2021-07-28"),
    cache: "no-store",
  });
  if (!contactRes.ok) {
    return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  }
  const contact = (await contactRes.json())?.contact;
  const added = Date.parse(contact?.dateAdded ?? "");
  const updated = Date.parse(contact?.dateUpdated ?? "");
  const touched = Math.max(added || 0, updated || 0);
  if (!touched || Date.now() - touched > MAX_CONTACT_AGE_MS) {
    return NextResponse.json({ ok: false, error: "expired" }, { status: 403 });
  }

  const res = await fetch(`${GHL_API}/calendars/events/appointments`, {
    method: "POST",
    headers: ghlHeaders(),
    body: JSON.stringify({
      calendarId: CALL_CALENDAR_ID,
      locationId: process.env.GHL_LOCATION_ID,
      contactId,
      startTime: new Date(start).toISOString(),
      endTime: new Date(start + CALL_MINUTES * 60 * 1000).toISOString(),
      title: `Call: ${contact?.firstName ?? ""} ${contact?.lastName ?? ""}`.trim(),
      appointmentStatus: "confirmed",
      toNotify: true,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    console.error("GHL book:", res.status, body);
    // GHL answers a slot someone else just took with a 4xx about availability.
    const taken = res.status === 400 || res.status === 409 || /slot|available/i.test(body);
    return NextResponse.json({ ok: false, error: taken ? "slot_taken" : "failed" }, { status: taken ? 409 : 502 });
  }
  const appt = await res.json();
  console.log("GHL booked:", appt?.id ?? appt?.appointment?.id, contactId);
  return NextResponse.json({ ok: true });
}
