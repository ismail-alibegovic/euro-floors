import type { MetadataRoute } from "next";
import { products } from "@/data/catalog";
import { site } from "@/data/site";

/**
 * The site is one page (sections are anchors, which sitemaps do not list), so the home page is the
 * main entry. Product detail pages stay as standalone URLs for direct links and search engines.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...products.map((p) => ({ url: `${site.url}/kolekcije/${p.category}/${p.slug}`, priority: 0.6 })),
  ];
}
