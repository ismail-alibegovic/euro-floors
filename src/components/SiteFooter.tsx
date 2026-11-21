import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { nav, secondaryNav, site } from "@/data/site";
import { SplitText } from "./SplitText";
import { FitText } from "./FitText";
import { LogoMark } from "./Logo";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="grain relative isolate overflow-hidden border-t border-line bg-ink">
      <Image
        src="/images/photos/macro-dark-herringbone.jpg"
        alt=""
        fill
        sizes="100vw"
        quality={70}
        className="-z-10 object-cover object-bottom opacity-[0.16]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-ink/80 to-ink/40" />

      {/* Oversized closing word over fine vertical lines, like the reference's HARMONIZED */}
      <div className="relative border-b border-line pt-20 md:pt-28" aria-hidden="true">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgb(238_236_233/0.05)_0_1px,transparent_1px_7px)] [mask-image:linear-gradient(180deg,transparent,#000_55%)]" />
        <div className="shell relative" data-reveal="">
          <FitText text="Bezvremenski" estimate="12.8vw" className="giant -mb-[0.12em] pb-[0.02em]" />
        </div>
      </div>

      <div className="shell pt-16 md:pt-24">
        <div className="grid gap-12 md:grid-cols-12">
          <SplitText
            as="p"
            lines={["Prostor počinje", "ovdje."]}
            className="headline-xl md:col-span-7"
          />
          <div className="flex flex-col justify-end gap-6 md:col-span-4 md:col-start-9 md:items-end md:text-right" data-reveal="">
            <p className="max-w-sm text-[13px] text-bone/75">
              Pošaljite nam mjere i ideju. Odgovaramo s prijedlogom poda i ponudom za materijal i ugradnju.
            </p>
            <Link href="/kontakt" className="link-arrow w-fit text-[13px]">
              Zatražite ponudu <ArrowUpRight size={15} strokeWidth={1.25} className="text-brass" />
            </Link>
          </div>
        </div>

        <div data-line="" className="mt-20 h-px w-full bg-line-strong" />

        <div className="grid gap-10 py-14 text-[14px] sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="kicker mb-4">Navigacija</p>
            <ul className="space-y-1.5">
              {[{ href: "/", label: "Početna" }, ...nav].map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="inline-block py-2 text-bone/80 hover:text-bone">{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="kicker mb-4">Više</p>
            <ul className="space-y-1.5">
              {secondaryNav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="inline-block py-2 text-bone/80 hover:text-bone">{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="kicker mb-4">Kontakt</p>
            <ul className="space-y-1.5 text-bone/80">
              {site.phones.map((p) => (
                <li key={p.href}><a className="inline-block py-2 hover:text-bone" href={p.href}>{p.label}</a></li>
              ))}
              <li><a className="inline-block py-2 hover:text-bone" href={`mailto:${site.email}`}>{site.email}</a></li>
            </ul>
          </div>
          <div>
            <p className="kicker mb-4">Gdje smo</p>
            <p className="text-bone/80">{site.area}, {site.city}<br />Bosna i Hercegovina</p>
            <p className="mt-3 text-bone/60">{site.hours}</p>
            <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="link-arrow mt-4 text-bone/80">
              Facebook <ArrowUpRight size={14} strokeWidth={1.25} className="text-brass" />
            </a>
          </div>
        </div>
      </div>

      <div className="shell flex items-center justify-between gap-6 border-t border-line py-6">
        <Link href="/" aria-label="Euro-Floors, početna" className="py-2"><LogoMark className="h-10 w-auto" /></Link>
        <nav aria-label="Podnožje" className="hidden items-center text-[12px] text-bone/70 md:flex">
          {nav.map((n, i) => (
            <span key={n.href} className="flex items-center">
              {i > 0 && <span aria-hidden="true" className="mx-4 text-bone/25">/</span>}
              <Link href={n.href} className="py-2 hover:text-bone">{n.label}</Link>
            </span>
          ))}
        </nav>
        <Link href="/kontakt" className="link-arrow text-[12px]">Kontakt <ArrowUpRight size={14} strokeWidth={1.25} className="text-brass" /></Link>
      </div>

      <div className="shell flex flex-col justify-between gap-2 border-t border-line py-6 text-[12px] text-mute sm:flex-row">
        <p>© {year} Euro-Floors. Sva prava zadržana.</p>
        <p>
          Fotografije su ilustrativne —{" "}
          <Link href="/zasluge" className="underline decoration-line-strong underline-offset-4 hover:text-bone">zasluge</Link>
        </p>
      </div>
    </footer>
  );
}
