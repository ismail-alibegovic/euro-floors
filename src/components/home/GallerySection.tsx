import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gallery } from "@/data/gallery";
import { ProjectGallery } from "../ProjectGallery";

/** Section 04, after the reference's "Designed by Formaia": centred title, link left, number right, then the 3×3 grid. */
export function GallerySection() {
  return (
    <section aria-labelledby="gal-title" className="shell">
      <div className="relative grid grid-cols-[1fr_auto] items-end gap-y-8 pb-10 pt-20 md:grid-cols-[1fr_auto_1fr] md:pb-[clamp(2.5rem,3.5vw,3.5rem)] md:pt-[clamp(3.5rem,6vw,6.5rem)]">
        <div className="order-3 md:order-1">
          <Link href="/projekti" className="group inline-flex items-center gap-3 py-3 text-[12px] text-bone/90">
            Pogledajte sve
            <ArrowUpRight size={18} strokeWidth={1} className="text-brass transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="order-1 col-span-2 md:order-2 md:col-span-1 md:text-center">
          <h2 id="gal-title" className="headline" data-reveal="">
            <span className="block">Galerija</span>
            <span className="block">inspiracije</span>
          </h2>
          <p data-reveal="" style={{ ["--d" as string]: "200ms" }} className="mt-[clamp(2rem,4vw,3.75rem)] max-w-[34ch] text-[12.5px] leading-[1.42] text-bone/80 md:mx-auto">
            Odabrani prostori u kojima drvo nosi atmosferu. Ilustrativne fotografije — ne radovi Euro-Floorsa.
          </p>
        </div>
        <span aria-hidden="true" className="index-num order-4 justify-self-end md:order-3" data-reveal="">04</span>
      </div>
      <ProjectGallery items={gallery} />
    </section>
  );
}
