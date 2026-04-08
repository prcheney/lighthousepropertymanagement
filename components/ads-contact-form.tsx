"use client";

import { useState, useRef } from "react";
import { useInView } from "@/hooks/use-in-view";
import { Shield, Clock, CheckCircle, Loader2 } from "lucide-react";
import { images } from "@/lib/image-urls";

const WEBHOOK_URL = "/api/contact-form";

export function AdsContactForm() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [smsTransactional, setSmsTransactional] = useState(false);
  const [smsMarketing, setSmsMarketing] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          smsTransactional,
          smsMarketing,
          source: "ads_contact_form",
        }),
      });

      if (response.ok) {
        window.dataLayer?.push({ event: "form_submit", form_name: "ads_contact_form" });
        setStatus("success");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" ref={ref} className="overflow-hidden py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className={`grid items-stretch gap-0 overflow-hidden rounded-2xl lg:grid-cols-2 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Image Side */}
          <div className="relative min-h-[300px] lg:min-h-[unset]">
            <img
              src={images.whyUs}
              alt="The Lighthouse Property Management team in Jacksonville, Florida"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-navy/40" />
          </div>

          {/* Form Side */}
          <div className="bg-navy px-8 py-12 lg:px-14 lg:py-16">
            <h2 className="font-serif text-3xl font-bold text-white lg:text-4xl text-balance">
              Ready to talk property management?
            </h2>
            <p className="mt-3 text-base text-white/60">
              Tell us about your property and we'll reach out within one
              business day to discuss how we can help.
            </p>

            {status === "success" ? (
              <div className="mt-8 flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <p className="mt-4 font-serif text-xl font-bold text-white">
                  We'll be in touch shortly!
                </p>
                <p className="mt-2 text-sm text-white/60">
                  One of our team members will reach out to discuss your property management needs.
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
                <textarea
                  name="message"
                  placeholder="Tell us about your property (optional)"
                  rows={3}
                  value={form.message}
                  onChange={handleChange}
                  className="resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
                <label className="mt-1 flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={smsTransactional}
                    onChange={(e) => setSmsTransactional(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/20 text-gold accent-gold"
                  />
                  <span className="text-[11px] leading-relaxed text-white/40">
                    I consent to receive transactional text messages from
                    Lighthouse Property Management & Realty at the phone number
                    provided, such as account alerts and appointment reminders.
                    Message frequency varies. Msg & data rates may apply. Reply
                    STOP to opt out, HELP for help.
                  </span>
                </label>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={smsMarketing}
                    onChange={(e) => setSmsMarketing(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/20 text-gold accent-gold"
                  />
                  <span className="text-[11px] leading-relaxed text-white/40">
                    I consent to receive marketing and promotional text messages
                    from Lighthouse Property Management & Realty at the phone
                    number provided. Message frequency varies. Msg & data rates
                    may apply. Reply STOP to opt out.
                  </span>
                </label>
                <p className="text-[10px] leading-relaxed text-white/30">
                  <a href="/privacy" className="underline hover:text-white/50">Privacy Policy</a>{" "}
                  &{" "}
                  <a href="/terms" className="underline hover:text-white/50">Terms of Service</a>
                </p>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="mt-2 w-full rounded-lg bg-gold py-4 text-sm font-semibold text-navy transition-all duration-300 hover:bg-gold/90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "loading" ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    "Talk to a Local Expert"
                  )}
                </button>
                {status === "error" && (
                  <p className="text-center text-xs text-red-400">
                    Something went wrong. Please try again.
                  </p>
                )}

                {/* Trust line */}
                <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-white/50">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    No commitment required
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    Response within 1 business day
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
