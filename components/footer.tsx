import Image from "next/image";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { images } from "@/lib/image-urls";

const quickLinks = [
  { label: "Free Rental Report", href: "#contact" },
  { label: "Our Services", href: "#services" },
  { label: "Our Guarantees", href: "#guarantees" },
  { label: "FAQ", href: "#faq" },
];

const portalLinks = [
  { label: "Owner Portal", href: "https://www.jaxpm.com/owners/resources/owner-portal/" },
  { label: "Tenant Portal", href: "https://www.jaxpm.com/tenants/tenant-login/" },
  { label: "Find a Rental", href: "https://www.jaxpm.com/search-for-rentals/" },
];

export function Footer() {
  return (
    <footer className="bg-navy">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Logo + Tagline */}
          <div>
            <Image
              src={images.logo}
              alt="Lighthouse Property Management and Realty, LLC"
              width={180}
              height={60}
              className="h-14 w-auto brightness-0 invert"
            />
            <p className="mt-4 text-sm leading-relaxed text-white/50">
              {"Jacksonville's property management company with a guarantee for everything."}
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gold">
              Quick Links
            </h4>
            <nav className="mt-4 flex flex-col gap-3" aria-label="Footer navigation">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/60 transition-colors hover:text-gold"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Col 3: Portals */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gold">
              Portals
            </h4>
            <nav className="mt-4 flex flex-col gap-3" aria-label="Portal links">
              {portalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-gold"
                >
                  {link.label}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ))}
            </nav>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gold">
              Contact
            </h4>
            <div className="mt-4 flex flex-col gap-3">
              <a
                href="tel:9043741289"
                className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-gold"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                (904) 374-1289
              </a>
              <a
                href="mailto:customerservice@jaxpm.com"
                className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-gold"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                customerservice@jaxpm.com
              </a>
              <div className="flex items-start gap-2 text-sm text-white/60">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>3018 Alvarado Ave.<br />Jacksonville, FL 32217</span>
              </div>
              <p className="mt-1 text-xs text-white/40">
                Mon - Fri: 9:00am - 5:00pm
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-white/40 sm:flex-row lg:px-8">
          <span>
{"© 2026 Lighthouse Property Management & Realty, LLC"}
          </span>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-white/60">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-white/60">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
