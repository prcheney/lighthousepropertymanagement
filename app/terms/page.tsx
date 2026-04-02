import type { Metadata } from "next";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Terms of Service | Lighthouse Property Management & Realty",
};

export default function TermsPage() {
  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
        <h1 className="font-serif text-3xl font-bold text-navy lg:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-navy/50">Effective April 2, 2026</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-navy/70">
          <section>
            <h2 className="text-lg font-semibold text-navy">
              1. Agreement to Terms
            </h2>
            <p className="mt-2">
              By accessing or using the website operated by Lighthouse Property
              Management & Realty, LLC ("Lighthouse," "we," "us," or "our"),
              you agree to be bound by these Terms of Service. If you do not
              agree, do not use this website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">
              2. Services Overview
            </h2>
            <p className="mt-2">
              This website provides information about our property management
              services and allows you to request a free rental analysis report.
              The rental estimates provided are for informational purposes only
              and do not constitute an appraisal or guarantee of rental income.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">
              3. SMS Program Description
            </h2>
            <p className="mt-2">
              Lighthouse Property Management & Realty operates an SMS messaging
              program to communicate with property owners who request information
              through our website. The program includes two types of messages:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                <strong>Transactional messages:</strong> Rental report delivery
                notifications, account alerts, appointment reminders, and
                service updates related to your property management inquiry.
              </li>
              <li>
                <strong>Marketing messages:</strong> Promotional offers, service
                announcements, and information about property management
                opportunities in the Jacksonville, FL area.
              </li>
            </ul>
            <p className="mt-2">
              Each message type requires separate opt-in consent via checkbox on
              our website forms. You may opt in to one, both, or neither.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">
              4. Text Messaging Terms
            </h2>
            <p className="mt-2">
              By opting in to receive text messages from Lighthouse Property
              Management & Realty, you agree to the following:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                You will receive text messages regarding your rental analysis
                and property management services from Lighthouse Property
                Management & Realty.
              </li>
              <li>Message frequency varies.</li>
              <li>Message and data rates may apply.</li>
              <li>
                You may opt out at any time by replying <strong>STOP</strong> to
                any message. You will receive a single confirmation message and
                no further messages will be sent.
              </li>
              <li>
                For help, reply <strong>HELP</strong> or contact us at
                (904) 822-7661 or customerservice@jaxpm.com.
              </li>
              <li>
                Consent to receive text messages is not required as a condition
                of purchasing any services.
              </li>
              <li>
                Your phone number and opt-in information will not be sold,
                rented, or shared with third parties for their marketing
                purposes.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">
              5. Carrier Liability Disclaimer
            </h2>
            <p className="mt-2">
              Wireless carriers (e.g., T-Mobile, AT&T, Verizon) are not liable
              for delayed or undelivered messages. Message delivery is subject to
              effective transmission by your wireless carrier and their terms of
              service. Lighthouse Property Management & Realty is not responsible
              for messages that are not delivered due to carrier issues, device
              incompatibility, or changes to your phone number or service plan.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">
              6. Age Restriction
            </h2>
            <p className="mt-2">
              You must be at least 18 years of age to use this website and to
              opt in to our SMS messaging program. By submitting a form or
              opting in to receive text messages, you confirm that you are 18
              years of age or older.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">
              7. Use of Website
            </h2>
            <p className="mt-2">
              You agree to use this website only for lawful purposes. You may
              not use this website in any way that could damage, disable, or
              impair the website or interfere with any other party's use of the
              website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">
              8. Accuracy of Information
            </h2>
            <p className="mt-2">
              We make reasonable efforts to ensure the information on this
              website is accurate, but we do not guarantee its completeness or
              accuracy. Rental estimates are generated using third-party data
              sources and are approximations only.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">
              9. Limitation of Liability
            </h2>
            <p className="mt-2">
              To the fullest extent permitted by law, Lighthouse Property
              Management & Realty, LLC shall not be liable for any indirect,
              incidental, or consequential damages arising from your use of this
              website or reliance on information provided, including rental
              estimates.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">
              10. Changes to Terms
            </h2>
            <p className="mt-2">
              We may update these Terms of Service at any time. Continued use of
              the website after changes are posted constitutes acceptance of the
              revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">
              11. Governing Law
            </h2>
            <p className="mt-2">
              These Terms are governed by the laws of the State of Florida. Any
              disputes shall be resolved in the courts of Duval County, Florida.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">12. Contact Us</h2>
            <p className="mt-2">
              Lighthouse Property Management & Realty, LLC
              <br />
              3018 Alvarado Ave., Jacksonville, FL 32217
              <br />
              (904) 822-7661
              <br />
              customerservice@jaxpm.com
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
