/**
 * Euro-Floors logo, redrawn as clean vector from the original brand mark:
 * parquet planks laid as a rotated "F", with the leaf kept as the natural accent.
 */
type Tone = "dark" | "light" | "brand";

const palettes: Record<Tone, { arm: string; stem: string; leaf: string; text: string; sub: string; rule: string }> = {
  // for dark backgrounds (site default)
  dark: { arm: "#c5a47a", stem: "#8e7059", leaf: "#8fa66d", text: "#eeece9", sub: "#c5a47a", rule: "#c5a47a" },
  // monochrome on dark
  light: { arm: "#eeece9", stem: "#a2a09e", leaf: "#a2a09e", text: "#eeece9", sub: "#a2a09e", rule: "#a2a09e" },
  // original brand colours, for light backgrounds
  brand: { arm: "#6e3a22", stem: "#cfa26c", leaf: "#4f9a3a", text: "#6e3a22", sub: "#b88a55", rule: "#6e3a22" },
};

export function LogoMark({ tone = "dark", className = "", title }: { tone?: Tone; className?: string; title?: string }) {
  const c = palettes[tone];
  const g = 0.16;
  return (
    <svg viewBox="-2.55 -2.45 7.2 9.95" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <g transform="rotate(-45) translate(-3.3 0)">
        <rect x="0" y="0" width="1" height="3.3" fill={c.stem} />
        <rect x="0" y={3.3 + g} width="1" height="3.3" fill={c.stem} />
        <rect x={1 + g} y="0" width="5.2" height="1" fill={c.arm} />
        <rect x={1 + g} y={1 + g} width="1" height="1.7" fill={c.stem} />
        <rect x={1 + g} y={2.86 + g} width="3.6" height="1" fill={c.arm} />
        <rect x={1 + g} y={4.02 + g} width="1" height="2.58" fill={c.stem} />
        <g transform="translate(3.45 4.3) rotate(-20)">
          <path d="M0 1.1C.25.2 1-.15 1.75 0 1.55.85.95 1.35 0 1.1Z" fill={c.leaf} />
          <path d="M.15.98C.6.6 1.05.3 1.5.12" stroke="#0b0906" strokeOpacity=".45" strokeWidth=".07" fill="none" />
        </g>
      </g>
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
      <LogoMark tone={tone} className={lg ? "h-24 w-auto" : "h-9 w-auto"} />
      <span aria-hidden="true" className="flex flex-col items-stretch leading-none">
        <span className={`font-normal uppercase ${lg ? "text-[2.6rem] tracking-[0.2em]" : "text-[13px] tracking-[0.34em]"}`} style={{ color: c.text }}>
          Euro
        </span>
        <span className={`block h-px ${lg ? "my-2.5" : "my-[5px]"}`} style={{ background: c.rule }} />
        <span className={`font-light uppercase ${lg ? "text-[2.6rem] tracking-[0.2em]" : "text-[13px] tracking-[0.34em]"}`} style={{ color: c.sub }}>
          Floors
        </span>
      </span>
    </span>
  );
}
