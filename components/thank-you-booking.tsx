"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { images } from "@/lib/image-urls";
import { readBookingLead, PREVIEW_LEAD, type BookingLead } from "@/lib/booking-lead";
import { BookACall } from "./book-a-call";

const OFFICE_PHONE = "(904) 822-7661";
const OFFICE_TEL = "tel:+19048227661";

export function ThankYouBooking() {
  // undefined while we have not looked yet, null when nothing was handed over.
  const [lead, setLead] = useState<BookingLead | null | undefined>(undefined);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    const isPreview = new URLSearchParams(window.location.search).get("preview") === "1";
    setPreview(isPreview);
    setLead(isPreview ? PREVIEW_LEAD : readBookingLead());
    // Client-side navigation from the form does not reload the page, so GA4 and
    // GTM need to hear about this view themselves.
    window.dataLayer?.push({ event: "virtual_page_view", page_path: "/fb/thank-you" });
    window.gtag?.("event", "page_view", { page_path: "/fb/thank-you", page_title: document.title });
  }, []);

  const firstName = lead?.name?.trim().split(/\s+/)[0] || "";

  return (
    <section data-track-section="thank_you" className="relative min-h-screen overflow-hidden bg-navy">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url('${images.heroBg}')` }}
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-16 lg:py-24">
        <Image
          src={images.logo}
          alt="Lighthouse Property Management and Realty, LLC"
          width={200}
          height={66}
          priority
          className="h-12 w-auto brightness-0 invert"
        />

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            {lead ? (
              <p className="flex items-start gap-2 text-sm text-white/70">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <span>
                  Thanks{firstName ? `, ${firstName}` : ""}. Your rental report is on its way to {lead.email}.
                </span>
              </p>
            ) : lead === null ? (
              <p className="flex items-start gap-2 text-sm text-white/70">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <span>Thanks for requesting your rental report. It is on its way to your inbox.</span>
              </p>
            ) : null}

            <h1 className="mt-6 font-serif text-4xl font-bold leading-tight text-white md:text-5xl text-balance">
              Hi, I&apos;m Stephanie. Let&apos;s make that estimate accurate.
            </h1>

            <div className="mt-6 space-y-4 text-lg leading-relaxed text-white/75">
              <p>
                The report in your inbox comes from market data, and market data cannot see a heated pool, a remodeled kitchen, or how well a home has been kept. That is why some estimates come in low.
              </p>
              <p>
                Pick a time on my calendar and I will call you for 30 minutes. We will go over what your property can really rent for, and I will walk you through how we manage it and what it costs. If it helps, I can come out and see the property in person.
              </p>
              <p>I look forward to meeting you.</p>
            </div>

            <p className="mt-6 font-serif text-xl font-bold text-white">Stephanie Myers</p>
            <p className="text-sm text-white/60">Lighthouse Property Management &amp; Realty</p>

          </div>

          <div className="w-full lg:ml-auto lg:max-w-md">
            <div className="rounded-2xl bg-offwhite px-6 py-8 shadow-2xl sm:px-8 sm:py-10">
              {lead ? (
                <BookACall lead={lead} formName={lead.formName} tone="light" preview={preview} />
              ) : lead === null ? (
                <div className="text-left">
                  <p className="font-serif text-2xl font-bold leading-snug text-navy">Set up your call with Stephanie</p>
                  <p className="mt-3 text-sm leading-relaxed text-navy/65">
                    Call{" "}
                    <a href={OFFICE_TEL} data-track="book_call_phone" className="text-navy underline decoration-gold decoration-2 underline-offset-4">
                      {OFFICE_PHONE}
                    </a>{" "}
                    and we will find a time that works for you.
                  </p>
                </div>
              ) : (
                <div className="h-64 animate-pulse rounded-lg bg-navy/10" aria-busy="true" aria-label="Loading" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
