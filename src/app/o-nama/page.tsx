import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { PageHeader } from "@/components/PageHeader";
import { SplitText } from "@/components/SplitText";

export const metadata: Metadata = {
  title: "O nama",
  description: "Euro-Floors, Velešići, Sarajevo — prodaja i ugradnja parketa i laminata, brušenje, poliranje i lakiranje.",
  alternates: { canonical: "/o-nama" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        kicker="O nama"
        title={["Podovi su više", "od površine."]}
        image={{ src: "/images/photos/about-interior.jpg", alt: "Enterijer s drvenim zidnim oblogama i svijetlim podom", position: "object-[50%_40%]" }}
      />
      <section className="shell grid gap-12 py-20 md:grid-cols-12 md:py-32">
        <p className="kicker md:col-span-3">Ko smo</p>
        <div className="space-y-6 text-[clamp(1.2rem,1.8vw,1.6rem)] font-normal leading-snug tracking-[-0.01em] text-bone/90 md:col-span-8" data-reveal="">
          <p>
            Euro-Floors je sarajevska firma iz Velešića koja se bavi prodajom i ugradnjom parketa i laminata.
          </p>
          <p className="text-bone/70">
            Radimo s masivnim parketom — klasičnim, lamelnim i seljačkim podom — s gotovim višeslojnim parketom, egzotičnim vrstama
            (bambus, merbau, garapa) i laminatom. Ugrađujemo i PVC pod, pluto, itison, tepison te lajsne svih oblika.
          </p>
        </div>
      </section>

      <section className="border-y border-line">
        <div className="shell grid md:grid-cols-3">
          {[
            ["Kvalitet drveta", "Drvo je čvrsto, izdržljivo i prilagodljivo, a estetski raznoliko. Zato drveni pod smatramo dugoročnom investicijom."],
            ["Kompletna obrada", "Masivni pod postavljamo, brusimo, poliramo i lakiramo. Seljački pod bajcamo, lakiramo, uljimo ili voskiramo."],
            ["Nabavka po izboru", "Materijal nabavljamo prema vašoj želji i izboru — od vrste drveta do lajsni."],
          ].map(([t, d], i) => (
            <div key={t} className="border-line py-10 md:border-r md:px-8 md:last:border-r-0 md:first:pl-0" data-reveal="" style={{ ["--d" as string]: `${i * 100}ms` }}>
              <p className="text-[1.4rem] font-light tracking-[-0.02em]">{t}</p>
              <p className="mt-3 text-[14.5px] text-bone/65">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="shell grid items-center gap-12 py-24 md:grid-cols-12 md:py-32">
        <div className="relative aspect-[4/5] overflow-hidden md:col-span-5" data-curtain="">
          <Image src="/images/photos/macro-walnut-planks.jpg" alt="Široke drvene daske s izraženim godovima" fill sizes="(min-width:768px) 40vw, 100vw" quality={75} className="object-cover" />
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <SplitText lines={["Posjetite nas", "ili pozovite."]} className="headline" />
          <dl className="mt-10 border-t border-line text-[15px]">
            <div className="flex justify-between gap-6 border-b border-line py-4"><dt className="text-mute">Lokacija</dt><dd>{site.area}, {site.city}</dd></div>
            <div className="flex justify-between gap-6 border-b border-line py-4"><dt className="text-mute">Radno vrijeme</dt><dd className="text-right">{site.hours}</dd></div>
            <div className="flex justify-between gap-6 border-b border-line py-4"><dt className="text-mute">Telefon</dt><dd className="text-right">{site.phones.map((p) => <a key={p.href} href={p.href} className="block hover:text-brass">{p.label}</a>)}</dd></div>
            <div className="flex justify-between gap-6 border-b border-line py-4"><dt className="text-mute">E-mail</dt><dd><a href={`mailto:${site.email}`} className="hover:text-brass">{site.email}</a></dd></div>
          </dl>
          <Link href="/kontakt" className="btn btn-solid mt-10">Zatražite ponudu <ArrowUpRight size={18} strokeWidth={1.25} /></Link>
        </div>
      </section>
    </>
  );
}
