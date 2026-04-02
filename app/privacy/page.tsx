import type { Metadata } from "next";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Lighthouse Property Management & Realty",
};

export default function PrivacyPage() {
  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
        <h1 className="font-serif text-3xl font-bold text-navy lg:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-navy/50">Effective April 2, 2026</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-navy/70">
          <section>
            <h2 className="text-lg font-semibold text-navy">1. Who We Are</h2>
            <p className="mt-2">
              Lighthouse Property Management & Realty, LLC ("Lighthouse," "we,"
              "us," or "our") provides property management and real estate
              services in Jacksonville, Florida. This Privacy Policy describes
              how we collect, use, and protect your personal information when you
              use our website and services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">
              2. Information We Collect
            </h2>
            <p className="mt-2">When you submit a form on our website, we collect:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Property address</li>
              <li>Property type</li>
              <li>Any additional information you provide in the message field</li>
            </ul>
            <p className="mt-2">
              We also automatically collect standard web analytics data (pages
              visited, browser type, referring URL) through Google Analytics and
              Google Tag Manager.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">
              3. How We Use Your Information
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>To generate and deliver your free rental analysis PDF</li>
              <li>To respond to your inquiry about our services</li>
              <li>
                To send text messages about your rental analysis and property
                management services, if you have opted in
              </li>
              <li>To improve our website and marketing efforts</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">
              4. Text Messaging (SMS)
            </h2>
            <p className="mt-2">
              If you opt in to receive text messages, you consent to receive SMS
              messages from Lighthouse Property Management & Realty regarding
              your rental analysis and property management services. Message
              frequency varies. Message and data rates may apply.
            </p>
            <p className="mt-2">
              You may opt out at any time by replying <strong>STOP</strong> to
              any message. For help, reply <strong>HELP</strong> or contact us
              at (904) 822-7661 or customerservice@jaxpm.com.
            </p>
            <p className="mt-2">
              Your consent to receive text messages is not a condition of
              purchasing any property management services from us. We do not
              sell, rent, or share your phone number or opt-in information with
              third parties for their marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">
              5. How We Share Your Information
            </h2>
            <p className="mt-2">
              We do not sell your personal information. We may share your
              information with:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Service providers who assist in delivering our services (e.g.,
                CRM, email delivery, analytics)
              </li>
              <li>As required by law or legal process</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">
              6. Data Retention
            </h2>
            <p className="mt-2">
              We retain your personal information for as long as necessary to
              provide our services and fulfill the purposes described in this
              policy, or as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">
              7. Your Rights
            </h2>
            <p className="mt-2">
              You may request access to, correction of, or deletion of your
              personal information by contacting us at
              customerservice@jaxpm.com or (904) 822-7661.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">
              8. Changes to This Policy
            </h2>
            <p className="mt-2">
              We may update this Privacy Policy from time to time. Changes will
              be posted on this page with an updated effective date.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">9. Contact Us</h2>
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
