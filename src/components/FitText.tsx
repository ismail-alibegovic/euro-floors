"use client";

import { useLayoutEffect, useRef } from "react";

/**
 * Scales a single line of text so it spans its container exactly.
 * SSR renders with an estimated vw size, so the layout is close before hydration.
 */
export function FitText({ text, estimate, className = "" }: { text: string; estimate: string; className?: string }) {
  const box = useRef<HTMLSpanElement>(null);
  const inner = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const b = box.current;
    const t = inner.current;
    if (!b || !t) return;
    const fit = () => {
      t.style.fontSize = "100px";
      const w = t.getBoundingClientRect().width;
      const target = b.clientWidth;
      if (w > 0) t.style.fontSize = `${(100 * target) / w}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(b);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, [text]);

  return (
    <span ref={box} className={`block w-full overflow-hidden ${className}`}>
      <span ref={inner} className="inline-block whitespace-nowrap" style={{ fontSize: estimate }}>
        {text}
      </span>
    </span>
  );
}
