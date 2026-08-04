import { Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { cn } from "@/utils/cn";
import { pricingPlans } from "@/config/pricing";

export function PricingTable() {
  return (
    <Section tone="muted">
      <SectionHeading
        eyebrow="Planes"
        title="Planes flexibles según el tamaño de tu operación"
        description="Cada implementación es distinta. Estos planes son un punto de partida — la cotización final se ajusta a tu alcance."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {pricingPlans.map((plan, index) => (
          <FadeIn key={plan.name} delay={index * 0.1}>
            <div
              className={cn(
                "flex h-full flex-col rounded-2xl border p-8",
                plan.featured
                  ? "border-brand-500 bg-brand-950 text-white shadow-xl shadow-brand-900/20"
                  : "border-border-subtle bg-surface",
              )}
            >
              {plan.featured ? (
                <span className="mb-4 inline-flex w-fit items-center rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                  Más popular
                </span>
              ) : null}
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p className={cn("mt-2 text-sm", plan.featured ? "text-white/70" : "text-slate-600 dark:text-slate-300")}>
                {plan.description}
              </p>
              <div className="mt-6">
                <span className="text-3xl font-bold">{plan.price}</span>
                <p className={cn("text-sm", plan.featured ? "text-white/60" : "text-slate-500 dark:text-slate-400")}>
                  {plan.priceNote}
                </p>
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check aria-hidden className={cn("mt-0.5 size-4 shrink-0", plan.featured ? "text-brand-300" : "text-brand-500")} />
                    <span className={plan.featured ? "text-white/85" : "text-slate-700 dark:text-slate-200"}>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                href="/contacto"
                variant={plan.featured ? "secondary" : "outlineDark"}
                className="mt-8 w-full justify-center"
              >
                {plan.cta}
              </Button>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
