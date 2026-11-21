import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { SplitText } from "./SplitText";

type Crumb = { href: string; label: string };

export function PageHeader({
  kicker,
  title,
  lead,
  image,
  crumbs,
  children,
}: {
  kicker?: string;
  title: string[];
  lead?: ReactNode;
  image?: { src: string; alt: string; position?: string };
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <header className="relative isolate overflow-hidden border-b border-line">
      {image && (
        <>
          <Image src={image.src} alt={image.alt} fill priority sizes="100vw" quality={75} className={`hero-img -z-20 object-cover ${image.position ?? ""}`} />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(11_9_6/0.9),rgb(11_9_6/0.55)_60%,rgb(11_9_6/0.35)),linear-gradient(0deg,#0b0906,transparent_55%)]" />
        </>
      )}
      <div className={`shell flex flex-col pb-12 pt-[calc(var(--header-h)+8vh)] md:pb-16 ${image ? "min-h-[78svh] justify-end" : ""}`}>
        {crumbs && (
          <nav aria-label="Putanja" className="hero-fade mb-8 text-[12.5px] text-mute" style={{ ["--d" as string]: "200ms" }}>
            <ol className="flex flex-wrap items-center gap-2">
              {crumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true" className="text-bone/25">/</span>}
                  <Link href={c.href} className="py-1 hover:text-bone">{c.label}</Link>
                </li>
              ))}
            </ol>
          </nav>
        )}
        {kicker && <p className="kicker hero-fade mb-6" style={{ ["--d" as string]: "250ms" }}>{kicker}</p>}
        <SplitText as="h1" lines={title} className="headline-xl" />
        {lead && (
          <div className="hero-fade mt-8 max-w-[52ch] text-[clamp(15px,1.2vw,17px)] leading-relaxed text-bone/75" style={{ ["--d" as string]: "700ms" }}>
            {lead}
          </div>
        )}
        {children}
      </div>
    </header>
  );
}
