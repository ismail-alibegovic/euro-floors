"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/catalog";

const P = "/images/photos";

type Row = { href: string; title: string; text: string; img: string };

const rows: Row[] = [
  ...categories.map((c) => ({ href: `/kolekcije/${c.slug}`, title: c.name, text: c.short, img: c.image.src })),
  {
    href: "/usluge",
    title: "Ugradnja i obrada",
    text: "Postavljanje, brušenje, poliranje i lakiranje klasičnog i lamelnog parketa svih dimenzija.",
    img: `${P}/macro-herringbone.jpg`,
  },
  {
    href: "/usluge",
    title: "Seljački pod",
    text: "Fabrički obrađen ili kompletna obrada na licu mjesta: bajcanje, lakiranje, uljenje ili voskiranje.",
    img: `${P}/macro-walnut-planks.jpg`,
  },
  {
    href: "/usluge",
    title: "Lajsne i nabavka materijala",
    text: "Završni detalj svakog poda i nabavka materijala po vašoj želji i izboru.",
    img: `${P}/gal-warm-lounge.jpg`,
  },
];

/**
 * Section 03, after the reference's "Everything in One Place": a long ruled list where the
 * hovered row calls up a photograph on the right and a warm glow behind it.
 */
export function ServicesSection() {
  const [hover, setHover] = useState<number | null>(null);
  const [y, setY] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  const show = (i: number, el: HTMLElement) => {
    const list = listRef.current;
    if (!list) return;
    setY(el.offsetTop + el.offsetHeight / 2);
    setHover(i);
  };

  return (
    <section aria-labelledby="svc-title" className="relative">
      <div className="shell">
        <div className="relative grid gap-y-8 pb-12 pt-16 md:grid-cols-2 md:pb-[clamp(3.5rem,6vw,6.5rem)] md:pt-[clamp(3rem,5vw,5rem)]">
          <span aria-hidden="true" className="index-num self-start" data-reveal="">03</span>
          <div className="md:text-right">
            <h2 id="svc-title" className="headline" data-reveal="">
              <span className="block">Sve na jednom</span>
              <span className="block">mjestu.</span>
            </h2>
            <p data-reveal="" style={{ ["--d" as string]: "200ms" }} className="mt-[clamp(2rem,4vw,4rem)] max-w-[30ch] text-[12.5px] leading-[1.42] text-bone/80 md:ml-auto">
              Od izbora materijala do završnog laka — Euro-Floors donosi kompletnu uslugu za vaš pod u jednom prostoru.
            </p>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* warm light that follows the active row (reference) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[8%] hidden h-[520px] w-[760px] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(150_104_52/0.22),transparent)] transition-[top,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:block"
          style={{ top: y, opacity: hover === null ? 0.35 : 1 }}
        />
        <div className="shell relative">
          <ul ref={listRef} className="relative" onPointerLeave={() => setHover(null)}>
            {rows.map((r, i) => (
              <li key={r.title} className="border-t border-line last:border-b">
                <Link
                  href={r.href}
                  onPointerEnter={(e) => e.pointerType === "mouse" && show(i, e.currentTarget.parentElement as HTMLElement)}
                  onFocus={(e) => show(i, e.currentTarget.parentElement as HTMLElement)}
                  onBlur={() => setHover(null)}
                  className="group grid grid-cols-[1fr_auto] items-start gap-x-6 py-7 md:py-[clamp(1.9rem,2.6vw,2.6rem)] md:pl-[1.6%]"
                >
                  <span>
                    <span className="block text-[clamp(1.15rem,1.45vw,1.45rem)] font-normal leading-[1.1] tracking-[-0.025em] transition-colors duration-500 group-hover:text-bone">
                      {r.title}
                    </span>
                    <span className="mt-2.5 block max-w-[62ch] text-[12px] leading-[1.45] text-bone/65 transition-colors duration-500 group-hover:text-bone/85">
                      {r.text}
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    size={20}
                    strokeWidth={1}
                    className="mr-[1.6%] mt-1 text-bone/70 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brass"
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* floating preview (desktop pointer only) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[10%] top-0 hidden aspect-[4/3] w-[min(22vw,340px)] transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:block"
            style={{ transform: `translateY(calc(${y}px - 50%))`, opacity: hover === null ? 0 : 1 }}
          >
            {rows.map((r, i) => (
              <div
                key={r.title}
                className="absolute inset-0 overflow-hidden shadow-[0_30px_80px_-30px_rgb(0_0_0/0.9)] transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ opacity: hover === i ? 1 : 0, transform: hover === i ? "none" : "scale(1.04)" }}
              >
                <Image src={r.img} alt="" fill sizes="340px" quality={70} className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
