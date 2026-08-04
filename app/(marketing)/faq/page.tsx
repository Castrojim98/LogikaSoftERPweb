import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { Accordion } from "@/components/ui/accordion";
import { CtaBanner } from "@/components/sections/cta-banner";
import { faqItems } from "@/config/faq";
import { buildMetadata } from "@/utils/seo";

export const metadata: Metadata = buildMetadata({
  title: "Preguntas Frecuentes",
  description: "Respuestas a las preguntas más comunes sobre los servicios y productos de LOGIKA SOFT.",
  path: "/faq",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Section tone="dark" className="pt-16">
        <SectionHeading
          eyebrow="FAQ"
          title="Preguntas frecuentes"
          description="Si no encuentras la respuesta que buscas, escríbenos directamente y te ayudamos."
          invert
        />
      </Section>
      <Section containerClassName="max-w-3xl">
        <Accordion items={faqItems} />
      </Section>
      <CtaBanner />
    </>
  );
}
