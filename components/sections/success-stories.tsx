import { TrendingUp } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { ProductVisual } from "@/components/sections/product-visual";
import { clients, successStories } from "@/config/success-stories";

export function SuccessStoriesSection({ showCta = false }: { showCta?: boolean }) {
  return (
    <Section tone="muted">
      <SectionHeading
        eyebrow="Casos de éxito"
        title="Resultados medibles para negocios reales"
        description="Empresas que ya transformaron su operación con soluciones de LOGIKA SOFT."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {successStories.map((story, index) => (
          <FadeIn key={story.slug} delay={index * 0.1}>
            <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-sm">
              <ProductVisual name={story.client} className="h-36" />
              <div className="flex flex-1 flex-col p-6">
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-500 dark:text-brand-300">
                  {story.industry}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-foreground">{story.client}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{story.summary}</p>
                <ul className="mt-4 space-y-2">
                  {story.results.map((result) => (
                    <li key={result} className="flex items-start gap-2 text-sm font-medium text-brand-600 dark:text-brand-300">
                      <TrendingUp aria-hidden className="mt-0.5 size-4 shrink-0" />
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>

      <div className="mt-16">
        <p className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          Empresas que confían en nosotros
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {clients.map((client) => (
            <span key={client} className="text-sm font-semibold text-slate-400 dark:text-slate-500">
              {client}
            </span>
          ))}
        </div>
      </div>

      {showCta ? (
        <div className="mt-14 text-center">
          <Button href="/casos-de-exito" variant="outlineDark">
            Ver todos los casos de éxito
          </Button>
        </div>
      ) : null}
    </Section>
  );
}
