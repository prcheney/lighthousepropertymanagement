import { AdsHero } from "@/components/ads-hero";
import { SocialProofBar } from "@/components/social-proof-bar";
import { PainPoints } from "@/components/pain-points";
import { MeetTheTeam } from "@/components/meet-the-team";
import { Guarantees } from "@/components/guarantees";
import { Services } from "@/components/services";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";
import { CallCTA, InlineCallCTA } from "@/components/call-cta";
import { BottomCallCTA } from "@/components/bottom-call-cta";
import { Footer } from "@/components/footer";
import { images } from "@/lib/image-urls";

const homeFaqs = [
  {
    question: "How do I get the highest rent for my home?",
    answer:
      "We perform a detailed rental analysis using real-time market data for your specific neighborhood, property type, and condition. We price strategically to attract quality tenants fast without leaving money on the table.",
  },
  {
    question: "How long is it going to take to rent my property?",
    answer:
      "Most of our properties are leased within two to three weeks of listing. We achieve this through professional photography, aggressive multi-platform marketing, and a proven showing process.",
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

export default function Home() {
  return (
    <main>
      <AdsHero />
      <SocialProofBar />
      <Services cta={<CallCTA />} />
      <PainPoints cta={<CallCTA tone="onDark" align="start" />} />
      <Guarantees cta={<CallCTA />} />
      <MeetTheTeam
        cta={<CallCTA />}
        image={images.teamBlakeChris}
        imageAlt="Blake and Chris from Lighthouse Property Management in Jacksonville, Florida"
      />
      <Testimonials cta={<CallCTA />} />
      <FAQ
        subtitle="Still have questions? Call us directly or schedule a time and we'll reach out within one business day."
        items={homeFaqs}
        inlineCta={<InlineCallCTA />}
      />
      <BottomCallCTA />
      <Footer />
    </main>
  );
}
