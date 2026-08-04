import type { LucideIcon } from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export type ProductStatus = "disponible" | "beta" | "proximamente";

export type ProductModule = {
  name: string;
  status?: ProductStatus;
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  status: ProductStatus;
  featured?: boolean;
  category: string;
  features: string[];
  modules?: ProductModule[];
};

export type TechItem = {
  name: string;
  category: "Backend" | "Frontend" | "Cloud & DevOps" | "Datos";
};

export type SuccessStory = {
  slug: string;
  client: string;
  industry: string;
  summary: string;
  results: string[];
  image: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
};

export type PricingPlan = {
  name: string;
  description: string;
  price: string;
  priceNote: string;
  featured?: boolean;
  features: string[];
  cta: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type PortfolioItem = {
  slug: string;
  title: string;
  category: string;
  image: string;
  description: string;
};

export type BlogFrontmatter = {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  coverImage: string;
  featured?: boolean;
};

export type BlogPost = BlogFrontmatter & {
  content: string;
  readingTime: string;
};
