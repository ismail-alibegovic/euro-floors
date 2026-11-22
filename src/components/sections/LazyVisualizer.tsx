"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const Placeholder = () => (
  <div
    aria-hidden="true"
    className="min-h-[720px] border-y border-line bg-ink-2/40 sm:min-h-[780px] lg:min-h-[640px] xl:min-h-[760px]"
  />
);

// The visualizer (several large room photos + motion) is only fetched when the visitor nears it.
const FloorVisualizer = dynamic(() => import("../FloorVisualizer").then((m) => m.FloorVisualizer), {
  ssr: false,
  loading: Placeholder,
});

export function LazyVisualizer() {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "900px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={ref}>{near ? <FloorVisualizer headingId="viz" /> : <Placeholder />}</div>;
}
