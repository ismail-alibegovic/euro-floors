import type { NextConfig } from "next";

/**
 * The site is a single page. Former top-level routes redirect to their section anchor, so old links and
 * search results keep working (query strings such as ?pod=… are passed through and read by the page).
 * Product detail pages (/kolekcije/[kategorija]/[proizvod]) are kept as standalone URLs.
 */
const sections = [
  ["/kolekcije", "/#kolekcije"],
  ["/vizualizator", "/#vizualizator"],
  ["/usluge", "/#usluge"],
  ["/projekti", "/#projekti"],
  ["/o-nama", "/#o-nama"],
  ["/vodic", "/#vodic"],
  ["/kontakt", "/#kontakt"],
] as const;

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 828, 1080, 1440, 1920, 2400],
    qualities: [70, 75, 82],
  },
  poweredByHeader: false,
  async redirects() {
    return [
      ...sections.map(([source, destination]) => ({ source, destination, permanent: true })),
      { source: "/kolekcije/:kategorija", destination: "/?kategorija=:kategorija#kolekcije", permanent: true },
    ];
  },
};

export default nextConfig;
