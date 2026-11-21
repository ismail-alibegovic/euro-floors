"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";

const IMAGES: Record<string, string> = {
  savjetovanje: "/images/photos/gal-doorway.jpg",
  nabavka: "/images/photos/macro-walnut-planks.jpg",
  "masivni-parket": "/images/photos/macro-herringbone.jpg",
  "seljacki-pod": "/images/photos/gal-dining-oak.jpg",
  "gotovi-parket": "/images/photos/col-troslojni.jpg",
  egzoticni: "/images/photos/gal-sunlit-parquet.jpg",
  "laminat-i-obloge": "/images/photos/col-laminati.jpg",
};

/** Section 03 — the reference's "Everything in One Place" list: ruled rows, a photo follows the hovered row. */
export function ServicesSection() {
  const rows = services.filter((s) => IMAGES[s.slug]);
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section aria-labelledby="svc-title" className="border-b border-line">
      <div className="relative grid px-[var(--gutter)] pb-10 pt-16 lg:grid-cols-[22fr_78fr] lg:px-0 lg:pt-20">
        <span aria-hidden="true" className="index-num lg:pl-[5%]" data-reveal="">03</span>
        <div className="lg:pr-[3.2%] lg:text-right">
          <h2 id="svc-title" className="text-[clamp(2rem,3.4vw,3.6rem)] font-normal leading-[0.92] tracking-[-0.045em]" data-reveal="">
            Sve na jednom
            <br />
            mjestu.
          </h2>
          <p className="mt-6 max-w-[30ch] text-[14px] leading-[1.45] text-bone/70 sm:text-[12px] sm:leading-[1.4] lg:ml-auto">
            Od izbora i nabavke do ugradnje i završne obrade — Euro-Floors vodi cijeli posao oko vašeg poda.
          </p>
        </div>
      </div>

      <ul className="relative" onMouseLeave={() => setHover(null)}>
        {rows.map((s, i) => (
          <li key={s.slug} className="relative border-t border-line" onMouseEnter={() => setHover(i)}>
            <Link href={`/usluge#${s.slug}`} className="group flex items-center justify-between gap-4 px-[var(--gutter)] py-5 transition-colors duration-150 active:bg-ink-2 sm:gap-6 sm:py-6 lg:px-[2.4%] lg:py-7">
              {/* touch screens have no hover photo, so each row carries its own thumbnail */}
              <span className="relative h-16 w-16 shrink-0 overflow-hidden bg-ink-2 [@media(hover:hover)_and_(pointer:fine)]:hidden">
                <Image src={IMAGES[s.slug]} alt="" fill sizes="64px" quality={70} className="object-cover" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline gap-2.5">
                  <span aria-hidden="true" className="text-[11px] tabular-nums text-brass/80 [@media(hover:hover)_and_(pointer:fine)]:hidden">{String(i + 1).padStart(2, "0")}</span>
                  <span className="block text-[clamp(1.1rem,1.45vw,1.35rem)] leading-[1.15] tracking-[-0.02em] text-bone transition-colors group-hover:text-brass">{s.title}</span>
                </span>
                <span className="mt-1.5 line-clamp-2 block max-w-[80ch] text-[13px] leading-[1.4] text-bone/60 sm:text-[11.5px]">{s.short}</span>
              </span>
              <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1} className="shrink-0 text-bone/60 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brass" />
            </Link>
          </li>
        ))}
        {/* hover photo (fine pointers only) */}
        <div aria-hidden="true" className="pointer-events-none absolute right-[8%] top-0 hidden h-full w-[17vw] [@media(hover:hover)_and_(pointer:fine)]:block">
          {rows.map((s, i) => (
            <div
              key={s.slug}
              className="absolute left-0 w-full overflow-hidden transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                top: `calc(${(i / rows.length) * 100}% - 3.5vw)`,
                aspectRatio: "4 / 3",
                opacity: hover === i ? 1 : 0,
                transform: hover === i ? "scale(1)" : "scale(0.96)",
              }}
            >
              <Image src={IMAGES[s.slug]} alt="" fill sizes="17vw" quality={60} className="object-cover" />
            </div>
          ))}
        </div>
      </ul>
    </section>
  );
}
