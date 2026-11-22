"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { categories, products, type CategorySlug } from "@/data/catalog";
import { getPreset } from "@/data/visualizer";

/**
 * Small shared state for the one-page site. Sections used to be separate routes that passed data through
 * the URL (?pod=…, ?kategorija=…); on a single page they hand it over through this context instead.
 * Every request carries a counter `n` so repeating the same request (e.g. picking the same floor again) still fires.
 */
type CatalogReq = { category: CategorySlug | "sve"; q: string; n: number };
type QuoteReq = { preset?: string; type?: string; product?: string; n: number };
type VizReq = { id: string; n: number };

type Ctx = {
  catalog: CatalogReq | null;
  filterCatalog: (f: { category?: CategorySlug | "sve"; q?: string }) => void;
  viz: VizReq | null;
  showPreset: (id: string) => void;
  quote: QuoteReq | null;
  prefillQuote: (q: { preset?: string; type?: string; product?: string }) => void;
  productSlug: string | null;
  openProduct: (slug: string) => void;
  closeProduct: () => void;
};

const SiteStateContext = createContext<Ctx | null>(null);

export function useSiteState() {
  const c = useContext(SiteStateContext);
  if (!c) throw new Error("useSiteState must be used inside <SiteStateProvider>");
  return c;
}

export function SiteStateProvider({ children }: { children: ReactNode }) {
  const [catalog, setCatalog] = useState<CatalogReq | null>(null);
  const [viz, setViz] = useState<VizReq | null>(null);
  const [quote, setQuote] = useState<QuoteReq | null>(null);
  const [productSlug, setProductSlug] = useState<string | null>(null);

  const filterCatalog = useCallback(
    (f: { category?: CategorySlug | "sve"; q?: string }) =>
      setCatalog((c) => ({ category: f.category ?? "sve", q: f.q ?? "", n: (c?.n ?? 0) + 1 })),
    [],
  );
  const showPreset = useCallback((id: string) => setViz((v) => ({ id, n: (v?.n ?? 0) + 1 })), []);
  const prefillQuote = useCallback(
    (q: { preset?: string; type?: string; product?: string }) => setQuote((c) => ({ ...q, n: (c?.n ?? 0) + 1 })),
    [],
  );
  const openProduct = useCallback((slug: string) => setProductSlug(slug), []);
  const closeProduct = useCallback(() => setProductSlug(null), []);

  // Legacy deep links (/vizualizator?pod=…, /kontakt?kategorija=…, /kolekcije?q=…) are redirected to
  // "/?…#section"; read them once on arrival and hand them to the matching section.
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const hash = window.location.hash;
    const pod = sp.get("pod");
    const kat = sp.get("kategorija");
    const proizvod = sp.get("proizvod");
    const q = sp.get("q");
    const validCat = categories.some((c) => c.slug === kat) ? (kat as CategorySlug) : undefined;
    if (hash === "#vizualizator" && getPreset(pod)) showPreset(pod!);
    else if (hash === "#kontakt") {
      const product = proizvod && products.some((p) => p.name === proizvod) ? proizvod : undefined;
      if (pod || kat || product) prefillQuote({ preset: getPreset(pod)?.id, type: validCat, product });
    } else if (hash === "#kolekcije" || hash === "#katalog") {
      if (validCat || q) filterCatalog({ category: validCat, q: q?.slice(0, 80) });
    }
  }, [showPreset, prefillQuote, filterCatalog]);

  const value = useMemo<Ctx>(
    () => ({ catalog, filterCatalog, viz, showPreset, quote, prefillQuote, productSlug, openProduct, closeProduct }),
    [catalog, filterCatalog, viz, showPreset, quote, prefillQuote, productSlug, openProduct, closeProduct],
  );
  return <SiteStateContext.Provider value={value}>{children}</SiteStateContext.Provider>;
}
