import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { PricingTable } from "@/components/sections/pricing-table";
import { CtaBanner } from "@/components/sections/cta-banner";
import { buildMetadata } from "@/utils/seo";

export const metadata: Metadata = buildMetadata({
  title: "Planes",
  description: "Planes flexibles de LOGIKA SOFT para implementar LogikaSoft ERP y servicios de desarrollo a la medida.",
  path: "/planes",
});

export default function PlanesPage() {
  return (
    <>
      <Section tone="dark" className="pt-16">
        <SectionHeading
          eyebrow="Planes"
          title="Un plan para cada etapa de crecimiento"
          description="Ningún negocio es igual a otro. Estos planes son un punto de partida para construir tu cotización final."
          invert
        />
      </Section>
      <PricingTable />
      <CtaBanner />
    </>
  );
}
