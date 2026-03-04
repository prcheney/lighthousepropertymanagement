"use client";

import { useRef } from "react";
import { useInView } from "@/hooks/use-in-view";
import { images } from "@/lib/image-urls";

const painPoints = [
  "Vacancy days that drag on while you keep paying the mortgage",
  "Hidden fees and surprise mark-ups on every maintenance call",
  "Managers who vanish when problems arise and blame everyone else",
  "No dedicated contact, just a call center in another state",
  "A manager who doesn't know your name, your property, or your goals",
];

export function PainPoints() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  return (
    <section ref={ref} className="overflow-hidden py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Image */}
          <div className="overflow-hidden rounded-xl">
            <img
              src={images.painPoints}
              alt="Jacksonville, Florida skyline at sunset over the St. Johns River"
              className="h-[400px] w-full object-cover lg:h-[520px]"
              loading="lazy"
            />
          </div>

          {/* Text */}
          <div className="rounded-2xl bg-navy px-8 py-12 lg:px-12 lg:py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              The Problem With Most Property Managers
            </p>
            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-white lg:text-4xl text-balance">
              You deserve a manager who picks up the phone, not a call center
              in another state.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/70">
              National property management companies treat your home like a unit
              number. Slow responses, hidden fees, and zero accountability have
              become the norm. We built Lighthouse Property Management & Realty
              to be different because we live here too.
            </p>
            <ul className="mt-8 flex flex-col gap-4">
              {painPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-1 block h-0.5 w-5 shrink-0 bg-gold" aria-hidden="true" />
                  <span className="text-sm leading-relaxed text-white/80">{point}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <a
                href="#contact"
                className="inline-block rounded-full bg-gold px-8 py-4 text-sm font-semibold text-navy transition-all duration-300 hover:bg-gold/90 hover:shadow-xl"
              >
                Get Your Free Rental Report
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
