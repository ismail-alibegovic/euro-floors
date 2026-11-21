import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/data/catalog";
import { site } from "@/data/site";
import { PageHeader } from "@/components/PageHeader";
import { QuoteForm } from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Kontakt i ponuda",
  description: `Zatražite ponudu za parket ili laminat. Euro-Floors, Velešići, Sarajevo — ${site.phones[0].label}, ${site.email}.`,
  alternates: { canonical: "/kontakt" },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ pod?: string; kategorija?: string; proizvod?: string; poruka?: string }>;
}) {
  const sp = await searchParams;
  // Only accept product names that exist in the catalog.
  const product = sp.proizvod && products.some((p) => p.name === sp.proizvod) ? sp.proizvod : undefined;

  return (
    <>
      <PageHeader kicker="Kontakt" title={["Imate prostor", "na umu?"]} lead="Recite nam šta planirate. Zajedno ćemo pronaći odgovarajući pod." />
      <section id="ponuda" className="shell grid scroll-mt-24 gap-16 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-7">
          <h2 className="kicker mb-8">Upit za ponudu</h2>
          <QuoteForm preset={sp.pod} initialType={sp.kategorija} product={product} message={typeof sp.poruka === "string" ? sp.poruka : undefined} />
        </div>
        <aside className="md:col-span-4 md:col-start-9">
          <h2 className="kicker mb-6">Direktno</h2>
          <dl className="border-t border-line text-[15px]">
            <div className="border-b border-line py-5">
              <dt className="caption">Telefon</dt>
              {site.phones.map((p) => (
                <dd key={p.href}><a href={p.href} className="inline-block py-1 text-[1.3rem] font-normal tracking-[-0.01em] hover:text-brass">{p.label}</a></dd>
              ))}
            </div>
            <div className="border-b border-line py-5">
              <dt className="caption">E-mail</dt>
              <dd><a href={`mailto:${site.email}`} className="inline-block py-1 hover:text-brass">{site.email}</a></dd>
            </div>
            <div className="border-b border-line py-5">
              <dt className="caption">Radno vrijeme</dt>
              <dd className="py-1">{site.hours}</dd>
            </div>
            <div className="border-b border-line py-5">
              <dt className="caption">Lokacija</dt>
              <dd className="py-1">{site.area}, {site.city}</dd>
              <dd>
                <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="link-arrow mt-1 text-bone/80">
                  Otvori u mapama <ArrowUpRight size={14} strokeWidth={1.25} className="text-brass" />
                </a>
              </dd>
            </div>
            <div className="py-5">
              <dt className="caption">Društvene mreže</dt>
              <dd>
                <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="link-arrow mt-1">
                  Facebook <ArrowUpRight size={14} strokeWidth={1.25} className="text-brass" />
                </a>
              </dd>
            </div>
          </dl>
        </aside>
      </section>
    </>
  );
}
