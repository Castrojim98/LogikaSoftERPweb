import { CheckCircle2 } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";

const reasons = [
  "Software construido a la medida de tu proceso, no al revés",
  "Equipo propio de ingeniería, sin subcontratación",
  "Acompañamiento desde el análisis hasta el soporte post-entrega",
  "Cumplimiento normativo garantizado en facturación electrónica",
];

export function CompanyOverview() {
  return (
    <Section>
      <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
        <FadeIn>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-500 dark:text-brand-300">
            Quiénes somos
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Un equipo de ingeniería enfocado en resolver problemas de negocio reales
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            LOGIKA SOFT nace para cerrar la brecha entre lo que las empresas
            necesitan y el software genérico que encuentran en el mercado.
            Diseñamos, desarrollamos e implementamos soluciones tecnológicas
            propias que se adaptan a la forma en que tu empresa realmente
            opera.
          </p>
          <Button href="/empresa" variant="outlineDark" className="mt-8">
            Conocer más sobre nosotros
          </Button>
        </FadeIn>

        <FadeIn delay={0.15}>
          <ul className="space-y-4">
            {reasons.map((reason) => (
              <li key={reason} className="flex items-start gap-3 rounded-xl border border-border-subtle bg-surface p-4">
                <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-500" />
                <span className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">{reason}</span>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </Section>
  );
}
