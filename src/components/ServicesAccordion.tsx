"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/data/services";

export function ServicesAccordion({ items, initialOpen = 0 }: { items: Service[]; initialOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(initialOpen);
  const reduce = useReducedMotion();
  const base = useId();

  return (
    <ul className="border-t border-line">
      {items.map((s, i) => {
        const isOpen = open === i;
        const btnId = `${base}-b-${i}`;
        const panelId = `${base}-p-${i}`;
        return (
          <li key={s.slug} className="border-b border-line">
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-start gap-x-4 py-6 text-left md:grid-cols-[4rem_1fr_1fr_auto] md:py-8"
              >
                <span className="caption pt-2 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className={`text-[clamp(1.35rem,2.6vw,2.4rem)] font-normal leading-[1.05] tracking-[-0.03em] transition-colors duration-500 ${isOpen ? "text-bone" : "text-bone/80 group-hover:text-bone"}`}>
                  {s.title}
                </span>
                <span className="hidden pt-2 text-[14px] text-bone/55 md:block">{s.short}</span>
                <ArrowUpRight
                  aria-hidden="true"
                  size={22}
                  strokeWidth={1}
                  className={`mt-1.5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "rotate-90 text-brass" : "text-bone/60 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"}`}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-6 pb-8 pl-[calc(2.5rem+1rem)] md:grid-cols-[4rem_1fr_1fr_auto] md:gap-x-4 md:pl-0 md:pb-10">
                    <span className="hidden md:block" />
                    <div className="space-y-3 text-[15px] text-bone/75 md:max-w-[52ch]">
                      <p className="md:hidden">{s.short}</p>
                      {s.body.map((p, k) => (
                        <p key={k}>{p}</p>
                      ))}
                    </div>
                    {s.image ? (
                      <div className="relative aspect-[16/10] max-w-md overflow-hidden">
                        <Image src={s.image.src} alt={s.image.alt} fill sizes="(min-width:768px) 30vw, 80vw" quality={70} className="object-cover" />
                      </div>
                    ) : (
                      <span className="hidden md:block" />
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
