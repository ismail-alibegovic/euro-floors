"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Search, X } from "lucide-react";
import { allSpecies, categories, products, type CategorySlug } from "@/data/catalog";
import { presets } from "@/data/visualizer";

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "dj");

export function CatalogBrowser({ initialCategory }: { initialCategory?: CategorySlug | "sve" }) {
  const reduce = useReducedMotion();
  const [cat, setCat] = useState<CategorySlug | "sve">(initialCategory ?? "sve");
  const [species, setSpecies] = useState<string>("sve");
  const [q, setQ] = useState("");
  const [tone, setTone] = useState<string>("sve");

  const list = useMemo(() => {
    const nq = norm(q.trim());
    return products.filter(
      (p) =>
        (cat === "sve" || p.category === cat) &&
        (species === "sve" || p.species.includes(species as never)) &&
        (!nq || norm([p.name, p.summary, ...p.species, ...p.specs.map((s) => s.value)].join(" ")).includes(nq)),
    );
  }, [cat, species, q]);

  const tones = ["sve", "Svijetli", "Srednji", "Tamni"];
  const shownPresets = presets.filter((p) => tone === "sve" || p.tone === tone);
  const catName = (slug: string) => categories.find((c) => c.slug === slug)?.name ?? "";
  const reset = () => { setCat("sve"); setSpecies("sve"); setQ(""); };

  const chip = (on: boolean) =>
    `min-h-10 whitespace-nowrap border px-3.5 text-[13px] transition-colors ${on ? "border-brass text-brass" : "border-line text-bone/70 hover:border-line-strong hover:text-bone"}`;

  return (
    <div>
      {/* Filters */}
      <div className="sticky top-[calc(var(--header-h)+var(--safe-top))] z-30 -mx-[var(--gutter)] border-b border-line bg-ink/90 px-[var(--gutter)] py-4 backdrop-blur-md">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div role="group" aria-label="Kategorija" className="no-scrollbar -mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] xl:mx-0 xl:px-0">
            <button type="button" aria-pressed={cat === "sve"} onClick={() => setCat("sve")} className={chip(cat === "sve")}>Sve kategorije</button>
            {categories.map((c) => (
              <button key={c.slug} type="button" aria-pressed={cat === c.slug} onClick={() => setCat(c.slug)} className={chip(cat === c.slug)}>
                {c.name}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="flex items-center gap-3 text-[13px]">
              <span className="text-mute">Vrsta drveta</span>
              <select value={species} onChange={(e) => setSpecies(e.target.value)} className="min-h-10 border border-line bg-ink-2 px-3 text-[13px] text-bone focus:border-brass focus:outline-none">
                <option value="sve">Sve</option>
                {allSpecies.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </label>
            <label className="relative flex min-h-10 flex-1 items-center border border-line focus-within:border-brass sm:w-64">
              <span className="sr-only">Pretraga</span>
              <Search aria-hidden="true" size={15} strokeWidth={1.25} className="ml-3 text-mute" />
              <input type="search" enterKeyHint="search" autoCapitalize="none" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Pretražite: hrast, 20 mm, klasa 32…" className="w-full bg-transparent px-3 py-2 text-[13px] placeholder:text-bone/35 focus:outline-none" />
              {q && (
                <button type="button" onClick={() => setQ("")} aria-label="Obriši pretragu" className="mr-1 flex h-8 w-8 items-center justify-center text-mute hover:text-bone"><X size={14} /></button>
              )}
            </label>
          </div>
        </div>
      </div>

      <p className="caption mt-6" aria-live="polite">
        {list.length === 0 ? "Nema rezultata." : `${list.length} ${list.length === 1 ? "proizvod" : list.length < 5 ? "proizvoda" : "proizvoda"}`}
        {" "}— podaci preuzeti iz naše ponude; fotografije su ilustrativne.
      </p>

      {/* Products */}
      {list.length === 0 ? (
        <div className="mt-8 border border-line p-10 text-center">
          <p className="text-[1.4rem] font-normal">Nijedan proizvod ne odgovara filterima.</p>
          <button type="button" onClick={reset} className="btn mx-auto mt-6">Poništi filtere</button>
        </div>
      ) : (
        <ul className="mt-8 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence initial={false}>
            {list.map((p) => (
              <motion.li
                key={p.slug}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="border-b border-r border-line"
              >
                <Link href={`/kolekcije/${p.category}/${p.slug}`} className="group flex h-full flex-col p-5 md:p-6">
                  <span className="media-zoom relative block aspect-[4/3] overflow-hidden">
                    <Image src={p.images[0].src} alt={p.images[0].alt} fill sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw" quality={70} className="object-cover" />
                  </span>
                  <span className="mt-5 flex items-start justify-between gap-4">
                    <span>
                      <span className="caption block">{catName(p.category)}</span>
                      <span className="mt-1 block text-[1.35rem] font-light leading-tight tracking-[-0.02em] transition-colors group-hover:text-brass">{p.name}</span>
                      <span className="mt-2 block text-[13.5px] text-bone/60">{p.summary}</span>
                    </span>
                    <ArrowUpRight aria-hidden="true" size={20} strokeWidth={1} className="mt-1 shrink-0 text-bone/50 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brass" />
                  </span>
                  <span className="mt-auto flex flex-wrap gap-1.5 pt-5">
                    {p.species.map((s) => (
                      <span key={s} className="border border-line px-2 py-0.5 text-[11px] text-mute">{s}</span>
                    ))}
                  </span>
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}

      {/* Illustrative presets, clearly separated */}
      <section aria-labelledby="presets-title" className="mt-24 border-t border-line pt-12">
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 id="presets-title" className="headline text-[clamp(2rem,3.6vw,3.4rem)]">Ilustrativne varijante iz vizualizatora</h2>
          </div>
          <p className="text-[14px] text-bone/65 md:col-span-5 md:col-start-8">
            Ovo nisu proizvodi iz kataloga, već prikazi tonova i uzoraka koje možete isprobati u prostoriji. Na upit predlažemo stvarne opcije sličnog izgleda.
          </p>
        </div>
        <div role="group" aria-label="Ton" className="mt-8 flex flex-wrap gap-2">
          {tones.map((t) => (
            <button key={t} type="button" aria-pressed={tone === t} onClick={() => setTone(t)} className={chip(tone === t)}>
              {t === "sve" ? "Svi tonovi" : t}
            </button>
          ))}
        </div>
        <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {shownPresets.map((p) => (
            <li key={p.id}>
              <Link href={`/vizualizator?pod=${p.id}`} className="group block">
                <span className="relative block aspect-square overflow-hidden border border-line transition-colors group-hover:border-line-strong">
                  <Image src={p.swatch} alt={`Uzorak: ${p.name}`} fill sizes="200px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </span>
                <span className="mt-2 block text-[13px]">{p.name}</span>
                <span className="block text-[11px] text-mute">{p.tone}, {p.pattern.toLowerCase()}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
