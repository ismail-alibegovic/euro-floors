import Image from "next/image";
import { IdeaBar } from "./IdeaBar";

/**
 * Hero laid out like the reference: a two-line headline on the left and a short right-aligned
 * caption above a wide frosted "prompt" bar, all on a dark interior photograph, with one hairline
 * word spanning the full width at the bottom edge.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-clip md:min-h-0 md:h-[clamp(680px,66vw,1040px)]"
    >
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <Image
          src="/images/photos/hero-living.jpg"
          alt="Taman dnevni boravak s drvenim letvicama na zidu, svijetlom sofom i niskim stolićem"
          fill
          priority
          sizes="100vw"
          quality={82}
          className="hero-img object-cover object-[50%_62%] brightness-[0.5] contrast-[1.08] saturate-[0.85]"
        />
      </div>
      {/* the reference keeps the top almost black so the white type sits on calm ground */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(16_11_3/0.82)_0%,rgb(16_11_3/0.35)_32%,rgb(16_11_3/0.1)_55%,rgb(16_11_3/0.55)_78%,#100b03_100%)]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_50%_55%,transparent_40%,rgb(16_11_3/0.6)_100%)]" />

      <div className="shell flex flex-1 flex-col pt-[calc(var(--header-h)+var(--safe-top)+clamp(2.5rem,7.5vw,8rem))]">
        <div className="mx-auto w-full md:w-[78%] lg:w-[64%]">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h1 id="hero-title" className="headline-xl lg:text-[clamp(3rem,4.6vw,5rem)]">
              {["Prostor počinje", "od poda."].map((l, i) => (
                <span key={l} className="hero-line -mt-[0.14em] block overflow-hidden pb-[0.06em] pt-[0.14em]">
                  <span className="block" style={{ ["--i" as string]: i }}>{l}</span>
                </span>
              ))}
            </h1>
            <p
              className="hero-fade max-w-[30ch] text-[12.5px] leading-[1.38] text-bone/85 md:mb-[0.35em] md:text-right"
              style={{ ["--d" as string]: "900ms" }}
            >
              Euro-Floors donosi parket i laminat u vaš prostor — biramo materijal, ugrađujemo i obrađujemo pod do
              završnog laka.
            </p>
          </div>

          <div className="hero-fade mt-6 md:mt-7" style={{ ["--d" as string]: "1100ms" }}>
            <IdeaBar />
          </div>
        </div>

        {/* Oversized hairline word, with the reference's thin rule above it */}
        <div className="pointer-events-none mt-auto pt-16" aria-hidden="true">
          <div className="hero-fade border-t border-bone/10 pt-[1.2vw]" style={{ ["--d" as string]: "500ms" }}>
            {/* sized like the reference's HARMONIOUS rather than stretched to fill the width */}
            <span className="giant -mb-[0.03em] block pb-[0.02em] text-center text-[19vw] tracking-[0.02em] md:text-[15vw]">Parket</span>
          </div>
        </div>
      </div>
    </section>
  );
}
