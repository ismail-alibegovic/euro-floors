"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import type { GalleryItem } from "@/data/gallery";

type Cell =
  | { kind: "img"; item: number; soft?: boolean; ratio?: string }
  | { kind: "text"; text: ReactNode; arrow?: boolean; align?: "left" | "right"; href?: string }
  | { kind: "empty" };

/**
 * The reference's 3×3 ruled grid: square cells holding either a short text (arrow in the corner)
 * or a soft-focus photograph with feathered edges that sharpens on hover. Opens a lightbox.
 */
export function ProjectGallery({ items, layout }: { items: GalleryItem[]; layout?: Cell[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const cells: Cell[] =
    layout ??
    [
      { kind: "text", text: "Inspiracija za prostore u kojima drvo nosi atmosferu — od klasične riblje kosti do širokih brodova.", arrow: true, align: "right", href: "/projekti" },
      { kind: "img", item: 0 },
      { kind: "img", item: 1 },
      { kind: "img", item: 2 },
      { kind: "img", item: 6 },
      { kind: "text", text: "Svijetao hrast širi prostor, tamniji ton ga smiruje, a uzorak mu daje ritam.", arrow: true, href: "/kolekcije" },
      { kind: "img", item: 4 },
      { kind: "text", text: "Od stana do kuće — pogledajte kako drvo mijenja prostor, pa isprobajte pod u vizualizatoru.", arrow: true, href: "/vizualizator" },
      { kind: "img", item: 7 },
    ];

  const close = useCallback(() => {
    setOpen(null);
    requestAnimationFrame(() => lastTrigger.current?.focus());
  }, []);
  const go = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + items.length) % items.length)), [items.length]);

  useEffect(() => {
    if (open === null) return;
    window.__lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Tab") {
        // minimal focus trap
        const root = document.getElementById("lightbox");
        const f = root?.querySelectorAll<HTMLElement>("button");
        if (!f || !f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.__lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, go]);

  return (
    <>
      <div className="grid grid-cols-2 border-l border-t border-line lg:grid-cols-3">
        {cells.map((c, i) => {
          // Phones use 2 columns with text cells full width; an image left alone in its row spans both.
          let col = 0;
          for (let k = 0; k < i; k++) col = cells[k].kind === "text" ? 0 : (col + 1) % 2;
          const next = cells[i + 1];
          const lone = c.kind === "img" && col === 0 && (!next || next.kind === "text");
          if (c.kind === "empty") return <div key={i} className="hidden border-b border-r border-line lg:block" aria-hidden="true" />;
          if (c.kind === "text") {
            const right = c.align === "right";
            const arrow = c.arrow && (
              <ArrowUpRight
                aria-hidden="true"
                size={18}
                strokeWidth={1}
                className={`text-brass transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${right ? "self-end" : "self-start"}`}
              />
            );
            const inner = (
              <>
                <p data-reveal="" className={`max-w-[27ch] text-[12.5px] leading-[1.42] text-bone/85 ${right ? "self-end text-right" : ""}`}>{c.text}</p>
                {arrow}
              </>
            );
            const cls = "group col-span-2 flex min-h-[150px] flex-col justify-between gap-8 border-b border-r border-line p-[clamp(1.25rem,3vw,2.6rem)] sm:col-span-1 sm:aspect-square sm:min-h-0";
            return c.href ? (
              <Link key={i} href={c.href} className={cls}>{inner}</Link>
            ) : (
              <div key={i} className={cls}>{inner}</div>
            );
          }
          const it = items[c.item];
          return (
            <div key={i} className={`flex items-center justify-center border-b border-r border-line p-3 sm:aspect-square md:p-[12.5%] ${lone ? "max-sm:col-span-2" : ""}`}>
              <button
                type="button"
                onClick={(e) => {
                  lastTrigger.current = e.currentTarget;
                  setOpen(c.item);
                }}
                className="group block w-full"
                aria-label={`Uvećaj: ${it.title}`}
              >
                <span className={`soft-media block w-full ${lone ? "aspect-[4/3] sm:aspect-square" : "aspect-square"}`} data-curtain="" style={{ ["--soft" as string]: c.soft ? "4px" : "2.5px" }}>
                  <span className="soft-glow">
                    <Image src={it.src} alt="" fill sizes="(min-width:1024px) 25vw, (min-width:640px) 37vw, 75vw" quality={70} className="object-cover" />
                  </span>
                  <span className="soft-main">
                    <Image src={it.src} alt={it.alt} fill sizes="(min-width:1024px) 25vw, (min-width:640px) 37vw, 75vw" quality={70} className="object-cover" />
                  </span>
                </span>
              </button>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            id="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={items[open].title}
            className="fixed inset-0 z-[90] flex h-[100dvh] flex-col overscroll-contain bg-ink/96 pb-[var(--safe-bottom)] pt-[var(--safe-top)] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.35 }}
          >
            <div className="shell flex h-[var(--header-h)] items-center justify-between">
              <span className="caption">{open + 1} / {items.length} — ilustrativna fotografija</span>
              <button ref={closeRef} type="button" onClick={close} className="flex h-11 w-11 items-center justify-center border border-line-strong hover:border-bone" aria-label="Zatvori">
                <X size={18} strokeWidth={1.25} />
              </button>
            </div>
            <div className="relative mx-auto w-full flex-1 px-4 md:px-20" onClick={(e) => e.target === e.currentTarget && close()}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={open}
                  className="relative h-full w-full"
                  initial={reduce ? false : { opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image src={items[open].src} alt={items[open].alt} fill sizes="100vw" quality={82} className="object-contain" />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="shell flex items-center justify-between gap-4 py-5">
              <div>
                <p className="text-[clamp(1.1rem,2vw,1.6rem)] font-normal tracking-[-0.02em]">{items[open].title}</p>
                <p className="caption">{items[open].caption}</p>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => go(-1)} aria-label="Prethodna fotografija" className="flex h-11 w-11 items-center justify-center border border-line-strong hover:border-bone">
                  <ArrowLeft size={18} strokeWidth={1.25} />
                </button>
                <button type="button" onClick={() => go(1)} aria-label="Sljedeća fotografija" className="flex h-11 w-11 items-center justify-center border border-line-strong hover:border-bone">
                  <ArrowRight size={18} strokeWidth={1.25} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
