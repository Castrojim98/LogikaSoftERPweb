import {
  Bot,
  Building2,
  Cloud,
  Code2,
  CreditCard,
  FileText,
  Globe,
  LifeBuoy,
  Lightbulb,
  Palette,
  Plug,
  Smartphone,
} from "lucide-react";
import type { Service } from "@/types";

export const services: Service[] = [
  {
    slug: "desarrollo-de-software",
    title: "Desarrollo de Software",
    description:
      "Software a la medida para procesos específicos de tu negocio, desde módulos internos hasta plataformas completas.",
    icon: Code2,
  },
  {
    slug: "erp-empresarial",
    title: "ERP Empresarial",
    description:
      "Planificación de recursos empresariales que integra ventas, inventario, compras, finanzas y más en un solo lugar.",
    icon: Building2,
  },
  {
    slug: "sistemas-pos",
    title: "Sistemas POS",
    description: "Puntos de venta rápidos, confiables y conectados a tu inventario y facturación en tiempo real.",
    icon: CreditCard,
  },
  {
    slug: "aplicaciones",
    title: "Aplicaciones Web",
    description: "Plataformas web modernas, seguras y escalables construidas con las mejores prácticas de ingeniería.",
    icon: Globe,
  },
  {
    slug: "aplicaciones-moviles",
    title: "Aplicaciones Móviles",
    description: "Apps nativas e híbridas para iOS y Android que extienden tu negocio al bolsillo de tus clientes.",
    icon: Smartphone,
  },
  {
    slug: "computacion-en-la-nube",
    title: "Computación en la Nube",
    description: "Infraestructura en la nube optimizada en costo, disponibilidad y seguridad para tu operación.",
    icon: Cloud,
  },
  {
    slug: "integraciones",
    title: "Integraciones",
    description: "Conectamos tus sistemas entre sí y con pasarelas de pago, marketplaces y servicios externos vía API.",
    icon: Plug,
  },
  {
    slug: "automatizacion",
    title: "Automatización",
    description: "Eliminamos tareas manuales repetitivas con flujos automatizados que ahorran tiempo y reducen errores.",
    icon: Bot,
  },
  {
    slug: "consultoria-tecnologica",
    title: "Consultoría Tecnológica",
    description: "Acompañamiento estratégico para elegir, planear y ejecutar la tecnología correcta para tu empresa.",
    icon: Lightbulb,
  },
  {
    slug: "facturacion-electronica",
    title: "Facturación Electrónica",
    description: "Cumplimiento normativo garantizado con emisión, validación y gestión de documentos electrónicos.",
    icon: FileText,
  },
  {
    slug: "diseno-ux-ui",
    title: "Diseño UX/UI",
    description: "Interfaces claras y atractivas diseñadas para que tus usuarios logren sus objetivos sin fricción.",
    icon: Palette,
  },
  {
    slug: "mantenimiento-de-software",
    title: "Mantenimiento de Software",
    description: "Soporte continuo, monitoreo y evolución de tus sistemas para que nunca dejen de funcionar bien.",
    icon: LifeBuoy,
  },
];
