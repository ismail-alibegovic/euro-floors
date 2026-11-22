"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, Phone, X } from "lucide-react";
import { categories, products } from "@/data/catalog";
import { site } from "@/data/site";
import { scrollToId, unlockScroll } from "@/lib/scroll";
import { ProductGallery } from "./ProductGallery";
import { useSiteState } from "./SiteState";

/**
 * Product details without leaving the page: a native <dialog> (focus trap, Esc, inert background and
 * focus return come from the platform). The standalone /kolekcije/[kategorija]/[proizvod] pages remain
 * for direct links and search engines.
 */
export function ProductDialog() {
  const { productSlug, closeProduct, prefillQuote } = useSiteState();
  const ref = useRef<HTMLDialogElement>(null);
  const product = products.find((p) => p.slug === productSlug);
  const category = categories.find((c) => c.slug === product?.category);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (product && !d.open) {
      d.showModal();
      document.documentElement.style.overflow = "hidden";
      d.scrollTop = 0;
    } else if (!product && d.open) {
      d.close();
    }
    return () => unlockScroll();
  }, [product]);

  const requestQuote = () => {
    if (!product) return;
    prefillQuote({ type: product.category, product: product.name });
    closeProduct();
    unlockScroll();
    requestAnimationFrame(() => scrollToId("kontakt"));
  };

  return (
    <dialog
      ref={ref}
      aria-labelledby="product-dialog-title"
      onClose={() => closeProduct()}
      onClick={(e) => e.target === ref.current && closeProduct()}
      className="fixed inset-0 m-auto h-[100dvh] max-h-[100dvh] w-full max-w-[1180px] overflow-y-auto overscroll-contain border border-line bg-ink-2 p-0 text-bone backdrop:bg-ink/85 backdrop:backdrop-blur-sm sm:h-auto sm:max-h-[92dvh]"
    >
      {product && category && (
        <div className="relative">
          <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-ink-2/95 px-4 py-2 backdrop-blur-md sm:px-8">
            <p className="kicker truncate">{category.name}</p>
            <button
              type="button"
              onClick={() => closeProduct()}
              className="-mr-2 flex h-11 items-center gap-2 px-2 text-[13px] text-bone/80 hover:text-bone"
              aria-label="Zatvori detalje proizvoda"
            >
              Zatvori <X aria-hidden="true" size={18} strokeWidth={1.25} />
            </button>
          </div>

          <div className="grid gap-8 px-4 py-6 sm:px-8 sm:py-8 lg:grid-cols-12 lg:gap-12">
            <div className="min-w-0 lg:col-span-7">
              <ProductGallery key={product.slug} images={product.images} />
            </div>
            <div className="lg:col-span-5">
              <h3 id="product-dialog-title" className="text-[clamp(1.9rem,3.2vw,3rem)] font-normal leading-[0.98] tracking-[-0.04em]">
                {product.name}
              </h3>
              <div className="mt-5 space-y-3 text-[15px] leading-relaxed text-bone/80">
                {product.description.map((d, i) => <p key={i}>{d}</p>)}
              </div>

              <h4 className="kicker mt-8">Specifikacije</h4>
              <dl className="mt-3 border-t border-line text-[14px]">
                {product.specs.map((s) => (
                  <div key={s.label} className="grid grid-cols-[8rem_1fr] gap-4 border-b border-line py-3">
                    <dt className="text-mute">{s.label}</dt>
                    <dd>{s.value}</dd>
                  </div>
                ))}
              </dl>
              {product.finishes && (
                <>
                  <h4 className="kicker mt-8">Dostupne završne obrade</h4>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {product.finishes.map((f) => <li key={f} className="border border-line px-3 py-1.5 text-[13px] text-bone/80">{f}</li>)}
                  </ul>
                </>
              )}
              <p className="caption mt-5">Navedeni su samo podaci koje objavljujemo u ponudi. Dimenzije, proizvođača i cijenu potvrđujemo uz ponudu.</p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href={`/?kategorija=${category.slug}&proizvod=${encodeURIComponent(product.name)}#kontakt`} onClick={(e) => { e.preventDefault(); requestQuote(); }} className="btn btn-solid flex-1">
                  Pošaljite upit <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.25} />
                </a>
                <a href={site.phones[0].href} className="btn">
                  <Phone aria-hidden="true" size={16} strokeWidth={1.25} /> {site.phones[0].label}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
