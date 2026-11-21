"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SELECTOR = "[data-reveal],[data-split],[data-line],[data-curtain]";

/**
 * Adds `is-in` to motion-tagged elements once they enter the viewport; CSS does the animating.
 * Curtain elements are fully clipped (clip-path) until revealed, and a fully clipped element
 * never intersects the viewport, so for those we observe the parent and reveal the child.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = new Map<Element, HTMLElement>(); // observed element -> element to reveal
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            targets.get(e.target)?.classList.add("is-in");
            targets.delete(e.target);
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    const watch = (el: HTMLElement) => {
      if (el.classList.contains("is-in")) return;
      const obs = el.hasAttribute("data-curtain") ? el.parentElement ?? el : el;
      if (targets.get(obs) === el) return;
      targets.set(obs, el);
      io.observe(obs);
    };
    const scan = (root: ParentNode) => root.querySelectorAll<HTMLElement>(SELECTOR).forEach(watch);
    scan(document);
    const mo = new MutationObserver((muts) => {
      for (const m of muts) m.addedNodes.forEach((n) => n instanceof HTMLElement && scan(n.parentNode ?? n));
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
