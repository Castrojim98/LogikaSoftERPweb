import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { ContactForm } from "@/components/sections/contact-form";
import { FadeIn } from "@/components/ui/fade-in";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/utils/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contacto",
  description: "Solicita una cotización con LOGIKA SOFT. Cuéntanos sobre tu proyecto y te contactaremos en menos de 24 horas.",
  path: "/contacto",
});

const contactChannels = [
  {
    icon: Mail,
    label: "Correo",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    icon: Phone,
    label: "Teléfono",
    value: siteConfig.contact.phone,
    href: `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Escríbenos directamente",
    href: siteConfig.contact.whatsapp,
  },
  {
    icon: MapPin,
    label: "Ubicación",
    value: siteConfig.contact.address,
    href: "https://www.openstreetmap.org/search?query=Mocoa%2C%20Putumayo%2C%20Colombia",
  },
];

export default function ContactoPage() {
  return (
    <>
      <Section tone="dark" className="pt-16">
        <SectionHeading
          eyebrow="Contacto"
          title="Cuéntanos sobre tu proyecto"
          description="Completa el formulario y un asesor se pondrá en contacto contigo en menos de 24 horas hábiles."
          invert
        />
      </Section>

      <Section>
        <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr]">
          <FadeIn>
            <div className="rounded-2xl border border-border-subtle bg-surface p-8">
              <ContactForm />
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="flex flex-col gap-8">
            <div className="grid gap-4">
              {contactChannels.map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-start gap-4 rounded-xl border border-border-subtle bg-surface p-4 transition-colors hover:border-brand-300"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-800 dark:text-brand-300">
                    <channel.icon aria-hidden className="size-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-foreground">{channel.label}</span>
                    <span className="block text-sm text-slate-600 dark:text-slate-300">{channel.value}</span>
                  </span>
                </a>
              ))}
            </div>

            <div className="overflow-hidden rounded-2xl border border-border-subtle">
              <iframe
                title="Ubicación de LOGIKA SOFT"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-76.6862%2C1.1219%2C-76.6062%2C1.1819&layer=mapnik"
                className="h-64 w-full"
                loading="lazy"
              />
            </div>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
