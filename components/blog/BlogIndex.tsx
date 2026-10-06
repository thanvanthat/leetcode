"use client";

import { useState } from "react";
import type { Post } from "@/lib/types";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface BlogIndexProps {
  tags: string[];
  /** Pre-rendered cards keyed by slug, so cards stay server components. */
  items: { post: Pick<Post, "slug" | "tags">; card: ReactNode }[];
}

/** Post list with a client-side tag filter. */
export function BlogIndex({ tags, items }: BlogIndexProps) {
  const [tag, setTag] = useState<string | null>(null);
  const visible = tag ? items.filter((i) => i.post.tags.includes(tag)) : items;

  return (
    <>
      <div role="group" aria-label="Filter posts by tag" className="flex flex-wrap gap-2 pb-10">
        {[null, ...tags].map((t) => (
          <button
            key={t ?? "all"}
            type="button"
            aria-pressed={tag === t}
            onClick={() => setTag(t)}
            className={cn(
              "label border px-3 py-2 transition-colors duration-300",
              tag === t
                ? "border-bone bg-bone text-ink"
                : "border-bone/15 text-ash hover-fine:border-bone/40 hover-fine:text-bone",
            )}
          >
            {t ?? "All"}
          </button>
        ))}
      </div>
      <div aria-live="polite">
        {visible.map((i) => (
          <div key={i.post.slug}>{i.card}</div>
        ))}
        {!visible.length && <p className="border-t border-bone/10 py-10 text-ash">No posts with this tag yet.</p>}
      </div>
    </>
  );
}
