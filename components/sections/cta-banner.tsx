import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";

export function CtaBanner() {
  return (
    <section className="bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 py-20 text-white">
      <Container>
        <FadeIn className="flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              ¿Listo para digitalizar tu empresa?
            </h2>
            <p className="mt-3 max-w-xl text-white/80">
              Cuéntanos qué necesitas y te enviamos una propuesta clara, con
              alcance y tiempos definidos.
            </p>
          </div>
          <Button href="/contacto" size="lg" variant="secondary" className="shrink-0">
            Solicitar Cotización
            <ArrowRight aria-hidden className="size-4" />
          </Button>
        </FadeIn>
      </Container>
    </section>
  );
}
