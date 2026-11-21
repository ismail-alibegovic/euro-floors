"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export function ProductGallery({ images }: { images: { src: string; alt: string }[] }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-2">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={i}
            className="absolute inset-0"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image src={images[i].src} alt={images[i].alt} fill priority={i === 0} sizes="(min-width:1024px) 58vw, 100vw" quality={80} className="object-cover" />
          </motion.div>
        </AnimatePresence>
        <span className="absolute bottom-3 left-3 bg-ink/70 px-2.5 py-1.5 text-[11px] text-bone/80 backdrop-blur-sm">Ilustrativna fotografija</span>
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-3" role="group" aria-label="Odaberite fotografiju">
          {images.map((im, k) => (
            <button
              key={im.src}
              type="button"
              aria-pressed={k === i}
              aria-label={`Fotografija ${k + 1}: ${im.alt}`}
              onClick={() => setI(k)}
              className={`relative h-20 w-24 overflow-hidden border transition-colors sm:h-24 sm:w-32 ${k === i ? "border-brass" : "border-line hover:border-line-strong"}`}
            >
              <Image src={im.src} alt="" fill sizes="128px" quality={70} className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
