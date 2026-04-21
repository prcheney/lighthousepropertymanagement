import type { Metadata } from "next";
import Image from "next/image";
import { images } from "@/lib/image-urls";
import {
  HeroCallButtons,
  CallCTA,
  InlineCallCTA,
  PHONE_DISPLAY,
  PHONE_TEL,
} from "@/components/call-cta";
import { Phone } from "lucide-react";
import { SocialProofBar } from "@/components/social-proof-bar";
import { MeetTheTeam } from "@/components/meet-the-team";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";
import { BottomCallCTA } from "@/components/bottom-call-cta";
import { Footer } from "@/components/footer";
import { ChevronDown } from "lucide-react";

const servicesFaqs = [
  {
    question: "What's included in full-service management?",
    answer:
      "Everything from listing and tenant screening to rent collection, maintenance dispatch, renovations, and monthly financial reporting. We run the entire lifecycle so you never have to juggle vendors, tenants, or paperwork yourself.",
  },
  {
    question: "How fast do you respond to owners and tenants?",
    answer:
      "Owners and tenants hear back the next business day, every time. Real emergencies hit our 24/7 emergency line and get dispatched immediately.",
  },
  {
    question: "Do you mark up maintenance and repairs?",
    answer:
      "Never. You pay exactly what the vendor charges. No hidden mark-ups, no percentage adds, no surprise line items. It's written into your contract.",
  },
  {
    question: "How long does it take to lease a property?",
    answer:
      "Most of our listings lease within two to three weeks. Professional photos, syndicated marketing, and a proven showing process keep vacancies short.",
  },
  {
    question: "Can I cancel if I'm not happy?",
    answer:
      "Yes. No long-term lock-in and no cancellation penalties. On top of that, if you're not happy in the first 30 days, the next month of management is on us.",
  },
  {
    question: "Do you help investors buy new rentals?",
    answer:
      "Yes. Our investor services cover market analysis, acquisition through our real estate brokerage arm, rehab scoping, and day-one management once the property is yours.",
  },
];

export const metadata: Metadata = {
  title: "Our Services | Lighthouse Property Management & Realty",
  description:
    "Full-service Jacksonville property management: leasing, tenant screening, maintenance, renovations, investor services, and transparent financial reporting.",
};

const services = [
  {
    title: "Residential Management",
    image: images.serviceResidential,
    lead:
      "End-to-end management for single-family and multi-family homes. We run the entire lifecycle so your only job is cashing the deposit.",
    bullets: [
      "Rent collection, owner disbursements, and late-fee enforcement handled automatically each month.",
      "Lease preparation, renewals, and move-in/move-out inspections documented with photos.",
      "Annual property evaluations so small issues never turn into expensive surprises.",
      "Dedicated representative who answers the phone. No ticket queues, no call centers.",
    ],
    callLabel: "Call to hand off your rental",
  },
  {
    title: "Investor Services",
    image: images.serviceInvestor,
    lead:
      "We help you locate, acquire, stand up, and make cash-flow-positive your first or next rental property in the Jacksonville market.",
    bullets: [
      "Market analysis on target neighborhoods, rent comps, and realistic cap rates.",
      "Acquisition support through our real estate brokerage arm.",
      "Rehab scoping and contractor coordination to get the property rent-ready quickly.",
      "Day-one leasing, screening, and management once the property is yours.",
    ],
    callLabel: "Call to scope your next acquisition",
  },
  {
    title: "Tenant Placement & Screening",
    image: images.serviceTenant,
    lead:
      "The quality of your tenant determines the quality of your investment. We screen thoroughly and market aggressively to find the right fit fast.",
    bullets: [
      "Professional photos and listings syndicated across 20+ rental platforms.",
      "Comprehensive screening: credit, criminal, employment, income (3x rent), and landlord references.",
      "Most properties leased within 2 to 3 weeks of listing.",
      "Backed by our 3-Month Tenant Guarantee: if a placed tenant must be removed in 3 months, the next leasing fee is waived.",
    ],
    callLabel: "Call to get your property leased",
  },
  {
    title: "Maintenance & Renovations",
    image: images.serviceMaintenance,
    lead:
      "Full-spectrum maintenance with vetted local contractors and a 24/7 emergency line. Tenant-turn renovations handled end to end.",
    bullets: [
      "24/7 emergency line for real emergencies. Routine tickets resolved the next business day.",
      "Vetted network of licensed, insured Jacksonville contractors.",
      "No mark-up, ever. You pay exactly what the vendor charges. Period.",
      "Full turnover renovations: paint, flooring, punch list, and rent-ready prep.",
    ],
    callLabel: "Call to get a repair or turn handled",
  },
  {
    title: "Financial Reporting",
    image: images.serviceFinancial,
    lead:
      "Monthly owner statements with full transparency on every dollar in and out. Access anytime through the Owner Portal.",
    bullets: [
      "Detailed income, expense, and reserve reporting each month.",
      "Year-end tax packages delivered to your inbox.",
      "Live Owner Portal access on desktop and mobile, 24/7.",
      "Direct deposit owner disbursements on a predictable schedule.",
    ],
    callLabel: "Call to see a sample owner statement",
  },
];

function ServicesHero() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
      <Image
        src={images.heroBg}
        alt="Jacksonville Florida home exterior"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-navy/80" />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 py-24 text-center lg:py-28">
        <Image
          src={images.logo}
          alt="Lighthouse Property Management and Realty, LLC"
          width={200}
          height={66}
          priority
          className="mx-auto h-14 w-auto brightness-0 invert"
        />

        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          Our Services
        </p>
        <h1 className="mt-4 font-serif text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl text-balance">
          Leasing, screening, maintenance, renovations, and reporting. Under one roof.
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
          Full-service Jacksonville property management built for owners who
          want the returns of a rental property without running one. We handle
          the entire lifecycle so nothing falls through the cracks.
        </p>

        <div className="mt-10">
          <HeroCallButtons />
        </div>
      </div>

      <a
        href="#detail"
        aria-label="Scroll to services detail"
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

function ServicesDetail() {
  return (
    <section id="detail" className="bg-offwhite py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            What We Handle
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold text-navy lg:text-4xl text-balance">
            Every piece of the rental business, under one roof.
          </h2>
        </div>

        <div className="mt-16 space-y-20">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="grid items-center gap-10 lg:grid-cols-2"
            >
              <div
                className={`relative h-72 overflow-hidden rounded-xl lg:h-96 ${
                  i % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                  Service {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-serif text-2xl font-bold text-navy lg:text-3xl">
                  {s.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {s.lead}
                </p>
                <ul className="mt-6 space-y-3">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex gap-3 text-sm leading-relaxed text-navy/80"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-gold"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={PHONE_TEL}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy underline underline-offset-4 decoration-gold decoration-2 transition-colors hover:text-gold"
                >
                  <Phone className="h-4 w-4 text-gold" aria-hidden="true" />
                  {s.callLabel}: {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <main>
      <ServicesHero />
      <SocialProofBar />
      <ServicesDetail />
      <MeetTheTeam
        cta={<CallCTA />}
        image={images.teamBlakeChris}
        imageAlt="Blake and Chris from Lighthouse Property Management in Jacksonville, Florida"
      />
      <Testimonials cta={<CallCTA />} />
      <FAQ
        subtitle="Still have questions? Call us directly or schedule a time and we'll reach out within one business day."
        items={servicesFaqs}
        inlineCta={<InlineCallCTA />}
      />
      <BottomCallCTA />
      <Footer />
    </main>
  );
}
