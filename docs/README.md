# LOGIKA SOFT — Sitio Web Corporativo

> Documentación técnica, funcional y de despliegue del sitio web oficial de **LOGIKA SOFT**.
> Esta carpeta (`/docs`) es la fuente de verdad para cualquier persona que necesite instalar, entender, mantener, extender o desplegar este proyecto.

---

## Índice de la documentación

| Documento | Contenido |
|---|---|
| [README.md](./README.md) | Este documento. Visión general del proyecto. |
| [INSTALLATION.md](./INSTALLATION.md) | Instalación local paso a paso. |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Despliegue en Vercel, Azure, VPS, Docker, Nginx, Cloudflare. |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Arquitectura de software, flujo de datos, renderizado. |
| [FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md) | Propósito de cada carpeta del repositorio. |
| [TECHNOLOGIES.md](./TECHNOLOGIES.md) | Stack tecnológico y justificación de cada elección. |
| [ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md) | Variables de entorno y su configuración. |
| [CODING_STANDARDS.md](./CODING_STANDARDS.md) | Convenciones de código, nombres y Git. |
| [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) | Sistema de diseño: colores, tipografía, componentes visuales. |
| [COMPONENT_GUIDE.md](./COMPONENT_GUIDE.md) | Catálogo de componentes reutilizables con props y ejemplos. |
| [ROUTES.md](./ROUTES.md) | Mapa de rutas del sitio y su configuración SEO. |
| [SEO.md](./SEO.md) | Estrategia de SEO técnico implementada. |
| [SECURITY.md](./SECURITY.md) | Seguridad de la aplicación. |
| [PERFORMANCE.md](./PERFORMANCE.md) | Optimización de rendimiento y Core Web Vitals. |
| [API.md](./API.md) | Server Actions y contratos de datos. |
| [CMS.md](./CMS.md) | Cómo administrar el contenido editable (productos, blog, etc.). |
| [MAINTENANCE.md](./MAINTENANCE.md) | Guía de mantenimiento y evolución del proyecto. |
| [TESTING.md](./TESTING.md) | Estrategia de pruebas manuales y automatizadas. |
| [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) | Errores comunes y sus soluciones. |
| [CHANGELOG.md](./CHANGELOG.md) | Historial de versiones. |
| [FUTURE_IMPROVEMENTS.md](./FUTURE_IMPROVEMENTS.md) | Roadmap de producto y arquitectura. |

---

## 1. Descripción del proyecto

**LOGIKA SOFT** es el sitio web corporativo oficial de la empresa de software LOGIKA SOFT. Es una aplicación web moderna, construida con **Next.js 16** sobre el App Router, cuyo propósito es:

- Presentar la empresa, su misión, visión, valores e historia.
- Exhibir el catálogo de servicios de desarrollo de software.
- Presentar los productos propios de la compañía, con **LogikaSoft ERP** como producto insignia.
- Mostrar casos de éxito, testimonios y clientes.
- Recibir solicitudes de cotización a través de un formulario de contacto conectado a un proveedor de correo transaccional (Resend).
- Publicar contenido de un blog corporativo en formato MDX.
- Servir de base extensible para futuras integraciones (portal de clientes, CMS, ERP SaaS — ver [FUTURE_IMPROVEMENTS.md](./FUTURE_IMPROVEMENTS.md)).

El sitio fue diseñado explícitamente para transmitir el nivel de profesionalismo de compañías de software internacionales (Microsoft, Stripe, Vercel, SAP, Zoho), priorizando: diseño minimalista corporativo, rendimiento, accesibilidad y SEO completo.

## 2. Objetivos del proyecto

| Objetivo | Cómo se cumple |
|---|---|
| Generar leads comerciales | Formulario de cotización en `/contacto` con validación y envío de correo real. |
| Comunicar el catálogo de productos y servicios | Secciones dedicadas con datos centralizados en `/config`. |
| Posicionamiento SEO orgánico | Metadata completa, `sitemap.xml`, `robots.txt`, JSON-LD en todas las páginas relevantes. |
| Credibilidad y prueba social | Casos de éxito, testimonios y logos de clientes. |
| Contenido de valor / marketing de contenidos | Blog técnico en MDX, indexable y con SEO propio. |
| Escalabilidad futura | Arquitectura modular (`features/`, `config/`, `types/`) lista para crecer hacia un portal de clientes o ERP SaaS. |

## 3. Tecnologías principales

Ver el detalle completo y la justificación de cada elección en [TECHNOLOGIES.md](./TECHNOLOGIES.md). Resumen:

- **Next.js 16** (App Router, React Server Components, Turbopack)
- **React 19**
- **TypeScript** (modo `strict`)
- **TailwindCSS v4** (configuración CSS-first, sin `tailwind.config.js`)
- **Framer Motion** — animaciones y transiciones
- **React Hook Form + Zod** — formularios y validación
- **Resend** — envío de correo transaccional desde Server Actions
- **next-themes** — modo oscuro
- **next-mdx-remote** — blog en MDX
- **Lucide React** — iconografía
- **class-variance-authority + tailwind-merge** — variantes de componentes UI

## 4. Cómo ejecutar el proyecto

Requisitos: Node.js 20+ y pnpm. Ver la guía completa en [INSTALLATION.md](./INSTALLATION.md).

```bash
# 1. Instalar dependencias
pnpm install

# 2. Copiar variables de entorno
cp .env.example .env.local
# y completar RESEND_API_KEY (ver ENVIRONMENT_VARIABLES.md)

# 3. Levantar el servidor de desarrollo
pnpm dev

# 4. Abrir en el navegador
# http://localhost:3000
```

## 5. Scripts disponibles

Definidos en `package.json` en la raíz del proyecto:

| Script | Comando | Descripción |
|---|---|---|
| `pnpm dev` | `next dev` | Levanta el servidor de desarrollo con Turbopack y hot-reload. |
| `pnpm build` | `next build` | Genera el build de producción (SSG/ISR de todas las rutas). |
| `pnpm start` | `next start` | Sirve el build de producción generado por `build`. Requiere ejecutar `build` primero. |
| `pnpm lint` | `eslint` | Ejecuta ESLint sobre todo el proyecto (`eslint-config-next` + reglas de TypeScript). |

> No existen todavía scripts de testing automatizado. Ver [TESTING.md](./TESTING.md) para el estado actual y el plan a futuro.

## 6. Estructura general del proyecto

```
logika-soft/
├── app/                # Rutas (App Router), layouts, Server Actions, SEO
├── components/         # Componentes de UI, layout y secciones
├── config/             # Datos de contenido (productos, servicios, etc.)
├── content/blog/       # Artículos del blog en MDX
├── features/           # Lógica de dominio (blog, contacto)
├── hooks/              # Hooks de React reutilizables (reservado)
├── public/             # Activos estáticos servidos en la raíz
├── services/           # Clientes de servicios externos (Resend)
├── types/              # Tipos e interfaces compartidos de TypeScript
├── utils/              # Funciones utilitarias puras (cn, SEO)
└── docs/               # Esta documentación
```

Ver el detalle exhaustivo en [FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md) y el diagrama de arquitectura en [ARCHITECTURE.md](./ARCHITECTURE.md).

## 7. Convenciones del proyecto

Resumen (detalle completo en [CODING_STANDARDS.md](./CODING_STANDARDS.md)):

- Archivos de componentes en `kebab-case.tsx`, componentes exportados en `PascalCase`.
- Un componente por archivo, exportado como *named export* (no `default export`) salvo en `app/**/page.tsx` y `layout.tsx`, donde Next.js exige `export default`.
- Datos de contenido versionados como código en `/config`, nunca hardcodeados dentro de componentes de UI.
- Server Components por defecto; `"use client"` solo cuando el componente necesita interactividad, estado o efectos.
- Tipado estricto: cero uso de `any` en el código de la aplicación.

## 8. Buenas prácticas aplicadas

- **Arquitectura limpia por capas**: presentación (`components/`), dominio (`features/`, `config/`, `types/`), infraestructura (`services/`).
- **Server Components por defecto** para minimizar el JavaScript enviado al cliente (ver [PERFORMANCE.md](./PERFORMANCE.md)).
- **Un único punto de verdad para la marca**: la paleta de colores vive en variables CSS en `app/globals.css` (ver [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)).
- **SEO por diseño**: cada página exporta su propio `metadata` mediante el helper `buildMetadata()` (ver [SEO.md](./SEO.md)).
- **Validación en el borde del sistema**: todo dato que entra por el formulario de contacto se valida con Zod tanto en cliente como en el servidor (defensa en profundidad).
- **Componentes accesibles**: uso de atributos ARIA, `focus-visible`, y contraste verificado en la paleta de marca.

## 9. Capturas de pantalla

> Espacio reservado para capturas de pantalla del sitio en producción. Reemplazar las siguientes referencias por imágenes reales una vez el sitio esté desplegado.

| Vista | Captura |
|---|---|
| Home (desktop) | `docs/assets/screenshot-home-desktop.png` *(pendiente)* |
| Home (mobile) | `docs/assets/screenshot-home-mobile.png` *(pendiente)* |
| Detalle de producto (LogikaSoft ERP) | `docs/assets/screenshot-producto-erp.png` *(pendiente)* |
| Blog | `docs/assets/screenshot-blog.png` *(pendiente)* |
| Formulario de contacto | `docs/assets/screenshot-contacto.png` *(pendiente)* |
| Modo oscuro | `docs/assets/screenshot-dark-mode.png` *(pendiente)* |

## 10. Licencia

Este software es **propiedad privada de LOGIKA SOFT**. Todos los derechos reservados. Queda prohibida su copia, distribución o modificación sin autorización expresa de LOGIKA SOFT.

> Si en el futuro se decide abrir partes del código (por ejemplo, el sistema de diseño) bajo una licencia open source, documentar aquí el tipo de licencia elegida (MIT, Apache 2.0, etc.) y añadir el archivo `LICENSE` correspondiente en la raíz del repositorio.

## 11. Autores y mantenimiento

| Rol | Responsable |
|---|---|
| Producto / Negocio | LOGIKA SOFT |
| Desarrollo inicial y arquitectura | Equipo de ingeniería LOGIKA SOFT (con asistencia de IA — Claude Code) |
| Mantenimiento actual | *(Completar con el equipo responsable)* |

Para reportar errores o solicitar cambios, seguir el flujo descrito en [CODING_STANDARDS.md](./CODING_STANDARDS.md) (Git Flow) y registrar el cambio en [CHANGELOG.md](./CHANGELOG.md).
