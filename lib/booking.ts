// Stephanie's 30-minute call calendar in GHL ("30-Minute Call with Stephanie",
// created 2026-10-18). It shares her user and hours with her onsite-visit
// calendar, so GHL will not double-book her across the two.
export const CALL_CALENDAR_ID = "rzgDEkPtqC48h6umcVXm";
export const CALL_MINUTES = 30;
export const BOOKING_TZ = "America/New_York";

export const GHL_API = "https://services.leadconnectorhq.com";

export function ghlHeaders(version = "2021-04-15") {
  return {
    Authorization: `Bearer ${process.env.GHL_API_KEY}`,
    Version: version,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}

export type SlotDay = { date: string; slots: string[] };
