import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { CompanyOverview } from "@/components/sections/company-overview";
import { ServicesGrid } from "@/components/sections/services-grid";
import { ProductsShowcase } from "@/components/sections/products-showcase";
import { TechStack } from "@/components/sections/tech-stack";
import { SuccessStoriesSection } from "@/components/sections/success-stories";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { PricingTable } from "@/components/sections/pricing-table";
import { CtaBanner } from "@/components/sections/cta-banner";
import { getFeaturedProducts } from "@/config/products";
import { products } from "@/config/products";

export const metadata: Metadata = {
  title: "Inicio",
  alternates: { canonical: "/" },
};

export default function Home() {
  const featured = [...getFeaturedProducts(), ...products.filter((p) => !p.featured)].slice(0, 6);

  return (
    <>
      <Hero />
      <CompanyOverview />
      <ServicesGrid limit={6} showCta tone="muted" />
      <ProductsShowcase items={featured} showCta />
      <TechStack />
      <SuccessStoriesSection showCta />
      <TestimonialsSection />
      <PricingTable />
      <CtaBanner />
    </>
  );
}
