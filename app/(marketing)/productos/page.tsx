import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { ProductsShowcase } from "@/components/sections/products-showcase";
import { CtaBanner } from "@/components/sections/cta-banner";
import { buildMetadata } from "@/utils/seo";

export const metadata: Metadata = buildMetadata({
  title: "Productos",
  description:
    "Conoce LogikaSoft ERP, Sistema POS, CRM Empresarial y los demás productos propios de LOGIKA SOFT para digitalizar tu empresa.",
  path: "/productos",
});

export default function ProductosPage() {
  return (
    <>
      <Section tone="dark" className="pt-16">
        <SectionHeading
          eyebrow="Productos"
          title="Software propio, listo para tu operación"
          description="Productos desarrollados y mantenidos por LOGIKA SOFT, en constante evolución según las necesidades de nuestros clientes."
          invert
        />
      </Section>
      <ProductsShowcase />
      <CtaBanner />
    </>
  );
}
