import { Quote } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { FadeIn } from "@/components/ui/fade-in";
import { testimonials } from "@/config/testimonials";

export function TestimonialsSection() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Testimonios"
        title="Lo que dicen nuestros clientes"
        description="La confianza se construye entregando resultados, proyecto tras proyecto."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <FadeIn key={testimonial.author} delay={index * 0.1}>
            <figure className="flex h-full flex-col rounded-2xl border border-border-subtle bg-surface p-8">
              <Quote aria-hidden className="size-8 text-brand-300" />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-border-subtle pt-4">
                <p className="font-semibold text-foreground">{testimonial.author}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {testimonial.role} · {testimonial.company}
                </p>
              </figcaption>
            </figure>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
