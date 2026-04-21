import Image from "next/image";
import { images } from "@/lib/image-urls";
import { HeroCallButtons } from "@/components/call-cta";

export function BottomCallCTA() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24 lg:py-32"
    >
      <Image
        src={images.heroBg}
        alt="Jacksonville, Florida home at golden hour"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-navy/85" />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 text-center">
        <h2 className="font-serif text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl text-balance">
          Ready to talk to a property manager who picks up the phone?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/75">
          Call us now or schedule a time and we{"'"}ll reach out to you at
          your preferred time.
        </p>
        <div className="mt-10">
          <HeroCallButtons />
        </div>
        <p className="mt-6 text-sm text-white/60">
          In a 10-minute call, you can learn everything you need to know about maximizing your rental investment.
        </p>
      </div>
    </section>
  );
}
