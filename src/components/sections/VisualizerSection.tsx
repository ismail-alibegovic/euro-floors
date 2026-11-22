import { SectionHead } from "./SectionHead";
import { LazyVisualizer } from "./LazyVisualizer";

/** #vizualizator — the full interactive tool (room + material picker + before/after). */
export function VisualizerSection() {
  return (
    <section id="vizualizator" aria-labelledby="vizualizator-title" className="anchor border-b border-line">
      <SectionHead
        index="02"
        titleId="vizualizator-title"
        title={["Vaš prostor.", "Vaš pod."]}
        lead="Jedan prostor. Bezbroj mogućnosti. Uporedite različite vrste parketa i pronađite pod koji najbolje odgovara vašem enterijeru."
      />
      <div className="shell px-0 sm:px-[var(--gutter)]">
        <LazyVisualizer />
      </div>
      <div className="shell grid gap-10 py-16 md:grid-cols-12 md:py-24">
        <h3 className="text-[clamp(1.6rem,2.6vw,2.4rem)] font-normal leading-[1] tracking-[-0.04em] md:col-span-4">Kako nastaje prikaz</h3>
        <ol className="md:col-span-7 md:col-start-6">
          {[
            ["Ista fotografija", "Sve varijante polaze od iste fotografije prostorije. Kamera, namještaj, zidovi i svjetlo ostaju identični."],
            ["Samo pod", "Maska poda odvaja površinu poda od namještaja, tepiha i zidova. Sve izvan maske ostaje netaknuto."],
            ["Stvarno drvo u perspektivi", "Fotografije stvarnog drveta slažu se u daske ili riblju kost i projiciraju u perspektivu poda, a postojeće sjene i svjetlo prenose se na novu površinu."],
          ].map(([t, d], i) => (
            <li key={t} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-line py-6 sm:grid-cols-[3rem_1fr]" data-reveal="" style={{ ["--d" as string]: `${i * 100}ms` }}>
              <span className="caption pt-1">{i + 1}</span>
              <div>
                <p className="text-[1.25rem] font-light tracking-[-0.02em]">{t}</p>
                <p className="mt-2 text-[14.5px] text-bone/65">{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
