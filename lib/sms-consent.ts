/**
 * A lead who did not tick an SMS consent box goes into GHL on SMS-only Do Not
 * Disturb, so no workflow, missed-call text-back or manual text can reach them.
 * Email stays open. A lead who did consent leaves DND alone, so a STOP reply
 * set earlier is never undone.
 */
export function smsDndFields(smsConsent: boolean) {
  return smsConsent
    ? {}
    : { dndSettings: { SMS: { status: "active", message: "No SMS consent on web form", code: "103" } } };
}
