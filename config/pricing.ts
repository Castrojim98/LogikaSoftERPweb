import type { PricingPlan } from "@/types";

export const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    description: "Para negocios que están comenzando a digitalizar su operación.",
    price: "A la medida",
    priceNote: "cotización personalizada",
    features: [
      "1 módulo (POS, inventario o facturación)",
      "Hasta 3 usuarios",
      "Soporte por correo",
      "Actualizaciones de seguridad",
    ],
    cta: "Solicitar Cotización",
  },
  {
    name: "Business",
    description: "Para empresas que necesitan varios módulos integrados y soporte prioritario.",
    price: "A la medida",
    priceNote: "cotización personalizada",
    featured: true,
    features: [
      "Módulos ilimitados de LogikaSoft ERP",
      "Usuarios ilimitados",
      "Multiempresa y sucursales",
      "Soporte prioritario",
      "Integraciones API incluidas",
    ],
    cta: "Solicitar Cotización",
  },
  {
    name: "Enterprise",
    description: "Para organizaciones con necesidades complejas de desarrollo a la medida.",
    price: "A la medida",
    priceNote: "cotización personalizada",
    features: [
      "Todo lo de Business",
      "Desarrollo de módulos exclusivos",
      "Arquitectura dedicada",
      "Consultoría tecnológica continua",
      "SLA garantizado",
    ],
    cta: "Hablar con un asesor",
  },
];
