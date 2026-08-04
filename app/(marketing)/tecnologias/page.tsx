import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { TechStack } from "@/components/sections/tech-stack";
import { CtaBanner } from "@/components/sections/cta-banner";
import { FadeIn } from "@/components/ui/fade-in";
import { technologies } from "@/config/technologies";
import { buildMetadata } from "@/utils/seo";
import type { TechItem } from "@/types";

export const metadata: Metadata = buildMetadata({
  title: "Tecnologías",
  description: "Stack tecnológico de LOGIKA SOFT: .NET, C#, ASP.NET Core, SQL Server, Next.js, React, TypeScript, Azure y más.",
  path: "/tecnologias",
});

function groupByCategory(items: TechItem[]) {
  return items.reduce<Record<string, TechItem[]>>((acc, item) => {
    acc[item.category] = acc[item.category] ? [...acc[item.category], item] : [item];
    return acc;
  }, {});
}

export default function TecnologiasPage() {
  const grouped = groupByCategory(technologies);

  return (
    <>
      <Section tone="dark" className="pt-16">
        <SectionHeading
          eyebrow="Tecnologías"
          title="Un stack moderno, probado y escalable"
          description="No experimentamos con tu negocio: usamos tecnología madura, respaldada por comunidades grandes y con soporte a largo plazo."
          invert
        />
      </Section>

      <Section>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(grouped).map(([category, items], index) => (
            <FadeIn key={category} delay={index * 0.08}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-500 dark:text-brand-300">
                {category}
              </h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.name} className="rounded-lg border border-border-subtle bg-surface px-4 py-3 text-sm font-medium">
                    {item.name}
                  </li>
                ))}
              </ul>
            </FadeIn>
          ))}
        </div>
      </Section>

      <TechStack />
      <CtaBanner />
    </>
  );
}
