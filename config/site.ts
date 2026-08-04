export const siteConfig = {
  name: "LOGIKA SOFT",
  legalName: "Logika Soft S.A.S.",
  tagline: "Software empresarial que impulsa tu crecimiento",
  description:
    "LOGIKA SOFT desarrolla software empresarial a la medida: ERP, POS, CRM, facturación electrónica y aplicaciones web y móviles para empresas que quieren escalar con tecnología confiable.",
  url: "https://www.logikasoft.com",
  ogImage: "/images/og-default.jpg",
  locale: "es_CO",
  keywords: [
    "software empresarial",
    "ERP Colombia",
    "sistema POS",
    "facturación electrónica",
    "desarrollo de software a la medida",
    "CRM empresarial",
    "LOGIKA SOFT",
  ],
  contact: {
    email: "contacto@logikasoft.com",
    phone: "+57 313 481 9183",
    whatsapp: "https://wa.me/573134819183",
    address: "Orito, Putumayo, Colombia",
  },
  socials: {
    linkedin: "https://www.linkedin.com/company/logikasoft",
    facebook: "https://www.facebook.com/logikasoft",
    instagram: "https://www.instagram.com/logikasoft",
    github: "https://github.com/logikasoft",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
};

export const mainNav: NavItem[] = [
  { label: "Empresa", href: "/empresa" },
  { label: "Servicios", href: "/servicios" },
  { label: "Productos", href: "/productos" },
  { label: "Tecnologías", href: "/tecnologias" },
  { label: "Casos de Éxito", href: "/casos-de-exito" },
  { label: "Planes", href: "/planes" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contacto" },
];

export const footerNav = {
  company: [
    { label: "Quiénes somos", href: "/empresa" },
    { label: "Casos de éxito", href: "/casos-de-exito" },
    { label: "Blog", href: "/blog" },
    { label: "Preguntas frecuentes", href: "/faq" },
  ],
  services: [
    { label: "Desarrollo de Software", href: "/servicios#desarrollo-de-software" },
    { label: "ERP Empresarial", href: "/servicios#erp-empresarial" },
    { label: "Sistemas POS", href: "/servicios#sistemas-pos" },
    { label: "Aplicaciones Web y Móviles", href: "/servicios#aplicaciones" },
  ],
  products: [
    { label: "LogikaSoft ERP", href: "/productos/logikasoft-erp" },
    { label: "Sistema POS", href: "/productos/sistema-pos" },
    { label: "CRM Empresarial", href: "/productos/crm-empresarial" },
    { label: "Ver todos los productos", href: "/productos" },
  ],
  legal: [
    { label: "Política de privacidad", href: "/politicas/privacidad" },
    { label: "Términos y condiciones", href: "/politicas/terminos" },
  ],
} satisfies Record<string, NavItem[]>;
