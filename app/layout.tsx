import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Lighthouse Property Management & Realty | Jacksonville Property Management",
  description:
    "Locally-owned property management in Jacksonville, FL. 7 written guarantees, no hidden fees. Residential management, vacation rentals, and investor services. Get your free rental analysis today.",
  keywords: [
    "property management Jacksonville FL",
    "Jacksonville property manager",
    "rental management Florida",
    "Lighthouse Property Management & Realty",
    "vacation rental management Jacksonville",
  ],
};

export const viewport: Viewport = {
  themeColor: "#0D1F2D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">{children}<Analytics /></body>
    </html>
  );
}
