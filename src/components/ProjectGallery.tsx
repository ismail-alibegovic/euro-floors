"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import type { GalleryItem } from "@/data/gallery";

type Cell =
  | { kind: "img"; item: number; soft?: boolean; ratio?: string }
  | { kind: "text"; text: ReactNode; arrow?: boolean }
  | { kind: "empty" };

/** Editorial 3-column grid mixing photographs, text cells and negative space, with a lightbox. */
export function ProjectGallery({ items, layout }: { items: GalleryItem[]; layout?: Cell[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const cells: Cell[] =
    layout ??
    [
      { kind: "text", text: "Inspiracija za prostore u kojima drvo nosi atmosferu — od klasične riblje kosti do širokih brodova.", arrow: true },
      { kind: "img", item: 0 },
      { kind: "img", item: 1, soft: true },
      { kind: "img", item: 2 },
      { kind: "img", item: 3 },
      { kind: "text", text: "Svijetao hrast širi prostor. Tamniji ton ga smiruje. Uzorak mu daje ritam.", arrow: true },
      { kind: "img", item: 6, soft: true },
      { kind: "text", text: "Kliknite na fotografiju za uvećani prikaz." },
      { kind: "img", item: 4 },
    ];

  const close = useCallback(() => {
    setOpen(null);
    requestAnimationFrame(() => lastTrigger.current?.focus());
  }, []);
  const go = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + items.length) % items.length)), [items.length]);

  useEffect(() => {
    if (open === null) return;
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
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, go]);

  return (
    <>
      <div className="grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
        {cells.map((c, i) => {
          if (c.kind === "empty") return <div key={i} className="hidden border-b border-r border-line lg:block" aria-hidden="true" />;
          if (c.kind === "text")
            return (
              <div key={i} className="flex min-h-[200px] flex-col justify-between border-b border-r border-line p-6 md:p-8">
                <p data-reveal="" className="max-w-[28ch] text-[14px] text-bone/75 sm:ml-auto sm:text-right">{c.text}</p>
                {c.arrow && <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1} className="mt-6 self-end text-bone/50" />}
              </div>
            );
          const it = items[c.item];
          return (
            <div key={i} className="border-b border-r border-line p-6 md:p-10">
              <button
                type="button"
                onClick={(e) => {
                  lastTrigger.current = e.currentTarget;
                  setOpen(c.item);
                }}
                className="group block w-full text-left"
                aria-label={`Uvećaj: ${it.title}`}
              >
                <span className="relative block aspect-square overflow-hidden" data-curtain="">
                  <Image
                    src={it.src}
                    alt={it.alt}
                    fill
                    sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw"
                    quality={70}
                    className={`object-cover transition-[transform,filter] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] ${c.soft ? "blur-[3px] group-hover:blur-0" : ""}`}
                  />
                </span>
                <span className="mt-3 flex justify-between gap-4 text-[12.5px]">
                  <span className="text-bone/80">{it.title}</span>
                  <span className="text-mute">Inspiracija</span>
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
