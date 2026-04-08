import { Hero } from "@/components/hero";
import { SocialProofBar } from "@/components/social-proof-bar";
import { PainPoints } from "@/components/pain-points";
import { MeetTheTeam } from "@/components/meet-the-team";
import { Guarantees } from "@/components/guarantees";
import { Services } from "@/components/services";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";

export default function GetStarted() {
  return (
    <main>
      <Hero />
      <SocialProofBar />
      <Services />
      <PainPoints />
      <Guarantees />
      <MeetTheTeam />
      <Testimonials />
      <FAQ />
      <ContactForm />
      <Footer />
    </main>
  );
}
