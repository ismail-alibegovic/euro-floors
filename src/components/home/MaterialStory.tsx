import Image from "next/image";
import { SplitText } from "../SplitText";

const P = "/images/photos";

export function MaterialStory() {
  return (
    <section aria-labelledby="mat-title" className="pt-24 md:pt-36">
      <div className="shell">
        <div className="grid border-l border-t border-line md:grid-cols-12">
          {/* Title cell */}
          <div className="flex flex-col justify-between gap-10 border-b border-r border-line p-6 md:col-span-7 md:p-10">
            <SplitText as="h2" id="mat-title" lines={["Svaki detalj.", "Prirodno drugačiji."]} className="headline" />
            <p data-reveal="" className="max-w-[42ch] text-[15px] text-bone/70">
              Tekstura, ton i karakter drveta oblikuju atmosferu prostora. Nijedan god se ne ponavlja — zato izbor poda počinje izbliza.
            </p>
          </div>
          <Cell className="md:col-span-5" src={`${P}/macro-walnut-planks.jpg`} alt="Široke daske tamnog drveta s izraženim godovima i čvorovima" ratio="aspect-[4/3]" label="Godovi i čvorovi" />

          <Cell className="md:col-span-4" src={`${P}/macro-herringbone.jpg`} alt="Hrastove lamele složene u ribljoj kosti" ratio="aspect-[4/5]" label="Riblja kost" />
          <Cell className="md:col-span-4" src={`${P}/macro-planks.jpg`} alt="Rubovi dasaka pod kosim svjetlom" ratio="aspect-[4/5]" label="Rub i spoj" delay={120} />
          <div className="flex flex-col justify-between gap-8 border-b border-r border-line p-6 md:col-span-4 md:p-8">
            <p data-reveal="" className="text-[clamp(1.2rem,1.7vw,1.6rem)] font-normal leading-snug tracking-[-0.015em] text-bone/90">
              Masivni pod se brusi, polira i lakira na licu mjesta. Seljački pod može biti bajcan, lakiran, uljen ili voskiran.
            </p>
            <p className="caption" data-reveal="">Obnova seljačkog poda: svakih 15 – 20 godina.</p>
          </div>

          <Cell className="md:col-span-5" src={`${P}/macro-dark-herringbone.jpg`} alt="Tamni parket u ribljoj kosti u polumračnoj spavaćoj sobi" ratio="aspect-[4/5] md:aspect-[5/6]" label="Tamni tonovi" />
          <Cell className="md:col-span-7" src={`${P}/gal-shadow-wood.jpg`} alt="Sjene prozora na drvenoj površini" ratio="aspect-[4/3] md:aspect-[7/6]" label="Svjetlo i sjena" delay={120} />
        </div>
      </div>
    </section>
  );
}

function Cell({ src, alt, ratio, label, className = "", delay = 0 }: { src: string; alt: string; ratio: string; label: string; className?: string; delay?: number }) {
  return (
    <figure className={`relative border-b border-r border-line p-4 md:p-6 ${className}`}>
      <div className={`relative overflow-hidden ${ratio}`} data-curtain="" style={{ ["--d" as string]: `${delay}ms` }}>
        <Image src={src} alt={alt} fill sizes="(min-width:768px) 40vw, 100vw" quality={75} className="object-cover" />
      </div>
      <figcaption className="caption mt-3">{label}</figcaption>
    </figure>
  );
}
