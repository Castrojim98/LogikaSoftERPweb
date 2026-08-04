# Mantenimiento

Guía operativa para las tareas de mantenimiento más comunes del proyecto: actualizar dependencias, actualizar Next.js, y agregar páginas, componentes, productos y artículos de blog.

## 1. Actualizar dependencias

### 1.1. Ver qué está desactualizado

```bash
pnpm outdated
```

### 1.2. Actualizar dependencias menores/parche (bajo riesgo)

```bash
pnpm update
```

Esto respeta los rangos semánticos definidos en `package.json` (por ejemplo, `^12.43.0` se actualiza dentro de la misma versión mayor). Ejecutar siempre después:

```bash
pnpm lint
pnpm build
```

Y realizar una verificación manual rápida en el navegador (ver checklist en [TESTING.md](./TESTING.md)) antes de fusionar.

### 1.3. Actualizar una dependencia mayor específica (mayor riesgo)

```bash
pnpm add <paquete>@latest
```

Revisar el *changelog*/*release notes* del paquete antes de actualizar una versión mayor, especialmente para:

- `next`, `react`, `react-dom` (ver sección 2, es un caso especial).
- `zod` (los mensajes de error y algunos métodos han cambiado entre versiones mayores — verificar `features/contact/schema.ts` tras actualizar).
- `tailwindcss` (cambios entre v3 y v4 fueron significativos — ver [TECHNOLOGIES.md](./TECHNOLOGIES.md); una futura v5 podría requerir revisión de `app/globals.css`).
- `lucide-react` (ver la advertencia específica sobre íconos de marcas eliminados en [TECHNOLOGIES.md](./TECHNOLOGIES.md) y [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) — **siempre verificar que los íconos usados sigan existiendo tras actualizar**).

### 1.4. Auditoría de seguridad de dependencias

```bash
pnpm audit
```

Ejecutar mensualmente o antes de cada actualización mayor. Ver [SECURITY.md](./SECURITY.md), sección 9.

## 2. Actualizar la versión de Next.js

1. Leer las notas de la nueva versión en [nextjs.org/blog](https://nextjs.org/blog) — prestar especial atención a *breaking changes* del App Router, Server Actions y el modelo de caché.
2. **Aprovechar `AGENTS.md`:** cada vez que se ejecuta `next dev`/`next build`, Next.js regenera automáticamente un archivo `AGENTS.md` en la raíz del proyecto con advertencias específicas de la versión instalada para agentes de IA/desarrolladores sobre cambios de API. Leerlo tras cada actualización de Next.js antes de escribir código nuevo.
3. Explorar la documentación embebida en el propio paquete instalado (más confiable que la memoria de un asistente de IA, que puede estar desactualizada respecto a la versión exacta instalada):
   ```
   node_modules/next/dist/docs/
   ```
4. Actualizar:
   ```bash
   pnpm add next@latest react@latest react-dom@latest eslint-config-next@latest
   ```
5. Ejecutar `pnpm build` y revisar cuidadosamente cualquier warning/error nuevo.
6. Prestar atención especial a:
   - El manejo de `params`/`searchParams` como `Promise` en `page.tsx`/`layout.tsx`/`generateMetadata` (ya implementado correctamente en todo el proyecto — ver los `await params` en `app/(marketing)/productos/[slug]/page.tsx` y `app/(marketing)/blog/[slug]/page.tsx`).
   - Si la nueva versión activa por defecto **Cache Components** (opt-in en Next.js 16 vía `cacheComponents: true`) — este proyecto deliberadamente no lo usa (ver [ARCHITECTURE.md](./ARCHITECTURE.md)); si una futura versión mayor lo vuelve obligatorio, será necesario envolver en `<Suspense>` cualquier acceso a datos no cacheado, lo cual afectaría el patrón actual de Server Components síncronos.
7. Registrar la actualización en [CHANGELOG.md](./CHANGELOG.md).

## 3. Agregar una nueva página

1. Crear la carpeta y archivo: `app/(marketing)/nueva-ruta/page.tsx`.
2. Estructura mínima:

   ```tsx
   import type { Metadata } from "next";
   import { Section, SectionHeading } from "@/components/ui/section";
   import { CtaBanner } from "@/components/sections/cta-banner";
   import { buildMetadata } from "@/utils/seo";

   export const metadata: Metadata = buildMetadata({
     title: "Título de la Página",
     description: "Descripción de 120–160 caracteres para SEO.",
     path: "/nueva-ruta",
   });

   export default function NuevaRutaPage() {
     return (
       <>
         <Section tone="dark" className="pt-16">
           <SectionHeading eyebrow="Eyebrow" title="Título visible" description="Subtítulo." invert />
         </Section>
         {/* contenido de la página */}
         <CtaBanner />
       </>
     );
   }
   ```

3. Agregar la ruta a `staticRoutes` en `app/sitemap.ts`.
4. Si debe aparecer en la navegación, agregarla a `mainNav` o `footerNav` en `config/site.ts`.
5. Verificar en el navegador (`pnpm dev`) y confirmar con `pnpm build` que se pre-renderiza como `○ Static`.
6. Ver el checklist completo de SEO para páginas nuevas en [SEO.md](./SEO.md).

## 4. Agregar un nuevo componente

1. Decidir la carpeta correcta según [FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md) (sección 13, tabla de decisión rápida): `components/ui/` (primitivo genérico), `components/layout/` (andamiaje compartido) o `components/sections/` (bloque de página con datos de negocio).
2. Nombrar el archivo en `kebab-case.tsx`.
3. Determinar si necesita `"use client"` usando el criterio de [ARCHITECTURE.md](./ARCHITECTURE.md), sección 3.1 — por defecto, **no** agregarlo.
4. Tipar explícitamente las props.
5. Si es un componente de `ui/`, considerar usar `class-variance-authority` si tiene variantes visuales (seguir el patrón de `button.tsx`/`badge.tsx`).
6. Documentarlo en [COMPONENT_GUIDE.md](./COMPONENT_GUIDE.md) (props, ejemplo de uso).

## 5. Agregar un nuevo producto

Ver la guía completa (con ejemplo de código) en [CMS.md](./CMS.md#31-agregar-un-producto-nuevo). Resumen rápido:

1. Editar `config/products.ts`, agregar un objeto `Product` nuevo al array.
2. `pnpm dev` y verificar `/productos` y `/productos/<slug-nuevo>`.
3. `pnpm build` para confirmar que la nueva ruta estática se genera sin errores.

## 6. Agregar un nuevo artículo de blog

Ver la guía completa en [CMS.md](./CMS.md#4-editaragregar-artículos-del-blog-mdx). Resumen rápido:

1. Crear `content/blog/<slug>.mdx` con el frontmatter completo (ver campos obligatorios en CMS.md).
2. El nombre del archivo debe ser idéntico al campo `slug`.
3. `pnpm dev` y verificar `/blog` (aparece en el listado y es filtrable/buscable) y `/blog/<slug>`.
4. `pnpm build` para confirmar la generación estática (`generateStaticParams` la detecta automáticamente — no requiere registrar el artículo en ningún otro lugar).

## 7. Tareas de mantenimiento recurrentes recomendadas

| Frecuencia | Tarea |
|---|---|
| En cada Pull Request | `pnpm lint` y `pnpm build` sin errores |
| Mensual | `pnpm outdated` + `pnpm audit`, revisar y aplicar actualizaciones menores |
| Trimestral | Evaluar actualización de versión mayor de Next.js/React si hay una release estable nueva |
| Tras cada despliegue a producción | Ejecutar una auditoría de Lighthouse (ver [PERFORMANCE.md](./PERFORMANCE.md)) |
| Continua | Registrar cada cambio relevante en [CHANGELOG.md](./CHANGELOG.md) |

## 8. Deuda técnica conocida (a resolver cuando se priorice)

Consolidado desde el resto de la documentación, para tener un solo lugar de referencia:

| Ítem | Detalle | Documento relacionado |
|---|---|---|
| Metadata de Home inconsistente | `/` define `metadata` como objeto literal en lugar de usar `buildMetadata()`, por lo que no genera Open Graph/Twitter Cards propios | [ROUTES.md](./ROUTES.md), [SEO.md](./SEO.md) |
| Sin imágenes reales | Todos los productos/portafolio/blog usan `ProductVisual` (placeholder degradado) en lugar de `next/image` | [PERFORMANCE.md](./PERFORMANCE.md), [CMS.md](./CMS.md) |
| Rutas `/politicas/privacidad` y `/politicas/terminos` sin implementar | Enlazadas desde el Footer pero devuelven 404 | [ROUTES.md](./ROUTES.md) |
| Sin rate limiting en el formulario de contacto | Ver mitigación propuesta | [SECURITY.md](./SECURITY.md) |
| Sin Content Security Policy | Requiere pruebas exhaustivas antes de implementar | [SECURITY.md](./SECURITY.md) |
| Sin `output: "standalone"` en `next.config.ts` | Requerido únicamente si se despliega con Docker | [DEPLOYMENT.md](./DEPLOYMENT.md) |
| Sin pruebas automatizadas | Solo verificación manual por ahora | [TESTING.md](./TESTING.md) |
| Falta manual de identidad visual real | Paleta de colores y logo son provisionales | [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) |
