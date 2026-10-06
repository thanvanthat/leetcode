import Link from "next/link";
import { publishedPosts } from "@/data/posts";
import { PostCard } from "@/components/blog/PostCard";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";

/** The three most recent blog posts, linking through to the full journal. */
export function LatestPosts() {
  const latest = publishedPosts.slice(0, 3);
  if (!latest.length) return null;

  return (
    <section id="writing" aria-labelledby="writing-heading" className="gutter py-24 lg:py-32">
      <SectionLabel index="✎" title="Writing" />
      <div className="mt-10 flex flex-wrap items-end justify-between gap-6 pb-12">
        <RevealText
          id="writing-heading"
          lines={["From the", "journal."]}
          className="display text-[clamp(3rem,9vw,8rem)] text-bone"
        />
        <Link href="/blog" className="label border-b border-bone pb-2 text-bone">
          All posts →
        </Link>
      </div>
      {latest.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </section>
  );
}
