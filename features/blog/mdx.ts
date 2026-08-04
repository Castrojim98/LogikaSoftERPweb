import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { BlogFrontmatter } from "@/types";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function getMdxFilenames() {
  return fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".mdx"));
}

export function getAllPostsMeta(): (BlogFrontmatter & { readingTime: string })[] {
  const filenames = getMdxFilenames();

  const posts = filenames.map((filename) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
    const { data, content } = matter(raw);
    const frontmatter = data as BlogFrontmatter;

    return {
      ...frontmatter,
      readingTime: readingTime(content).text,
    };
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostRawBySlug(slug: string) {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    frontmatter: data as BlogFrontmatter,
    content,
    readingTime: readingTime(content).text,
  };
}

export function getAllCategories() {
  const posts = getAllPostsMeta();
  return Array.from(new Set(posts.map((post) => post.category)));
}

export function getAllTags() {
  const posts = getAllPostsMeta();
  return Array.from(new Set(posts.flatMap((post) => post.tags)));
}
