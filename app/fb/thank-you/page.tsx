import { ThankYouBooking } from "@/components/thank-you-booking";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Book a call with Stephanie | Lighthouse Property Management & Realty",
  robots: { index: false, follow: false },
};

// Where a qualified, in-area lead lands after the Facebook rental report form.
// The lead details arrive through sessionStorage (see lib/booking-lead.ts), so
// nothing personal sits in the URL. `?preview=1` shows the page with a sample
// lead for review screenshots; booking is a no-op there.
export default function FBThankYou() {
  return (
    <main>
      <ThankYouBooking />
      <Footer />
    </main>
  );
}
