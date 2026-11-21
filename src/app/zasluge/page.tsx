import type { Metadata } from "next";
import { credits } from "@/data/credits";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Zasluge za fotografije",
  description: "Izvori fotografija korištenih na stranici.",
  robots: { index: false },
};

export default function CreditsPage() {
  return (
    <>
      <PageHeader
        kicker="Zasluge"
        title={["Fotografije"]}
        lead="Fotografije na ovoj stranici su ilustrativne i koriste se pod Unsplash licencom. Nisu fotografije radova Euro-Floorsa. Prikazi u vizualizatoru nastali su prenošenjem fotografija stvarnog drveta na pod jedne referentne prostorije."
      />
      <section className="shell py-16 pb-28">
        <ul className="border-t border-line text-[14px]">
          {credits.map((c) => (
            <li key={c.file} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[1fr_1fr_auto] sm:gap-6">
              <span className="text-bone/80">{c.use}</span>
              <a href={c.authorUrl} target="_blank" rel="noopener noreferrer" className="text-bone hover:text-brass">{c.author}</a>
              <a href={c.photoUrl} target="_blank" rel="noopener noreferrer" className="text-mute hover:text-bone">Unsplash ↗</a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
