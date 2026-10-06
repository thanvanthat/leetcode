import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { postText } from "@/data/posts";
import type { Post } from "@/lib/types";
import { formatDate, readingTime } from "@/lib/utils";

/** A row in a post listing: date and tags on the left, title and excerpt on the right. */
export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group relative grid gap-4 border-t border-bone/10 py-10 lg:grid-cols-12 lg:gap-8">
      <div className="label flex flex-wrap gap-x-4 gap-y-2 text-ash lg:col-span-3 lg:flex-col">
        <time dateTime={post.date} className="text-bone">
          {formatDate(post.date)}
        </time>
        <span>{readingTime(postText(post.body))} min read</span>
      </div>
      <div className="lg:col-span-8 lg:col-start-5">
        <h3 className="display-wide text-[clamp(1.5rem,3.2vw,2.75rem)] text-bone">
          <Link href={`/blog/${post.slug}`} data-cursor="view" className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        <p className="mt-4 max-w-[60ch] text-bone/65">{post.excerpt}</p>
        <div className="mt-6 flex items-center justify-between gap-4">
          <ul className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li key={tag} className="label border border-bone/15 px-2.5 py-1 text-ash">
                {tag}
              </li>
            ))}
          </ul>
          <ArrowUpRight
            aria-hidden="true"
            className="size-5 shrink-0 text-ash transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-bone"
          />
        </div>
      </div>
    </article>
  );
}
