"use client";

import { useRef } from "react";
import { useInView } from "@/hooks/use-in-view";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I get the highest rent for my home?",
    answer:
      "We perform a detailed rental analysis using real-time market data for your specific neighborhood, property type, and condition. Our custom PDF report shows you exactly where your property sits relative to comparable rentals, and we price strategically to attract quality tenants fast without leaving money on the table.",
  },
  {
    question: "How long is it going to take to rent my property?",
    answer:
      "Most of our properties are leased within two to three weeks of listing. We achieve this through professional photography, aggressive multi-platform marketing, and a proven showing process. Your free rental analysis report will include current demand data for your area so you know what to expect.",
  },
  {
    question: "What are going to be my out-of-pocket expenses?",
    answer:
      "We charge zero upfront fees. You don't pay us anything until we're actively managing your property with a tenant in place. There are no hidden costs, no mark-ups on maintenance, and no surprise charges. Everything is transparent and spelled out in your management agreement.",
  },
  {
    question: "What is your tenant screening process?",
    answer:
      "We run comprehensive background checks including credit history, criminal records, employment verification, income verification (we require 3x the monthly rent), and landlord references. Our screening is thorough because we back it with our 3-Month Tenant Guarantee. If a tenant we placed must be removed within 3 months, we waive the next leasing fee.",
  },
  {
    question: "Can I cancel if I'm not happy with the service?",
    answer:
      "Absolutely. We offer no-hassle cancellation with no penalties or long-term lock-ins. We earn your business every single month. Plus, our 30-Day Satisfaction Guarantee means if you're not happy after the first month, the next month of management is on us.",
  },
  {
    question: "What makes Lighthouse different from larger property management companies?",
    answer:
      "Two words: extreme ownership. Every owner gets a dedicated representative instead of a call center or ticket system. You'll get a response the next business day. We operate a 24/7 emergency line, and you pay only what the vendor charges, with no mark-ups ever. We're small enough to care about your property personally, but experienced enough to handle everything professionally.",
  },
];

export function FAQ({ ctaText = "Get your free rental report", subtitle = "Still have questions? Your free rental analysis PDF includes personalized data that answers most of them. You can also call us directly.", items = faqs }: { ctaText?: string; subtitle?: string; items?: typeof faqs }) {
  const rentalReportCta = (
    <a
      href="#contact"
      className="font-semibold text-gold underline underline-offset-2 hover:text-gold/80 transition-colors"
    >
      {ctaText}
    </a>
  );
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  return (
    <section id="faq" ref={ref} className="py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Common Questions
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-navy lg:text-4xl text-balance">
            Everything you need to know before getting started.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {subtitle}
          </p>
        </div>

        {/* Accordion */}
        <div
          className={`mt-12 transition-all duration-700 delay-200 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Accordion type="single" collapsible className="w-full">
            {items.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-navy/10"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-navy hover:text-gold hover:no-underline [&[data-state=open]]:text-gold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {faq.answer} {rentalReportCta}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
