import { Section, SectionHeading } from "@/components/ui/section";
import { Card, CardDescription, CardIcon, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { services } from "@/config/services";

export function ServicesGrid({
  limit,
  showCta = false,
  tone,
}: {
  limit?: number;
  showCta?: boolean;
  tone?: "default" | "muted" | "dark";
}) {
  const list = limit ? services.slice(0, limit) : services;

  return (
    <Section tone={tone}>
      <SectionHeading
        eyebrow="Servicios"
        title="Soluciones tecnológicas de punta a punta"
        description="Desde una idea hasta un sistema en producción, cubrimos cada etapa del desarrollo de software empresarial."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((service, index) => {
          const Icon = service.icon;
          return (
            <FadeIn key={service.slug} delay={(index % 3) * 0.08}>
              <Card id={service.slug}>
                <CardIcon>
                  <Icon aria-hidden className="size-6" />
                </CardIcon>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </Card>
            </FadeIn>
          );
        })}
      </div>

      {showCta ? (
        <div className="mt-14 text-center">
          <Button href="/servicios" variant="outlineDark">
            Ver todos los servicios
          </Button>
        </div>
      ) : null}
    </Section>
  );
}
