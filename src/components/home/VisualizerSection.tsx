import { FloorVisualizer } from "../FloorVisualizer";
import { SectionIntro } from "../SectionIntro";

export function VisualizerSection() {
  return (
    <section id="vizualizator" aria-labelledby="viz-title" className="scroll-mt-20 pt-20 md:pt-28">
      <div className="shell">
        <SectionIntro
          index="01"
          id="viz-title"
          title={["Vaš prostor.", "Vaš pod."]}
          aside={<>Jedan prostor. Bezbroj mogućnosti.</>}
          lead="Uporedite različite vrste parketa i pronađite pod koji najbolje odgovara vašem enterijeru."
        />
      </div>
      <div className="shell mt-0 px-0 sm:px-[var(--gutter)]">
        <FloorVisualizer headingId="viz-home" />
      </div>
    </section>
  );
}
