import type { PortfolioItem } from "@/types";

export const portfolioItems: PortfolioItem[] = [
  {
    slug: "erp-comercializadora-multiproducto",
    title: "ERP para Comercializadora Multiproducto",
    category: "ERP",
    image: "/images/portfolio/placeholder-1.svg",
    description: "Implementación completa de LogikaSoft ERP con módulos de ventas, inventario y caja.",
  },
  {
    slug: "pos-cadena-de-tiendas",
    title: "Sistema POS para Cadena de Tiendas",
    category: "Punto de Venta",
    image: "/images/portfolio/placeholder-2.svg",
    description: "Puntos de venta conectados en tiempo real con facturación electrónica integrada.",
  },
  {
    slug: "marketplace-hecho-en-putumayo",
    title: "Marketplace Hecho en Putumayo",
    category: "E-commerce",
    image: "/images/portfolio/placeholder-3.svg",
    description: "Plataforma de comercio electrónico multi-vendedor para productores locales.",
  },
  {
    slug: "app-movil-ventas",
    title: "App Móvil de Ventas en Campo",
    category: "Aplicación Móvil",
    image: "/images/portfolio/placeholder-4.svg",
    description: "Aplicación móvil para fuerza de ventas con registro de pedidos sin conexión.",
  },
  {
    slug: "sitio-web-corporativo-distribuidora",
    title: "Sitio Web Corporativo Distribuidora Andina",
    category: "Sitio Web",
    image: "/images/portfolio/placeholder-5.svg",
    description: "Sitio institucional con catálogo de productos y formulario de cotización.",
  },
  {
    slug: "crm-grupo-comercial",
    title: "CRM para Grupo Comercial del Sur",
    category: "CRM",
    image: "/images/portfolio/placeholder-6.svg",
    description: "Sistema de gestión de clientes y oportunidades de venta para equipo comercial distribuido.",
  },
];

export const portfolioCategories = [
  "Todos",
  ...Array.from(new Set(portfolioItems.map((item) => item.category))),
];
