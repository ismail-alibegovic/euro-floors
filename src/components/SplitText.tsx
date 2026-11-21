import { Fragment, type ElementType, type ReactNode } from "react";

type Props = {
  as?: ElementType;
  /** Lines of text; each string is one visual line. */
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  id?: string;
};

/**
 * Word-by-word reveal. The accessible name is the unsplit text (sr-only); the split
 * words are decorative and hidden from assistive tech. Without JS the words are visible.
 */
export function SplitText({ as: Tag = "h2", lines, className, lineClassName, delay = 0, id }: Props) {
  let i = 0;
  return (
    <Tag className={className} data-split="" style={{ ["--d" as string]: `${delay}ms` }} id={id}>
      <span className="sr-only">{lines.join(" ")}</span>
      <span aria-hidden="true">
        {lines.map((line, li) => (
          <span key={li} className={`block ${lineClassName ?? ""}`}>
            {line.split(" ").map((word, wi, arr) => (
              <Fragment key={wi}>
                <span className="wm">
                  <span className="w" style={{ ["--i" as string]: i++ }}>
                    {word}
                  </span>
                </span>
                {wi < arr.length - 1 ? " " : null}
              </Fragment>
            ))}
          </span>
        ))}
      </span>
    </Tag>
  );
}

export function Kicker({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`kicker ${className}`}>{children}</p>;
}
