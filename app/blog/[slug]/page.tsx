import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdjacentPosts, getPost, postText, publishedPosts } from "@/data/posts";
import { site } from "@/data/site";
import { PostBody } from "@/components/blog/PostBody";
import { RevealText } from "@/components/ui/RevealText";
import { formatDate, readingTime } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} — ${site.name}`,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [site.name],
      tags: post.tags,
    },
  };
}

export default async function PostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();
  const { newer, older } = getAdjacentPosts(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    keywords: post.tags.join(", "),
    url: `${site.url}/blog/${post.slug}`,
    author: { "@type": "Person", name: site.name, url: site.url },
  };

  return (
    <article className="gutter pb-24 pt-32 lg:pt-44">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="mx-auto max-w-4xl">
        <Link href="/blog" className="label inline-flex items-center gap-2 text-ash transition-colors hover-fine:text-bone">
          <ArrowLeft className="size-3.5" aria-hidden="true" /> All posts
        </Link>
        <div className="label mt-12 flex flex-wrap gap-x-6 gap-y-2 text-ash">
          <time dateTime={post.date} className="text-bone">
            {formatDate(post.date)}
          </time>
          <span>{readingTime(postText(post.body))} min read</span>
          <span>{post.tags.join(" / ")}</span>
        </div>
        <RevealText
          as="h1"
          immediate
          delay={0.2}
          lines={[post.title]}
          className="display-wide mt-6 text-[clamp(2.25rem,6vw,5rem)] text-bone"
        />
        <p className="mt-8 max-w-[60ch] text-xl leading-relaxed text-bone/70">{post.excerpt}</p>
      </header>

      <div className="mx-auto mt-14 max-w-[68ch] border-t border-bone/10 pt-12">
        <PostBody blocks={post.body} />
      </div>

      <nav
        aria-label="More posts"
        className="mx-auto mt-24 grid max-w-4xl gap-px border border-bone/10 bg-bone/10 sm:grid-cols-2"
      >
        {[
          { post: older, label: "← Older" },
          { post: newer, label: "Newer →" },
        ].map(({ post: p, label }) =>
          p ? (
            <Link
              key={label}
              href={`/blog/${p.slug}`}
              className="group bg-ink p-6 transition-colors hover-fine:bg-coal sm:last:text-right"
            >
              <span className="label text-ash">{label}</span>
              <span className="display-wide mt-3 block text-xl text-bone">{p.title}</span>
            </Link>
          ) : (
            <div key={label} className="hidden bg-ink sm:block" />
          ),
        )}
      </nav>
    </article>
  );
}
