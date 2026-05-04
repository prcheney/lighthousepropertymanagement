import { FBHero } from "@/components/fb-hero";
import { SocialProofBar } from "@/components/social-proof-bar";
import { PainPoints } from "@/components/pain-points";
import { MeetTheTeam } from "@/components/meet-the-team";
import { Guarantees } from "@/components/guarantees";
import { Services } from "@/components/services";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";
import { FBContactForm } from "@/components/fb-contact-form";
import { Footer } from "@/components/footer";
import { images } from "@/lib/image-urls";

export const metadata = {
  robots: { index: false, follow: false },
};

export default function FBPropertyReport() {
  return (
    <main>
      <FBHero />
      <SocialProofBar />
      <Services ctaText="Get Your Free Rental Report" />
      <PainPoints />
      <Guarantees />
      <MeetTheTeam
        image={images.teamBlakeChris}
        imageAlt="Blake and Chris from Lighthouse Property Management in Jacksonville, Florida"
      />
      <Testimonials ctaText="Get Your Free Rental Report" />
      <FAQ />
      <FBContactForm />
      <Footer />
    </main>
  );
}
