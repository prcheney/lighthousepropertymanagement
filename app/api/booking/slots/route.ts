import { NextResponse } from "next/server";
import { BOOKING_TZ, CALL_CALENDAR_ID, GHL_API, ghlHeaders, type SlotDay } from "@/lib/booking";

// Open times on Stephanie's call calendar for the next week, at least two hours out.
export async function GET() {
  const now = Date.now();
  const start = now + 2 * 60 * 60 * 1000;
  const end = now + 8 * 24 * 60 * 60 * 1000;
  const url = `${GHL_API}/calendars/${CALL_CALENDAR_ID}/free-slots?startDate=${start}&endDate=${end}&timezone=${encodeURIComponent(BOOKING_TZ)}`;

  try {
    const res = await fetch(url, { headers: ghlHeaders(), cache: "no-store" });
    if (!res.ok) {
      console.error("GHL free-slots:", res.status, await res.text());
      return NextResponse.json({ days: [] }, { status: 502 });
    }
    const data = await res.json();
    const days: SlotDay[] = Object.entries(data)
      .filter(([date, v]) => /^\d{4}-\d{2}-\d{2}$/.test(date) && Array.isArray((v as any)?.slots))
      .map(([date, v]) => ({
        date,
        slots: ((v as any).slots as string[]).filter((s) => Date.parse(s) >= start),
      }))
      .filter((d) => d.slots.length > 0)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 5);
    return NextResponse.json({ days });
  } catch (err) {
    console.error("GHL free-slots failed:", err);
    return NextResponse.json({ days: [] }, { status: 502 });
  }
}
