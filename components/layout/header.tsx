import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { mainNav } from "@/config/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-background/80 backdrop-blur-lg">
      <Container>
        <div className="relative flex h-20 items-center justify-between">
          <Logo />

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegación principal">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle className="hidden sm:inline-flex" />
            <Button href="/contacto" size="sm" className="hidden lg:inline-flex">
              Solicitar Cotización
            </Button>
            <MobileNav items={mainNav} />
          </div>
        </div>
      </Container>
    </header>
  );
}
