import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { presets } from "@/data/visualizer";
import { FitText } from "../FitText";

/**
 * Hero composed like the reference: headline + caption over a dark slatted-wood interior,
 * a functional "material bar" in place of a prompt field, the sofa as focal object,
 * and one oversized thin word bleeding off the bottom edge.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden border-b border-line">
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <Image
          src="/images/photos/hero-living.jpg"
          alt="Taman dnevni boravak s drvenim letvicama na zidu, svijetlom sofom i niskim stolićem"
          fill
          priority
          sizes="100vw"
          quality={82}
          className="hero-img object-cover object-[55%_70%] brightness-[0.62] contrast-[1.05]"
        />
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_40%,transparent_30%,rgb(11_9_6/0.55)_100%)]" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-48 bg-[linear-gradient(180deg,rgb(11_9_6/0.75),transparent)]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-[42%] bg-[linear-gradient(0deg,#0b0906_8%,rgb(11_9_6/0.7)_45%,transparent)]" />

      <div className="shell relative flex flex-1 flex-col pt-[calc(var(--header-h)+9vh)]">
        <div className="mx-auto w-full max-w-[1120px] lg:px-[6%]">
          <div className="grid items-end gap-6 md:grid-cols-12">
            <h1 id="hero-title" className="headline-xl md:col-span-7 lg:text-[clamp(3rem,5.2vw,5.4rem)]">
              {["Prostor počinje", "od poda."].map((l, i) => (
                <span key={l} className="hero-line -mt-[0.14em] block overflow-hidden pb-[0.06em] pt-[0.14em]">
                  <span className="block" style={{ ["--i" as string]: i }}>{l}</span>
                </span>
              ))}
            </h1>
            <div className="hero-fade md:col-span-5 md:text-right" style={{ ["--d" as string]: "900ms" }}>
              <p className="max-w-[34ch] text-[13px] md:ml-auto leading-[1.45] text-bone/85">
                Prirodni materijali, pažljivo odabrani podovi i detalji koji svakom prostoru daju karakter.
              </p>
              <Link href="/kolekcije" className="link-arrow mt-3 text-[13px] text-bone">
                Istražite kolekcije <ArrowUpRight size={15} strokeWidth={1.25} className="text-brass" />
              </Link>
            </div>
          </div>

          {/* Material bar — the reference's prompt field, made functional for flooring */}
          <div
            className="hero-fade mt-7 flex min-h-[54px] items-center gap-3 border border-bone/15 bg-[rgb(46_40_34/0.72)] py-2 pl-3 pr-2 shadow-[0_20px_60px_-20px_rgb(0_0_0/0.8)] backdrop-blur-md sm:pl-4"
            style={{ ["--d" as string]: "1100ms" }}
          >
            <Plus aria-hidden="true" size={16} strokeWidth={1.25} className="shrink-0 text-bone/60" />
            <span className="hidden min-w-0 flex-1 truncate text-[13px] text-bone/50 md:block">
              Isprobajte pod u svom prostoru — odaberite materijal
            </span>
            <span className="min-w-0 flex-1 truncate text-[13px] text-bone/50 md:hidden">Odaberite materijal</span>
            <ul className="hidden items-center gap-1.5 sm:flex" aria-label="Brzi izbor materijala">
              {presets.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/vizualizator?pod=${p.id}`}
                    title={p.name}
                    aria-label={`Isprobajte: ${p.name}`}
                    className="relative block h-8 w-8 overflow-hidden border border-bone/20 transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-bone"
                  >
                    <Image src={p.swatch} alt="" fill sizes="32px" className="object-cover" />
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/#vizualizator"
              className="ml-1 flex h-10 shrink-0 items-center gap-2 bg-bone px-3 text-[13px] text-ink transition-colors hover:bg-brass"
            >
              <span className="hidden lg:inline">Isprobajte pod u svom prostoru</span>
              <span className="lg:hidden">Isprobajte</span>
              <ArrowUpRight size={16} strokeWidth={1.5} className="text-walnut" />
            </Link>
          </div>
          <p className="hero-fade mt-3 text-[11.5px] text-bone/40" style={{ ["--d" as string]: "1200ms" }}>
            Euro-Floors / Sarajevo
          </p>
        </div>

        {/* Oversized word */}
        <div className="pointer-events-none mt-auto -mb-[0.13em] pt-10" aria-hidden="true">
          <div className="hero-fade" style={{ ["--d" as string]: "600ms" }}>
            <FitText text="Prirodno" estimate="19.5vw" className="giant pb-[0.02em]" />
          </div>
        </div>
      </div>
    </section>
  );
}
