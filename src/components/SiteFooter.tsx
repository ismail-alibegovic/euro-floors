import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { nav, secondaryNav, site } from "@/data/site";
import { FitText } from "./FitText";
import { LogoMark } from "./Logo";

/** Closing frame modelled on the reference: oversized word over fine rules, statement + CTA, dark photo, minimal bar. */
export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-ink">
      {/* oversized word over vertical hairlines */}
      <div className="relative border-b border-line pt-16 md:pt-24" aria-hidden="true">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgb(238_236_233/0.07)_0_1px,transparent_1px_6px)] [mask-image:linear-gradient(180deg,transparent_10%,#000_70%)]" />
        <div className="relative px-[1.2vw]" data-reveal="">
          <FitText text="Parketi – Laminati" estimate="10.8vw" className="giant -mb-[0.1em] pb-[0.04em]" />
        </div>
      </div>

      <div className="grid gap-8 px-[var(--gutter)] pb-14 pt-10 md:grid-cols-2 md:pb-20 md:pt-12 lg:px-[2.4%]">
        <p className="text-[clamp(2.2rem,4.2vw,4.6rem)] leading-[0.9] tracking-[-0.05em]" data-reveal="">
          Prostor počinje
          <br />
          ovdje.
        </p>
        <div className="flex flex-col gap-3 md:items-end md:text-right" data-reveal="">
          <p className="max-w-[32ch] text-[14px] leading-[1.45] text-bone/75 sm:text-[12px] sm:leading-[1.4]">
            Pošaljite mjere i ideju — predložit ćemo pod i pripremiti ponudu za materijal i ugradnju.
          </p>
          <Link href="/kontakt" className="mt-2 inline-flex min-h-12 w-full items-center justify-between gap-2 bg-bone px-5 text-[14px] text-ink transition-transform duration-150 active:scale-[0.98] sm:mt-0 sm:min-h-0 sm:w-fit sm:justify-start sm:bg-transparent sm:px-0 sm:py-2 sm:text-[11.5px] sm:text-bone hover:text-brass">
            Zatražite ponudu <ArrowUpRight size={15} strokeWidth={1} />
          </Link>
        </div>
      </div>

      {/* dark photographic band */}
      <div className="relative h-[46vh] min-h-[280px] overflow-hidden">
        <Image
          src="/images/photos/gal-slat-wall.jpg"
          alt=""
          fill
          sizes="100vw"
          quality={70}
          className="object-cover object-[50%_60%] brightness-[0.55] saturate-[0.8]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,#130e0a_0%,rgb(19_14_10/0.15)_40%,rgb(19_14_10/0.6)_100%)]" />
      </div>

      {/* contact strip */}
      <div className="grid gap-6 border-t border-line px-[var(--gutter)] py-8 text-[14px] text-bone/70 sm:text-[12px] sm:grid-cols-2 lg:grid-cols-4 lg:px-[2.4%]">
        <div>
          <p className="text-bone/40">Telefon</p>
          {site.phones.map((p) => (
            <a key={p.href} href={p.href} className="mr-4 inline-block py-1.5 hover:text-bone">{p.label}</a>
          ))}
        </div>
        <div>
          <p className="text-bone/40">E-mail</p>
          <a href={`mailto:${site.email}`} className="inline-block py-1.5 hover:text-bone">{site.email}</a>
        </div>
        <div>
          <p className="text-bone/40">Lokacija i radno vrijeme</p>
          <p className="py-1.5">{site.area}, {site.city} — {site.hoursShort.replace("  ", ", ")}</p>
        </div>
        <div className="flex flex-wrap gap-x-4 lg:justify-end">
          {secondaryNav.map((n) => (
            <Link key={n.href} href={n.href} className="py-1.5 hover:text-bone">{n.label}</Link>
          ))}
          <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 py-1.5 hover:text-bone">Facebook <ArrowUpRight aria-hidden="true" size={13} strokeWidth={1.25} /></a>
        </div>
      </div>

      {/* bottom bar, like the reference header */}
      <div className="flex items-center justify-between gap-6 border-t border-line px-[var(--gutter)] py-4 pb-[calc(1rem+var(--safe-bottom))] lg:px-[2.4%]">
        <Link href="/" aria-label="Euro-Floors, početna" className="py-1"><LogoMark className="h-9 w-auto" /></Link>
        <nav aria-label="Podnožje" className="hidden items-center text-[11.5px] text-bone/75 md:flex">
          {nav.map((n, i) => (
            <span key={n.href} className="flex items-center">
              {i > 0 && <span aria-hidden="true" className="mx-5 text-bone/25">/</span>}
              <Link href={n.href} className="py-2 hover:text-bone">{n.label}</Link>
            </span>
          ))}
        </nav>
        <p className="text-[11px] text-bone/45">© {year} Euro-Floors</p>
      </div>
    </footer>
  );
}
