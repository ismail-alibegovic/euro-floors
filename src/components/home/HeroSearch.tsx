"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { scrollToId } from "@/lib/scroll";
import { useSiteState } from "../SiteState";

/** The reference's prompt bar, made real: searches the catalog (species, spec, category). */
export function HeroSearch() {
  const { filterCatalog } = useSiteState();
  const [q, setQ] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    filterCatalog({ q: q.trim().slice(0, 80) });
    scrollToId("katalog");
  };
  return (
    <form
      role="search"
      onSubmit={submit}
      className="flex h-[52px] items-center gap-3 border border-white/10 bg-[rgb(92_86_80/0.42)] pl-4 pr-1.5 shadow-[0_24px_60px_-24px_rgb(0_0_0/0.9),inset_0_1px_0_rgb(255_255_255/0.06)] backdrop-blur-md"
    >
      <Plus aria-hidden="true" size={15} strokeWidth={1.25} className="shrink-0 text-bone/70" />
      <label htmlFor="hero-q" className="sr-only">Pretražite podove</label>
      <input
        id="hero-q"
        type="search"
        enterKeyHint="search"
        autoComplete="off"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Opišite pod: vrsta drveta, ton ili prostor…"
        className="h-full min-w-0 flex-1 bg-transparent text-[12.5px] text-bone placeholder:text-bone/45 focus:outline-none"
      />
      <button
        type="submit"
        aria-label="Pretraži kolekcije"
        className="flex h-[38px] w-[38px] shrink-0 items-center justify-center bg-[#e9e5df] text-walnut transition-transform duration-150 active:scale-95"
      >
        <ArrowUpRight size={18} strokeWidth={1.5} className="text-[#a8834f]" />
      </button>
    </form>
  );
}
