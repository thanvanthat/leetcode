import type { Metadata } from "next";
import { allTags, publishedPosts } from "@/data/posts";
import { site } from "@/data/site";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { PostCard } from "@/components/blog/PostCard";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Blog",
  description: `Notes, devlogs and lessons from ${site.name} on game development, AI and building software.`,
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/blog/feed.xml" } },
  openGraph: { title: `Blog — ${site.name}`, url: "/blog", type: "website" },
};

export default function BlogPage() {
  return (
    <section className="gutter pb-24 pt-32 lg:pt-44">
      <SectionLabel index="✎" title="Journal" />
      <RevealText
        as="h1"
        immediate
        delay={0.2}
        lines={["Notes from", "the workshop."]}
        className="display mt-8 text-[clamp(3.5rem,11vw,11rem)] text-bone"
      />
      <div className="mt-10 flex flex-wrap items-end justify-between gap-6 pb-16">
        <p className="max-w-[52ch] text-lg text-bone/70">
          Devlogs, experiments and lessons from building games and AI systems — the parts a portfolio leaves out.
        </p>
        <a href="/blog/feed.xml" className="label border-b border-bone/40 pb-1 text-ash transition-colors hover-fine:text-bone">
          RSS feed ↗
        </a>
      </div>
      <BlogIndex
        tags={allTags}
        items={publishedPosts.map((post) => ({ post: { slug: post.slug, tags: post.tags }, card: <PostCard post={post} /> }))}
      />
    </section>
  );
}
