import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { SuccessStoriesSection } from "@/components/sections/success-stories";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { CtaBanner } from "@/components/sections/cta-banner";
import { buildMetadata } from "@/utils/seo";

export const metadata: Metadata = buildMetadata({
  title: "Casos de Éxito",
  description: "Descubre cómo empresas reales transformaron su operación con soluciones de LOGIKA SOFT.",
  path: "/casos-de-exito",
});

export default function CasosDeExitoPage() {
  return (
    <>
      <Section tone="dark" className="pt-16">
        <SectionHeading
          eyebrow="Casos de éxito"
          title="Resultados que hablan por sí solos"
          description="Cada proyecto es distinto, pero todos comparten el mismo objetivo: generar un impacto medible en el negocio."
          invert
        />
      </Section>
      <SuccessStoriesSection />
      <TestimonialsSection />
      <CtaBanner />
    </>
  );
}
