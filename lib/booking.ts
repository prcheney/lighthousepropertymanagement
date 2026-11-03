// Stephanie's onsite-visit calendar in GHL ("Stephanie Onsite Visits"): 60-minute
// visits with a 30-minute buffer set on the calendar itself. The Facebook thank-you
// page and the AI booking bot both book here, so GHL never double-books her.
export const VISIT_CALENDAR_ID = "X2mCpkLtcsc8DtD1hs8O";
export const VISIT_MINUTES = 60;
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
