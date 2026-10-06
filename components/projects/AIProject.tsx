import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ResearchThread } from "@/lib/types";

interface AIProjectProps {
  thread: ResearchThread;
  index: number;
}

/** A single AI project / research thread row. Links through when a case study exists. */
export function AIProject({ thread, index }: AIProjectProps) {
  const body = (
    <>
      <span className="label col-span-2 pt-2 text-ash sm:col-span-1">{String(index + 1).padStart(2, "0")}</span>
      <div className="col-span-10 sm:col-span-6">
        <h3 className="display-wide text-[clamp(1.35rem,2.3vw,2.1rem)] text-bone transition-colors duration-500">
          {thread.title}
        </h3>
        <p className="mt-2 max-w-[46ch] text-sm leading-relaxed text-ash sm:text-base">{thread.summary}</p>
      </div>
      <div className="label col-span-10 col-start-3 flex items-center justify-between gap-4 text-ash sm:col-span-5 sm:col-start-auto sm:justify-end">
        <span className="flex items-center gap-2">
          <span className={`size-1.5 rounded-full ${thread.status === "Exploring" ? "bg-ash" : "bg-ai"}`} />
          {thread.status}
        </span>
        {thread.slug && (
          <ArrowUpRight className="size-5 text-bone transition-transform duration-500 group-hover:rotate-45" aria-hidden="true" />
        )}
      </div>
    </>
  );

  const classes = "group grid grid-cols-12 items-start gap-x-4 gap-y-3 border-t border-bone/10 py-7 sm:items-center";

  return thread.slug ? (
    <Link href={`/projects/${thread.slug}`} className={classes} data-cursor="view">
      {body}
    </Link>
  ) : (
    <div className={classes}>{body}</div>
  );
}
