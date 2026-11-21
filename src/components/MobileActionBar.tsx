"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Phone } from "lucide-react";
import { site } from "@/data/site";

/**
 * Phones only: a bottom action bar (call / request a quote) that slides in once the visitor
 * scrolls past the first screen — the two things people actually do on this site from a phone.
 * Hidden on the contact page, where the form is already the whole page.
 */
export function MobileActionBar() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const on = () => {
      const nearEnd = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 160;
      setShow(window.scrollY > window.innerHeight * 0.6 && !nearEnd);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, [pathname]);

  if (pathname.startsWith("/kontakt")) return null;

  return (
    <div
      aria-hidden={!show}
      inert={!show}
      className={`fixed inset-x-0 bottom-0 z-40 px-3 pb-[calc(0.75rem+var(--safe-bottom))] transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[120%] opacity-0"
      }`}
    >
      <div className="mx-auto flex max-w-[520px] gap-2 border border-line-strong bg-ink/85 p-1.5 shadow-[0_20px_50px_-12px_rgb(0_0_0/0.8)] backdrop-blur-md">
        <a
          href={site.phones[0].href}
          className="flex h-12 flex-1 items-center justify-center gap-2 text-[14px] text-bone transition-[transform,background-color] duration-150 active:scale-[0.97] active:bg-ink-3"
        >
          <Phone aria-hidden="true" size={16} strokeWidth={1.25} className="text-brass" />
          Pozovite
        </a>
        <Link
          href="/kontakt"
          className="flex h-12 flex-[1.4] items-center justify-center gap-2 bg-bone text-[14px] text-ink transition-[transform,background-color] duration-150 active:scale-[0.97] active:bg-brass"
        >
          Zatražite ponudu
          <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.5} />
        </Link>
      </div>
    </div>
  );
}
