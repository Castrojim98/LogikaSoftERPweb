import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { BlogList } from "@/components/sections/blog-list";
import { getAllCategories, getAllPostsMeta } from "@/features/blog/mdx";
import { buildMetadata } from "@/utils/seo";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description: "Artículos sobre ERP, facturación electrónica, transformación digital y tecnología para empresas.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPostsMeta();
  const categories = getAllCategories();

  return (
    <>
      <Section tone="dark" className="pt-16">
        <SectionHeading
          eyebrow="Blog"
          title="Ideas sobre tecnología y gestión empresarial"
          description="Contenido práctico para ayudarte a tomar mejores decisiones tecnológicas en tu empresa."
          invert
        />
      </Section>
      <Section>
        <BlogList posts={posts} categories={categories} />
      </Section>
    </>
  );
}
