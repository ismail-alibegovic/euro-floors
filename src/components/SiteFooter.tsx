import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { nav, site } from "@/data/site";
import { FitText } from "./FitText";
import { LogoMark } from "./Logo";

/**
 * Closing sequence from the reference: the full-width hairline word over fine vertical slats,
 * a two-line call to action with a right-aligned note, a dark photograph, then the slim nav bar.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative isolate overflow-hidden bg-ink">
      <div className="shell">
        {/* Oversized word over slats */}
        <div className="relative border-b border-line pt-[clamp(4rem,8vw,8rem)]" aria-hidden="true">
          <div className="slats absolute inset-x-0 bottom-0 top-[35%] [mask-image:linear-gradient(180deg,transparent,#000_45%,#000)]" />
          <div className="relative" data-reveal="">
            <FitText text="Euro-Floors" estimate="13vw" className="giant -mb-[0.02em] pb-[0.02em]" />
          </div>
        </div>

        {/* Call to action */}
        <div className="grid gap-10 pb-[clamp(3rem,5vw,5rem)] pt-[clamp(2.5rem,4vw,4rem)] md:grid-cols-2">
          <p className="headline-xl" data-reveal="">
            <span className="block">Prostor počinje</span>
            <span className="block">ovdje.</span>
          </p>
          <div className="flex flex-col items-start gap-4 md:items-end md:pt-2 md:text-right" data-reveal="" style={{ ["--d" as string]: "200ms" }}>
            <p className="max-w-[32ch] text-[12.5px] leading-[1.42] text-bone/85">
              Pošaljite nam mjere i ideju — odgovaramo s prijedlogom poda i ponudom za materijal i ugradnju.
            </p>
            <Link href="/kontakt" className="group inline-flex items-center gap-3 py-2 text-[12px]">
              Zatražite ponudu
              <ArrowUpRight size={18} strokeWidth={1} className="text-brass transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Dark photograph band */}
      <div className="relative h-[clamp(240px,30vw,460px)] overflow-hidden">
        <Image
          src="/images/photos/gal-warm-lounge.jpg"
          alt=""
          fill
          sizes="100vw"
          quality={70}
          className="object-cover object-[50%_62%] brightness-[0.42] saturate-[0.55]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,#100b03_0%,rgb(16_11_3/0.15)_40%,rgb(16_11_3/0.35)_75%,#100b03_100%)]" />
        <div className="shell relative flex h-full items-end pb-8">
          <dl className="grid w-full grid-cols-2 gap-x-6 gap-y-5 text-[12px] leading-[1.45] md:grid-cols-4">
            <div>
              <dt className="text-bone/50">Telefon</dt>
              {site.phones.map((p) => (
                <dd key={p.href}><a href={p.href} className="inline-block py-0.5 text-bone/90 hover:text-brass">{p.label}</a></dd>
              ))}
            </div>
            <div>
              <dt className="text-bone/50">E-mail</dt>
              <dd><a href={`mailto:${site.email}`} className="inline-block py-0.5 text-bone/90 hover:text-brass">{site.email}</a></dd>
            </div>
            <div>
              <dt className="text-bone/50">Adresa</dt>
              <dd className="py-0.5 text-bone/90">{site.area}, {site.city}</dd>
            </div>
            <div>
              <dt className="text-bone/50">Radno vrijeme</dt>
              <dd className="py-0.5 text-bone/90">{site.hoursShort}</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Slim bar, mirrors the header */}
      <div className="shell grid grid-cols-[1fr_auto] items-center gap-6 border-t border-line py-5 lg:grid-cols-[1fr_auto_1fr]">
        <Link href="/" aria-label="Euro-Floors, početna" className="w-fit py-2"><LogoMark className="h-8 w-auto" /></Link>
        <nav aria-label="Podnožje" className="hidden items-center text-[12px] text-bone/80 lg:flex">
          {nav.map((n, i) => (
            <span key={n.href} className="flex items-center">
              {i > 0 && <span aria-hidden="true" className="mx-[clamp(1.25rem,2.6vw,2.75rem)] text-bone/30">/</span>}
              <Link href={n.href} className="py-2 hover:text-brass">{n.label}</Link>
            </span>
          ))}
        </nav>
        <Link href="/kontakt" className="group inline-flex items-center gap-3 justify-self-end py-2 text-[12px]">
          Kontakt
          <ArrowUpRight size={18} strokeWidth={1} className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brass" />
        </Link>
      </div>

      <div className="shell flex flex-col justify-between gap-2 border-t border-line pb-[calc(1.25rem+var(--safe-bottom))] pt-5 text-[11.5px] text-bone/45 sm:flex-row">
        <p>© {year} Euro-Floors. Sva prava zadržana.</p>
        <p className="flex flex-wrap gap-x-5">
          <Link href="/vodic" className="hover:text-bone">Vodič kroz podove</Link>
          <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-bone">Facebook</a>
          <Link href="/zasluge" className="hover:text-bone">Fotografije su ilustrativne — zasluge</Link>
        </p>
      </div>
    </footer>
  );
}
