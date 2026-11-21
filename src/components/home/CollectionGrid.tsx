import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories, type Category } from "@/data/catalog";
import { SectionIntro } from "../SectionIntro";

function Card({ c, variant }: { c: Category; variant: "tall" | "small" | "wide" }) {
  const ratio = variant === "tall" ? "aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[640px]" : variant === "wide" ? "aspect-[16/9] lg:aspect-[21/9]" : "aspect-[4/3]";
  return (
    <Link
      href={`/kolekcije/${c.slug}`}
      className={`group relative flex h-full flex-col p-4 md:p-6 ${variant === "wide" ? "lg:grid lg:grid-cols-12 lg:gap-6" : ""}`}
    >
      <div className={`media-zoom relative overflow-hidden ${ratio} ${variant === "wide" ? "lg:col-span-8" : ""} ${variant === "tall" ? "flex-1" : ""}`} data-curtain="">
        <Image
          src={c.image.src}
          alt={c.image.alt}
          fill
          sizes={variant === "tall" ? "(min-width:1024px) 58vw, 100vw" : variant === "wide" ? "(min-width:1024px) 66vw, 100vw" : "(min-width:1024px) 42vw, 100vw"}
          quality={75}
          className="object-cover"
        />
      </div>
      <div className={`mt-5 flex items-start justify-between gap-6 ${variant === "wide" ? "lg:col-span-4 lg:mt-0 lg:flex-col lg:justify-between" : ""}`}>
        <div>
          <span className="caption block">{c.index}</span>
          <h3 className="mt-1 text-[clamp(1.3rem,2vw,1.9rem)] font-normal uppercase leading-[1.02] tracking-[-0.03em] transition-colors duration-500 group-hover:text-brass">
            {c.name}
          </h3>
          <p className="mt-3 max-w-[38ch] text-[14px] text-bone/65 transition-colors duration-500 group-hover:text-bone/85">{c.short}</p>
        </div>
        <ArrowUpRight
          aria-hidden="true"
          size={22}
          strokeWidth={1}
          className="mt-1 shrink-0 text-bone/60 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brass"
        />
      </div>
    </Link>
  );
}

export function CollectionGrid() {
  const [a, b, c, d] = categories;
  return (
    <section aria-labelledby="col-title" className="pt-24 md:pt-36">
      <div className="shell">
        <SectionIntro
          index="02"
          id="col-title"
          align="left"
          title={["Materijali koji", "pričaju priču."]}
          aside="Četiri porodice podova iz naše ponude — od punog drveta do laminata."
        />
        <div className="grid border-b border-l border-line lg:grid-cols-12">
          <div className="border-r border-t border-line lg:col-span-7 lg:row-span-2">
            <Card c={a} variant="tall" />
          </div>
          <div className="border-r border-t border-line lg:col-span-5">
            <Card c={b} variant="small" />
          </div>
          <div className="border-r border-t border-line lg:col-span-5">
            <Card c={c} variant="small" />
          </div>
          <div className="border-r border-t border-line lg:col-span-12">
            <Card c={d} variant="wide" />
          </div>
        </div>
      </div>
    </section>
  );
}
