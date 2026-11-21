import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FloorVisualizer } from "@/components/FloorVisualizer";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Vizualizator poda — isprobajte parket u prostoriji",
  description:
    "Uporedite svijetli i prirodni hrast, tamni orah, riblju kost, rustikalni hrast i bambus u istoj prostoriji. Mijenja se samo pod.",
  alternates: { canonical: "/vizualizator" },
};

export default async function VisualizerPage({ searchParams }: { searchParams: Promise<{ pod?: string }> }) {
  const { pod } = await searchParams;
  return (
    <>
      <PageHeader
        kicker="Vizualizator"
        title={["Vaš prostor.", "Vaš pod."]}
        lead="Jedan prostor. Bezbroj mogućnosti. Uporedite različite vrste parketa i pronađite pod koji najbolje odgovara vašem enterijeru."
      />
      <section aria-label="Vizualizator poda" className="shell px-0 sm:px-[var(--gutter)]">
        <FloorVisualizer headingId="viz-page" initial={pod} />
      </section>

      <section aria-labelledby="how" className="shell grid gap-12 py-24 md:grid-cols-12 md:py-32">
        <div className="md:col-span-4">
          <h2 id="how" className="headline text-[clamp(2rem,3.6vw,3.4rem)]">Kako nastaje prikaz</h2>
        </div>
        <ol className="md:col-span-7 md:col-start-6">
          {[
            ["Ista fotografija", "Sve varijante polaze od iste fotografije prostorije. Kamera, namještaj, zidovi i svjetlo ostaju identični."],
            ["Samo pod", "Maska poda odvaja površinu poda od namještaja, tepiha i zidova. Sve izvan maske ostaje netaknuto."],
            ["Stvarno drvo u perspektivi", "Fotografije stvarnog drveta slažu se u daske ili riblju kost i projiciraju u perspektivu poda, a postojeće sjene i svjetlo prenose se na novu površinu."],
          ].map(([t, d], i) => (
            <li key={t} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line py-6" data-reveal="" style={{ ["--d" as string]: `${i * 100}ms` }}>
              <span className="caption pt-1">{i + 1}</span>
              <div>
                <p className="text-[1.3rem] font-light tracking-[-0.02em]">{t}</p>
                <p className="mt-2 text-[14.5px] text-bone/65">{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="soon" className="shell pb-28">
        <div className="grid items-center gap-8 border border-dashed border-line-strong p-6 md:grid-cols-12 md:p-10">
          <div className="relative aspect-[4/3] overflow-hidden md:col-span-4">
            <Image src="/images/photos/gal-doorway.jpg" alt="" fill sizes="(min-width:768px) 30vw, 90vw" quality={60} className="object-cover opacity-40 grayscale" />
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <p className="kicker text-brass">Uskoro</p>
            <h2 id="soon" className="mt-3 text-[clamp(1.6rem,2.6vw,2.4rem)] font-normal tracking-[-0.03em]">Isprobavanje na fotografiji vašeg prostora</h2>
            <p className="mt-3 max-w-[52ch] text-[14.5px] text-bone/65">
              Ova mogućnost još nije dostupna. Do tada nam fotografiju prostorije pošaljite e-mailom na info@euro-floors.ba, a mi ćemo predložiti odgovarajući pod.
            </p>
            <Link href="/kontakt" className="link-arrow mt-5 text-bone">
              Pošaljite upit <ArrowUpRight size={15} strokeWidth={1.25} className="text-brass" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
