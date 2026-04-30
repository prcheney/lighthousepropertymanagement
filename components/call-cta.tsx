"use client";

import { useState } from "react";
import { Phone } from "lucide-react";
import { AdsHeroForm } from "@/components/ads-hero-form";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export const PHONE_DISPLAY = "(904) 822-7661";
export const PHONE_TEL = "tel:9048227661";
export const SCHEDULE_LABEL = "Schedule a call later";

function CallFormDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-track-modal="schedule_call"
        className="max-w-md overflow-hidden border-0 bg-transparent p-0 shadow-none sm:max-w-md"
      >
        <DialogTitle className="sr-only">Schedule a call from our team</DialogTitle>
        <AdsHeroForm />
      </DialogContent>
    </Dialog>
  );
}

type Tone = "onLight" | "onDark";

export function CallCTA({
  tone = "onLight",
  align = "center",
}: {
  tone?: Tone;
  align?: "center" | "start";
}) {
  const [open, setOpen] = useState(false);
  const linkClass =
    tone === "onDark"
      ? "text-white/70 underline underline-offset-4 hover:text-white transition-colors"
      : "text-navy/60 underline underline-offset-4 hover:text-navy transition-colors";
  const alignClass = align === "start" ? "items-start" : "items-center";

  return (
    <div className={`flex flex-col ${alignClass} gap-3`}>
      <a
        href={PHONE_TEL}
        data-track="call_primary"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-semibold text-navy shadow-lg transition-all duration-300 hover:bg-gold/90 hover:shadow-xl"
      >
        <Phone className="h-4 w-4" />
        Call {PHONE_DISPLAY}
      </a>
      <button
        type="button"
        onClick={() => setOpen(true)}
        data-track="schedule_modal_open"
        data-track-variant="block"
        className={`text-sm font-medium ${linkClass}`}
      >
        {SCHEDULE_LABEL}
      </button>
      <CallFormDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}

export function InlineCallCTA() {
  return (
    <>
      <a
        href={PHONE_TEL}
        data-track="call_inline"
        className="font-semibold text-gold underline underline-offset-2 hover:text-gold/80 transition-colors"
      >
        Call {PHONE_DISPLAY}
      </a>
      {" or "}
      <CallModalLink>schedule a call later</CallModalLink>
      .
    </>
  );
}

export function CallModalLink({
  children = SCHEDULE_LABEL,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        data-track="schedule_modal_open"
        data-track-variant="inline"
        className={
          className ??
          "font-semibold text-gold underline underline-offset-2 hover:text-gold/80 transition-colors"
        }
      >
        {children}
      </button>
      <CallFormDialog open={open} onOpenChange={setOpen} />
    </>
  );
}

/**
 * Full two-button layout used in the hero and bottom CTA section.
 * Primary: click-to-call. Secondary: modal with form.
 */
export function HeroCallButtons() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <a
          href={PHONE_TEL}
          data-track="call_primary"
          className="flex w-full items-center justify-center gap-3 rounded-lg bg-gold px-8 py-4 text-base font-semibold text-navy shadow-lg transition-all duration-300 hover:bg-gold/90 hover:shadow-xl sm:w-auto"
        >
          <Phone className="h-5 w-5" />
          Call {PHONE_DISPLAY}
        </a>
        <button
          type="button"
          onClick={() => setOpen(true)}
          data-track="schedule_modal_open"
          data-track-variant="block"
          className="w-full rounded-lg border border-white/40 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur transition-all duration-300 hover:border-white/70 hover:bg-white/10 sm:w-auto"
        >
          {SCHEDULE_LABEL}
        </button>
      </div>
      <CallFormDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
