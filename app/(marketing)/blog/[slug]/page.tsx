import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { ProductVisual } from "@/components/sections/product-visual";
import { getAllPostsMeta, getPostRawBySlug } from "@/features/blog/mdx";
import { buildMetadata } from "@/utils/seo";

export function generateStaticParams() {
  return getAllPostsMeta().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostRawBySlug(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    path: `/blog/${slug}`,
    image: post.frontmatter.coverImage,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostRawBySlug(slug);

  if (!post) {
    notFound();
  }

  const { content } = await compileMDX({
    source: post.content,
    options: { parseFrontmatter: false },
  });

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    datePublished: post.frontmatter.date,
    author: { "@type": "Organization", name: post.frontmatter.author },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <Section tone="dark" className="pt-16">
        <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-brand-300 hover:text-white">
          <ArrowLeft aria-hidden className="size-4" /> Volver al blog
        </Link>
        <Badge tone="neutral" className="mb-4 bg-white/10 text-white">
          {post.frontmatter.category}
        </Badge>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">{post.frontmatter.title}</h1>
        <div className="mt-6 flex items-center gap-5 text-sm text-white/60">
          <span className="flex items-center gap-1.5">
            <CalendarDays aria-hidden className="size-4" />
            {new Date(post.frontmatter.date).toLocaleDateString("es-CO", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock aria-hidden className="size-4" />
            {post.readingTime}
          </span>
          <span>Por {post.frontmatter.author}</span>
        </div>
      </Section>

      <ProductVisual name={post.frontmatter.title} className="h-64 rounded-none" />

      <Section containerClassName="max-w-3xl">
        <article className="prose prose-slate dark:prose-invert prose-headings:font-bold prose-a:text-brand-600">
          {content}
        </article>

        <div className="mt-10 flex flex-wrap gap-2 border-t border-border-subtle pt-8">
          {post.frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-surface-muted px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      </Section>
    </>
  );
}
