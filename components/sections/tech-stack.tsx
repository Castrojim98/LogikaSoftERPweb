import { Section, SectionHeading } from "@/components/ui/section";
import { technologies } from "@/config/technologies";

export function TechStack({ tone = "dark" }: { tone?: "default" | "muted" | "dark" }) {
  const marqueeItems = [...technologies, ...technologies];

  return (
    <Section tone={tone} className="overflow-hidden">
      <SectionHeading
        eyebrow="Tecnologías"
        title="Construido con herramientas de nivel empresarial"
        description="Elegimos tecnología probada en producción para garantizar rendimiento, seguridad y escalabilidad."
        invert={tone === "dark"}
      />

      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-brand-950 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-brand-950 to-transparent"
        />
        <div className="flex w-max animate-marquee gap-4">
          {marqueeItems.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="flex min-w-40 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-semibold text-white/80"
            >
              {tech.name}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
