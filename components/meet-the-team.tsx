"use client";

import { useRef } from "react";
import { useInView } from "@/hooks/use-in-view";
import { images } from "@/lib/image-urls";
import { MapPin, ShieldCheck, Phone, Home, FileCheck, UserCheck } from "lucide-react";

const ownership = [
  {
    icon: UserCheck,
    title: "We own the relationship.",
    desc: "Every owner gets a dedicated representative with direct access -- not a call center, not a ticket system. You'll know us by name.",
  },
  {
    icon: Phone,
    title: "We own the response.",
    desc: "24-hour response guarantee during business hours, 24/7 emergency line, and a team that actually picks up the phone. You'll never chase us down.",
  },
  {
    icon: ShieldCheck,
    title: "We own the results.",
    desc: "9 written guarantees in your contract. If something goes wrong, we fix it. No excuses, no finger-pointing, no corporate layers.",
  },
];

const differentiators = [
  {
    icon: Home,
    label: "Local Owners",
  },
  {
    icon: FileCheck,
    label: "9 Written Guarantees",
  },
  {
    icon: UserCheck,
    label: "Dedicated Rep",
  },
];

export function MeetTheTeam() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  return (
    <section id="why-us" ref={ref} className="overflow-hidden py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Photo */}
          <div className="overflow-hidden rounded-2xl bg-navy">
            <img
              src={images.whyUs}
              alt="The Lighthouse Property Management team in Jacksonville, Florida"
              className="h-[400px] w-full object-cover opacity-90 lg:h-[560px]"
              loading="lazy"
            />
          </div>

          {/* Text */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Meet the Team
            </p>
            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-navy lg:text-4xl text-balance">
              We lead with a simple principle: Extreme Ownership.
            </h2>

            <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-muted-foreground">
              <p>
                We{"'"}re a team of real estate professionals with two decades of
                experience across full-time investing, residential appraising,
                facilities maintenance, and both short-term vacation rental and
                long-term property management. We built Lighthouse because we
                were tired of watching national companies treat Jacksonville
                properties like unit numbers.
              </p>
              <p className="font-medium text-navy">
                We live and work in Jacksonville. Our kids go to school here, we
                go to church here, we care about this community. Your
                property{"'"}s reputation is our reputation.
              </p>
            </div>

            {/* Ownership pillars */}
            <div className="mt-10 flex flex-col gap-6">
              {ownership.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10">
                      <Icon
                        className="h-5 w-5 text-gold"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-navy">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Differentiator badges */}
            <div className="mt-8 flex flex-wrap gap-3">
              {differentiators.map((d) => {
                const Icon = d.icon;
                return (
                  <span
                    key={d.label}
                    className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-2 text-xs font-semibold text-navy"
                  >
                    <Icon className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                    {d.label}
                  </span>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-10">
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
