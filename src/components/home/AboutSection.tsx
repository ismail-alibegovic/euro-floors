import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/** Section 02 — the reference's "About" band: label + arrow on the left, one justified statement. */
export function AboutSection() {
  return (
    <section aria-labelledby="about-title" className="border-b border-line">
      <div className="grid lg:grid-cols-[22fr_78fr]">
        <div className="flex items-start justify-between gap-6 border-line px-[var(--gutter)] pb-4 pt-12 lg:flex-col lg:justify-start lg:gap-8 lg:border-r lg:px-[5%] lg:pt-16">
          <h2 id="about-title" className="text-[13px] text-brass sm:text-[12px] sm:text-bone/85">O Euro-Floorsu</h2>
          <Link href="/o-nama" aria-label="Saznajte više o nama" className="-m-3 flex h-11 w-11 items-center justify-center text-bone/75 transition-transform hover:-translate-y-0.5 hover:translate-x-0.5 hover:text-brass">
            <ArrowUpRight size={18} strokeWidth={1} />
          </Link>
        </div>
        <div className="relative px-[var(--gutter)] pb-6 pt-6 lg:px-[3.2%] lg:pb-8 lg:pt-14">
          <p
            lang="bs"
            data-reveal=""
            className="text-[clamp(1.55rem,3.05vw,3.3rem)] leading-[1.13] tracking-[-0.03em] text-bone lg:text-justify lg:[hyphens:auto]"
          >
            Euro-Floors je sarajevska firma za prodaju i ugradnju parketa i laminata. Vjerujemo da dobar pod ne treba biti
            komplikovan izbor — od masivnog i seljačkog poda do bambusa, merbaua i garape, biramo, ugrađujemo i obrađujemo
            ga do posljednje lajsne.
          </p>
          <span aria-hidden="true" className="index-num mt-10 block lg:mt-14">02</span>
        </div>
      </div>
    </section>
  );
}
