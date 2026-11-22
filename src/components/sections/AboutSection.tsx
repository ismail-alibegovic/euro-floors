import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { gallery } from "@/data/gallery";
import { site } from "@/data/site";
import { AnchorLink } from "../AnchorLink";
import { ProjectGallery } from "../ProjectGallery";
import { SectionHead } from "./SectionHead";

const pillars = [
  ["Kvalitet drveta", "Drvo je čvrsto, izdržljivo i prilagodljivo, a estetski raznoliko. Zato drveni pod smatramo dugoročnom investicijom."],
  ["Kompletna obrada", "Masivni pod postavljamo, brusimo, poliramo i lakiramo. Seljački pod bajcamo, lakiramo, uljimo ili voskiramo."],
  ["Nabavka po izboru", "Materijal nabavljamo prema vašoj želji i izboru — od vrste drveta do lajsni."],
];

/** #o-nama — who we are, what sets the work apart, and the inspiration gallery (#projekti). */
export function AboutSection() {
  return (
    <section id="o-nama" aria-labelledby="o-nama-title" className="anchor border-b border-line">
      <SectionHead index="04" titleId="o-nama-title" title={["Podovi su više", "od površine."]} />

      <div className="grid lg:grid-cols-[22fr_78fr]">
        <div className="hidden lg:block" />
        <div className="px-[var(--gutter)] pb-14 lg:px-[3.2%] lg:pb-20">
          <p
            lang="bs"
            data-reveal=""
            className="text-[clamp(1.4rem,2.7vw,3rem)] leading-[1.14] tracking-[-0.03em] text-bone lg:text-justify lg:[hyphens:auto]"
          >
            Euro-Floors je sarajevska firma iz Velešića koja se bavi prodajom i ugradnjom parketa i laminata. Vjerujemo da dobar pod ne treba biti
            komplikovan izbor — od masivnog i seljačkog poda do bambusa, merbaua i garape, biramo, ugrađujemo i obrađujemo ga do posljednje lajsne.
          </p>
          <p className="mt-8 max-w-[62ch] text-[15px] leading-relaxed text-bone/70 sm:text-[16px]">
            Radimo s masivnim parketom — klasičnim, lamelnim i seljačkim podom — s gotovim višeslojnim parketom, egzotičnim vrstama
            (bambus, merbau, garapa) i laminatom. Ugrađujemo i PVC pod, pluto, itison, tepison te lajsne svih oblika.
          </p>
        </div>
      </div>

      <div className="border-t border-line">
        <ul className="shell grid md:grid-cols-3">
          {pillars.map(([t, d], i) => (
            <li key={t} className="border-b border-line py-8 last:border-b-0 md:border-b-0 md:border-r md:px-8 md:py-12 md:first:pl-0 md:last:border-r-0" data-reveal="" style={{ ["--d" as string]: `${i * 100}ms` }}>
              <h3 className="text-[1.3rem] font-light tracking-[-0.02em]">{t}</h3>
              <p className="mt-3 text-[14.5px] text-bone/65">{d}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="shell grid items-center gap-10 border-t border-line py-16 md:grid-cols-12 md:gap-12 md:py-24">
        <div className="relative aspect-[4/3] overflow-hidden md:col-span-5 md:aspect-[4/5]" data-curtain="">
          <Image src="/images/photos/macro-walnut-planks.jpg" alt="Široke drvene daske s izraženim godovima" fill sizes="(min-width:768px) 40vw, 100vw" quality={75} className="object-cover" />
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <h3 className="section-title">Posjetite nas ili pozovite.</h3>
          <dl className="mt-8 border-t border-line text-[15px]">
            <div className="flex justify-between gap-6 border-b border-line py-4"><dt className="text-mute">Lokacija</dt><dd className="text-right">{site.area}, {site.city}</dd></div>
            <div className="flex justify-between gap-6 border-b border-line py-4"><dt className="text-mute">Radno vrijeme</dt><dd className="text-right">{site.hours}</dd></div>
            <div className="flex justify-between gap-6 border-b border-line py-4"><dt className="text-mute">Telefon</dt><dd className="text-right">{site.phones.map((p) => <a key={p.href} href={p.href} className="block py-0.5 hover:text-brass">{p.label}</a>)}</dd></div>
          </dl>
          <AnchorLink id="kontakt" className="btn btn-solid mt-8 w-full sm:w-auto">
            Zatražite ponudu <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.25} />
          </AnchorLink>
        </div>
      </div>

      {/* Inspiration gallery — licensed stock photographs, labelled as such */}
      <div id="projekti" className="anchor border-t border-line pb-20 pt-14 sm:pb-24">
        <div className="shell">
          <h3 className="section-title max-w-[18ch]">Prostori koji ostavljaju utisak.</h3>
          <p className="section-lead mt-5 max-w-[60ch]">
            Galerija inspiracije: licencirane ilustrativne fotografije, a ne radovi Euro-Floorsa. Reference naših radova su u pripremi — do tada ih pratite na{" "}
            <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="link-arrow text-bone">
              Facebook stranici <ArrowUpRight aria-hidden="true" size={14} strokeWidth={1.25} className="text-brass" />
            </a>
          </p>
          <div className="mt-10">
            <ProjectGallery
              items={gallery}
              layout={[
                { kind: "img", item: 0 },
                { kind: "text", text: "Riblja kost vodi pogled kroz prostor i daje mu ritam.", arrow: true },
                { kind: "img", item: 1, soft: true },
                { kind: "img", item: 2 },
                { kind: "img", item: 3 },
                { kind: "empty" },
                { kind: "text", text: "Široki brodovi smiruju prostor i ističu godove." },
                { kind: "img", item: 4 },
                { kind: "img", item: 5 },
                { kind: "img", item: 6, soft: true },
                { kind: "img", item: 7 },
                { kind: "img", item: 8 },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
