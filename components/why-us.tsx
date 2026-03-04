"use client";

import { useRef } from "react";
import { useInView } from "@/hooks/use-in-view";
import { Home, FileCheck, Phone } from "lucide-react";
import { images } from "@/lib/image-urls";

const differentiators = [
  {
    icon: Home,
    title: "Local Owners",
    desc: "Small enough to care, big enough to cover your needs",
  },
  {
    icon: FileCheck,
    title: "9 Written Guarantees",
    desc: "Every promise backed by your management contract",
  },
  {
    icon: Phone,
    title: "Dedicated Rep",
    desc: "Your own contact instead of a call center or ticket system",
  },
];

export function WhyUs() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  return (
    <section id="why-us" ref={ref} className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Photo */}
          <div className="overflow-hidden rounded-2xl bg-navy">
            <img
              src={images.whyUs}
              alt="Lighthouse Property Management & Realty team in Jacksonville, Florida"
              className="h-[400px] w-full object-cover opacity-90 lg:h-[520px]"
              loading="lazy"
            />
          </div>

          {/* Text */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Locally Owned. Personally Accountable.
            </p>
            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-navy lg:text-4xl text-balance">
              Small enough to care. Big enough to cover everything you need.
            </h2>
            <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-muted-foreground">
              <p>
                Lighthouse Property Management & Realty is a team of real estate
                professionals with two decades of experience across full-time
                investing, residential appraising, facilities maintenance, and
                both short-term vacation rental and long-term property
                management. That depth means we own every result, good or bad.
                No excuses, no passing the buck, and no corporate layers between
                you and the people responsible for your property.
              </p>
              <p>
                We live in Jacksonville. Our neighbors are your neighbors. Your
                property{"'"}s reputation is our reputation.
              </p>
            </div>

            {/* Differentiators */}
            <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:gap-8">
              {differentiators.map((d) => {
                const Icon = d.icon;
                return (
                  <div key={d.title} className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10">
                      <Icon className="h-5 w-5 text-gold" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-navy">{d.title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                        {d.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
