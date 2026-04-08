import { AdsHero } from "@/components/ads-hero";
import { SocialProofBar } from "@/components/social-proof-bar";
import { PainPoints } from "@/components/pain-points";
import { MeetTheTeam } from "@/components/meet-the-team";
import { Guarantees } from "@/components/guarantees";
import { Services } from "@/components/services";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";
import { AdsContactForm } from "@/components/ads-contact-form";
import { Footer } from "@/components/footer";

export default function GetStarted() {
  return (
    <main>
      <AdsHero />
      <SocialProofBar />
      <Services />
      <PainPoints />
      <Guarantees />
      <MeetTheTeam />
      <Testimonials />
      <FAQ />
      <AdsContactForm />
      <Footer />
    </main>
  );
}
