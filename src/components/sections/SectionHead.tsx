import type { ReactNode } from "react";

/** Shared section opener: faint index on the left, title + caption set right (the approved editorial header). */
export function SectionHead({
  index,
  titleId,
  title,
  lead,
}: {
  index: string;
  titleId: string;
  title: string[];
  lead?: ReactNode;
}) {
  return (
    <div className="relative grid gap-y-6 px-[var(--gutter)] pb-10 pt-16 sm:pt-20 lg:grid-cols-[22fr_78fr] lg:px-0 lg:pt-28">
      <span aria-hidden="true" className="index-num lg:pl-[5%]" data-reveal="">{index}</span>
      <div className="lg:pr-[3.2%] lg:text-right">
        <h2 id={titleId} className="section-title" data-reveal="">
          {title.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </h2>
        {lead && <div className="section-lead mt-6 max-w-[42ch] lg:ml-auto">{lead}</div>}
      </div>
    </div>
  );
}
