import type { ReactNode } from "react";
import { SplitText } from "./SplitText";

type Props = {
  index?: string;
  title: string[];
  lead?: ReactNode;
  aside?: ReactNode;
  align?: "right" | "left";
  id?: string;
  as?: "h1" | "h2";
};

/** Section opener: faint italic index on the left, title set right (or left), editorial caption beneath. */
export function SectionIntro({ index, title, lead, aside, align = "right", id, as = "h2" }: Props) {
  return (
    <div className="relative grid gap-y-8 border-b border-line pb-12 md:grid-cols-12 md:pb-16">
      <div className="flex items-end justify-between md:col-span-4 md:flex-col md:items-start md:justify-between">
        {aside ? <div className="caption max-w-[30ch]">{aside}</div> : <span />}
        {index && (
          <span aria-hidden="true" className="index-num" data-reveal="">
            {index}
          </span>
        )}
      </div>
      <div className={`md:col-span-8 ${align === "right" ? "md:text-right" : ""}`}>
        <SplitText as={as} id={id} lines={title} className="headline" />
        {lead && (
          <div
            data-reveal=""
            style={{ ["--d" as string]: "250ms" }}
            className={`mt-7 max-w-[44ch] text-[15px] text-bone/70 ${align === "right" ? "md:ml-auto" : ""}`}
          >
            {lead}
          </div>
        )}
      </div>
    </div>
  );
}
