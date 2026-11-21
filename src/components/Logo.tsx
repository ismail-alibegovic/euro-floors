/**
 * Euro-Floors logo, redrawn as clean vector from the original brand mark:
 * parquet planks laid as a rotated "F", with the leaf kept as the natural accent.
 */
type Tone = "dark" | "light" | "brand";

const palettes: Record<Tone, { dark: string; tan: string; leaf: string; text: string; sub: string; rule: string }> = {
  // dark site: the original dark-brown planks become warm light oak so the mark reads on near-black
  dark: { dark: "#e6cda6", tan: "#a97b4f", leaf: "#6db04a", text: "#f1ede6", sub: "#d2ac7c", rule: "#d2ac7c" },
  light: { dark: "#eeece9", tan: "#a2a09e", leaf: "#a2a09e", text: "#eeece9", sub: "#a2a09e", rule: "#a2a09e" },
  // original brand colours, for light backgrounds
  brand: { dark: "#62220b", tan: "#cf9a62", leaf: "#0c840c", text: "#62220b", sub: "#b9864f", rule: "#62220b" },
};

/** Plank geometry traced from the original Euro-Floors logo (viewBox units = source pixels). */
const DARK = [
  "M145 310 400 40 467 108 207 372Z",
  "M287 455 415 325 476 388 348 516Z",
  "M65 388 137 316 487 680 415 750Z",
];
const TAN = [
  "M215 383 413 182 472 244 275 443Z",
  "M355 525 430 452 488 513 415 586Z",
  "M52 524 118 460 446 797 381 862Z",
];
const LEAF = "M463 638C540 630 615 575 636 500 642 478 643 460 640 442 622 480 590 488 555 494 500 505 455 552 455 628 470 585 500 552 550 532 505 560 478 600 463 638Z";

export function LogoMark({ tone = "dark", className = "", title }: { tone?: Tone; className?: string; title?: string }) {
  const c = palettes[tone];
  return (
    <svg viewBox="44 32 606 838" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      {DARK.map((d) => <path key={d} d={d} fill={c.dark} />)}
      {TAN.map((d) => <path key={d} d={d} fill={c.tan} />)}
      <path d={LEAF} fill={c.leaf} />
    </svg>
  );
}

/** Mark + stacked EURO / rule / FLOORS lockup, as in the original logo. */
export function Logo({ tone = "dark", className = "", size = "sm" }: { tone?: Tone; className?: string; size?: "sm" | "lg" }) {
  const c = palettes[tone];
  const lg = size === "lg";
  return (
    <span className={`inline-flex items-center ${lg ? "gap-5" : "gap-2.5"} ${className}`}>
      <span className="sr-only">Euro-Floors</span>
      <LogoMark tone={tone} className={lg ? "h-24 w-auto" : "h-10 w-auto sm:h-11"} />
      <span aria-hidden="true" className="flex flex-col items-stretch leading-none">
        <span className={`font-normal uppercase ${lg ? "text-[2.6rem] tracking-[0.2em]" : "text-[15px] font-medium tracking-[0.3em]"}`} style={{ color: c.text }}>
          Euro
        </span>
        <span className={`block h-px ${lg ? "my-2.5" : "my-[6px] mr-[0.3em]"}`} style={{ background: c.rule }} />
        <span className={`font-light uppercase ${lg ? "text-[2.6rem] tracking-[0.2em]" : "text-[15px] tracking-[0.3em]"}`} style={{ color: c.sub }}>
          Floors
        </span>
      </span>
    </span>
  );
}
