"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/catalog";
import { AnchorLink } from "../AnchorLink";
import { useSiteState } from "../SiteState";

/** The category photos filter the catalog right below instead of opening a separate page. */
export function CategoryCards() {
  const { filterCatalog } = useSiteState();
  return (
    <ul className="grid grid-cols-2 border-l border-t border-line lg:grid-cols-4">
      {categories.map((c) => (
        <li key={c.slug} className="border-b border-r border-line">
          <AnchorLink id="katalog" onClick={() => filterCatalog({ category: c.slug })} className="group flex h-full flex-col p-3 sm:p-5">
            <span className="media-zoom relative block aspect-square overflow-hidden sm:aspect-[4/5]" data-curtain="">
              <Image src={c.image.src} alt={c.image.alt} fill sizes="(min-width:1024px) 24vw, (min-width:640px) 48vw, 46vw" quality={70} className="object-cover" />
            </span>
            <span className="mt-3 flex items-start sm:mt-4 justify-between gap-3">
              <span>
                <span className="caption block">{c.index}</span>
                <span className="block text-[1.05rem] font-light sm:text-[1.2rem] leading-tight tracking-[-0.01em] group-hover:text-brass">{c.name}</span>
                <span className="mt-1.5 hidden text-[13.5px] sm:block leading-[1.4] text-bone/60">{c.short}</span>
              </span>
              <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1} className="mt-1 shrink-0 text-bone/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brass" />
            </span>
          </AnchorLink>
        </li>
      ))}
    </ul>
  );
}
