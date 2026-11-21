import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gallery } from "@/data/gallery";
import { ProjectGallery } from "../ProjectGallery";
import { SectionIntro } from "../SectionIntro";

export function GallerySection() {
  return (
    <section aria-labelledby="gal-title" className="pt-24 md:pt-36">
      <div className="shell">
        <SectionIntro
          index="04"
          id="gal-title"
          title={["Prostori koji", "ostavljaju utisak."]}
          aside={
            <Link href="/projekti" className="link-arrow text-bone/80">
              Pogledajte sve <ArrowUpRight size={14} strokeWidth={1.25} className="text-brass" />
            </Link>
          }
          lead={
            <>
              Galerija inspiracije. <span className="text-mute">Licencirane ilustrativne fotografije — nisu radovi Euro-Floorsa. Reference naših radova su u pripremi.</span>
            </>
          }
        />
        <ProjectGallery items={gallery} />
      </div>
    </section>
  );
}
