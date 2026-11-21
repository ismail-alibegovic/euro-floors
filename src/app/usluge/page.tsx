import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { PageHeader } from "@/components/PageHeader";
import { ServicesAccordion } from "@/components/ServicesAccordion";

export const metadata: Metadata = {
  title: "Usluge — ugradnja parketa Sarajevo, brušenje i lakiranje",
  description:
    "Ugradnja parketa u Sarajevu: masivni i seljački pod, gotovi višeslojni parket, egzotični parketi, laminat, PVC, pluto, itison i lajsne. Brušenje, poliranje, lakiranje i nabavka materijala.",
  alternates: { canonical: "/usluge" },
};

const steps = [
  ["Razgovor i izbor", "Namjena prostora, postojeća podloga i željeni izgled."],
  ["Nabavka", "Materijal po vašoj želji i izboru."],
  ["Ugradnja", "Postavljanje lijepljenjem ili plivajuće, uz lajsne."],
  ["Obrada", "Brušenje, poliranje, lakiranje, uljenje — gdje pod to traži."],
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        kicker="Usluge"
        title={["Od izbora", "do ugradnje."]}
        lead="Ugrađujemo i obrađujemo podove od punog drveta, gotove višeslojne i egzotične parkete, laminat i ostale podne obloge."
        image={{ src: "/images/photos/gal-shadow-wood.jpg", alt: "Sunčeve pruge na drvenoj površini", position: "object-center" }}
      />
      <section aria-labelledby="proc" className="shell py-20 md:py-28">
        <h2 id="proc" className="kicker mb-8">Tok posla</h2>
        <ol className="grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([t, d], i) => (
            <li key={t} className="flex min-h-[220px] flex-col justify-between border-b border-r border-line p-6" data-reveal="" style={{ ["--d" as string]: `${i * 90}ms` }}>
              <span className="index-num text-[4.5rem]">{i + 1}</span>
              <div>
                <p className="text-[1.35rem] font-light tracking-[-0.02em]">{t}</p>
                <p className="mt-2 text-[14px] text-bone/60">{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section aria-labelledby="all" className="shell pb-28">
        <h2 id="all" className="kicker mb-6">Sve usluge</h2>
        <ServicesAccordion items={services} initialOpen={null} />
        <div className="mt-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <p className="max-w-[46ch] text-[15px] text-bone/70">Ne znate koja je usluga prava za vaš prostor? Opišite nam stanje poda i željeni rezultat.</p>
          <Link href="/kontakt" className="btn btn-solid">Zatražite ponudu <ArrowUpRight size={18} strokeWidth={1.25} /></Link>
        </div>
      </section>
    </>
  );
}
