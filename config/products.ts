import type { Product } from "@/types";

export const products: Product[] = [
  {
    slug: "logikasoft-erp",
    name: "LogikaSoft ERP",
    tagline: "El sistema de gestión que hace crecer tu empresa",
    description:
      "Plataforma integral de planificación de recursos empresariales: ventas, compras, inventario, caja, facturación electrónica y CRM en un solo lugar, con soporte multiempresa y multisucursal.",
    image: "/images/products/placeholder-erp.svg",
    status: "disponible",
    featured: true,
    category: "ERP",
    features: [
      "Multiempresa y multisucursal",
      "Roles, permisos y auditoría",
      "Facturación electrónica integrada",
      "Dashboard gerencial en tiempo real",
      "CRM incluido",
    ],
    modules: [
      { name: "Dashboard", status: "disponible" },
      { name: "Ventas", status: "disponible" },
      { name: "Compras", status: "disponible" },
      { name: "Inventario", status: "disponible" },
      { name: "Clientes", status: "disponible" },
      { name: "Proveedores", status: "disponible" },
      { name: "Caja", status: "disponible" },
      { name: "POS", status: "disponible" },
      { name: "Facturación Electrónica", status: "disponible" },
      { name: "CRM", status: "disponible" },
      { name: "Reportes", status: "disponible" },
      { name: "Usuarios", status: "disponible" },
      { name: "Roles", status: "disponible" },
      { name: "Permisos", status: "disponible" },
      { name: "Auditoría", status: "disponible" },
      { name: "Multiempresa", status: "disponible" },
      { name: "Sucursales", status: "disponible" },
      { name: "Aplicación móvil", status: "proximamente" },
      { name: "SaaS", status: "proximamente" },
    ],
  },
  {
    slug: "marketplace-hecho-en-putumayo",
    name: "Marketplace Hecho en Putumayo",
    tagline: "El canal digital de los productores y emprendedores del Putumayo",
    description:
      "Plataforma de comercio electrónico que conecta productores y emprendedores locales con compradores dentro y fuera de la región.",
    image: "/images/products/placeholder-marketplace.svg",
    status: "disponible",
    category: "E-commerce",
    features: [
      "Catálogo multi-vendedor",
      "Gestión de pedidos y envíos",
      "Pasarela de pagos integrada",
      "Panel para productores",
    ],
  },
  {
    slug: "sistema-pos",
    name: "Sistema POS",
    tagline: "Punto de venta rápido y conectado a tu inventario",
    description:
      "Sistema de punto de venta pensado para comercio y retail, con facturación electrónica y sincronización de inventario en tiempo real.",
    image: "/images/products/pos.png",
    status: "disponible",
    category: "Punto de Venta",
    features: ["Ventas rápidas en mostrador", "Control de caja", "Facturación electrónica", "Multi-sucursal"],
  },
  {
    slug: "crm-empresarial",
    name: "CRM Empresarial",
    tagline: "Gestiona tus clientes y oportunidades de venta",
    description: "Herramienta de gestión de relaciones con clientes para dar seguimiento a oportunidades, contactos y ventas.",
    image: "/images/products/placeholder-crm.svg",
    status: "disponible",
    category: "CRM",
    features: ["Embudo de ventas visual", "Historial de interacciones", "Recordatorios y tareas", "Reportes de conversión"],
  },
  {
    slug: "sistema-de-inventarios",
    name: "Sistema de Inventarios",
    tagline: "Control preciso de tu stock en todo momento",
    description: "Gestión de inventario con control de existencias, alertas de stock mínimo y trazabilidad por bodega.",
    image: "/images/products/placeholder-inventarios.svg",
    status: "disponible",
    category: "Inventario",
    features: ["Control multi-bodega", "Alertas de stock mínimo", "Trazabilidad de movimientos", "Reportes de rotación"],
  },
  {
    slug: "sistema-de-facturacion-electronica",
    name: "Sistema de Facturación Electrónica",
    tagline: "Cumplimiento normativo sin complicaciones",
    description: "Emisión, validación y gestión de documentos electrónicos conforme a la normativa vigente.",
    image: "/images/products/placeholder-facturacion.svg",
    status: "disponible",
    category: "Facturación",
    features: ["Emisión de facturas y notas", "Validación automática", "Envío por correo al cliente", "Reportes fiscales"],
  },
  {
    slug: "sistema-de-gestion-documental",
    name: "Sistema de Gestión Documental",
    tagline: "Organiza y controla los documentos de tu empresa",
    description: "Repositorio centralizado para almacenar, clasificar y controlar versiones de documentos empresariales.",
    image: "/images/products/placeholder-documental.svg",
    status: "proximamente",
    category: "Gestión Documental",
    features: ["Control de versiones", "Permisos por carpeta", "Búsqueda avanzada", "Flujos de aprobación"],
  },
  {
    slug: "app-movil-empresarial",
    name: "App Móvil Empresarial",
    tagline: "Tu operación en el bolsillo",
    description: "Aplicación móvil complementaria a LogikaSoft ERP para consultar reportes y gestionar ventas desde cualquier lugar.",
    image: "/images/products/placeholder-app-movil.svg",
    status: "proximamente",
    category: "Móvil",
    features: ["Consulta de reportes en vivo", "Registro de ventas móviles", "Notificaciones push", "Modo sin conexión"],
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getFeaturedProducts() {
  return products.filter((product) => product.featured);
}
