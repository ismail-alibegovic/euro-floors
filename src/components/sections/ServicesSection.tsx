import { services } from "@/data/services";
import { ArrowUpRight } from "lucide-react";
import { AnchorLink } from "../AnchorLink";
import { ServicesAccordion } from "../ServicesAccordion";
import { SectionHead } from "./SectionHead";

const steps = [
  ["Razgovor i izbor", "Namjena prostora, postojeća podloga i željeni izgled."],
  ["Nabavka", "Materijal po vašoj želji i izboru."],
  ["Ugradnja", "Postavljanje lijepljenjem ili plivajuće, uz lajsne."],
  ["Obrada", "Brušenje, poliranje, lakiranje, uljenje — gdje pod to traži."],
];

/** #usluge — the work flow, then every service as an expandable row (full text + photo kept). */
export function ServicesSection() {
  return (
    <section id="usluge" aria-labelledby="usluge-title" className="anchor border-b border-line">
      <SectionHead
        index="03"
        titleId="usluge-title"
        title={["Od izbora", "do ugradnje."]}
        lead="Ugrađujemo i obrađujemo podove od punog drveta, gotove višeslojne i egzotične parkete, laminat i ostale podne obloge."
      />
      <div className="shell">
        <h3 className="kicker mb-6">Tok posla</h3>
        <ol className="grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([t, d], i) => (
            <li key={t} className="flex min-h-[170px] flex-col justify-between border-b border-r border-line p-5 sm:min-h-[220px] sm:p-6" data-reveal="" style={{ ["--d" as string]: `${i * 90}ms` }}>
              <span aria-hidden="true" className="index-num text-[3.5rem] sm:text-[4.5rem]">{i + 1}</span>
              <div>
                <p className="text-[1.25rem] font-light tracking-[-0.02em]">{t}</p>
                <p className="mt-2 text-[14px] text-bone/60">{d}</p>
              </div>
            </li>
          ))}
        </ol>

        <h3 className="kicker mb-6 mt-16">Sve usluge</h3>
        <ServicesAccordion items={services} initialOpen={null} />
        <div className="flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center">
          <p className="max-w-[46ch] text-[15px] text-bone/70">Ne znate koja je usluga prava za vaš prostor? Opišite nam stanje poda i željeni rezultat.</p>
          <AnchorLink id="kontakt" className="btn btn-solid w-full sm:w-auto">
            Zatražite ponudu <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.25} />
          </AnchorLink>
        </div>
      </div>
    </section>
  );
}
