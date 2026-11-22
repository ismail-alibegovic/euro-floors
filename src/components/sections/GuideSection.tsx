"use client";

import { ArrowUpRight, Plus } from "lucide-react";
import type { CategorySlug } from "@/data/catalog";
import { AnchorLink } from "../AnchorLink";
import { useSiteState } from "../SiteState";
import { SectionHead } from "./SectionHead";

type Cta = { label: string } & ({ kind: "category"; slug: CategorySlug } | { kind: "product"; slug: string } | { kind: "services" });

const chapters: { id: string; title: string; body: string[]; cta: Cta }[] = [
  {
    id: "masivni-ili-gotovi",
    title: "Klasični (masivni) ili gotovi parket?",
    body: [
      "Masivni parket je od punog drveta. Postavlja se pa obrađuje na licu mjesta — brusi, polira i lakira — i može se kasnije ponovo obnoviti. Dolazi kao klasični i lamelni, u vrstama hrast, jasen, javor i bukva, u klasama E, S, R i VS.",
      "Gotovi višeslojni (troslojni) parket dolazi fabrički završen. Ugradnja je brža: lijepi se ili postavlja na filc ili stirodur, a može ići i preko potpuno zalijepljenog vinila, elastičnih pločica, linoleuma, keramike, mermera, cementnog estriha ili drvene podloge.",
    ],
    cta: { kind: "category", slug: "masivni-parket", label: "Masivni parket" },
  },
  {
    id: "seljacki-pod",
    title: "Seljački pod: dimenzije i klase",
    body: [
      "Seljački pod od hrasta dolazi u dužinama od 500 do 2000 mm, širinama od 120 do 200 mm i debljini od 20 mm.",
      "Klase: Prima A, Prima B, Rustik C ili E, S, R, VS ili N (natura) N1, N2. Može biti fabrički bajcan, lakiran ili uljen, ili se obrađuje nakon ugradnje. Obnova se preporučuje svakih 15 do 20 godina.",
    ],
    cta: { kind: "product", slug: "seljacki-pod-hrast", label: "Seljački pod — hrast" },
  },
  {
    id: "laminat",
    title: "Laminat: koja klasa za koji prostor?",
    body: [
      "Laminat se proizvodi u debljinama od 6 do 12 mm. Klasa 31 namijenjena je stambenim prostorima s manjim opterećenjem, klasa 32 pojačanoj upotrebi i uredima, a klasa 33 komercijalnim prostorima i izložbenim salonima.",
    ],
    cta: { kind: "category", slug: "laminati", label: "Laminati" },
  },
  {
    id: "bambus",
    title: "Bambus: kad ima smisla",
    body: [
      "Bambus je trava (trska), a parket od njega dolazi gotov i lakiran. Izdržljiv je i otporan na vlagu, pa je pogodan i za kuhinje. Nedostatak u odnosu na hrast je ljepilo na bazi formaldehida koje se koristi u izradi.",
      "Najčešća vrsta drveta za podove ostaje hrast.",
    ],
    cta: { kind: "product", slug: "bambus-visoki-sjaj", label: "Bambus — visoki sjaj" },
  },
  {
    id: "obnova",
    title: "Obnova drvenog poda",
    body: [
      "Pod od punog drveta može se ponovo brusiti i dobiti novu završnu obradu: lak, ulje, vosak ili bajc. Kod seljačkog poda obnova se preporučuje svakih 15 do 20 godina.",
    ],
    cta: { kind: "services", label: "Usluge obrade" },
  },
];

/** #vodic — the buying guide as an accordion (one chapter open at a time, plain <details>: no JS needed). */
export function GuideSection() {
  const { filterCatalog, openProduct } = useSiteState();

  const cta = (c: Cta) => {
    const inner = (
      <>
        {c.label} <ArrowUpRight aria-hidden="true" size={14} strokeWidth={1.25} className="text-brass" />
      </>
    );
    const cls = "link-arrow mt-4 text-bone";
    // a product opens its details dialog in place; categories and services scroll to their section
    if (c.kind === "product")
      return <button type="button" aria-haspopup="dialog" onClick={() => openProduct(c.slug)} className={cls}>{inner}</button>;
    if (c.kind === "category")
      return <AnchorLink id="katalog" onClick={() => filterCatalog({ category: c.slug })} className={cls}>{inner}</AnchorLink>;
    return <AnchorLink id="usluge" className={cls}>{inner}</AnchorLink>;
  };

  return (
    <section id="vodic" aria-labelledby="vodic-title" className="anchor border-b border-line">
      <SectionHead
        index="05"
        titleId="vodic-title"
        title={["Kako izabrati", "parket?"]}
        lead="Kratak vodič kroz razlike između vrsta podova iz naše ponude — bez marketinških obećanja, samo podaci s kojima radimo."
      />
      <div className="shell pb-20 sm:pb-24 lg:pb-28">
        <div className="border-t border-line">
          {chapters.map((c, i) => (
            <details key={c.id} id={c.id} name="vodic" open={i === 0} className="group anchor border-b border-line">
              <summary className="grid min-h-16 cursor-pointer list-none grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 py-5 text-left marker:hidden md:grid-cols-[4rem_1fr_auto] md:py-7 [&::-webkit-details-marker]:hidden">
                <span className="caption tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-[clamp(1.2rem,2.2vw,2.1rem)] font-normal leading-[1.1] tracking-[-0.03em] text-bone/85 transition-colors group-open:text-bone group-hover:text-bone">{c.title}</h3>
                <Plus aria-hidden="true" size={22} strokeWidth={1} className="text-bone/60 transition-transform duration-500 group-open:rotate-45 group-open:text-brass" />
              </summary>
              <div className="grid gap-5 pb-8 pl-[3.5rem] md:grid-cols-[4rem_1fr] md:pb-10 md:pl-0">
                <span className="hidden md:block" />
                <div>
                  <div className="max-w-[64ch] space-y-4 text-[15.5px] leading-relaxed text-bone/78">
                    {c.body.map((b, k) => <p key={k}>{b}</p>)}
                  </div>
                  {cta(c.cta)}
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
