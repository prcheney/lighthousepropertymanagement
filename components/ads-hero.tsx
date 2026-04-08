import Image from "next/image";
import { images } from "@/lib/image-urls";
import { AdsHeroForm } from "@/components/ads-hero-form";
import { ChevronDown } from "lucide-react";

export function AdsHero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('${images.heroBg}')`,
        }}
        role="img"
        aria-label="Beautiful Jacksonville Florida home with live oaks and Spanish moss"
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-navy/80" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24 lg:py-32">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: Copy */}
          <div className="text-center lg:text-left">
            {/* Logo */}
            <Image
              src={images.logo}
              alt="Lighthouse Property Management and Realty, LLC"
              width={200}
              height={66}
              priority
              className="mx-auto h-14 w-auto brightness-0 invert lg:mx-0"
            />

            {/* Headline */}
            <h1 className="mt-8 font-serif text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl text-balance">
              Jacksonville Property Management That Picks Up the Phone
            </h1>

            {/* Subheadline */}
            <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-white/75 md:text-xl lg:mx-0">
              A dedicated rep who knows your name. 9 written guarantees in your
              contract. No hidden fees, no mark-ups, no lock-in. Just honest,
              local property management.
            </p>

            {/* Phone */}
            <p className="mt-8 text-sm font-medium text-white/60">
              Prefer to talk? Call{" "}
              <a
                href="tel:9048227661"
                className="text-gold transition-colors hover:text-gold/80"
              >
                (904) 822-7661
              </a>
            </p>
          </div>

          {/* Right: Inline Form */}
          <AdsHeroForm />
        </div>
      </div>
      {/* Scroll indicator */}
      <a
        href="#services"
        aria-label="Scroll to next section"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 transition-colors hover:text-white/80"
      >
        <span className="text-[11px] font-medium uppercase tracking-widest">
          Explore
        </span>
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
}
