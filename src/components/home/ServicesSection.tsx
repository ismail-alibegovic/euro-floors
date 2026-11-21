import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { SectionIntro } from "../SectionIntro";
import { ServicesAccordion } from "../ServicesAccordion";

export function ServicesSection() {
  const featured = ["savjetovanje", "nabavka", "masivni-parket", "gotovi-parket", "laminat-i-obloge", "odrzavanje"];
  return (
    <section aria-labelledby="svc-title" className="pt-24 md:pt-36">
      <div className="shell">
        <SectionIntro
          index="03"
          id="svc-title"
          title={["Od izbora", "do ugradnje."]}
          aside={
            <Link href="/usluge" className="link-arrow text-bone/80">
              Sve usluge <ArrowUpRight size={14} strokeWidth={1.25} className="text-brass" />
            </Link>
          }
          lead="Biramo, nabavljamo, postavljamo i obrađujemo — od masivnog parketa do laminata i lajsni."
        />
        <div className="-mt-px">
          <ServicesAccordion items={services.filter((s) => featured.includes(s.slug))} />
        </div>
      </div>
    </section>
  );
}
