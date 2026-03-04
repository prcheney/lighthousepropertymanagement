"use client";

export function HeroForm() {
  return (
    <div className="mx-auto w-full max-w-md lg:mx-0 lg:ml-auto">
      <div className="rounded-2xl bg-offwhite px-6 py-8 shadow-2xl sm:px-8 sm:py-10">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          Free PDF Rental Report
        </p>
        <p className="mt-2 text-center font-serif text-lg font-bold text-navy">
          See what your property could rent for today.
        </p>
        <form
          className="mt-6 flex flex-col gap-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="Full Name"
            className="rounded-lg border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="rounded-lg border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="rounded-lg border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
          <input
            type="text"
            placeholder="Property Address"
            className="rounded-lg border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-gold py-4 text-sm font-semibold text-navy transition-all duration-300 hover:bg-gold/90 hover:shadow-lg"
          >
            Send My Free Rental Report
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-navy/40">
          100% free. No obligation. Your PDF report arrives in seconds.
        </p>
      </div>
    </div>
  );
}
