import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Cell =
  | { kind: "text"; text: string; href: string; align?: "right" | "left" }
  | { kind: "img"; src: string; alt: string; href: string; label: string };

const P = "/images/photos";
const CELLS: Cell[] = [
  { kind: "text", text: "Masivni, troslojni i egzotični parket te laminati — iz naše ponude u Sarajevu.", href: "/kolekcije", align: "right" },
  { kind: "img", src: `${P}/col-masivni.jpg`, alt: "Klasičan stan s parketom u ribljoj kosti", href: "/kolekcije/masivni-parket", label: "Masivni parket" },
  { kind: "img", src: `${P}/macro-herringbone.jpg`, alt: "Detalj hrastovih lamela u ribljoj kosti", href: "/kolekcije/masivni-parket/hrast-prve-klase-aqua-lak", label: "Hrast prve klase" },
  { kind: "img", src: `${P}/col-troslojni.jpg`, alt: "Svijetao stan s gotovim hrastovim parketom", href: "/kolekcije/gotovi-troslojni-parket", label: "Gotovi troslojni parket" },
  { kind: "img", src: `${P}/macro-walnut-planks.jpg`, alt: "Široke daske s izraženim godovima", href: "/kolekcije/masivni-parket/seljacki-pod-hrast", label: "Seljački pod" },
  { kind: "text", text: "Pogledajte kako pod može izgledati — prirodno, toplo i po vašoj mjeri.", href: "/vizualizator", align: "left" },
  { kind: "img", src: `${P}/col-egzoticni.jpg`, alt: "Topao egzotični parket u sunčanoj sobi", href: "/kolekcije/egzoticni-parket", label: "Egzotični parket" },
  { kind: "text", text: "Od stana do poslovnog prostora — pogledajte podove iz naše ponude.", href: "/projekti", align: "left" },
  { kind: "img", src: `${P}/col-laminati.jpg`, alt: "Prostorija s laminatom u dugim lamelama", href: "/kolekcije/laminati", label: "Laminati" },
];

/** Section 04 — the reference's "Designed by Formaia" grid: centred title, soft-edged photos, text cells. */
export function CollectionGrid() {
  return (
    <section aria-labelledby="col-title" className="border-b border-line">
      <div className="relative grid items-end gap-6 px-[var(--gutter)] pb-4 pt-16 sm:pb-12 sm:pt-20 lg:grid-cols-3 lg:px-[2.4%] lg:pb-14 lg:pt-24">
        <Link href="/kolekcije" className="order-3 hidden w-fit items-center gap-2 py-2 text-[11.5px] text-bone/80 hover:text-brass sm:inline-flex lg:order-1">
          Pogledajte sve <ArrowUpRight size={15} strokeWidth={1} />
        </Link>
        <div className="order-1 text-center lg:order-2">
          <h2 id="col-title" className="text-[clamp(2rem,3.4vw,3.6rem)] font-normal leading-[0.92] tracking-[-0.045em]" data-reveal="">
            Kolekcije
            <br />
            Euro-Floors
          </h2>
          <p className="mx-auto mt-6 max-w-[30ch] text-[14px] leading-[1.45] text-bone/70 sm:mt-8 sm:text-[12px] sm:leading-[1.4]">
            Odabrani podovi u kojima se prirodno drvo susreće s bezvremenskim enterijerom.
          </p>
        </div>
        <span aria-hidden="true" className="index-num order-2 hidden text-right lg:order-3 lg:block" data-reveal="">04</span>
      </div>

      {/* Phones: a native-scroll snap rail of full-colour cards instead of a long single column */}
      <ul
        aria-label="Kolekcije"
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain border-t border-line px-[var(--gutter)] py-8 [scroll-padding-inline:var(--gutter)] sm:hidden"
      >
        {CELLS.filter((c): c is Extract<Cell, { kind: "img" }> => c.kind === "img").map((c, i, all) => (
          <li key={c.href} className="w-[78%] shrink-0 snap-start">
            <Link href={c.href} className="group relative block aspect-[4/5] overflow-hidden bg-ink-2 transition-transform duration-150 active:scale-[0.98]">
              <Image src={c.src} alt={c.alt} fill sizes="80vw" quality={70} className="object-cover" />
              <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(19_14_10/0.35)_0%,transparent_30%,transparent_55%,rgb(19_14_10/0.9)_100%)]" />
              <span aria-hidden="true" className="absolute left-4 top-3.5 text-[11px] tabular-nums text-bone/70">
                {String(i + 1).padStart(2, "0")} / {String(all.length).padStart(2, "0")}
              </span>
              <span className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                <span className="text-[22px] leading-[1.05] tracking-[-0.03em] text-bone">{c.label}</span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-bone text-ink">
                  <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.25} />
                </span>
              </span>
            </Link>
          </li>
        ))}
        <li className="w-[60%] shrink-0 snap-start">
          <Link href="/kolekcije" className="flex h-full flex-col justify-between border border-line-strong p-5 transition-transform duration-150 active:scale-[0.98]">
            <span className="text-[14px] leading-[1.4] text-bone/80">Masivni, troslojni i egzotični parket te laminati — iz naše ponude u Sarajevu.</span>
            <span className="flex items-center justify-between text-[15px] text-brass">
              Sve kolekcije <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.25} />
            </span>
          </Link>
        </li>
      </ul>

      <ul className="hidden border-t border-line sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {CELLS.map((c, i) => (
          <li key={i} className={`border-line ${i % 3 !== 2 ? "lg:border-r" : ""} ${i % 2 === 0 ? "sm:max-lg:border-r" : ""} border-b`}>
            {c.kind === "text" ? (
              <Link href={c.href} className="group flex h-full min-h-[220px] flex-col justify-between p-[9%]">
                <p className={`max-w-[26ch] text-[12px] leading-[1.4] text-bone/80 ${c.align === "right" ? "ml-auto text-right" : ""}`}>{c.text}</p>
                <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1} className={`mt-10 text-bone/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brass ${c.align === "right" ? "self-end" : "self-start"}`} />
              </Link>
            ) : (
              <Link href={c.href} className="group block px-[17%] py-[13%]">
                <span className="relative block aspect-square" data-curtain="">
                  <span className="absolute inset-0 overflow-hidden [mask-image:radial-gradient(ellipse_at_center,#000_62%,transparent_100%)]">
                    <Image
                      src={c.src}
                      alt={c.alt}
                      fill
                      sizes="(min-width:1024px) 25vw, (min-width:640px) 40vw, 80vw"
                      quality={70}
                      className="object-cover blur-[1.5px] brightness-[0.85] transition-[filter,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] group-hover:blur-0 group-hover:brightness-100"
                    />
                  </span>
                </span>
                <span className="mt-4 flex items-center justify-between text-[11.5px] text-bone/70 transition-colors group-hover:text-brass">
                  {c.label}
                  <ArrowUpRight aria-hidden="true" size={14} strokeWidth={1} />
                </span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
