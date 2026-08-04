import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { ServicesGrid } from "@/components/sections/services-grid";
import { CtaBanner } from "@/components/sections/cta-banner";
import { buildMetadata } from "@/utils/seo";

export const metadata: Metadata = buildMetadata({
  title: "Servicios",
  description:
    "Desarrollo de software, ERP empresarial, sistemas POS, aplicaciones web y móviles, cloud, integraciones, automatización y más.",
  path: "/servicios",
});

export default function ServiciosPage() {
  return (
    <>
      <Section tone="dark" className="pt-16">
        <SectionHeading
          eyebrow="Servicios"
          title="Todo lo que tu empresa necesita para digitalizarse"
          description="Doce frentes de trabajo que cubren desde la idea inicial hasta el mantenimiento continuo de tu software."
          invert
        />
      </Section>
      <ServicesGrid />
      <CtaBanner />
    </>
  );
}
