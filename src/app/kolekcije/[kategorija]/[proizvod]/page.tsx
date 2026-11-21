import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Phone } from "lucide-react";
import { getCategory, getProduct, products, productsIn } from "@/data/catalog";
import { site } from "@/data/site";
import { ProductGallery } from "@/components/ProductGallery";
import { SplitText } from "@/components/SplitText";

export function generateStaticParams() {
  return products.map((p) => ({ kategorija: p.category, proizvod: p.slug }));
}

type Params = { params: Promise<{ kategorija: string; proizvod: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { kategorija, proizvod } = await params;
  const p = getProduct(kategorija, proizvod);
  if (!p) return {};
  return { title: p.name, description: `${p.summary} ${p.description[0]}`, alternates: { canonical: `/kolekcije/${p.category}/${p.slug}` } };
}

export default async function ProductPage({ params }: Params) {
  const { kategorija, proizvod } = await params;
  const p = getProduct(kategorija, proizvod);
  const c = getCategory(kategorija);
  if (!p || !c) notFound();
  const siblings = productsIn(c.slug).filter((x) => x.slug !== p.slug);

  return (
    <article className="pt-[var(--header-h)]">
      <div className="shell pt-10">
        <nav aria-label="Putanja" className="text-[12.5px] text-mute">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/kolekcije" className="py-1 hover:text-bone">Kolekcije</Link></li>
            <li aria-hidden="true" className="text-bone/25">/</li>
            <li><Link href={`/kolekcije/${c.slug}`} className="py-1 hover:text-bone">{c.name}</Link></li>
            <li aria-hidden="true" className="text-bone/25">/</li>
            <li aria-current="page" className="text-bone/80">{p.name}</li>
          </ol>
        </nav>
      </div>

      <div className="shell grid gap-12 py-10 lg:grid-cols-12 lg:gap-16 lg:py-14">
        <div className="lg:col-span-7">
          <ProductGallery images={p.images} />
        </div>
        <div className="lg:col-span-5">
          <p className="kicker">{c.name}</p>
          <SplitText as="h1" lines={[p.name]} className="headline mt-4 text-[clamp(2.4rem,4.4vw,4.4rem)]" />
          <div className="mt-6 space-y-4 text-[15.5px] leading-relaxed text-bone/80">
            {p.description.map((d, i) => <p key={i}>{d}</p>)}
          </div>

          <h2 className="kicker mt-12">Specifikacije</h2>
          <dl className="mt-4 border-t border-line text-[14px]">
            {p.specs.map((s) => (
              <div key={s.label} className="grid grid-cols-[9rem_1fr] gap-4 border-b border-line py-3.5">
                <dt className="text-mute">{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
          {p.finishes && (
            <>
              <h2 className="kicker mt-10">Dostupne završne obrade</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {p.finishes.map((f) => <li key={f} className="border border-line px-3 py-1.5 text-[13px] text-bone/80">{f}</li>)}
              </ul>
            </>
          )}
          <p className="caption mt-6">Navedeni su samo podaci koje objavljujemo u ponudi. Dimenzije, proizvođača i cijenu potvrđujemo uz ponudu.</p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href={`/kontakt?kategorija=${c.slug}&proizvod=${encodeURIComponent(p.name)}`} className="btn btn-solid flex-1">
              Pošaljite upit <ArrowUpRight size={18} strokeWidth={1.25} />
            </Link>
            <a href={site.phones[0].href} className="btn">
              <Phone size={16} strokeWidth={1.25} /> {site.phones[0].label}
            </a>
          </div>
        </div>
      </div>

      {siblings.length > 0 && (
        <section aria-labelledby="sib" className="shell pb-28 pt-10">
          <h2 id="sib" className="kicker mb-6">Još iz kolekcije {c.name.toLowerCase()}</h2>
          <ul className="border-t border-line">
            {siblings.map((s) => (
              <li key={s.slug} className="border-b border-line">
                <Link href={`/kolekcije/${c.slug}/${s.slug}`} className="group flex items-center justify-between gap-4 py-5">
                  <span className="text-[clamp(1.2rem,2vw,1.7rem)] font-normal tracking-[-0.02em] group-hover:text-brass">{s.name}</span>
                  <ArrowUpRight aria-hidden="true" size={20} strokeWidth={1} className="text-bone/50 group-hover:text-brass" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
