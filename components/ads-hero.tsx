import Image from "next/image";
import { images } from "@/lib/image-urls";
import { HeroCallButtons } from "@/components/call-cta";
import { ChevronDown } from "lucide-react";

export function AdsHero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <Image
        src={images.heroBg}
        alt="Beautiful Jacksonville Florida home with live oaks and Spanish moss"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-navy/80" />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 py-24 text-center lg:py-32">
        <Image
          src={images.logo}
          alt="Lighthouse Property Management and Realty, LLC"
          width={200}
          height={66}
          priority
          className="mx-auto h-14 w-auto brightness-0 invert"
        />

        <h1 className="mt-8 font-serif text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl text-balance">
          Jacksonville Property Management That Picks Up the Phone
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/75 md:text-xl">
          A dedicated rep who knows your name. 9 written guarantees in your
          contract. No hidden fees, no mark-ups, no lock-in. Just honest,
          local property management.
        </p>

        <div className="mt-10">
          <HeroCallButtons />
        </div>

        <p className="mt-6 text-sm text-white/60">
          Available now. We answer every call personally.
        </p>
      </div>

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
