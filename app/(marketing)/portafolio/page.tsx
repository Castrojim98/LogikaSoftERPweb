import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { PortfolioGrid } from "@/components/sections/portfolio-grid";
import { CtaBanner } from "@/components/sections/cta-banner";
import { buildMetadata } from "@/utils/seo";

export const metadata: Metadata = buildMetadata({
  title: "Portafolio",
  description: "Explora proyectos desarrollados por LOGIKA SOFT filtrados por categoría.",
  path: "/portafolio",
});

export default function PortafolioPage() {
  return (
    <>
      <Section tone="dark" className="pt-16">
        <SectionHeading
          eyebrow="Portafolio"
          title="Proyectos que ya están en producción"
          description="Una muestra de lo que hemos construido para nuestros clientes. Este portafolio sigue creciendo con cada nuevo proyecto."
          invert
        />
      </Section>
      <Section>
        <PortfolioGrid />
      </Section>
      <CtaBanner />
    </>
  );
}
