"use client";

import Image from "next/image";
import { useState } from "react";
import { images } from "@/lib/image-urls";
import { AdsHeroForm } from "@/components/ads-hero-form";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChevronDown, Phone } from "lucide-react";

const PHONE_DISPLAY = "(904) 822-7661";
const PHONE_TEL = "tel:9048227661";

export function AdsHero() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <Image
        src={images.heroBg}
        alt="Beautiful Jacksonville Florida home with live oaks and Spanish moss"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-navy/80" />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 py-24 text-center lg:py-32">
        <Image
          src={images.logo}
          alt="Lighthouse Property Management and Realty, LLC"
          width={200}
          height={66}
          priority
          className="mx-auto h-14 w-auto brightness-0 invert"
        />

        <h1 className="mt-8 font-serif text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl text-balance">
          Jacksonville Property Management That Picks Up the Phone
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/75 md:text-xl">
          A dedicated rep who knows your name. 9 written guarantees in your
          contract. No hidden fees, no mark-ups, no lock-in. Just honest,
          local property management.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={PHONE_TEL}
            className="flex w-full items-center justify-center gap-3 rounded-lg bg-gold px-8 py-4 text-base font-semibold text-navy shadow-lg transition-all duration-300 hover:bg-gold/90 hover:shadow-xl sm:w-auto"
          >
            <Phone className="h-5 w-5" />
            Call {PHONE_DISPLAY}
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="w-full rounded-lg border border-white/40 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur transition-all duration-300 hover:border-white/70 hover:bg-white/10 sm:w-auto"
          >
            Prefer to have us call you?
          </button>
        </div>

        <p className="mt-6 text-sm text-white/60">
          Available now — we answer every call personally.
        </p>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md overflow-hidden border-0 bg-transparent p-0 shadow-none sm:max-w-md">
          <DialogTitle className="sr-only">Request a call from our team</DialogTitle>
          <AdsHeroForm />
        </DialogContent>
      </Dialog>

      <a
        href="#services"
        aria-label="Scroll to next section"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 transition-colors hover:text-white/80"
      >
        <span className="text-[11px] font-medium uppercase tracking-widest">
          Explore
        </span>
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
}
