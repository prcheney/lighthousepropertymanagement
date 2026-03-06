"use client";

import { useRef } from "react";
import { useInView } from "@/hooks/use-in-view";
import { Clock, DollarSign, Ban, Unlock, Scale, RefreshCw, PhoneCall, UserCheck, ShieldCheck } from "lucide-react";

const guarantees = [
  {
    icon: Clock,
    title: "24-Hour Response Guarantee",
    desc: "Every inquiry receives an automated acknowledgment within 24 hours, with personal follow-up the next business day.",
    highlight: true,
    badge: "Our Promise",
  },
  {
    icon: UserCheck,
    title: "Dedicated Representative",
    desc: "Every owner gets a direct, dedicated point of contact -- not a call center, not a ticket system.",
    highlight: false,
  },
  {
    icon: PhoneCall,
    title: "24/7 Emergency Call Line",
    desc: "Real emergencies don't wait until business hours. Neither do we. Call us anytime, day or night.",
    highlight: false,
  },
  {
    icon: Ban,
    title: "No Upfront Fees",
    desc: "We don't charge you a single penny until we're actively managing your property. Zero out of pocket to start.",
    highlight: false,
  },
  {
    icon: ShieldCheck,
    title: "No Mark-Up Guarantee",
    desc: "Maintenance, repairs, vendor work -- we never add a mark-up. You pay only what the vendor charges. Period.",
    highlight: false,
  },
  {
    icon: Scale,
    title: "Fair Price Guarantee",
    desc: "Find a lower management fee in writing and we'll match it -- as long as they don't hide fees elsewhere.",
    highlight: false,
  },
  {
    icon: Unlock,
    title: "No-Hassle Cancellation",
    desc: "Not satisfied? Cancel anytime. No long-term lock-in, no penalties. We earn your business every month.",
    highlight: false,
  },
  {
    icon: DollarSign,
    title: "30-Day Satisfaction Guarantee",
    desc: "Not happy after the first 30 days? Your next month of management is on us. No questions asked.",
    highlight: false,
  },
  {
    icon: RefreshCw,
    title: "3-Month Tenant Guarantee",
    desc: "If a tenant we placed must be removed within 3 months, we waive the next leasing fee entirely.",
    highlight: false,
  },
];

export function Guarantees() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  return (
    <section
      id="guarantees"
      ref={ref}
      className="relative overflow-hidden bg-navy py-20 lg:py-28"
    >
      {/* Subtle diagonal pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 20px, #C9A84C 20px, #C9A84C 21px)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className={`mx-auto max-w-2xl text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            9 Written Guarantees
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold text-white lg:text-5xl text-balance">
            {"We don't just promise it. We put it in writing."}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/60">
            Every one of these guarantees is included in your management
            contract -- no asterisks, no exceptions.
          </p>
        </div>

          <div className={`mt-8 text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <a
              href="#contact"
              className="inline-block rounded-full bg-gold px-8 py-4 text-sm font-semibold text-navy transition-all duration-300 hover:bg-gold/90 hover:shadow-xl"
            >
              Get Your Free Rental Report
            </a>
          </div>

          {/* Cards Grid */}
        <div className={`mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {guarantees.map((g, i) => {
            const Icon = g.icon;
            return (
              <div
                key={i}
                className={`group relative rounded-xl border px-6 py-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  g.highlight
                    ? "border-gold bg-gold text-navy"
                    : "border-gold/20 bg-navy text-white hover:border-gold/40"
                }`}
              >
                {g.badge && (
                  <span className="absolute right-4 top-4 rounded-full bg-navy px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold">
                    {g.badge}
                  </span>
                )}
                <Icon
                  className={`h-7 w-7 ${g.highlight ? "text-navy" : "text-gold"}`}
                  aria-hidden="true"
                />
                <h3
                  className={`mt-4 text-lg font-bold ${
                    g.highlight ? "text-navy" : "text-white"
                  }`}
                >
                  {g.title}
                </h3>
                <p
                  className={`mt-2 text-sm leading-relaxed ${
                    g.highlight ? "text-navy/80" : "text-white/70"
                  }`}
                >
                  {g.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
