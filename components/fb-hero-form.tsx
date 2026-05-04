"use client";

import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
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

export function FBHeroForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    rentalTimeline: "",
  });
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

    const qualified =
      form.rentalTimeline !== "exploring" && form.rentalTimeline !== "";

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
          source: "fb_hero_form",
          ...tracking,
        }),
      });

      if (response.ok) {
        window.dataLayer?.push({
          event: "form_submit",
          form_name: "fb_hero_form",
          qualified,
        });
        trackEvent("form_submit", { form_name: "fb_hero_form", qualified });
        if (qualified) trackEvent("qualified_lead", { form_name: "fb_hero_form" });
        setStatus("success");
        setForm({ name: "", email: "", phone: "", address: "", rentalTimeline: "" });
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
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <p className="mt-4 font-serif text-xl font-bold text-navy">
              Your report is on the way!
            </p>
            <p className="mt-2 text-sm text-navy/60">
              Check your email for your free rental analysis PDF. We will be in touch soon.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md lg:mx-0 lg:ml-auto">
      <div className="rounded-2xl bg-offwhite px-6 py-8 shadow-2xl sm:px-8 sm:py-10">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          Free PDF Rental Report
        </p>
        <p className="mt-2 text-center font-serif text-lg font-bold text-navy">
          See what your property could rent for today.
        </p>
        <form className="mt-6 flex flex-col gap-3" onSubmit={handleSubmit}>
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
          <AddressAutocomplete
            value={form.address}
            onChange={(address) => setForm((prev) => ({ ...prev, address }))}
            placeholder="Property Address"
            required
            className="w-full rounded-lg border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-navy/60">
              When are you looking to rent your property out?
            </label>
            <select
              name="rentalTimeline"
              value={form.rentalTimeline}
              onChange={handleChange}
              required
              className="rounded-lg border border-navy/15 bg-white px-4 py-3 text-sm text-navy focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            >
              <option value="" disabled>Select one</option>
              {TIMELINE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          <p className="text-[10px] leading-relaxed text-navy/40">
            <a href="/privacy" data-track="privacy_link" className="underline hover:text-navy/60">Privacy Policy</a>{" "}
            &{" "}
            <a href="/terms" data-track="terms_link" className="underline hover:text-navy/60">Terms of Service</a>
          </p>
          <button
            type="submit"
            disabled={status === "loading"}
            data-track="form_submit_click"
            data-track-form="fb_hero_form"
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
            <p className="text-center text-xs text-red-600">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
        <p className="mt-4 text-center text-xs text-navy/40">
          100% free. No obligation. Your PDF report arrives in seconds.
        </p>
      </div>
    </div>
  );
}
