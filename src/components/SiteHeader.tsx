"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { nav, site, type SectionId } from "@/data/site";
import { unlockScroll } from "@/lib/scroll";
import { AnchorLink } from "./AnchorLink";
import { Logo } from "./Logo";

/** Which section is under the reading line — a thin IntersectionObserver band, no scroll listeners. */
function useActiveSection(): SectionId | null {
  const [active, setActive] = useState<SectionId | null>(null);
  useEffect(() => {
    const els = nav.map((n) => document.getElementById(n.id)).filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    const inBand = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) (e.isIntersecting ? inBand.add(e.target.id) : inBand.delete(e.target.id));
        // adjacent sections can both touch the band for a moment: prefer the later one in page order
        const hit = nav.filter((n) => inBand.has(n.id)).pop();
        if (hit) setActive(hit.id);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const btnRef = useRef<HTMLButtonElement>(null);
  const active = useActiveSection();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    // a desktop-width resize while the menu is open would leave the page locked
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      unlockScroll();
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  const close = () => {
    unlockScroll();
    setOpen(false);
  };
  const cur = (id: SectionId) => (active === id ? "location" : undefined);
  const primary = nav.filter((n) => n.id !== "kontakt");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 pt-[var(--safe-top)] transition-[background-color,border-color] duration-700 ${
        scrolled && !open ? "border-b border-line bg-ink/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <a
        href="#sadrzaj"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-bone focus:px-4 focus:py-2 focus:text-ink"
      >
        Preskoči na sadržaj
      </a>
      <div className="shell flex h-[var(--header-h)] items-center justify-between gap-6">
        <AnchorLink id="home" onNavigate={close} className="relative z-[61] py-3" aria-label="Euro-Floors, početna">
          <Logo />
        </AnchorLink>

        <nav aria-label="Glavna navigacija" className="hidden lg:block">
          <ul className="flex items-center text-[13px] text-bone/80">
            {primary.map((item, i) => (
              <li key={item.id} className="flex items-center">
                {i > 0 && <span aria-hidden="true" className="mx-4 text-bone/25 xl:mx-5">/</span>}
                <AnchorLink
                  id={item.id}
                  aria-current={cur(item.id)}
                  className={`py-3 transition-colors hover:text-bone ${active === item.id ? "text-brass" : ""}`}
                >
                  {item.label}
                </AnchorLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <AnchorLink
            id="kontakt"
            aria-current={cur("kontakt")}
            className={`link-arrow hidden text-[13px] lg:inline-flex ${active === "kontakt" ? "text-brass" : ""}`}
          >
            Kontakt <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.25} className="text-brass" />
          </AnchorLink>
          <button
            ref={btnRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Zatvori meni" : "Otvori meni"}
            className="relative z-[61] -mr-2 flex h-11 min-w-11 items-center justify-center gap-3 px-2 text-[13px] lg:hidden"
          >
            <span aria-hidden="true">{open ? "Zatvori" : "Meni"}</span>
            <span aria-hidden="true" className="relative block h-3 w-6">
              <span className={`absolute left-0 top-0 h-px w-6 bg-bone transition-transform duration-500 ${open ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`absolute bottom-0 left-0 h-px w-6 bg-bone transition-transform duration-500 ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Meni"
            className="fixed inset-0 z-[55] flex h-[100dvh] flex-col overflow-y-auto overscroll-contain bg-ink-2 pt-[calc(var(--header-h)+var(--safe-top))] lg:hidden"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduce ? 0 : 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Mobilna navigacija" className="shell flex flex-1 flex-col justify-center py-4">
              <ul className="border-t border-line">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.id}
                    className="border-b border-line"
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduce ? 0 : 0.25 + i * 0.05, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <AnchorLink
                      id={item.id}
                      onNavigate={close}
                      aria-current={cur(item.id)}
                      className={`flex min-h-14 items-baseline justify-between py-3 text-[clamp(1.7rem,8vw,3rem)] font-normal leading-none tracking-[-0.04em] ${active === item.id ? "text-brass" : ""}`}
                    >
                      {item.label}
                      <span aria-hidden="true" className="text-xs tracking-normal text-mute">0{i + 1}</span>
                    </AnchorLink>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="shell flex flex-wrap justify-between gap-4 pb-[calc(2rem+var(--safe-bottom))] text-[13px] text-mute">
              <a href={site.phones[0].href} className="py-2">{site.phones[0].label}</a>
              <a href={`mailto:${site.email}`} className="py-2">{site.email}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
