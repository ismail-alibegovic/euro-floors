"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { nav, site } from "@/data/site";
import { Logo } from "./Logo";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    window.__lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.__lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

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
      <div className="shell grid h-[var(--header-h)] grid-cols-[1fr_auto] items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
        <Link href="/" className="relative z-[61] w-fit py-3" aria-label="Euro-Floors, početna">
          <Logo />
        </Link>

        <nav aria-label="Glavna navigacija" className="hidden lg:block">
          <ul className="flex items-center text-[12px] text-bone/85">
            {nav.map((item, i) => (
              <li key={item.href} className="flex items-center">
                {i > 0 && <span aria-hidden="true" className="mx-[clamp(1.25rem,2.6vw,2.75rem)] text-bone/30">/</span>}
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`py-3 transition-colors hover:text-brass ${isActive(item.href) ? "text-brass" : ""}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-3">
          <Link href="/kontakt" className="group hidden items-center gap-3 py-3 text-[12px] lg:inline-flex">
            Kontakt
            <ArrowUpRight size={20} strokeWidth={1} className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brass" />
          </Link>
          <button
            ref={btnRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="relative z-[61] -mr-2 flex h-11 min-w-11 items-center justify-center gap-3 px-2 text-[12px] lg:hidden"
          >
            <span>{open ? "Zatvori" : "Meni"}</span>
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
            <nav aria-label="Mobilna navigacija" className="shell flex flex-1 flex-col justify-center">
              <ul className="border-t border-line">
                {[...nav, { href: "/kontakt", label: "Kontakt" }].map((item, i) => (
                  <motion.li
                    key={item.href}
                    className="border-b border-line"
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduce ? 0 : 0.25 + i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="flex items-baseline justify-between py-4 text-[clamp(2rem,9vw,3.4rem)] font-normal leading-none tracking-[-0.04em]"
                    >
                      {item.label}
                      <span className="text-xs tracking-normal text-mute">0{i + 1}</span>
                    </Link>
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
