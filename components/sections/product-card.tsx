import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductVisual } from "@/components/sections/product-visual";
import type { Product } from "@/types";

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

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-900/10">
      <ProductVisual name={product.name} className="h-44" />
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-500 dark:text-brand-300">
            {product.category}
          </span>
          <Badge tone={statusTone[product.status]}>{statusLabel[product.status]}</Badge>
        </div>
        <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>
        <p className="mt-1 text-sm font-medium text-brand-600 dark:text-brand-300">{product.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{product.description}</p>

        <ul className="mt-4 space-y-1.5">
          {product.features.slice(0, 3).map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
              <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-500" />
              {feature}
            </li>
          ))}
        </ul>

        <Button href={`/productos/${product.slug}`} variant="link" className="mt-6 justify-start px-0">
          Ver más <ArrowRight aria-hidden className="size-4" />
        </Button>
      </div>
    </div>
  );
}
