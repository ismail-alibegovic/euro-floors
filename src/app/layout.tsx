import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SmoothScroll } from "@/components/SmoothScroll";
import { RevealObserver } from "@/components/RevealObserver";
import { site } from "@/data/site";

// Geist: neo-grotesk with a true Thin (100) for the oversized words and full latin-ext (č ć š ž đ).
const geist = Geist({
  subsets: ["latin", "latin-ext"],
  weight: ["100", "200", "300", "400", "500"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Euro-Floors — parketi i laminati, Sarajevo",
    template: "%s — Euro-Floors Sarajevo",
  },
  description:
    "Parketi Sarajevo: masivni parket, gotovi troslojni parket, egzotični parket i laminati. Ugradnja parketa u Sarajevu, brušenje, lakiranje i nabavka podnih obloga.",
  keywords: [
    "parketi Sarajevo",
    "ugradnja parketa Sarajevo",
    "masivni parket",
    "troslojni parket",
    "laminati",
    "podne obloge",
    "seljački pod",
    "egzotični parket",
  ],
  openGraph: {
    type: "website",
    locale: "bs_BA",
    siteName: "Euro-Floors",
    images: [{ url: "/images/visualizer/room-riblja-kost.jpg", width: 2400, height: 1300 }],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0b0906",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "Euro-Floors",
  url: site.url,
  email: site.email,
  telephone: ["+38761766663", "+38761904990"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sarajevo",
    addressRegion: "Velešići",
    addressCountry: "BA",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "18:00",
  },
  sameAs: [site.facebook],
  areaServed: "Sarajevo",
  description: "Prodaja i ugradnja parketa i laminata, brušenje, poliranje i lakiranje.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bs" className={geist.variable} suppressHydrationWarning>
      <head>
        <script
          // Marks JS as available so motion styles can hide-then-reveal. Without JS everything stays visible.
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="bg-ink text-bone">
        <SmoothScroll />
        <RevealObserver />
        <SiteHeader />
        <main id="sadrzaj">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
