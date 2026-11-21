import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/catalog";
import { PageHeader } from "@/components/PageHeader";
import { CatalogBrowser } from "@/components/CatalogBrowser";

export const metadata: Metadata = {
  title: "Kolekcije — masivni, troslojni i egzotični parket, laminati",
  description:
    "Masivni parket, seljački pod, gotovi troslojni parket, egzotični parket (bambus, merbau, garapa) i laminati u Sarajevu. Vrste drveta, klase i dimenzije.",
  alternates: { canonical: "/kolekcije" },
};

export default async function CollectionsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  return (
    <>
      <PageHeader
        kicker="Kolekcije"
        title={["Materijali", "iz naše ponude."]}
        lead="Od punog drveta koje se brusi na licu mjesta do laminata za poslovne prostore. Specifikacije su preuzete iz naše ponude; ono što nije navedeno, dogovaramo uz ponudu."
      />
      <section aria-label="Kategorije" className="shell">
        <ul className="grid border-l border-line sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <li key={c.slug} className="border-b border-r border-line">
              <Link href={`/kolekcije/${c.slug}`} className="group flex h-full flex-col p-5">
                <span className="media-zoom relative block aspect-[4/5] overflow-hidden" data-curtain="">
                  <Image src={c.image.src} alt={c.image.alt} fill sizes="(min-width:1024px) 24vw, (min-width:640px) 48vw, 92vw" quality={70} className="object-cover" />
                </span>
                <span className="mt-4 flex items-start justify-between gap-3">
                  <span>
                    <span className="caption block">{c.index}</span>
                    <span className="block text-[1.2rem] font-light uppercase tracking-[-0.01em] group-hover:text-brass">{c.name}</span>
                  </span>
                  <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1} className="mt-1 text-bone/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brass" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section id="katalog" aria-label="Svi proizvodi" className="shell scroll-mt-20 pb-28 pt-16">
        <CatalogBrowser initialQuery={q?.slice(0, 80) ?? ""} />
      </section>
    </>
  );
}
