import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { ProductCard } from "@/components/sections/product-card";
import { products } from "@/config/products";
import type { Product } from "@/types";

export function ProductsShowcase({
  items,
  showCta = false,
  tone,
}: {
  items?: Product[];
  showCta?: boolean;
  tone?: "default" | "muted" | "dark";
}) {
  const list = items ?? products;

  return (
    <Section tone={tone}>
      <SectionHeading
        eyebrow="Productos"
        title="Software listo para transformar tu operación"
        description="Productos propios de LOGIKA SOFT, diseñados para resolver necesidades específicas de negocio."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((product, index) => (
          <FadeIn key={product.slug} delay={(index % 3) * 0.08}>
            <ProductCard product={product} />
          </FadeIn>
        ))}
      </div>

      {showCta ? (
        <div className="mt-14 text-center">
          <Button href="/productos" variant="outlineDark">
            Ver todos los productos
          </Button>
        </div>
      ) : null}
    </Section>
  );
}
