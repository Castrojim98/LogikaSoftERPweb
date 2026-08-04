# Stack Tecnológico

Este documento explica **qué** tecnología se usa y, más importante, **por qué** se eligió sobre sus alternativas — para que futuras decisiones (mantenerla, actualizarla o reemplazarla) se tomen con el mismo contexto con el que se eligió originalmente.

---

## 1. Next.js 16

**Qué es:** framework de React para producción, con enrutamiento basado en archivos (App Router), renderizado híbrido (SSG/SSR/ISR), Server Components, Server Actions, optimización de imágenes y fuentes integrada.

**Por qué se eligió:**
- Es el estándar de facto para sitios corporativos y de marketing con React en 2026, con el mejor soporte de SEO nativo de todo el ecosistema React (metadata API, `sitemap.ts`, `robots.ts`, streaming).
- El modelo de **Server Components** permite enviar cero JavaScript para la mayoría de las secciones del sitio (ver [ARCHITECTURE.md](./ARCHITECTURE.md)), lo que impacta directamente el rendimiento (ver [PERFORMANCE.md](./PERFORMANCE.md)).
- Las **Server Actions** eliminan la necesidad de mantener una API REST/GraphQL separada solo para el formulario de contacto.
- **Turbopack** (bundler por defecto en `next dev` desde Next.js 15+) acelera drásticamente el tiempo de arranque y el Fast Refresh durante el desarrollo.

**Alternativas consideradas:** Remix, Astro, SvelteKit. Se descartaron porque el equipo y el ecosistema de LOGIKA SOFT ya trabajan predominantemente con React, y Next.js tiene el mayor soporte de largo plazo y de despliegue (Vercel, Azure, cualquier VPS con Node.js).

> **Nota de versión:** el proyecto se planificó originalmente sobre Next.js 15, pero al momento de scaffolding, `create-next-app@latest` instaló **Next.js 16.3.0** (la versión estable más reciente). Se decidió mantener la 16 en lugar de forzar la 15, ya que toda la arquitectura planeada (App Router, Server Components, Server Actions) es 100% compatible, y Next.js 16 recibirá soporte y parches de seguridad por más tiempo. Ver [MAINTENANCE.md](./MAINTENANCE.md) para la política de actualización de versiones mayores.

## 2. React 19

**Qué es:** la librería de UI sobre la que corre Next.js.

**Por qué esta versión:** Next.js 16 requiere React 19 como *peer dependency*. React 19 estabiliza los Server Components, las Server Actions (`useActionState`, `useTransition` mejorado) y simplifica el manejo de formularios — usado indirectamente en `contact-form.tsx` a través de `useTransition`.

## 3. TypeScript

**Qué es:** superset de JavaScript con tipado estático.

**Por qué se eligió:**
- Detecta errores de props, rutas y contratos de datos en tiempo de compilación, antes de llegar a producción — crítico en un proyecto con múltiples colaboradores a lo largo del tiempo.
- El modo `strict: true` (configurado en `tsconfig.json`) obliga a manejar explícitamente `null`/`undefined`, evitando una clase entera de errores en tiempo de ejecución.
- Autocompletado e IntelliSense fiables en todo el proyecto (props de componentes, campos de `config/`, resultado de Server Actions).

**Cómo se usa en este proyecto:** cero `any` en código de aplicación; los contratos de datos de negocio están centralizados en `types/index.ts`; los esquemas de validación de Zod (`features/contact/schema.ts`) generan sus tipos de TypeScript automáticamente con `z.infer`, evitando mantener el tipo y la validación por separado.

## 4. TailwindCSS v4

**Qué es:** framework de utilidades CSS *utility-first*.

**Por qué se eligió:**
- Permite construir interfaces consistentes sin escribir CSS a mano ni mantener archivos de estilos separados por componente.
- La v4 introduce una configuración **CSS-first**: los tokens de diseño (colores, animaciones, fuentes) se definen como variables CSS dentro de `app/globals.css` usando el bloque `@theme`, sin necesidad de un archivo `tailwind.config.ts` separado. Esto acerca la fuente de verdad del diseño al propio CSS, y es lo que permite que **reemplazar toda la paleta de marca sea editar un solo archivo** (ver [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)).
- Purga automáticamente las clases no usadas en producción (no requiere configuración adicional en v4).

**Cómo se usa:** ver `app/globals.css` (tokens `--color-brand-*`, `--background`, `--foreground`, animaciones `fade-up` y `marquee`) y el plugin `@tailwindcss/typography` para el tipografiado del contenido de blog (clase `prose`).

## 5. Framer Motion

**Qué es:** librería de animaciones declarativas para React.

**Por qué se eligió:**
- API declarativa (`initial`, `animate`, `whileInView`, `exit`) que se integra naturalmente con componentes de React, a diferencia de librerías imperativas como GSAP.
- Soporta *animation on scroll* (`useInView`) sin necesidad de un `IntersectionObserver` manual — usado en `FadeIn`, `AnimatedCounter` y todas las entradas de sección.
- `AnimatePresence` gestiona limpiamente animaciones de salida (usado en el acordeón de FAQ y el menú móvil).

**Por qué NO se usó GSAP:** el brief original consideraba GSAP "solo si aporta valor". Ninguna animación del sitio requiere *scroll-triggering* complejo, *timelines* sincronizados entre múltiples elementos independientes, ni control de scroll (*ScrollTrigger*) — todo lo necesario (fade-in al hacer scroll, contadores animados, transiciones de acordeón/menú) se logra con Framer Motion sin una segunda librería de animación. Si en el futuro se necesita una animación de scroll compleja (por ejemplo, un storytelling visual en la página de un producto), evaluar GSAP en ese momento específico.

## 6. React Hook Form

**Qué es:** librería de gestión de formularios para React, basada en referencias no controladas (*uncontrolled inputs*) para minimizar renders.

**Por qué se eligió:**
- Mucho más performante que un formulario controlado con `useState` por campo, especialmente en formularios con varios campos (el de contacto tiene 6).
- Se integra con Zod mediante `@hookform/resolvers`, permitiendo definir la validación **una sola vez** (en el esquema de Zod) y reutilizarla tanto en el cliente como en el servidor (ver `features/contact/schema.ts`).
- API de manejo de errores por campo (`formState.errors`) ya integrada con los componentes `FieldError` del sistema de diseño.

## 7. Zod

**Qué es:** librería de validación y parsing de esquemas con inferencia de tipos de TypeScript.

**Por qué se eligió:**
- Permite definir el esquema de datos **una sola vez** y derivar tanto la validación en tiempo de ejecución como el tipo estático (`z.infer<typeof contactFormSchema>`), eliminando duplicación entre el tipo de TypeScript y las reglas de validación.
- Se ejecuta en **ambos lados** del formulario de contacto: en el navegador (vía `zodResolver` de React Hook Form, para feedback inmediato) y en la Server Action (`contactFormSchema.safeParse`, como última línea de defensa real) — ver [SECURITY.md](./SECURITY.md).
- Mensajes de error configurables en español, mostrados directamente en la UI (`"Ingresa un correo válido"`, `"Selecciona un servicio"`, etc.).

## 8. Lucide React

**Qué es:** librería de iconos SVG para React, sucesora de Feather Icons.

**Por qué se eligió:** catálogo amplio, consistente en trazo y tamaño, tree-shakeable (cada ícono es un import independiente, por lo que solo se incluye en el bundle lo que realmente se usa) y con una API de props idéntica a un elemento SVG nativo (`size`, `className`, `aria-hidden`).

> **Nota importante de mantenimiento:** la versión `lucide-react@1.x` instalada en este proyecto **eliminó los íconos de marcas/logos** (Facebook, Instagram, LinkedIn, GitHub, Twitter, etc.) por motivos de licenciamiento de marcas registradas. Por eso el proyecto define sus propios iconos de redes sociales como SVG simplificados en `components/ui/social-icons.tsx` (`LinkedinIcon`, `FacebookIcon`, `InstagramIcon`, `GithubIcon`). **Si se actualiza `lucide-react` en el futuro, no asumir que estos íconos volverán** — verificar siempre contra `node_modules/lucide-react/dist/esm/icons/` antes de importar un ícono nuevo. Ver [TROUBLESHOOTING.md](./TROUBLESHOOTING.md).

## 9. Resend

**Qué es:** API de envío de correo transaccional orientada a desarrolladores, con SDK oficial de TypeScript.

**Por qué se eligió sobre Nodemailer/SMTP propio o SendGrid:**
- SDK moderno, tipado, con una API de una sola llamada (`resend.emails.send()`), sin necesidad de gestionar credenciales SMTP ni un servidor de correo propio.
- Buena entregabilidad (deliverability) out-of-the-box con dominios verificados vía DNS (SPF/DKIM).
- Se integra de forma trivial dentro de una Server Action de Next.js (ejecutada en servidor, nunca expone la API key al cliente).

**Cómo se usa:** `services/resend.ts` expone `getResendClient()`, que retorna `null` si `RESEND_API_KEY` no está configurada — permitiendo que el sitio funcione en desarrollo/preview sin la clave, degradando el formulario a un mensaje de error controlado en lugar de fallar. Ver [ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md) y [API.md](./API.md).

## 10. next-themes

**Qué es:** librería para gestionar el modo claro/oscuro en aplicaciones Next.js, sincronizando la preferencia con `localStorage` y evitando parpadeos (*flash*) al cargar la página.

**Por qué se eligió:** es el estándar de facto para dark mode en proyectos Next.js con Tailwind; gestiona automáticamente la clase `dark` en `<html>` (estrategia configurada en `app/globals.css` vía `@custom-variant dark`) y expone el hook `useTheme()` usado en `theme-toggle.tsx`.

## 11. next-mdx-remote

**Qué es:** librería para compilar y renderizar contenido MDX (Markdown + JSX) de forma dinámica, con soporte específico para React Server Components (`next-mdx-remote/rsc`).

**Por qué se eligió sobre `@next/mdx` (integración nativa de Next.js):** `next-mdx-remote/rsc` permite compilar el MDX **en tiempo de renderizado del Server Component** a partir de contenido leído de `content/blog/*.mdx` con `fs`, sin necesidad de que los archivos `.mdx` sean rutas de página (`app/blog/[slug]/page.mdx`). Esto separa claramente el **contenido** (`content/blog/`) de la **ruta que lo renderiza** (`app/(marketing)/blog/[slug]/page.tsx`), lo que facilita migrar el contenido a un CMS externo en el futuro sin cambiar la estructura de rutas.

## 12. gray-matter + reading-time

- **gray-matter**: parsea el bloque de *frontmatter* (YAML) al inicio de cada archivo `.mdx`, separándolo del contenido. Usado en `features/blog/mdx.ts`.
- **reading-time**: calcula el tiempo estimado de lectura de un texto (usado para mostrar "5 min de lectura" en las tarjetas y en el artículo del blog).

## 13. class-variance-authority (cva) + tailwind-merge + clsx

- **class-variance-authority**: define variantes de un componente (por ejemplo, `Button` con `variant: "primary" | "secondary" | "outline" | "ghost" | "link"` y `size: "sm" | "md" | "lg"`) de forma tipada y declarativa, evitando cadenas de `if`/ternarios para componer clases.
- **tailwind-merge**: resuelve conflictos cuando se combinan clases de Tailwind que apuntan a la misma propiedad CSS (por ejemplo, un `className` externo que sobrescribe el `bg-*` por defecto de un componente).
- **clsx**: concatena condicionalmente nombres de clase.

Estas tres librerías se combinan en la función `cn()` (`utils/cn.ts`), el helper más usado de todo el sistema de diseño (ver [COMPONENT_GUIDE.md](./COMPONENT_GUIDE.md)).

## 14. ESLint (`eslint-config-next`)

**Por qué se eligió:** es la configuración oficial mantenida por el equipo de Next.js, incluye reglas de accesibilidad (`eslint-plugin-jsx-a11y`), reglas de React Hooks (incluida la regla que detectó y corrigió el patrón de `setState` dentro de un efecto en `theme-toggle.tsx` — ver [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)) y reglas específicas de Core Web Vitals (`eslint-config-next/core-web-vitals`).

## 15. pnpm

Ver la justificación completa en [INSTALLATION.md](./INSTALLATION.md), sección de requisitos previos.

---

## 16. Tabla resumen de dependencias de producción

| Paquete | Versión | Categoría |
|---|---|---|
| `next` | 16.3.0 | Framework |
| `react` / `react-dom` | 19.2.8 | UI |
| `typescript` | ^5 | Lenguaje |
| `tailwindcss` / `@tailwindcss/postcss` | ^4 | Estilos |
| `@tailwindcss/typography` | ^0.5.20 | Estilos (contenido de blog) |
| `framer-motion` | ^12.43.0 | Animación |
| `lucide-react` | ^1.28.0 | Iconografía |
| `react-hook-form` | ^7.84.0 | Formularios |
| `zod` | ^4.4.3 | Validación |
| `@hookform/resolvers` | ^5.7.1 | Integración RHF + Zod |
| `resend` | ^6.18.1 | Correo transaccional |
| `next-themes` | ^0.4.6 | Dark mode |
| `next-mdx-remote` | ^6.0.0 | Blog en MDX |
| `gray-matter` | ^4.0.3 | Frontmatter de MDX |
| `reading-time` | ^1.5.0 | Tiempo de lectura |
| `clsx` | ^2.1.1 | Utilidades de clases CSS |
| `tailwind-merge` | ^3.6.0 | Utilidades de clases CSS |
| `class-variance-authority` | ^0.7.1 | Variantes de componentes |

Ver la política de actualización de estas dependencias en [MAINTENANCE.md](./MAINTENANCE.md).
