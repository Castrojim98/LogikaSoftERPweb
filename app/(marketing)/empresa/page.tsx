import type { Metadata } from "next";
import { Award, Compass, Handshake, Rocket, ShieldCheck, Target, Users } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card, CardDescription, CardIcon, CardTitle } from "@/components/ui/card";
import { FadeIn } from "@/components/ui/fade-in";
import { CtaBanner } from "@/components/sections/cta-banner";
import { buildMetadata } from "@/utils/seo";

export const metadata: Metadata = buildMetadata({
  title: "Empresa",
  description:
    "Conoce a LOGIKA SOFT: nuestra misión, visión, valores e historia como empresa de desarrollo de software empresarial.",
  path: "/empresa",
});

const values = [
  { icon: ShieldCheck, title: "Integridad", description: "Hacemos lo que decimos y decimos lo que hacemos, con cada cliente y en cada entrega." },
  { icon: Rocket, title: "Innovación", description: "Buscamos la mejor solución, no la más fácil, incorporando tecnología moderna y probada." },
  { icon: Handshake, title: "Compromiso", description: "Acompañamos a nuestros clientes más allá de la entrega del proyecto." },
  { icon: Award, title: "Calidad", description: "Cuidamos cada detalle del software que construimos, desde la arquitectura hasta la interfaz." },
];

const reasons = [
  { icon: Users, title: "Equipo propio", description: "Ingenieros de planta, no freelancers dispersos. Continuidad garantizada en cada proyecto." },
  { icon: Target, title: "Enfoque en resultados", description: "Medimos el éxito por el impacto real en tu operación, no por horas facturadas." },
  { icon: Compass, title: "Acompañamiento estratégico", description: "Te ayudamos a decidir qué construir, no solo a construir lo que pides." },
];

export default function EmpresaPage() {
  return (
    <>
      <Section tone="dark" className="pt-16">
        <SectionHeading
          eyebrow="Empresa"
          title="Ingeniería de software con propósito"
          description="Somos una empresa colombiana de desarrollo de software enfocada en construir herramientas que realmente transforman la manera en que operan las empresas."
          invert
        />
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <FadeIn className="rounded-2xl border border-border-subtle bg-surface p-8">
            <h3 className="text-xl font-bold">Misión</h3>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              Desarrollar software empresarial a la medida que resuelva problemas
              reales de negocio, con calidad de ingeniería y acompañamiento
              cercano a cada cliente.
            </p>
          </FadeIn>
          <FadeIn delay={0.1} className="rounded-2xl border border-border-subtle bg-surface p-8">
            <h3 className="text-xl font-bold">Visión</h3>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              Ser la empresa de referencia en software de gestión empresarial en
              la región, reconocida por la calidad de sus productos y la
              cercanía con sus clientes.
            </p>
          </FadeIn>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="Nuestra historia" title="De un problema local a una plataforma empresarial" align="left" />
        <FadeIn className="max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          <p>
            LOGIKA SOFT nació al identificar que muchas empresas de la región
            operaban con hojas de cálculo, sistemas dispersos y procesos
            manuales que limitaban su crecimiento. Empezamos construyendo
            soluciones puntuales de facturación e inventario, y con el tiempo
            evolucionamos hacia LogikaSoft ERP: una plataforma integral capaz
            de acompañar a una empresa en cada etapa de su operación.
          </p>
          <p className="mt-4">
            Hoy seguimos con el mismo principio del primer día: entender el
            negocio antes de escribir una sola línea de código.
          </p>
        </FadeIn>
      </Section>

      <Section>
        <SectionHeading eyebrow="Valores" title="Lo que guía nuestro trabajo todos los días" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <FadeIn key={value.title} delay={index * 0.08}>
              <Card>
                <CardIcon>
                  <value.icon aria-hidden className="size-6" />
                </CardIcon>
                <CardTitle>{value.title}</CardTitle>
                <CardDescription>{value.description}</CardDescription>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="Por qué elegirnos" title="Una alianza tecnológica de largo plazo" />
        <div className="grid gap-6 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <FadeIn key={reason.title} delay={index * 0.1}>
              <Card>
                <CardIcon>
                  <reason.icon aria-hidden className="size-6" />
                </CardIcon>
                <CardTitle>{reason.title}</CardTitle>
                <CardDescription>{reason.description}</CardDescription>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
