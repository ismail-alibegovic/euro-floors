"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Columns2, Expand, Minimize2, RotateCcw, Loader2 } from "lucide-react";
import { DEFAULT_PRESET, getPreset, ORIGINAL_ROOM, presets, ROOM_SIZE } from "@/data/visualizer";

const FADE_MS = 560;

export function FloorVisualizer({ headingId, initial }: { headingId?: string; initial?: string }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(getPreset(initial)?.id ?? DEFAULT_PRESET);
  const [prev, setPrev] = useState<string | null>(null);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const [compare, setCompare] = useState(false);
  const [split, setSplit] = useState(50);
  const [expanded, setExpanded] = useState(false);
  const [announce, setAnnounce] = useState("");
  const swatchRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const railRef = useRef<HTMLDivElement>(null);
  const figureRef = useRef<HTMLDivElement>(null);
  const fadeTimer = useRef<number | undefined>(undefined);

  const idx = presets.findIndex((p) => p.id === active);
  const current = presets[idx];

  const select = useCallback(
    (id: string, focus = false) => {
      if (id === active) return;
      window.clearTimeout(fadeTimer.current);
      setPrev(active);
      setActive(id);
      const p = presets.find((x) => x.id === id)!;
      setAnnounce(`Odabrano: ${p.name}`);
      fadeTimer.current = window.setTimeout(() => setPrev(null), FADE_MS + 60);
      const i = presets.findIndex((x) => x.id === id);
      const el = swatchRefs.current[i];
      if (focus) el?.focus();
      // keep the chosen swatch visible on the mobile rail
      if (el && railRef.current && railRef.current.scrollWidth > railRef.current.clientWidth) {
        railRef.current.scrollTo({ left: el.offsetLeft - 16, behavior: reduce ? "auto" : "smooth" });
      }
    },
    [active, reduce],
  );

  const step = (d: number, focus = false) => select(presets[(idx + d + presets.length) % presets.length].id, focus);

  const onRadioKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      step(1, true);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      step(-1, true);
    } else if (e.key === "Home") {
      e.preventDefault();
      select(presets[0].id, true);
    } else if (e.key === "End") {
      e.preventDefault();
      select(presets[presets.length - 1].id, true);
    }
  };

  // Expanded (pseudo-fullscreen) view: works on iOS too, Esc closes, scroll locked.
  useEffect(() => {
    if (!expanded) return;
    window.__lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    figureRef.current?.focus();
    return () => {
      window.__lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded, idx]);

  useEffect(() => () => window.clearTimeout(fadeTimer.current), []);

  const reset = () => {
    select(DEFAULT_PRESET);
    setCompare(false);
    setSplit(50);
  };

  const isLoading = !loaded[active];

  return (
    <div className="grid grid-cols-1 border-y border-line lg:grid-cols-12">
      {/* ── Room ─────────────────────────────── */}
      <div className="relative min-w-0 lg:col-span-9 lg:border-r lg:border-line">
        <div
          ref={figureRef}
          tabIndex={expanded ? -1 : undefined}
          role={expanded ? "dialog" : undefined}
          aria-modal={expanded || undefined}
          aria-label={expanded ? `Uvećan prikaz: ${current.name}` : undefined}
          className={
            expanded
              ? "fixed inset-0 z-[80] flex h-[100dvh] items-center justify-center overscroll-contain bg-ink pb-[var(--safe-bottom)] pt-[var(--safe-top)] outline-none"
              : "relative"
          }
        >
          <figure
            className={`relative w-full overflow-hidden bg-ink-2 ${expanded ? "max-h-full" : ""}`}
            style={{ aspectRatio: `${ROOM_SIZE.width} / ${ROOM_SIZE.height}`, maxWidth: expanded ? `calc(100svh * ${ROOM_SIZE.width / ROOM_SIZE.height})` : undefined }}
          >
            {/* Base layer: the untouched room, so the frame is never empty while a render loads */}
            <Image
              src={ORIGINAL_ROOM}
              alt=""
              fill
              sizes="(min-width: 1024px) 75vw, 100vw"
              quality={82}
              className="object-cover"
            />
            {presets.map((p) => {
              const isActive = p.id === active;
              const isPrev = p.id === prev;
              return (
                <Image
                  key={p.id}
                  src={p.room}
                  alt={isActive ? `Dnevni boravak s podom „${p.name}“ — ilustrativni prikaz` : ""}
                  aria-hidden={!isActive}
                  fill
                  sizes={expanded ? "100vw" : "(min-width: 1024px) 75vw, 100vw"}
                  quality={82}
                  onLoad={() => setLoaded((s) => ({ ...s, [p.id]: true }))}
                  className="object-cover"
                  style={{
                    opacity: isActive || isPrev ? 1 : 0,
                    zIndex: isActive ? 2 : isPrev ? 1 : 0,
                    ...(isActive && prev ? { animation: reduce ? undefined : `fade-in ${FADE_MS}ms cubic-bezier(0.22,1,0.36,1) both` } : {}),
                  }}
                  loading={p.id === active ? "eager" : "lazy"}
                />
              );
            })}

            {/* Before / after */}
            {compare && (
              <>
                <div
                  className="absolute inset-0 z-[3]"
                  style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
                  aria-hidden="true"
                >
                  <Image src={ORIGINAL_ROOM} alt="" fill sizes="(min-width: 1024px) 75vw, 100vw" quality={82} className="object-cover" />
                </div>
                <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 z-[4] w-px bg-bone/90" style={{ left: `${split}%` }}>
                  <span className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-bone/80 bg-ink/60 backdrop-blur-sm">
                    <Columns2 size={16} strokeWidth={1.25} />
                  </span>
                </div>
                <span className="absolute left-3 top-3 z-[4] bg-ink/70 px-2.5 py-1.5 text-[11px] backdrop-blur-sm">Postojeći pod</span>
                <span className="absolute right-3 top-3 z-[4] bg-ink/70 px-2.5 py-1.5 text-[11px] backdrop-blur-sm">{current.name}</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={split}
                  onChange={(e) => setSplit(Number(e.target.value))}
                  aria-label="Pomjerite granicu između postojećeg i odabranog poda"
                  className="absolute inset-0 z-[5] h-full w-full cursor-ew-resize touch-pan-y opacity-0"
                />
              </>
            )}

            {/* In-frame bar: current material + prev/next (works in expanded view and on touch) */}
            <figcaption className="absolute inset-x-0 bottom-0 z-[6] flex items-end justify-between gap-3 bg-gradient-to-t from-ink/80 to-transparent p-3 pt-14 sm:p-5 sm:pt-20">
              <div className="min-w-0">
                <span className="kicker block text-bone/60">Trenutno odabrano</span>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={current.id}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="block truncate text-[clamp(1.25rem,2.6vw,2.2rem)] font-normal tracking-[-0.03em]"
                  >
                    {current.name}
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                {isLoading && (
                  <span className="mr-2 flex items-center gap-2 text-[11px] text-bone/70" role="status">
                    <Loader2 size={14} className="animate-spin" /> Učitavanje
                  </span>
                )}
                <IconBtn label="Prethodni pod" onClick={() => step(-1)}><ArrowLeft size={18} strokeWidth={1.25} /></IconBtn>
                <IconBtn label="Sljedeći pod" onClick={() => step(1)}><ArrowRight size={18} strokeWidth={1.25} /></IconBtn>
                <IconBtn label={expanded ? "Zatvori uvećani prikaz" : "Uvećaj prikaz"} onClick={() => setExpanded((v) => !v)}>
                  {expanded ? <Minimize2 size={17} strokeWidth={1.25} /> : <Expand size={17} strokeWidth={1.25} />}
                </IconBtn>
              </div>
            </figcaption>
          </figure>
        </div>
        <p className="sr-only" aria-live="polite">{announce}</p>
      </div>

      {/* ── Control panel ─────────────────────────────── */}
      <div className="flex min-w-0 flex-col lg:col-span-3">
        <div className="hidden border-b border-line p-6 lg:block xl:px-8">
          <p className="kicker">Trenutno odabrano</p>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.id}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="mt-3 text-[1.8rem] font-normal leading-none tracking-[-0.035em] xl:text-[2.2rem]">{current.name}</p>
              <p className="caption mt-3">{current.note}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="border-b border-line py-5 lg:p-6 xl:px-8">
          <p id={`${headingId ?? "viz"}-label`} className="kicker mb-4 px-4 sm:px-0 lg:px-0">
            Materijal <span className="text-bone/40">— {idx + 1} / {presets.length}</span>
          </p>
          <div
            ref={railRef}
            role="radiogroup"
            aria-labelledby={`${headingId ?? "viz"}-label`}
            className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-4 sm:px-0 lg:grid lg:grid-cols-3 lg:gap-x-2.5 lg:gap-y-4 lg:overflow-visible lg:px-0"
          >
            {presets.map((p, i) => {
              const on = p.id === active;
              return (
                <button
                  key={p.id}
                  ref={(el) => {
                    swatchRefs.current[i] = el;
                  }}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  tabIndex={on ? 0 : -1}
                  onClick={() => select(p.id)}
                  onKeyDown={onRadioKey}
                  className="group relative w-[34vw] max-w-[150px] shrink-0 snap-start text-left transition-transform duration-150 active:scale-[0.97] sm:w-[150px] lg:w-auto lg:max-w-none"
                >
                  <span className={`relative block aspect-square overflow-hidden border transition-colors duration-500 ${on ? "border-brass" : "border-line group-hover:border-line-strong"}`}>
                    <Image
                      src={p.swatch}
                      alt=""
                      fill
                      sizes="160px"
                      className={`object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${on ? "scale-105" : "group-hover:scale-[1.04]"}`}
                    />
                    {on && (
                      <motion.span
                        layoutId={`${headingId ?? "viz"}-ring`}
                        className="absolute inset-1.5 border border-bone/80"
                        transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                  </span>
                  <span className={`mt-2 block text-[13px] leading-tight transition-colors ${on ? "text-bone" : "text-bone/65 group-hover:text-bone"}`}>{p.name}</span>
                  <span className="block text-[11px] text-mute lg:hidden xl:block">{p.tone}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-b border-line px-4 py-4 sm:px-0 lg:px-6 xl:px-8">
          <button
            type="button"
            aria-pressed={compare}
            onClick={() => setCompare((v) => !v)}
            className={`btn min-h-11 flex-1 justify-center gap-2 whitespace-nowrap px-3 text-[13px] ${compare ? "border-brass text-brass" : ""}`}
          >
            <Columns2 size={16} strokeWidth={1.25} /> Prije / poslije
          </button>
          <button type="button" onClick={reset} className="btn min-h-11 justify-center gap-2 px-3 text-[13px]" aria-label="Vrati na početni pod">
            <RotateCcw size={15} strokeWidth={1.25} /> <span className="hidden sm:inline lg:hidden xl:inline">Početno</span>
          </button>
        </div>

        <div className="mt-auto flex flex-col gap-4 px-4 py-6 sm:px-0 lg:px-6 lg:py-5 xl:px-8">
          <Link href={`/kontakt?pod=${current.id}`} className="btn btn-solid w-full">
            Zatražite ponudu <ArrowUpRight size={18} strokeWidth={1.25} />
          </Link>
          <p className="caption text-[11.5px]">
            Ilustrativni prikaz: tekstura stvarnog drveta prenesena je u perspektivu poda, a ostatak fotografije ostaje netaknut.
            Nazivi opisuju izgled, ne konkretan proizvod iz ponude. Boje na ekranu mogu odstupati od uzorka.
          </p>
        </div>
      </div>
    </div>
  );
}

function IconBtn({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="flex h-11 w-11 items-center justify-center border border-bone/25 bg-ink/40 backdrop-blur-sm transition-[colors,transform] duration-150 hover:border-bone hover:bg-ink/70 active:scale-95 active:bg-ink/80"
    >
      {children}
    </button>
  );
}
