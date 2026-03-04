"use client";

import { useState, useRef } from "react";
import { useInView } from "@/hooks/use-in-view";
import { Shield, Clock, CheckCircle } from "lucide-react";
import { images } from "@/lib/image-urls";

const propertyTypes = ["Single Family", "Duplex / Multi-Family", "Condo", "Townhome", "Other"];

export function ContactForm() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    propertyType: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    // Controlled form state - no form submission
    alert("Your free rental analysis PDF is on its way!");
  };

  return (
    <section id="contact" ref={ref} className="overflow-hidden py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className={`grid items-stretch gap-0 overflow-hidden rounded-2xl lg:grid-cols-2 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Image Side */}
          <div className="relative min-h-[300px] lg:min-h-[unset]">
            <img
              src={images.contact}
              alt="Sample rental analysis PDF report with pricing data and charts"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-navy/40" />
          </div>

          {/* Form Side */}
          <div className="bg-navy px-8 py-12 lg:px-14 lg:py-16">
            <h2 className="font-serif text-3xl font-bold text-white lg:text-4xl text-balance">
              Get your free rental analysis PDF.
            </h2>
            <p className="mt-3 text-base text-white/60">
              Enter your property details and receive a custom PDF report with
              up-to-the-minute rental pricing data for your Jacksonville
              property -- delivered in seconds.
            </p>

            <div className="mt-8 flex flex-col gap-5">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
              <input
                type="text"
                name="address"
                placeholder="Property Address"
                value={form.address}
                onChange={handleChange}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
              <select
                name="propertyType"
                value={form.propertyType}
                onChange={handleChange}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              >
                <option value="" disabled className="text-navy">
                  Property Type
                </option>
                {propertyTypes.map((t) => (
                  <option key={t} value={t} className="text-navy">
                    {t}
                  </option>
                ))}
              </select>
              <textarea
                name="message"
                placeholder="Anything else we should know?"
                rows={3}
                value={form.message}
                onChange={handleChange}
                className="resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
              <button
                onClick={handleSubmit}
                className="mt-2 w-full rounded-lg bg-gold py-4 text-sm font-semibold text-navy transition-all duration-300 hover:bg-gold/90 hover:shadow-lg"
              >
                Send My Free Rental Report
              </button>

              {/* Trust line */}
              <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-white/50">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5" aria-hidden="true" />
                  No commitment required
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  Instant PDF report
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5" aria-hidden="true" />
                  Licensed & Insured
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
