"use client";

import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { useTrackingParams } from "@/hooks/use-tracking-params";

const WEBHOOK_URL = "/api/contact-form";

export function AdsHeroForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    availability: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const tracking = useTrackingParams();

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
          availability: form.availability,
          message: form.message,
          source: "ads_hero_form",
          ...tracking,
        }),
      });

      if (response.ok) {
        window.dataLayer?.push({ event: "form_submit", form_name: "ads_hero_form" });
        setStatus("success");
        setForm({ name: "", email: "", phone: "", availability: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="mx-auto w-full max-w-md lg:mx-0 lg:ml-auto">
        <div className="rounded-2xl bg-offwhite px-6 py-8 shadow-2xl sm:px-8 sm:py-10">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-gold" />
            </div>
            <p className="mt-4 font-serif text-xl font-bold text-navy">
              We'll be in touch shortly!
            </p>
            <p className="mt-2 text-sm text-navy/60">
              One of our team members will reach out to discuss your property management needs.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md lg:mx-0 lg:ml-auto">
      <div className="rounded-2xl bg-offwhite px-6 py-8 shadow-2xl sm:px-8 sm:py-10">
        <p className="text-center font-serif text-lg font-bold text-navy lg:text-2xl">
          Learn everything you need to know in one conversation.
        </p>
        <ul className="mx-auto mt-3 w-fit space-y-2 text-base text-navy/70 lg:mt-5">
          <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 shrink-0 text-gold" /> Our tenant screening process</li>
          <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 shrink-0 text-gold" /> How we manage your property</li>
          <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 shrink-0 text-gold" /> Your bottom-line profitability</li>
        </ul>
        <form
          className="mt-6 flex flex-col gap-3"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="rounded-lg border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="rounded-lg border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            className="rounded-lg border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
          <textarea
            name="availability"
            placeholder="When are you usually available for a call? (e.g. weekday mornings, after 5pm, etc.)"
            rows={3}
            value={form.availability}
            onChange={handleChange}
            className="resize-none rounded-lg border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
          <textarea
            name="message"
            placeholder="Tell us about your property (optional)"
            rows={3}
            value={form.message}
            onChange={handleChange}
            className="resize-none rounded-lg border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
          <p className="text-[10px] leading-relaxed text-navy/40">
            <a href="/privacy" className="underline hover:text-navy/60">Privacy Policy</a>{" "}
            &{" "}
            <a href="/terms" className="underline hover:text-navy/60">Terms of Service</a>
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
              "Talk With Our Team"
            )}
          </button>
          {status === "error" && (
            <p className="text-center text-xs text-red-600">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
        <p className="mt-4 text-center text-xs text-navy/40">
          No obligation. We'll call you within one business day.
        </p>
      </div>
    </div>
  );
}
