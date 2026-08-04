import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/components/layout/theme-provider";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.legalName,
  alternateName: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/logos/logo.png`,
  description: siteConfig.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.contact.address,
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    contactType: "customer service",
  },
  sameAs: Object.values(siteConfig.socials),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={montserrat.variable} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
