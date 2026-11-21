"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { DEFAULT_PRESET, presets } from "@/data/visualizer";

/**
 * Section 01, after the reference's "Effortless Visualization": a three-column frame where the
 * chosen floor sits sharp in the middle and its neighbours drift, blurred, past the column lines
 * and off the page edges. Each image is the same room rendered with a different floor.
 */
export function VisualizerSection() {
  const start = Math.max(0, presets.findIndex((p) => p.id === DEFAULT_PRESET));
  const [active, setActive] = useState(start);
  const drag = useRef<{ x: number; id: number } | null>(null);
  const n = presets.length;
  const go = (i: number) => setActive(((i % n) + n) % n);
  const cur = presets[active];

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(active + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(active - 1); }
  };
  const onDown = (e: PointerEvent) => { drag.current = { x: e.clientX, id: e.pointerId }; };
  const onUp = (e: PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1));
  };

  return (
    <section id="vizualizator" aria-labelledby="viz-title" className="relative scroll-mt-20 overflow-clip">
      {/* column lines at 25% / 75%, running behind the whole section as in the reference */}
      <div aria-hidden="true" className="shell pointer-events-none absolute inset-y-0 left-0 right-0 hidden md:block">
        <div className="relative h-full">
          <span className="absolute inset-y-0 left-1/4 w-px bg-line" />
          <span className="absolute inset-y-0 left-3/4 w-px bg-line" />
        </div>
      </div>
      <div className="shell relative">
        <div className="border-t border-line" />

        <div className="relative md:mx-[25%] md:px-[clamp(1.5rem,2.8vw,2.75rem)]">
          <div className="relative flex items-start justify-between pt-10 md:pt-[clamp(2.5rem,4vw,4rem)]">
            <span aria-hidden="true" className="index-num absolute left-0 top-[58%] md:-left-[0.08em]" data-reveal="">01</span>
            <span />
            <h2 id="viz-title" className="headline relative text-right" data-reveal="">
              <span className="block">Vidite pod</span>
              <span className="block">prije ugradnje.</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Track: item width w, spacing s; the active item sits on the page centre */}
      <div
        role="region"
        aria-roledescription="karusel"
        aria-label="Vrste poda u istom prostoru"
        tabIndex={0}
        onKeyDown={onKey}
        onPointerDown={onDown}
        onPointerUp={onUp}
        onPointerCancel={() => (drag.current = null)}
        className="relative mt-10 h-[var(--w)] touch-pan-y select-none focus-visible:outline-offset-[-1px] md:mt-[clamp(2.5rem,4vw,4rem)] [--s:100vw] [--w:calc(100vw-2*var(--gutter))] md:[--s:49.5vw] md:[--w:28vw]"
      >
        {presets.map((p, i) => {
          let off = i - active;
          if (off > n / 2) off -= n;
          if (off < -n / 2) off += n;
          const isActive = off === 0;
          const visible = Math.abs(off) <= 1;
          return (
            <button
              key={p.id}
              type="button"
              tabIndex={isActive || !visible ? -1 : 0}
              aria-hidden={!visible || undefined}
              aria-label={isActive ? undefined : `${off < 0 ? "Prethodni" : "Sljedeći"} pod: ${p.name}`}
              onClick={() => !isActive && go(i)}
              className={`absolute top-0 block h-[var(--w)] w-[var(--w)] overflow-hidden transition-[transform,filter,opacity] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isActive ? "cursor-default" : "cursor-pointer max-md:pointer-events-none max-md:opacity-0!"
              }`}
              style={{
                left: "calc(50% - var(--w) / 2)",
                transform: `translateX(calc(var(--s) * ${off}))`,
                filter: isActive ? "none" : "blur(7px) brightness(0.8)",
                opacity: visible ? 1 : 0,
                zIndex: isActive ? 2 : 1,
              }}
            >
              <Image
                src={p.room}
                alt={isActive ? `Isti dnevni boravak s podom: ${p.name}` : ""}
                fill
                sizes="(min-width:768px) 28vw, 70vw"
                quality={75}
                className="object-cover object-[46%_60%]"
              />
            </button>
          );
        })}
      </div>

      <div className="shell relative">
        <div className="relative flex items-end justify-between gap-6 pb-10 pt-8 md:mx-[25%] md:px-[clamp(1.5rem,2.8vw,2.75rem)] md:pb-[clamp(2.5rem,3.5vw,3.5rem)] md:pt-[clamp(3rem,5vw,5rem)]">
          <div className="max-w-[30ch] text-[12.5px] leading-[1.42]" aria-live="polite">
            <p className="text-bone">
              {cur.name} <span className="text-bone/40">— {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
            </p>
            <p className="text-bone/70">Šest vrsta poda u istom prostoru — uporedite tonove i uzorke prije nego što odlučite.</p>
          </div>
          <div className="flex shrink-0 items-center gap-1">
          <button type="button" onClick={() => go(active - 1)} aria-label="Prethodni pod" className="flex h-11 w-11 items-center justify-center border border-line-strong md:hidden">
            <ArrowLeft size={17} strokeWidth={1.25} />
          </button>
          <button type="button" onClick={() => go(active + 1)} aria-label="Sljedeći pod" className="flex h-11 w-11 items-center justify-center border border-line-strong md:hidden">
            <ArrowRight size={17} strokeWidth={1.25} />
          </button>
          <Link
            href={`/vizualizator?pod=${cur.id}`}
            aria-label={`Otvorite vizualizator: ${cur.name}`}
            className="group -mr-2 flex h-11 w-11 shrink-0 items-center justify-center"
          >
            <ArrowUpRight size={20} strokeWidth={1} className="text-brass transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          </div>
        </div>
        <div className="border-b border-line" />
      </div>
    </section>
  );
}
