"use client";

import { useRef } from "react";
import { useInView } from "@/hooks/use-in-view";
import { images } from "@/lib/image-urls";

const services = [
  {
    title: "Residential Management",
    desc: "End-to-end management for single-family and multi-family homes including leasing, rent collection, maintenance, and tenant turns.",
    image: images.serviceResidential,
  },
  {
    title: "Investor Services",
    desc: "We help you locate, acquire, stand up, and make cash-flow-positive your first or next rental property.",
    image: images.serviceInvestor,
  },
  {
    title: "Tenant Placement & Screening",
    desc: "Marketing, showing, and thorough screening so you get qualified tenants who pay and stay.",
    image: images.serviceTenant,
  },
  {
    title: "Maintenance & Renovations",
    desc: "Full-spectrum maintenance service and tenant-turn renovations with vetted contractors.",
    image: images.serviceMaintenance,
  },
  {
    title: "Financial Reporting",
    desc: "Monthly owner statements with full transparency on every dollar. Access anytime via the Owner Portal.",
    image: images.serviceFinancial,
  },
];

export function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  return (
    <section id="services" ref={ref} className="bg-offwhite py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className={`mx-auto max-w-2xl text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            What We Handle
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold text-navy lg:text-5xl text-balance">
            Full-service management. Nothing falls through the cracks.
          </h2>
        </div>

        {/* Grid: 1 col mobile, 2 col tablet, 6-col desktop for centering */}
        <div className={`mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-6 transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {services.map((s, i) => (
            <div key={s.title} className={`group lg:col-span-2 ${i === 3 ? "lg:col-start-2" : ""}`}>
              <div className="overflow-hidden rounded-xl">
                <img
                  src={s.image}
                  alt={s.title}
                  className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <h3 className="mt-5 text-lg font-bold text-navy">{s.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
