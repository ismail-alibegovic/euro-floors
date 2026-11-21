import Image from "next/image";
import Link from "next/link";
import { FitText } from "../FitText";
import { HeroSearch } from "./HeroSearch";

/**
 * Composed like the reference: dark slatted wall with a palm shadow, a centred column with
 * headline + caption and a search bar, a cut-out sofa, and one oversized thin word over its base.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      <Image
        src="/images/hero/hero-wall.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        quality={80}
        className="hero-img -z-20 object-cover object-center brightness-[0.72] contrast-[0.92] saturate-[0.75]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_50%_35%,transparent_0%,rgb(19_14_10/0.55)_100%)]" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-40 bg-[linear-gradient(180deg,rgb(19_14_10/0.85),transparent)]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-[38%] bg-[linear-gradient(0deg,#130e0a_12%,rgb(19_14_10/0.75)_50%,transparent)]" />

      <div className="relative flex flex-1 flex-col pt-[calc(var(--header-h)+var(--safe-top)+7vh)]">
        {/* centred column */}
        <div className="mx-auto w-full max-w-[1060px] px-[var(--gutter)] lg:w-[62vw] lg:px-0">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <h1 id="hero-title" className="text-[clamp(2.5rem,4.4vw,4.8rem)] font-normal leading-[0.88] tracking-[-0.05em]">
              {["Prostor počinje", "od poda."].map((l, i) => (
                <span key={l} className="hero-line -mt-[0.14em] block overflow-hidden pb-[0.06em] pt-[0.14em]">
                  <span className="block" style={{ ["--i" as string]: i }}>{l}</span>
                </span>
              ))}
            </h1>
            <p className="hero-fade max-w-[30ch] pt-1 text-[12px] leading-[1.35] text-bone/85 sm:pt-3 sm:text-right" style={{ ["--d" as string]: "800ms" }}>
              Euro-Floors donosi prirodne materijale u vaš prostor — masivni i troslojni parket, egzotične vrste i laminate, s ugradnjom u Sarajevu.
            </p>
          </div>
          <div className="hero-fade mt-6 sm:mt-7" style={{ ["--d" as string]: "1000ms" }}>
            <HeroSearch />
          </div>
          <div className="hero-fade mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[11.5px] text-bone/55" style={{ ["--d" as string]: "1150ms" }}>
            <Link href="/kolekcije" className="py-1.5 hover:text-bone">Istražite kolekcije ↗</Link>
            <Link href="/#vizualizator" className="py-1.5 hover:text-bone">Isprobajte pod u svom prostoru ↗</Link>
          </div>
        </div>

        {/* sofa + oversized word */}
        <div className="relative mt-auto">
          <div className="hero-fade relative mx-auto w-[94vw] max-w-[1120px] sm:w-[72vw] lg:w-[60vw]" style={{ ["--d" as string]: "500ms" }}>
            <Image
              src="/images/hero/sofa.webp"
              alt="Sofa od zelenog baršuna na drvenim nogicama"
              width={1600}
              height={616}
              priority
              sizes="(min-width:1024px) 60vw, (min-width:640px) 72vw, 94vw"
              className="relative z-0 h-auto w-full drop-shadow-[0_30px_40px_rgb(0_0_0/0.65)]"
            />
          </div>
          <div aria-hidden="true" className="pointer-events-none relative z-10 -mt-[11vw] px-[1.2vw] sm:-mt-[9vw]">
            <div className="hero-fade" style={{ ["--d" as string]: "300ms" }}>
              <FitText text="Euro-Floors" estimate="15.2vw" className="giant -mb-[0.1em] pb-[0.04em]" />
            </div>
          </div>
          <p className="sr-only">Euro-Floors</p>
        </div>
        <div className="h-px w-full bg-line" />
      </div>
    </section>
  );
}
