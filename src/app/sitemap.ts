import type { MetadataRoute } from "next";
import { categories, products } from "@/data/catalog";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const pages = ["", "/kolekcije", "/vizualizator", "/usluge", "/projekti", "/o-nama", "/vodic", "/kontakt"];
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    ...categories.map((c) => ({ url: `${base}/kolekcije/${c.slug}`, priority: 0.7 })),
    ...products.map((p) => ({ url: `${base}/kolekcije/${p.category}/${p.slug}`, priority: 0.6 })),
  ];
}
