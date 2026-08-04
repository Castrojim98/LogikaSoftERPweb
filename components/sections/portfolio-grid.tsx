"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ProductVisual } from "@/components/sections/product-visual";
import { cn } from "@/utils/cn";
import { portfolioCategories, portfolioItems } from "@/config/portfolio";

export function PortfolioGrid() {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredItems = useMemo(() => {
    if (activeCategory === "Todos") return portfolioItems;
    return portfolioItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <div>
      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {portfolioCategories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            aria-pressed={activeCategory === category}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              activeCategory === category
                ? "bg-brand-600 text-white"
                : "bg-surface-muted text-slate-600 hover:bg-brand-50 dark:text-slate-300 dark:hover:bg-brand-800/50",
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <motion.article
            key={item.slug}
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-sm"
          >
            <ProductVisual name={item.title} className="h-44" />
            <div className="p-6">
              <span className="text-xs font-semibold uppercase tracking-wide text-brand-500 dark:text-brand-300">
                {item.category}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
