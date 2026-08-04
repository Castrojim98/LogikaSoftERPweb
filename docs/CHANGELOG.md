# Changelog

Todos los cambios relevantes de este proyecto se documentan en este archivo.

El formato sigue las convenciones de [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/), y el versionado sigue [Semantic Versioning](https://semver.org/lang/es/) (`MAJOR.MINOR.PATCH`).

> **Cómo mantener este archivo:** cada Pull Request que agregue una funcionalidad visible, corrija un defecto, o cambie una decisión de arquitectura relevante, debe añadir una entrada bajo `[Sin publicar]` en la categoría correspondiente. Al preparar un nuevo release, mover el contenido de `[Sin publicar]` a una nueva sección con el número de versión y la fecha, siguiendo la política de versionado de [MAINTENANCE.md](./MAINTENANCE.md).

## [Sin publicar]

### Pendiente
- Ver la lista completa de deuda técnica y mejoras planificadas en [MAINTENANCE.md](./MAINTENANCE.md#8-deuda-técnica-conocida-a-resolver-cuando-se-priorice) y [FUTURE_IMPROVEMENTS.md](./FUTURE_IMPROVEMENTS.md).

## [0.1.0] — 2026-08-03

### Añadido

**Fundación del proyecto**
- Scaffold inicial con Next.js 16.3.0 (App Router), TypeScript en modo `strict`, TailwindCSS v4 y ESLint (`eslint-config-next`).
- Sistema de diseño con tokens de marca provisionales como variables CSS (`app/globals.css`), tipografía Montserrat vía `next/font/google`, y soporte de modo oscuro con `next-themes`.
- Primitivos de interfaz reutilizables: `Button`, `Card`, `Container`, `Section`/`SectionHeading`, `Badge`, `GlassPanel`, `Field` (Input/Textarea/Select/Label/Error), `AnimatedCounter`, `Accordion`, `FadeIn`, íconos de redes sociales propios.
- Layout público: `Header` (con navegación responsive y menú móvil animado), `Footer` corporativo, `ThemeToggle`.

**Páginas y secciones**
- Home con Hero animado, contadores, y secciones resumen de empresa, servicios, productos, tecnologías, casos de éxito, testimonios y planes.
- Página de Empresa (misión, visión, historia, valores, por qué elegirnos).
- Página de Servicios con los 12 servicios de la compañía.
- Catálogo de Productos (8 productos) con página de listado y páginas de detalle dinámicas (`/productos/[slug]`), incluyendo el despliegue completo de los 19 módulos de LogikaSoft ERP.
- Página de Tecnologías con vista agrupada por categoría y marquee animado.
- Página de Casos de Éxito con testimonios y logos de clientes.
- Página de Portafolio con filtro de categorías (client-side).
- Página de Planes con 3 niveles de precios.
- Blog en MDX: listado con buscador y filtro de categorías, 3 artículos iniciales, páginas de artículo individuales con renderizado de MDX en Server Components (`next-mdx-remote/rsc`).
- Página de Preguntas Frecuentes con acordeón y datos estructurados `FAQPage`.
- Página de Contacto con formulario validado (React Hook Form + Zod), Server Action de envío de correo (Resend), canales de contacto y mapa embebido.

**SEO y datos estructurados**
- Helper centralizado `buildMetadata()` para metadata, Open Graph y Twitter Cards consistentes.
- `app/sitemap.ts` y `app/robots.ts` generados dinámicamente.
- JSON-LD de tipo `Organization` (global), `Product` (páginas de producto), `Article` (artículos de blog) y `FAQPage` (preguntas frecuentes).

**Infraestructura**
- Server Action `submitContactForm` con doble validación (cliente y servidor) y envío de correo mediante Resend, con degradación controlada cuando `RESEND_API_KEY` no está configurada.
- `.env.example` documentando la variable de entorno requerida.

### Decisiones de arquitectura registradas
- Uso de Next.js 16 en lugar de la versión 15 originalmente planificada (ver [TECHNOLOGIES.md](./TECHNOLOGIES.md) y [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)).
- Contenido gestionado como datos tipados en `config/*.ts` y artículos en `content/blog/*.mdx`, sin CMS externo (ver [CMS.md](./CMS.md)).
- Íconos de redes sociales implementados como SVG propios debido a la eliminación de íconos de marca en `lucide-react@1.x` (ver [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)).
- Header/Footer aislados en el layout del grupo de rutas `(marketing)`, separados del layout raíz, para permitir un futuro portal de clientes con un layout distinto (ver [ARCHITECTURE.md](./ARCHITECTURE.md)).

### Verificación
- `pnpm lint` sin errores ni warnings.
- `pnpm build` genera exitosamente las 27 rutas del sitio (14 páginas públicas + 8 productos + 3 artículos de blog + `sitemap.xml`/`robots.txt`), todas como contenido estático (`○`) o pre-renderizado con parámetros (`●`).
- Verificación manual de navegación, formulario de contacto, modo oscuro, menú móvil y responsive — ver checklist completo en [TESTING.md](./TESTING.md).

### Documentación
- Publicación de la documentación técnica, funcional y de despliegue completa en `/docs` (este mismo conjunto de documentos).

---

## Plantilla para nuevas entradas

```md
## [X.Y.Z] — AAAA-MM-DD

### Añadido
- ...

### Cambiado
- ...

### Obsoleto
- ...

### Eliminado
- ...

### Corregido
- ...

### Seguridad
- ...
```
