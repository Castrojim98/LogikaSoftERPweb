import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";
import { ProductVisual } from "@/components/sections/product-visual";
import type { BlogFrontmatter } from "@/types";

export function BlogCard({ post }: { post: BlogFrontmatter & { readingTime: string } }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-900/10"
    >
      <ProductVisual name={post.title} className="h-44" />
      <div className="flex flex-1 flex-col p-6">
        <span className="text-xs font-semibold uppercase tracking-wide text-brand-500 dark:text-brand-300">
          {post.category}
        </span>
        <h3 className="mt-2 text-lg font-semibold text-foreground group-hover:text-brand-600 dark:group-hover:text-brand-300">
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{post.excerpt}</p>
        <div className="mt-4 flex items-center gap-4 border-t border-border-subtle pt-4 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <CalendarDays aria-hidden className="size-3.5" />
            {new Date(post.date).toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock aria-hidden className="size-3.5" />
            {post.readingTime}
          </span>
        </div>
      </div>
    </Link>
  );
}
