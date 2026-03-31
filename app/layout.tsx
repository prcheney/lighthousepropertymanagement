import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
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
      <body className="font-sans antialiased">
        <Script id="gtm" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NCBGRSLP');
        `}</Script>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
