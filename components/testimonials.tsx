"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { useInView } from "@/hooks/use-in-view";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "Made things so much easier for me. Quick work, responsive replies and very reasonable priced for the quality of work. Highly recommended.",
    name: "Shawn M.",
    location: "Atlantic Beach",
  },
  {
    quote:
      "Lighthouse made the entire process seamless. From finding quality tenants to handling maintenance, they treat my property like their own.",
    name: "Verified Google Review",
    location: "Jacksonville Beach",
  },
  {
    quote:
      "Finally a property manager who actually picks up the phone. They go above and beyond, and I wouldn't trust anyone else with my rental.",
    name: "Verified Google Review",
    location: "Neptune Beach",
  },
  {
    quote:
      "I was paying way too much with my old manager and getting nothing in return. Lighthouse cut my costs and actually communicates. Night and day difference.",
    name: "Verified Google Review",
    location: "Riverside",
  },
  {
    quote:
      "They found us a great tenant in under two weeks and handled everything from photos to lease signing. Couldn't be happier with the experience.",
    name: "Verified Google Review",
    location: "San Marco",
  },
  {
    quote:
      "Maintenance requests are handled same-day and I get updates without having to chase anyone down. This is how property management should work.",
    name: "Verified Google Review",
    location: "Ponte Vedra Beach",
  },
  {
    quote:
      "We switched from a national company and immediately noticed the difference. Real people, real answers, and they actually care about our property.",
    name: "Verified Google Review",
    location: "St. Augustine",
  },
  {
    quote:
      "Transparent pricing, no hidden fees, and monthly reports that actually make sense. Lighthouse has earned our trust completely.",
    name: "Verified Google Review",
    location: "Mandarin",
  },
];

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const maxIndex = testimonials.length - itemsPerPage;

  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth >= 768 ? 3 : 1);
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section ref={ref} className="bg-offwhite py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-serif text-3xl font-bold text-navy lg:text-5xl text-balance">
            What Jacksonville property owners say
          </h2>
        </div>

        {/* Carousel */}
        <div
          className={`relative mt-14 transition-all duration-700 delay-200 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
              }}
            >
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="w-full shrink-0 px-3 md:w-1/3"
                >
                  <div className="flex h-full flex-col rounded-xl bg-white px-8 py-8 shadow-sm">
                    <Quote
                      className="h-8 w-8 text-gold/40"
                      aria-hidden="true"
                    />
                    <p className="mt-4 flex-1 text-base italic leading-relaxed text-navy/80">
                      {`"${t.quote}"`}
                    </p>
                    <div className="mt-6">
                      <p className="text-sm font-bold text-navy">{t.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {t.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prev}
            aria-label="Previous testimonials"
            className="absolute -left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy shadow-md transition-all hover:bg-navy hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonials"
            className="absolute -right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy shadow-md transition-all hover:bg-navy hover:text-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "w-6 bg-gold"
                    : "w-2 bg-navy/20 hover:bg-navy/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Star Rating */}
        <div className="mt-8 flex items-center justify-center gap-2 text-center">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4 fill-gold text-gold"
                aria-hidden="true"
              />
            ))}
          </div>
          <span className="text-sm font-medium text-navy">
            Rated 4+ Stars on Google
          </span>
        </div>
      </div>
    </section>
  );
}
