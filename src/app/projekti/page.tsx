import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { gallery } from "@/data/gallery";
import { site } from "@/data/site";
import { PageHeader } from "@/components/PageHeader";
import { ProjectGallery } from "@/components/ProjectGallery";

export const metadata: Metadata = {
  title: "Projekti i inspiracija",
  description: "Galerija inspiracije za drvene podove: riblja kost, široki brodovi, svijetli i tamni tonovi.",
  alternates: { canonical: "/projekti" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        kicker="Projekti"
        title={["Prostori koji", "ostavljaju utisak."]}
        lead={
          <>
            Galerija inspiracije: licencirane ilustrativne fotografije, a ne radovi Euro-Floorsa. Reference naših radova su u pripremi — do tada ih pratite na{" "}
            <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="link-arrow text-bone">
              Facebook stranici <ArrowUpRight size={14} strokeWidth={1.25} className="text-brass" />
            </a>
          </>
        }
      />
      <section aria-label="Galerija inspiracije" className="shell py-16 pb-28">
        <ProjectGallery
          items={gallery}
          layout={[
            { kind: "img", item: 0 },
            { kind: "text", text: "Riblja kost vodi pogled kroz prostor i daje mu ritam.", arrow: true },
            { kind: "img", item: 1, soft: true },
            { kind: "img", item: 2 },
            { kind: "img", item: 3 },
            { kind: "text", text: "Široki brodovi smiruju prostor i ističu godove.", arrow: true, href: "/kolekcije" },
            { kind: "img", item: 4 },
            { kind: "img", item: 5 },
            { kind: "img", item: 6, soft: true },
            { kind: "img", item: 7 },
            { kind: "img", item: 8 },
            { kind: "text", text: "Isprobajte tonove i uzorke u istom prostoru.", arrow: true, href: "/vizualizator" },
          ]}
        />
      </section>
    </>
  );
}
