import type { MetadataRoute } from "next";
import { publishedPosts } from "@/data/posts";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({ url: `${site.url}/projects/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${site.url}/blog`, changeFrequency: "weekly", priority: 0.7 },
    ...publishedPosts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: p.date,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
