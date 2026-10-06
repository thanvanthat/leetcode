import type { PostBlock } from "@/lib/types";
import { slugify } from "@/lib/utils";

/** Renders a post's structured body with the site's editorial type scale. */
export function PostBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="space-y-6 text-[1.0625rem] leading-[1.75] text-bone/80">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return <p key={i}>{block.text}</p>;
          case "h2":
            return (
              <h2
                key={i}
                id={slugify(block.text)}
                className="display-wide scroll-mt-28 pt-8 text-[clamp(1.5rem,3vw,2.25rem)] text-bone"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} id={slugify(block.text)} className="scroll-mt-28 pt-4 text-xl font-semibold text-bone">
                {block.text}
              </h3>
            );
          case "list": {
            const List = block.ordered ? "ol" : "ul";
            return (
              <List key={i} className="space-y-3 border-l border-bone/10 pl-6">
                {block.items.map((item, j) => (
                  <li key={j} className="grid grid-cols-[2.5rem_1fr]">
                    <span className="label pt-[0.45rem] text-ash" aria-hidden="true">
                      {block.ordered ? String(j + 1).padStart(2, "0") : "—"}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </List>
            );
          }
          case "quote":
            return (
              <figure key={i} className="my-10 border-l-2 border-bone pl-6">
                <blockquote className="display-wide text-[clamp(1.25rem,2.4vw,1.75rem)] leading-tight text-bone">
                  {block.text}
                </blockquote>
                {block.cite && <figcaption className="label mt-4 text-ash">— {block.cite}</figcaption>}
              </figure>
            );
          case "code":
            return (
              <figure key={i} className="my-8 border border-bone/10 bg-coal">
                {block.lang && <figcaption className="label border-b border-bone/10 px-4 py-2 text-ash">{block.lang}</figcaption>}
                <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-steel">
                  <code>{block.code}</code>
                </pre>
              </figure>
            );
          case "callout":
            return (
              <aside key={i} className="my-8 flex gap-4 border border-bone/10 bg-graphite/60 p-5 text-bone/90">
                <span className="label pt-1 text-bone" aria-hidden="true">
                  ▲
                </span>
                <p>{block.text}</p>
              </aside>
            );
        }
      })}
    </div>
  );
}
