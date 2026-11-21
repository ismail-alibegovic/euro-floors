import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/** Section 02, after the reference's "About Formaia": a label column and one large justified statement. */
export function AboutSection() {
  return (
    <section aria-labelledby="about-title" className="shell">
      <div className="relative grid border-b border-line md:grid-cols-4">
        <div className="relative flex items-start justify-between gap-6 pb-6 pt-10 md:flex-col md:justify-start md:border-r md:border-line md:py-[clamp(2.5rem,4vw,4rem)] md:pr-8">
          <h2 id="about-title" className="text-[12.5px] text-bone/90">O Euro-Floorsu</h2>
          <Link
            href="/o-nama"
            aria-label="Saznajte više o nama"
            className="group -m-3 flex h-11 w-11 items-center justify-center md:mt-6"
          >
            <ArrowUpRight size={20} strokeWidth={1} className="text-brass transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <span aria-hidden="true" className="index-num absolute bottom-[0.1em] right-[0.18em] hidden md:block" data-reveal="">02</span>
        </div>
        <p
          data-reveal=""
          lang="bs"
          className="pb-12 text-[clamp(1.55rem,3.25vw,3.6rem)] font-normal leading-[1.1] tracking-[-0.032em] [font-variation-settings:'opsz'_32] md:col-span-3 md:py-[clamp(2.5rem,4vw,4rem)] md:pl-[clamp(1.5rem,2.8vw,2.75rem)] md:text-justify md:[hyphens:auto]"
        >
          Euro-Floors iz Sarajeva prodaje i ugrađuje parket i laminat. Vjerujemo da dobar pod ne treba biti
          komplikovan izbor — od masivnog i seljačkog poda do bambusa i merbaua, sve biramo, postavljamo i obrađujemo
          s jednim timom.
        </p>
      </div>
    </section>
  );
}
