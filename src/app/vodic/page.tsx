import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Vodič kroz podove — masivni ili troslojni parket, klase laminata",
  description:
    "Klasični (masivni) ili gotovi troslojni parket? Dimenzije i klase seljačkog poda, klase laminata 31, 32 i 33, bambus i obnova drvenog poda.",
  alternates: { canonical: "/vodic" },
};

const chapters = [
  {
    id: "masivni-ili-gotovi",
    title: "Klasični (masivni) ili gotovi parket?",
    body: [
      "Masivni parket je od punog drveta. Postavlja se pa obrađuje na licu mjesta — brusi, polira i lakira — i može se kasnije ponovo obnoviti. Dolazi kao klasični i lamelni, u vrstama hrast, jasen, javor i bukva, u klasama E, S, R i VS.",
      "Gotovi višeslojni (troslojni) parket dolazi fabrički završen. Ugradnja je brža: lijepi se ili postavlja na filc ili stirodur, a može ići i preko potpuno zalijepljenog vinila, elastičnih pločica, linoleuma, keramike, mermera, cementnog estriha ili drvene podloge.",
    ],
    link: { href: "/kolekcije/masivni-parket", label: "Masivni parket" },
  },
  {
    id: "seljacki-pod",
    title: "Seljački pod: dimenzije i klase",
    body: [
      "Seljački pod od hrasta dolazi u dužinama od 500 do 2000 mm, širinama od 120 do 200 mm i debljini od 20 mm.",
      "Klase: Prima A, Prima B, Rustik C ili E, S, R, VS ili N (natura) N1, N2. Može biti fabrički bajcan, lakiran ili uljen, ili se obrađuje nakon ugradnje. Obnova se preporučuje svakih 15 do 20 godina.",
    ],
    link: { href: "/kolekcije/masivni-parket/seljacki-pod-hrast", label: "Seljački pod — hrast" },
  },
  {
    id: "laminat",
    title: "Laminat: koja klasa za koji prostor?",
    body: [
      "Laminat se proizvodi u debljinama od 6 do 12 mm. Klasa 31 namijenjena je stambenim prostorima s manjim opterećenjem, klasa 32 pojačanoj upotrebi i uredima, a klasa 33 komercijalnim prostorima i izložbenim salonima.",
    ],
    link: { href: "/kolekcije/laminati", label: "Laminati" },
  },
  {
    id: "bambus",
    title: "Bambus: kad ima smisla",
    body: [
      "Bambus je trava (trska), a parket od njega dolazi gotov i lakiran. Izdržljiv je i otporan na vlagu, pa je pogodan i za kuhinje. Nedostatak u odnosu na hrast je ljepilo na bazi formaldehida koje se koristi u izradi.",
      "Najčešća vrsta drveta za podove ostaje hrast.",
    ],
    link: { href: "/kolekcije/egzoticni-parket/bambus-visoki-sjaj", label: "Bambus — visoki sjaj" },
  },
  {
    id: "obnova",
    title: "Obnova drvenog poda",
    body: [
      "Pod od punog drveta može se ponovo brusiti i dobiti novu završnu obradu: lak, ulje, vosak ili bajc. Kod seljačkog poda obnova se preporučuje svakih 15 do 20 godina.",
    ],
    link: { href: "/usluge", label: "Usluge obrade" },
  },
];

export default function GuidePage() {
  return (
    <>
      <PageHeader
        kicker="Vodič"
        title={["Kako izabrati", "parket?"]}
        lead="Kratak vodič kroz razlike između vrsta podova iz naše ponude — bez marketinških obećanja, samo podaci s kojima radimo."
      />
      <div className="shell grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
        <nav aria-label="Sadržaj vodiča" className="lg:col-span-3">
          <ol className="sticky top-[calc(var(--header-h)+24px)] space-y-1 border-l border-line text-[14px]">
            {chapters.map((c, i) => (
              <li key={c.id}>
                <a href={`#${c.id}`} className="-ml-px block border-l border-transparent py-2 pl-4 text-bone/65 hover:border-brass hover:text-bone">
                  <span className="caption mr-2">{i + 1}</span>{c.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="lg:col-span-8 lg:col-start-5">
          {chapters.map((c, i) => (
            <section key={c.id} id={c.id} aria-labelledby={`${c.id}-h`} className="scroll-mt-28 border-t border-line py-12 first:pt-0 first:border-t-0">
              <p className="caption">{String(i + 1).padStart(2, "0")}</p>
              <h2 id={`${c.id}-h`} className="mt-3 text-[clamp(1.7rem,3vw,2.6rem)] font-normal leading-tight tracking-[-0.03em]">{c.title}</h2>
              <div className="mt-6 max-w-[64ch] space-y-4 text-[16px] leading-relaxed text-bone/78">
                {c.body.map((b, k) => <p key={k}>{b}</p>)}
              </div>
              <Link href={c.link.href} className="link-arrow mt-6 text-bone">
                {c.link.label} <ArrowUpRight size={14} strokeWidth={1.25} className="text-brass" />
              </Link>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
