"use client";

import { useCallback, useEffect, useState } from "react";
import { CheckCircle, Loader2, Phone } from "lucide-react";
import { trackEvent } from "@/lib/track";
import { BOOKING_TZ, type SlotDay } from "@/lib/booking";

const OFFICE_PHONE = "(904) 822-7661";
const OFFICE_TEL = "tel:+19048227661";

type Lead = { contactId: string; name: string; email: string; phone: string };

const fmtDay = (iso: string, opts: Intl.DateTimeFormatOptions) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", opts);
const fmtTime = (slot: string) =>
  new Date(slot).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: BOOKING_TZ });
const fmtWhen = (slot: string) =>
  new Date(slot).toLocaleString("en-US", {
    weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: BOOKING_TZ,
  });

const TONES = {
  light: {
    text: "text-navy",
    muted: "text-navy/65",
    rule: "border-navy/10",
    idle: "border-navy/15 bg-white text-navy hover:border-navy/40",
    day: "border-navy bg-navy text-offwhite",
    skeleton: "bg-navy/10",
    link: "text-navy underline decoration-gold decoration-2 underline-offset-4",
  },
  dark: {
    text: "text-white",
    muted: "text-white/65",
    rule: "border-white/10",
    idle: "border-white/15 bg-white/5 text-white hover:border-white/40",
    day: "border-gold bg-gold text-navy",
    skeleton: "bg-white/10",
    link: "text-white underline decoration-gold decoration-2 underline-offset-4",
  },
};

// Thank-you step for qualified leads inside the service area: the report is
// confirmed, then they can put a call with Stephanie on her GHL calendar
// without leaving the page.
export function BookACall({ lead, formName, tone = "light" }: { lead: Lead; formName: string; tone?: "light" | "dark" }) {
  const t = TONES[tone];
  const [days, setDays] = useState<SlotDay[] | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  const [state, setState] = useState<"picking" | "booking" | "booked">("picking");
  const [notice, setNotice] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/booking/slots", { cache: "no-store" });
      const data = await res.json();
      setDays(Array.isArray(data?.days) ? data.days : []);
      setLoadFailed(!res.ok);
    } catch {
      setDays([]);
      setLoadFailed(true);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const book = async () => {
    if (!slot) return;
    setState("booking");
    setNotice(null);
    try {
      const res = await fetch("/api/booking/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactId: lead.contactId, startTime: slot }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.ok) {
        setState("booked");
        window.dataLayer?.push({ event: "call_booked", form_name: formName });
        trackEvent("call_booked", { form_name: formName });
        (window as any).fbq?.("track", "Schedule", { content_name: formName });
        return;
      }
      setState("picking");
      setSlot(null);
      if (data?.error === "slot_taken") {
        setNotice("Someone just took that time. Pick another one below.");
        load();
      } else {
        setNotice(`We could not book that time. Call us at ${OFFICE_PHONE} and we will set it up.`);
      }
    } catch {
      setState("picking");
      setNotice(`We could not book that time. Call us at ${OFFICE_PHONE} and we will set it up.`);
    }
  };

  if (state === "booked" && slot) {
    return (
      <div className="w-full text-left" data-track-section="book_a_call">
        <CheckCircle className="h-8 w-8 text-gold" aria-hidden="true" />
        <p className={`mt-4 font-serif text-2xl font-bold leading-snug ${t.text}`}>
          You are booked for {fmtWhen(slot)} Eastern.
        </p>
        <p className={`mt-3 text-sm leading-relaxed ${t.muted}`}>
          Stephanie will call you at {lead.phone}. Your rental report is on its way to {lead.email}, so have it open when she calls.
        </p>
      </div>
    );
  }

  const current = days?.[day];

  return (
    <div className="w-full text-left" data-track-section="book_a_call">
      <p className={`flex items-start gap-2 text-sm ${t.muted}`}>
        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
        <span>Your rental report is on its way to {lead.email}.</span>
      </p>

      <div className={`mt-5 border-t pt-5 ${t.rule}`}>
        <p className={`font-serif text-2xl font-bold leading-snug ${t.text}`}>
          Talk through your number with Stephanie
        </p>
        <p className={`mt-2 text-sm leading-relaxed ${t.muted}`}>
          Pick a time and she will call you for 30 minutes to go over what your property can rent for and how she would manage it.
        </p>
      </div>

      {days === null ? (
        <div className="mt-5" aria-busy="true" aria-label="Loading open times">
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={`h-14 animate-pulse rounded-lg ${t.skeleton}`} />
            ))}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={`h-11 animate-pulse rounded-lg ${t.skeleton}`} />
            ))}
          </div>
        </div>
      ) : days.length === 0 ? (
        <p className={`mt-5 text-sm leading-relaxed ${t.muted}`}>
          {loadFailed ? "We could not load Stephanie's calendar." : "Stephanie's calendar is full this week."} Call{" "}
          <a href={OFFICE_TEL} data-track="book_call_phone" className={t.link}>{OFFICE_PHONE}</a> and we will find a time.
        </p>
      ) : (
        <>
          <div className="mt-5 grid grid-cols-5 gap-2" role="radiogroup" aria-label="Day">
            {days.map((d, i) => (
              <button
                key={d.date}
                type="button"
                role="radio"
                aria-checked={i === day}
                onClick={() => { setDay(i); setSlot(null); }}
                data-track="book_call_day"
                className={`flex flex-col items-center rounded-lg border py-2 transition-colors duration-200 active:scale-[0.98] ${i === day ? t.day : t.idle}`}
              >
                <span className="text-[11px] font-medium">{fmtDay(d.date, { weekday: "short" })}</span>
                <span className="font-serif text-lg font-bold leading-tight">{fmtDay(d.date, { day: "numeric" })}</span>
              </button>
            ))}
          </div>

          <p className={`mt-4 text-xs ${t.muted}`}>
            {current && fmtDay(current.date, { weekday: "long", month: "long", day: "numeric" })}, Eastern time
          </p>
          <div className="mt-2 grid grid-cols-3 gap-2" role="radiogroup" aria-label="Time">
            {current?.slots.map((s) => (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={s === slot}
                onClick={() => setSlot(s)}
                data-track="book_call_time"
                className={`rounded-lg border py-2.5 text-sm font-medium transition-colors duration-200 active:scale-[0.98] ${s === slot ? "border-gold bg-gold text-navy" : t.idle}`}
              >
                {fmtTime(s)}
              </button>
            ))}
          </div>

          {notice && <p className="mt-3 text-sm text-red-500" role="alert">{notice}</p>}

          <button
            type="button"
            onClick={book}
            disabled={!slot || state === "booking"}
            data-track="book_call_submit"
            data-track-form={formName}
            className="mt-5 w-full rounded-lg bg-gold py-4 text-sm font-semibold text-navy transition-all duration-300 hover:bg-gold/90 hover:shadow-lg active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {state === "booking" ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Booking your call...
              </span>
            ) : slot ? (
              `Book ${fmtDay(current!.date, { weekday: "short" })} at ${fmtTime(slot)}`
            ) : (
              "Pick a time to book"
            )}
          </button>
        </>
      )}

      <p className={`mt-4 flex items-center gap-2 text-xs ${t.muted}`}>
        <Phone className="h-3.5 w-3.5" aria-hidden="true" />
        <span>
          Rather talk now? Call <a href={OFFICE_TEL} data-track="book_call_phone" className={t.link}>{OFFICE_PHONE}</a>
        </span>
      </p>
    </div>
  );
}
