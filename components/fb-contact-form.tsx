"use client";

import { useState, useRef } from "react";
import { useInView } from "@/hooks/use-in-view";
import { Shield, Clock, CheckCircle, Loader2 } from "lucide-react";
import { images } from "@/lib/image-urls";
import { AddressAutocomplete } from "./address-autocomplete";
import { useTrackingParams } from "@/hooks/use-tracking-params";
import { trackEvent } from "@/lib/track";

const WEBHOOK_URL = "/api/fb-submit-form";

const TIMELINE_OPTIONS = [
  { value: "now", label: "Now (within 30 days)" },
  { value: "3-months", label: "Within 3 months" },
  { value: "3-6-months", label: "3 to 6 months" },
  { value: "6-plus-months", label: "6+ months" },
  { value: "exploring", label: "Just exploring" },
];

const QUALIFIED_TIMELINES = ["now", "3-months"];

export function FBContactForm() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    rentalTimeline: "",
  });
  const [smsConsent, setSmsConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const tracking = useTrackingParams();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const qualified = QUALIFIED_TIMELINES.includes(form.rentalTimeline);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          rentalTimeline: form.rentalTimeline,
          qualified,
          smsTransactional: smsConsent,
          smsMarketing: false,
          source: "fb_contact_form",
          ...tracking,
        }),
      });

      if (response.ok) {
        // The route resolves the property's county server-side; an address it
        // cannot place comes back false.
        const result = await response.json().catch(() => ({} as any));
        const inServiceArea = result?.inServiceArea === true;

        window.dataLayer?.push({
          event: "form_submit",
          form_name: "fb_contact_form",
          qualified,
          in_service_area: inServiceArea,
        });
        trackEvent("form_submit", {
          form_name: "fb_contact_form",
          qualified,
          in_service_area: inServiceArea,
        });
        if (qualified) {
          trackEvent("qualified_lead", {
            form_name: "fb_contact_form",
            in_service_area: inServiceArea,
          });
          // Meta only hears about properties inside the service area. GA4 and
          // the GHL tags still see every qualified lead.
          if (inServiceArea && typeof window !== "undefined" && (window as any).fbq) {
            (window as any).fbq("track", "Lead", {
              content_name: "fb_contact_form",
            });
          }
        }
        setStatus("success");
        setForm({
          name: "",
          email: "",
          phone: "",
          address: "",
          rentalTimeline: "",
        });
        setSmsConsent(false);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" ref={ref} data-track-section="fb_contact_form" className="overflow-hidden py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className={`grid items-stretch gap-0 overflow-hidden rounded-2xl lg:grid-cols-2 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Image Side */}
          <div className="relative min-h-[300px] lg:min-h-[unset]">
            <img
              src={images.contact}
              alt="Sample rental analysis PDF report with pricing data and charts"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-navy/40" />
          </div>

          {/* Form Side */}
          <div className="bg-navy px-8 py-12 lg:px-14 lg:py-16">
            <h2 className="font-serif text-3xl font-bold text-white lg:text-4xl text-balance">
              Get your free rental analysis PDF.
            </h2>
            <p className="mt-3 text-base text-white/60">
              Enter your property details and receive a custom PDF report with
              up-to-the-minute rental pricing data for your Jacksonville
              property -- delivered in seconds.
            </p>

            {status === "success" ? (
              <div className="mt-8 flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <p className="mt-4 font-serif text-xl font-bold text-white">
                  Your report is on the way!
                </p>
                <p className="mt-2 text-sm text-white/60">
                  Check your email for your free rental analysis PDF. We will be in touch soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
                <AddressAutocomplete
                  value={form.address}
                  onChange={(address) => setForm((prev) => ({ ...prev, address }))}
                  placeholder="Property Address"
                  required
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-white/70">
                    When are you looking to rent your property out?
                  </label>
                  <select
                    name="rentalTimeline"
                    value={form.rentalTimeline}
                    onChange={handleChange}
                    required
                    className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  >
                    <option value="" disabled>Select one</option>
                    {TIMELINE_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>

                <label className="flex items-start gap-2 text-xs leading-relaxed text-white/85">
                  <input
                    type="checkbox"
                    name="smsConsent"
                    checked={smsConsent}
                    onChange={(e) => setSmsConsent(e.target.checked)}
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-gold"
                  />
                  <span>
                    I agree to receive text messages from Lighthouse Property Management &amp; Realty, LLC at the phone number provided, including customer service messages, responses to my inquiry, appointment reminders, and account updates. Message frequency varies. Msg &amp; data rates may apply. Reply STOP to opt out, HELP for help.
                  </span>
                </label>
                <p className="text-xs leading-relaxed text-white/75">
                  <a href="/privacy" data-track="privacy_link" className="underline hover:text-white/50">Privacy Policy</a>{" "}
                  &{" "}
                  <a href="/terms" data-track="terms_link" className="underline hover:text-white/50">Terms of Service</a>
                </p>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  data-track="form_submit_click"
                  data-track-form="fb_contact_form"
                  className="mt-2 w-full rounded-lg bg-gold py-4 text-sm font-semibold text-navy transition-all duration-300 hover:bg-gold/90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "loading" ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    "Send My Free Rental Report"
                  )}
                </button>
                {status === "error" && (
                  <p className="text-center text-xs text-red-400">
                    Something went wrong. Please try again.
                  </p>
                )}

                <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-white/50">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    No commitment required
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    Instant PDF report
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5" aria-hidden="true" />
                    Licensed & Insured
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
