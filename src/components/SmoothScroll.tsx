"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Lenis is the site's only smooth-scroll engine. Skipped entirely under reduced motion. */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.11, anchors: { offset: -80 } });
    window.__lenis = lenis;
    const onFonts = () => lenis.resize();
    document.fonts?.ready.then(onFonts);
    const onMq = () => mq.matches && lenis.destroy();
    mq.addEventListener("change", onMq);
    return () => {
      mq.removeEventListener("change", onMq);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
