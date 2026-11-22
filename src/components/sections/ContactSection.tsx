import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { QuoteForm } from "../QuoteForm";
import { SectionHead } from "./SectionHead";

/** #kontakt — inquiry form (validation + /api/upit unchanged) beside the direct contact details. */
export function ContactSection() {
  return (
    <section id="kontakt" aria-labelledby="kontakt-title" className="anchor border-b border-line">
      <SectionHead
        index="06"
        titleId="kontakt-title"
        title={["Imate prostor", "na umu?"]}
        lead="Recite nam šta planirate. Zajedno ćemo pronaći odgovarajući pod."
      />
      <div className="shell grid gap-14 pb-20 pt-4 md:grid-cols-12 md:pb-28 md:pt-8">
        <div className="md:col-span-7">
          <h3 className="kicker mb-8">Upit za ponudu</h3>
          <QuoteForm />
        </div>
        <aside aria-label="Kontakt podaci" className="md:col-span-4 md:col-start-9">
          <h3 className="kicker mb-6">Direktno</h3>
          <dl className="border-t border-line text-[15px]">
            <div className="border-b border-line py-5">
              <dt className="caption">Telefon</dt>
              {site.phones.map((p) => (
                <dd key={p.href}><a href={p.href} className="inline-block py-1 text-[1.3rem] font-normal tracking-[-0.01em] hover:text-brass">{p.label}</a></dd>
              ))}
            </div>
            <div className="border-b border-line py-5">
              <dt className="caption">E-mail</dt>
              <dd><a href={`mailto:${site.email}`} className="inline-block break-all py-1 hover:text-brass">{site.email}</a></dd>
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
                  Otvori u mapama <ArrowUpRight aria-hidden="true" size={14} strokeWidth={1.25} className="text-brass" />
                </a>
              </dd>
            </div>
            <div className="py-5">
              <dt className="caption">Društvene mreže</dt>
              <dd>
                <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="link-arrow mt-1">
                  Facebook <ArrowUpRight aria-hidden="true" size={14} strokeWidth={1.25} className="text-brass" />
                </a>
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
