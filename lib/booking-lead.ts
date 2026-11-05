// Hands the lead from the Facebook form to /fb/thank-you without putting the
// contact id, email or phone in the URL. sessionStorage survives a refresh in
// the same tab and dies with it.
export type BookingLead = { contactId: string; name: string; email: string; phone: string; formName: string };

const KEY = "lhpm_booking_lead";

export function saveBookingLead(lead: BookingLead) {
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(lead));
  } catch {
    // Private mode or blocked storage: the page falls back to the phone number.
  }
}

export function readBookingLead(): BookingLead | null {
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return null;
    const lead = JSON.parse(raw);
    return typeof lead?.contactId === "string" && typeof lead?.email === "string" ? lead : null;
  } catch {
    return null;
  }
}

export const PREVIEW_LEAD: BookingLead = {
  contactId: "preview",
  name: "Sample Owner",
  email: "owner@example.com",
  phone: "(904) 555-0100",
  formName: "preview",
};
