import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/layout/logo";
import { FacebookIcon, GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/social-icons";
import { footerNav, siteConfig } from "@/config/site";

const socialLinks = [
  { href: siteConfig.socials.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  { href: siteConfig.socials.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: siteConfig.socials.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: siteConfig.socials.github, label: "GitHub", Icon: GithubIcon },
];

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-white/60">{title}</h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-white/80 transition-colors hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-brand-950 text-white">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Logo className="text-white" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              {siteConfig.description}
            </p>
            <ul className="mt-6 space-y-2 text-sm text-white/80">
              <li className="flex items-center gap-2">
                <MapPin aria-hidden className="size-4 text-brand-300" /> {siteConfig.contact.address}
              </li>
              <li className="flex items-center gap-2">
                <Phone aria-hidden className="size-4 text-brand-300" /> {siteConfig.contact.phone}
              </li>
              <li className="flex items-center gap-2">
                <Mail aria-hidden className="size-4 text-brand-300" /> {siteConfig.contact.email}
              </li>
            </ul>
            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ href, label, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-brand-500"
                >
                  <Icon aria-hidden className="size-4" />
                </Link>
              ))}
            </div>
          </div>

          <FooterColumn title="Empresa" links={footerNav.company} />
          <FooterColumn title="Servicios" links={footerNav.services} />
          <FooterColumn title="Productos" links={footerNav.products} />
          <FooterColumn title="Legal" links={footerNav.legal} />
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. Todos los derechos reservados.
          </p>
          <p>Hecho con tecnología propia en Colombia.</p>
        </div>
      </Container>
    </footer>
  );
}
