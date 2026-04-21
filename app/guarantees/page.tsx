import type { Metadata } from "next";
import Image from "next/image";
import { images } from "@/lib/image-urls";
import { HeroCallButtons, CallCTA, InlineCallCTA } from "@/components/call-cta";
import { SocialProofBar } from "@/components/social-proof-bar";
import { MeetTheTeam } from "@/components/meet-the-team";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";
import { BottomCallCTA } from "@/components/bottom-call-cta";
import { Footer } from "@/components/footer";
import {
  ChevronDown,
  Clock,
  DollarSign,
  Ban,
  Unlock,
  Scale,
  RefreshCw,
  PhoneCall,
  UserCheck,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our 9 Written Guarantees | Lighthouse Property Management & Realty",
  description:
    "Nine written property management guarantees. No upfront fees, no mark-ups, no lock-in, next business day response, and a 30-day satisfaction guarantee. All in your contract.",
};

const guaranteesFaqs = [
  {
    question: "Are these guarantees actually in the contract?",
    answer:
      "Yes. Every one of the nine guarantees is written into your management agreement. No asterisks, no hidden exceptions. If we don't deliver, you have recourse in writing.",
  },
  {
    question: "What happens if I'm not satisfied in the first 30 days?",
    answer:
      "Our 30-Day Satisfaction Guarantee means the next month of management is on us. You get a full month to course-correct, no questions asked.",
  },
  {
    question: "Do you really not mark up maintenance?",
    answer:
      "Correct. You pay exactly what the vendor charges, period. This is one of the most common places other managers quietly pad their income, and we refuse to do it.",
  },
  {
    question: "What if a placed tenant has to be removed early?",
    answer:
      "Our 3-Month Tenant Guarantee waives the next leasing fee if a tenant we placed must be removed within the first 90 days. We stand behind our screening.",
  },
  {
    question: "Is there really no long-term lock-in?",
    answer:
      "No lock-in and no cancellation penalties. We earn your business every month. If we stop delivering, you're free to leave without a fight.",
  },
  {
    question: "Are there any upfront or setup fees?",
    answer:
      "None. Zero out of pocket to start. You pay nothing until we're actively managing your property with a tenant in place.",
  },
];

const guarantees = [
  {
    icon: Clock,
    title: "Next Business Day Response",
    lead:
      "You will hear back from a real person the next business day. Every time.",
    body:
      "Most property management horror stories start with silence. An owner leaves a message and hears nothing for a week. A tenant reports a leak and no one follows up. We do not operate that way. Every inquiry gets a response the next business day, and your dedicated representative is accountable for it. No black holes.",
  },
  {
    icon: UserCheck,
    title: "Dedicated Representative",
    lead:
      "One named point of contact who knows your property and your priorities.",
    body:
      "You will not be routed through a call center or a ticket queue. From day one you have a direct line to the same person, who knows your home, your tenant, your goals, and your preferences. Consistency is what makes the relationship actually work.",
  },
  {
    icon: PhoneCall,
    title: "24/7 Emergency Call Line",
    lead:
      "Real emergencies do not wait for business hours. Neither do we.",
    body:
      "Burst pipes, HVAC failures in August, lockouts, storm damage: these cannot sit in an inbox overnight. Our after-hours line routes directly to someone who can dispatch a vendor immediately, protect your property, and keep your tenant safe.",
  },
  {
    icon: Ban,
    title: "No Upfront Fees",
    lead:
      "Zero out of pocket to start. You pay nothing until we are actively managing.",
    body:
      "We do not charge setup fees, onboarding fees, or any other creative pre-management charges. If we never place a tenant, you never pay us. We only earn when your property is working for you.",
  },
  {
    icon: ShieldCheck,
    title: "No Mark-Up Guarantee",
    lead:
      "You pay exactly what the vendor charges. Ever. Period.",
    body:
      "Hidden maintenance mark-ups are one of the most common ways property managers quietly inflate their own income at owner expense. We do not mark up vendor invoices, parts, or labor. Ever. You see the invoice, you pay the invoice. That is it.",
  },
  {
    icon: Scale,
    title: "Fair Price Guarantee",
    lead:
      "Find a lower management fee in writing and we will match it.",
    body:
      "As long as the competing quote is apples to apples and does not bury costs in hidden line items, we will match it. We are confident in the value we deliver, and we would rather earn your business on pricing than lose it on a misunderstanding.",
  },
  {
    icon: Unlock,
    title: "No-Hassle Cancellation",
    lead:
      "Cancel anytime, no penalties, no long-term lock-in.",
    body:
      "We earn your business every single month. If we are not delivering, you should not be trapped in a contract. That is why we offer straightforward cancellation terms with no punitive fees. Our job is to keep earning the relationship.",
  },
  {
    icon: DollarSign,
    title: "30-Day Satisfaction Guarantee",
    lead:
      "Not happy after the first 30 days? The next month of management is on us.",
    body:
      "The first 30 days tells you almost everything you need to know about how a property manager will handle your home. If we have not earned your confidence in that window, we make it right by handling the next month at no cost while we course-correct.",
  },
  {
    icon: RefreshCw,
    title: "3-Month Tenant Guarantee",
    lead:
      "If a placed tenant must be removed within 3 months, we waive the next leasing fee.",
    body:
      "Our screening is thorough because we stand behind it. If a tenant we placed has to be removed within the first 90 days, we re-lease the property and waive the next leasing fee entirely. You are not paying twice for our screening miss.",
  },
];

function GuaranteesHero() {
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
          9 Written Guarantees
        </p>
        <h1 className="mt-4 font-serif text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl text-balance">
          {"We don't just promise it. We put it in writing."}
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
          Nine enforceable commitments written into every management agreement:
          no upfront fees, no mark-ups, no lock-in, a dedicated rep, a 24/7
          emergency line, and a 30-day satisfaction guarantee. No asterisks, no
          fine print.
        </p>

        <div className="mt-10">
          <HeroCallButtons />
        </div>
      </div>

      <a
        href="#detail"
        aria-label="Scroll to guarantees detail"
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

function GuaranteesDetail() {
  return (
    <section
      id="detail"
      className="relative overflow-hidden bg-navy py-20 lg:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 20px, #C9A84C 20px, #C9A84C 21px)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Every Guarantee, In Detail
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold text-white lg:text-4xl text-balance">
            What each guarantee actually means for you.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/60">
            These are the commitments that show up in your management contract.
            Every one is enforceable, in writing.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {guarantees.map((g, i) => {
            const Icon = g.icon;
            return (
              <div
                key={i}
                className="group relative rounded-xl border border-gold/20 bg-navy px-6 py-8 text-white transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-xl"
              >
                <div className="flex flex-col items-center text-center">
                  <Icon className="h-7 w-7 text-gold" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-bold leading-tight text-white">
                    {g.title}
                  </h3>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-gold/90">
                    {g.lead}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    {g.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function GuaranteesPage() {
  return (
    <main>
      <GuaranteesHero />
      <SocialProofBar />
      <GuaranteesDetail />
      <MeetTheTeam
        cta={<CallCTA />}
        image={images.teamBlakeChris}
        imageAlt="Blake and Chris from Lighthouse Property Management in Jacksonville, Florida"
      />
      <Testimonials cta={<CallCTA />} />
      <FAQ
        subtitle="Still have questions? Call us directly or schedule a time and we'll reach out within one business day."
        items={guaranteesFaqs}
        inlineCta={<InlineCallCTA />}
      />
      <BottomCallCTA />
      <Footer />
    </main>
  );
}
