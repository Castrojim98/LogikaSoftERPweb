import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { ProductVisual } from "@/components/sections/product-visual";
import { getProductBySlug, products } from "@/config/products";
import { buildMetadata } from "@/utils/seo";
import type { Product } from "@/types";
import { cn } from "@/utils/cn";

const statusLabel: Record<Product["status"], string> = {
  disponible: "Disponible",
  beta: "Beta",
  proximamente: "Próximamente",
};

const statusTone: Record<Product["status"], "available" | "beta" | "upcoming"> = {
  disponible: "available",
  beta: "beta",
  proximamente: "upcoming",
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return buildMetadata({
    title: product.name,
    description: product.description,
    path: `/productos/${product.slug}`,
  });
}

export default async function ProductoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: product.category,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <Section tone="dark" className="pt-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <FadeIn>
            <div className="mb-4 flex items-center gap-3">
              <span className="text-sm font-semibold uppercase tracking-widest text-brand-300">{product.category}</span>
              <Badge tone={statusTone[product.status]}>{statusLabel[product.status]}</Badge>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{product.name}</h1>
            <p className="mt-4 text-xl text-brand-200">{product.tagline}</p>
            <p className="mt-6 text-lg leading-relaxed text-white/70">{product.description}</p>
            <Button href="/contacto" size="lg" className="mt-8">
              Solicitar Cotización <ArrowRight aria-hidden className="size-4" />
            </Button>
          </FadeIn>
          <FadeIn delay={0.15}>
            <ProductVisual name={product.name} image={product.image} className="h-72 rounded-3xl" />
          </FadeIn>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Características" title="Todo lo que incluye" align="left" />
        <div className="grid gap-4 sm:grid-cols-2">
          {product.features.map((feature) => (
            <div key={feature} className="flex items-start gap-3 rounded-xl border border-border-subtle bg-surface p-4">
              <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-500" />
              <span className="text-sm text-slate-700 dark:text-slate-200">{feature}</span>
            </div>
          ))}
        </div>
      </Section>

      {product.modules ? (
        <Section tone="muted">
          <SectionHeading eyebrow="Módulos" title="Arquitectura modular de LogikaSoft ERP" align="left" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {product.modules.map((module) => (
              <div
                key={module.name}
                className={cn(
                  "flex items-center justify-between gap-2 rounded-xl border px-4 py-3 text-sm font-medium",
                  module.status === "proximamente"
                    ? "border-dashed border-border-subtle text-slate-400 dark:text-slate-500"
                    : "border-border-subtle bg-surface text-foreground",
                )}
              >
                {module.name}
                {module.status === "proximamente" ? (
                  <span className="text-xs font-semibold uppercase text-amber-600 dark:text-amber-400">Próx.</span>
                ) : null}
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      <Section>
        <SectionHeading eyebrow="¿Interesado?" title="Solicita una demo personalizada" />
        <div className="text-center">
          <Button href="/contacto" size="lg">
            Solicitar Cotización <ArrowRight aria-hidden className="size-4" />
          </Button>
        </div>
      </Section>
    </>
  );
}
