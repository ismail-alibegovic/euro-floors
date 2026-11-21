"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { DEFAULT_PRESET, presets } from "@/data/visualizer";

const FADE = 560;

/**
 * Section 01, laid out like the reference's "Effortless Visualization": three ruled columns,
 * the room in the centre and the neighbouring floor variants peeking in from both edges.
 * Every image is the same registered room — only the floor differs.
 */
export function VisualizerSection() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(presets.findIndex((p) => p.id === DEFAULT_PRESET));
  const [prev, setPrev] = useState<number | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const btns = useRef<(HTMLButtonElement | null)[]>([]);
  const n = presets.length;
  const at = (i: number) => (i + n) % n;
  const cur = presets[active];

  const go = (i: number, focus = false) => {
    const next = at(i);
    if (next === active) return;
    window.clearTimeout(timer.current);
    setPrev(active);
    setActive(next);
    timer.current = window.setTimeout(() => setPrev(null), FADE + 60);
    if (focus) btns.current[next]?.focus();
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") (e.preventDefault(), go(active + 1, true));
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") (e.preventDefault(), go(active - 1, true));
  };

  const Side = ({ i, side }: { i: number; side: "l" | "r" }) => {
    const p = presets[at(i)];
    return (
      <button
        type="button"
        onClick={() => go(i)}
        aria-label={`${side === "l" ? "Prethodni" : "Sljedeći"} pod: ${p.name}`}
        className={`group absolute top-1/2 hidden aspect-[4/3] w-[150%] -translate-y-1/2 overflow-hidden lg:block ${side === "l" ? "right-[18%]" : "left-[18%]"}`}
      >
        <Image src={p.room} alt="" fill sizes="30vw" quality={60} className="object-cover object-[50%_75%] blur-[2px] brightness-[0.8] transition-[filter] duration-700 group-hover:blur-0 group-hover:brightness-100" />
      </button>
    );
  };

  return (
    <section id="vizualizator" aria-labelledby="viz-title" className="scroll-mt-20 border-b border-line">
      <div className="grid lg:grid-cols-[22fr_56fr_22fr]">
        <div className="relative hidden overflow-hidden border-r border-line lg:block">
          <Side i={active - 1} side="l" />
        </div>

        <div className="relative px-[var(--gutter)] pb-10 pt-16 md:pt-20 lg:px-[7%]">
          <span aria-hidden="true" className="index-num absolute left-[var(--gutter)] top-[38%] z-10 lg:left-[5%]" data-reveal="">01</span>
          <h2 id="viz-title" className="text-right text-[clamp(2rem,3.4vw,3.6rem)] font-normal leading-[0.92] tracking-[-0.045em]" data-reveal="">
            Vaš prostor.
            <br />
            Vaš pod.
          </h2>

          <figure className="relative mx-auto mt-10 aspect-[4/3] w-full max-w-[640px] overflow-hidden bg-ink-2 md:mt-12">
            {presets.map((p, i) => {
              const on = i === active;
              const was = i === prev;
              return (
                <Image
                  key={p.id}
                  src={p.room}
                  alt={on ? `Dnevni boravak s podom „${p.name}“ — ilustrativni prikaz` : ""}
                  aria-hidden={!on}
                  fill
                  sizes="(min-width:1024px) 40vw, 92vw"
                  quality={82}
                  loading={on ? "eager" : "lazy"}
                  className="object-cover object-[50%_75%]"
                  style={{
                    opacity: on || was ? 1 : 0,
                    zIndex: on ? 2 : was ? 1 : 0,
                    animation: on && prev !== null && !reduce ? `fade-in ${FADE}ms cubic-bezier(0.22,1,0.36,1) both` : undefined,
                  }}
                />
              );
            })}
            <figcaption className="absolute left-3 top-3 z-[3] bg-ink/60 px-2.5 py-1.5 text-[11px] backdrop-blur-sm">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={cur.id}
                  className="block"
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                >
                  {cur.name}
                </motion.span>
              </AnimatePresence>
            </figcaption>
          </figure>

          {/* material selector */}
          <div
            role="radiogroup"
            aria-label="Odaberite pod"
            onKeyDown={onKey}
            className="no-scrollbar mx-auto mt-5 flex max-w-[640px] gap-2 overflow-x-auto overscroll-x-contain"
          >
            {presets.map((p, i) => {
              const on = i === active;
              return (
                <button
                  key={p.id}
                  ref={(el) => {
                    btns.current[i] = el;
                  }}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  aria-label={p.name}
                  title={p.name}
                  tabIndex={on ? 0 : -1}
                  onClick={() => go(i)}
                  className={`relative h-11 w-11 shrink-0 overflow-hidden border transition-[border-color,transform] duration-300 active:scale-95 sm:h-12 sm:w-12 ${on ? "border-brass" : "border-line hover:border-line-strong"}`}
                >
                  <Image src={p.swatch} alt="" fill sizes="48px" className="object-cover" />
                </button>
              );
            })}
          </div>

          <div className="mx-auto mt-8 flex max-w-[640px] items-end justify-between gap-6">
            <p className="max-w-[30ch] text-[12px] leading-[1.4] text-bone/75">
              Jedan prostor, šest podova. Uporedite vrste parketa i pronađite pod koji odgovara vašem enterijeru.
            </p>
            <Link href={`/vizualizator?pod=${cur.id}`} aria-label="Otvorite vizualizator" className="flex h-11 w-11 shrink-0 items-center justify-center text-bone/80 transition-transform hover:-translate-y-0.5 hover:translate-x-0.5 hover:text-brass">
              <ArrowUpRight size={20} strokeWidth={1} />
            </Link>
          </div>
          <p className="mx-auto mt-3 max-w-[640px] text-[10.5px] text-bone/35">Ilustrativni prikaz — mijenja se samo pod.</p>
        </div>

        <div className="relative hidden overflow-hidden border-l border-line lg:block">
          <Side i={active + 1} side="r" />
        </div>
      </div>
    </section>
  );
}
