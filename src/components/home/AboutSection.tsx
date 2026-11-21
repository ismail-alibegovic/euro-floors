import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SplitText } from "../SplitText";

export function AboutSection() {
  return (
    <section aria-labelledby="about-title" className="mt-24 md:mt-36">
      <div className="shell">
        <div className="grid border-y border-line md:grid-cols-12">
          <div className="flex flex-row items-start justify-between gap-6 border-line py-8 md:col-span-3 md:flex-col md:border-r md:py-12 md:pr-8">
            <p className="text-[13px] text-bone/80">O Euro-Floorsu</p>
            <Link href="/o-nama" aria-label="Saznajte više o nama" className="flex h-11 w-11 items-center justify-center text-bone/70 transition-transform hover:-translate-y-0.5 hover:translate-x-0.5 hover:text-brass md:-ml-3">
              <ArrowUpRight size={20} strokeWidth={1} />
            </Link>
          </div>
          <p
            data-reveal=""
            className="pb-10 text-[clamp(1.45rem,2.75vw,2.75rem)] leading-[1.12] tracking-[-0.035em] md:col-span-9 md:py-12 md:pl-10 md:text-justify md:[hyphens:auto]"
            lang="bs"
          >
            Euro-Floors iz Sarajeva prodaje i ugrađuje parket i laminat — od masivnog i seljačkog poda, preko gotovog
            višeslojnog parketa, do bambusa, merbaua i garape. Uz ugradnju radimo kompletnu obradu: brušenje, poliranje,
            lakiranje i uljenje, a materijal nabavljamo prema vašem izboru.
          </p>
        </div>
      </div>

      <div className="relative isolate mt-16 overflow-hidden md:mt-24">
        <div className="absolute inset-0 -z-10">
          <Image src="/images/photos/about-interior.jpg" alt="" fill sizes="100vw" quality={75} className="object-cover object-[50%_45%]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(11_9_6/0.85)_0%,rgb(11_9_6/0.45)_55%,rgb(11_9_6/0.2)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgb(11_9_6/0.9)_0%,transparent_55%)]" />
        </div>
        <div className="shell grid min-h-[78svh] content-end gap-10 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-8">
            <SplitText as="h2" id="about-title" lines={["Podovi su više", "od površine."]} className="headline-xl" />
          </div>
          <div data-reveal="" className="md:col-span-4 md:text-right">
            <p className="ml-auto max-w-[36ch] text-[13px] text-bone/80">
              Drveni pod je dugoročna investicija: čvrst, izdržljiv i prilagodljiv materijal koji se može obnavljati.
            </p>
            <Link href="/o-nama" className="link-arrow mt-4 text-[13px] text-bone">
              Saznajte više o nama <ArrowUpRight size={15} strokeWidth={1.25} className="text-brass" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
