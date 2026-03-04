"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { images } from "@/lib/image-urls";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Guarantees", href: "#guarantees" },
  { label: "Our Team", href: "#why-us" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <Image
            src={images.logo}
            alt="Lighthouse Property Management and Realty, LLC"
            width={180}
            height={60}
            priority
            className={`h-12 w-auto transition-all duration-300 ${
              scrolled ? "" : "brightness-0 invert"
            }`}
          />
        </a>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:text-gold ${
                scrolled ? "text-navy" : "text-white/90"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-navy transition-all duration-300 hover:bg-gold/90 hover:shadow-lg"
          >
            Get Free Rental Report
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden transition-colors duration-300 ${
            scrolled ? "text-navy" : "text-white"
          }`}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-warmgray bg-white px-6 pb-6 pt-4 lg:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium text-navy hover:text-gold"
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:9043741289"
              className="flex items-center gap-2 text-base font-medium text-navy"
            >
              <Phone className="h-4 w-4" />
              (904) 374-1289
            </a>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-full bg-gold px-6 py-3 text-center text-sm font-semibold text-navy"
            >
              Get Free Rental Report
            </a>
          </div>
        </div>
      )}
    </header>
  );
}


