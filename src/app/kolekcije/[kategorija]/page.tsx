import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { categories, getCategory, productsIn } from "@/data/catalog";
import { presets } from "@/data/visualizer";
import { PageHeader } from "@/components/PageHeader";
import Image from "next/image";

export function generateStaticParams() {
  return categories.map((c) => ({ kategorija: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ kategorija: string }> }): Promise<Metadata> {
  const c = getCategory((await params).kategorija);
  if (!c) return {};
  return { title: `${c.name} — Sarajevo`, description: `${c.short} ${c.lead}`, alternates: { canonical: `/kolekcije/${c.slug}` } };
}

export default async function CategoryPage({ params }: { params: Promise<{ kategorija: string }> }) {
  const c = getCategory((await params).kategorija);
  if (!c) notFound();
  const items = productsIn(c.slug);
  const related = presets.filter((p) => p.related.includes(c.slug));
  const others = categories.filter((x) => x.slug !== c.slug);

  return (
    <>
      <PageHeader
        crumbs={[{ href: "/kolekcije", label: "Kolekcije" }, { href: `/kolekcije/${c.slug}`, label: c.name }]}
        kicker={`Kolekcija ${c.index}`}
        title={c.name.split(" ").length > 2 ? [c.name.split(" ").slice(0, 2).join(" "), c.name.split(" ").slice(2).join(" ")] : [c.name]}
        lead={c.lead}
        image={{ src: c.image.src, alt: c.image.alt }}
      />

      <section className="shell grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <div className="space-y-5 text-[16px] leading-relaxed text-bone/80 md:col-span-6" data-reveal="">
          {c.body.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <dl className="md:col-span-5 md:col-start-8" data-reveal="">
          <div className="flex justify-between gap-6 border-t border-line py-4 text-[14px]">
            <dt className="text-mute">Vrste</dt>
            <dd className="text-right">{c.species.join(", ")}</dd>
          </div>
          <div className="flex justify-between gap-6 border-y border-line py-4 text-[14px]">
            <dt className="text-mute">Proizvoda u katalogu</dt>
            <dd>{items.length}</dd>
          </div>
          <Link href={`/kontakt?kategorija=${c.slug}`} className="btn btn-solid mt-8 w-full sm:w-auto">
            Zatražite ponudu za {c.name.toLowerCase()} <ArrowUpRight size={18} strokeWidth={1.25} />
          </Link>
        </dl>
      </section>

      <section aria-labelledby="pl" className="shell pb-24">
        <h2 id="pl" className="kicker mb-6">Proizvodi</h2>
        <ul className="border-t border-line">
          {items.map((p, i) => (
            <li key={p.slug} className="border-b border-line">
              <Link href={`/kolekcije/${c.slug}/${p.slug}`} className="group grid items-center gap-4 py-6 sm:grid-cols-[3rem_8rem_1fr_auto] md:py-8">
                <span className="caption hidden sm:block">{String(i + 1).padStart(2, "0")}</span>
                <span className="media-zoom relative hidden aspect-[4/3] overflow-hidden sm:block">
                  <Image src={p.images[0].src} alt="" fill sizes="128px" quality={70} className="object-cover" />
                </span>
                <span>
                  <span className="block text-[clamp(1.3rem,2.4vw,2.1rem)] font-normal leading-tight tracking-[-0.03em] transition-colors group-hover:text-brass">{p.name}</span>
                  <span className="mt-1 block text-[14px] text-bone/60">{p.summary}</span>
                </span>
                <ArrowUpRight aria-hidden="true" size={22} strokeWidth={1} className="hidden text-bone/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brass sm:block" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="rv" className="shell pb-24">
          <div className="grid items-end gap-6 border-t border-line pt-10 md:grid-cols-12">
            <h2 id="rv" className="headline text-[clamp(1.8rem,3vw,2.8rem)] md:col-span-6">Isprobajte izgled u prostoriji</h2>
            <p className="caption md:col-span-5 md:col-start-8">Ilustrativni prikazi u vizualizatoru — nisu konkretni proizvodi.</p>
          </div>
          <ul className="mt-8 flex flex-wrap gap-4">
            {related.map((p) => (
              <li key={p.id}>
                <Link href={`/vizualizator?pod=${p.id}`} className="group flex items-center gap-3 border border-line p-2 pr-4 hover:border-line-strong">
                  <span className="relative block h-12 w-12 overflow-hidden"><Image src={p.swatch} alt="" fill sizes="48px" className="object-cover" /></span>
                  <span className="text-[14px]">{p.name}</span>
                  <ArrowUpRight aria-hidden="true" size={14} strokeWidth={1.25} className="text-brass" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <nav aria-label="Ostale kolekcije" className="shell grid border-l border-t border-line pb-0 sm:grid-cols-3">
        {others.map((o) => (
          <Link key={o.slug} href={`/kolekcije/${o.slug}`} className="group flex items-center justify-between border-b border-r border-line p-6 text-[15px] hover:text-brass">
            <span><span className="caption mr-3">{o.index}</span>{o.name}</span>
            <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1} />
          </Link>
        ))}
      </nav>
      <div className="h-24" />
    </>
  );
}
