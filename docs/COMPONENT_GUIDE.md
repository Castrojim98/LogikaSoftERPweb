# Guía de Componentes

Catálogo completo de los componentes reutilizables del proyecto: props, ejemplos de uso y buenas prácticas. Organizado por carpeta, siguiendo la misma división que [FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md).

> Convención de esta guía: `Server` indica que el componente **no** lleva `"use client"` (se renderiza en el servidor); `Client` indica que sí lo lleva.

---

## Índice

- [components/ui](#componentsui)
  - [Button](#button) · [Card](#card) · [Container](#container) · [Section / SectionHeading](#section--sectionheading) · [Badge](#badge) · [GlassPanel](#glasspanel) · [Field (Input/Textarea/Select/Label/Error)](#field) · [AnimatedCounter](#animatedcounter) · [Accordion](#accordion) · [FadeIn](#fadein) · [SocialIcons](#socialicons)
- [components/layout](#componentslayout)
  - [Header](#header) · [Footer](#footer) · [Logo](#logo) · [MobileNav](#mobilenav) · [ThemeToggle](#themetoggle) · [ThemeProvider](#themeprovider)
- [components/sections](#componentssections)
  - [Hero](#hero) · [CompanyOverview](#companyoverview) · [ServicesGrid](#servicesgrid) · [ProductCard / ProductVisual / ProductsShowcase](#productcard--productvisual--productsshowcase) · [TechStack](#techstack) · [SuccessStoriesSection](#successstoriessection) · [TestimonialsSection](#testimonialssection) · [PricingTable](#pricingtable) · [CtaBanner](#ctabanner) · [BlogCard / BlogList](#blogcard--bloglist) · [PortfolioGrid](#portfoliogrid)

---

## components/ui

### Button

**Archivo:** `components/ui/button.tsx` · **Tipo:** Server (no requiere interactividad de cliente por sí mismo)

Botón polimórfico: se renderiza como `<button>` o como `next/link` según reciba o no la prop `href`.

| Prop | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `variant` | `"primary" \| "secondary" \| "outline" \| "outlineDark" \| "ghost" \| "link"` | `"primary"` | Ver tabla de variantes en [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md#4-botones) |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Altura y tamaño de fuente |
| `href` | `string` | — | Si se provee, renderiza `<Link>` en lugar de `<button>` |
| `className` | `string` | — | Clases adicionales, fusionadas sin colisión vía `cn()` |
| ...resto | `ComponentProps<"button">` o `ComponentProps<typeof Link>` | — | Cualquier prop nativa del elemento subyacente (`type`, `disabled`, `onClick`, `target`, etc.) |

```tsx
// Como enlace
<Button href="/contacto" size="lg">
  Solicitar Cotización <ArrowRight className="size-4" />
</Button>

// Como botón de formulario
<Button type="submit" disabled={isPending} variant="primary">
  {isPending ? "Enviando..." : "Enviar"}
</Button>

// Variante secundaria sobre fondo de color
<Button href="/productos" variant="secondary">Ver productos</Button>
```

**Buenas prácticas:** nunca envolver un `Button` con `href` dentro de otro `<Link>`; usar `variant="outline"` solo sobre fondos oscuros y `variant="outlineDark"` solo sobre fondos claros (sus colores de borde/texto están calibrados para cada caso).

---

### Card

**Archivo:** `components/ui/card.tsx` · **Tipo:** Server

Conjunto de piezas para construir tarjetas de contenido: `Card`, `CardIcon`, `CardTitle`, `CardDescription`.

```tsx
<Card>
  <CardIcon>
    <Code2 className="size-6" />
  </CardIcon>
  <CardTitle>Desarrollo de Software</CardTitle>
  <CardDescription>
    Software a la medida para procesos específicos de tu negocio.
  </CardDescription>
</Card>
```

Todas aceptan `className` y el resto de props nativas de `<div>`/`<h3>`/`<p>` respectivamente. `Card` ya incluye el efecto hover estándar (`hover:-translate-y-1 hover:shadow-xl`) — no es necesario repetirlo en el consumidor.

---

### Container

**Archivo:** `components/ui/container.tsx` · **Tipo:** Server

Envoltorio de ancho máximo (`max-w-7xl`) y padding horizontal responsive (`px-6 lg:px-8`), centrado con `mx-auto`.

```tsx
<Container className="py-16">{children}</Container>
```

Se usa internamente por `Section`; rara vez se importa directamente salvo para casos fuera del patrón de secciones (ej. dentro de `Footer`).

---

### Section / SectionHeading

**Archivo:** `components/ui/section.tsx` · **Tipo:** Server

`Section` es el envoltorio estándar de **toda** sección de página: aplica `py-20 sm:py-28` y un `Container` interno.

| Prop | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `tone` | `"default" \| "muted" \| "dark"` | `"default"` | Fondo de la sección (`bg-background`, `bg-surface-muted`, `bg-brand-950 text-white`) |
| `containerClassName` | `string` | — | Clases para el `Container` interno (ej. `"max-w-3xl"` para contenido de lectura larga) |
| ...resto | `ComponentProps<"section">` | — | `id`, `className`, `children`, etc. |

`SectionHeading` estandariza el encabezado de una sección (eyebrow + H2 + descripción):

| Prop | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `eyebrow` | `string` | — | Etiqueta pequeña sobre el título (ej. "Servicios") |
| `title` | `string` (requerido) | — | Título H2 |
| `description` | `string` | — | Párrafo descriptivo debajo del título |
| `align` | `"center" \| "left"` | `"center"` | Alineación del bloque |
| `invert` | `boolean` | `false` | Usar cuando la sección tiene `tone="dark"` — cambia los colores de `eyebrow`/`description` a variantes claras legibles sobre fondo oscuro |

```tsx
<Section tone="muted">
  <SectionHeading
    eyebrow="Servicios"
    title="Soluciones tecnológicas de punta a punta"
    description="Desde una idea hasta un sistema en producción."
  />
  {/* contenido de la sección */}
</Section>

<Section tone="dark" className="pt-16">
  <SectionHeading eyebrow="Empresa" title="Ingeniería de software con propósito" invert />
</Section>
```

**Regla importante:** siempre pasar `invert` cuando `SectionHeading` se use dentro de un `Section` (u otro contenedor) con fondo oscuro — de lo contrario, la descripción usará colores oscuros de bajo contraste sobre un fondo oscuro (ver el bug ya corregido de contraste documentado en [ARCHITECTURE.md](./ARCHITECTURE.md)).

---

### Badge

**Archivo:** `components/ui/badge.tsx` · **Tipo:** Server

| Prop | Tipo | Por defecto |
|---|---|---|
| `tone` | `"available" \| "upcoming" \| "beta" \| "neutral"` | `"neutral"` |

```tsx
<Badge tone="available">Disponible</Badge>
<Badge tone="upcoming">Próximamente</Badge>
```

---

### GlassPanel

**Archivo:** `components/ui/glass-panel.tsx` · **Tipo:** Server

Panel con efecto de vidrio esmerilado (`backdrop-blur-xl`, fondo semitransparente). Uso restringido: ver [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md#14-glassmorphism-uso-deliberadamente-limitado).

```tsx
<GlassPanel className="max-w-md">
  {/* contenido del panel */}
</GlassPanel>
```

---

### Field

**Archivo:** `components/ui/field.tsx` · **Tipo:** Server

Conjunto de primitivos de formulario: `FieldGroup`, `FieldLabel`, `FieldError`, `Input`, `Textarea`, `Select`.

```tsx
<FieldGroup>
  <FieldLabel htmlFor="email" required>Correo electrónico</FieldLabel>
  <Input id="email" type="email" {...register("email")} />
  <FieldError>{errors.email?.message}</FieldError>
</FieldGroup>
```

`FieldLabel` acepta `required?: boolean` (agrega un asterisco). `FieldError` no renderiza nada si `children` es `undefined`/`falsy` — seguro de usar siempre, incluso sin error activo.

---

### AnimatedCounter

**Archivo:** `components/ui/animated-counter.tsx` · **Tipo:** Client (usa `useInView`, `useMotionValue`, efectos)

| Prop | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `value` | `number` (requerido) | — | Valor final del contador |
| `suffix` | `string` | `""` | Texto después del número (ej. `"%"`, `"+"`) |
| `prefix` | `string` | `""` | Texto antes del número |
| `duration` | `number` | `1.8` | Duración de la animación en segundos |
| `className` | `string` | — | Clases del `<span>` resultante |

```tsx
<AnimatedCounter value={98} suffix="%" />
<AnimatedCounter value={40} suffix="+" />
```

Se anima **una sola vez**, cuando el elemento entra en el viewport (margen de disparo de `-80px`).

---

### Accordion

**Archivo:** `components/ui/accordion.tsx` · **Tipo:** Client (estado + animación)

| Prop | Tipo | Descripción |
|---|---|---|
| `items` | `AccordionItemData[]` (`{ question: string; answer: string }[]`) | Lista de preguntas/respuestas |

```tsx
<Accordion items={faqItems} />
```

Comportamiento: un solo ítem abierto a la vez (`openIndex` único), el primero (`index === 0`) abierto por defecto. Usado en `/faq`.

---

### FadeIn

**Archivo:** `components/ui/fade-in.tsx` · **Tipo:** Client (Framer Motion)

| Prop | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `children` | `ReactNode` (requerido) | — | Contenido a animar |
| `delay` | `number` | `0` | Retraso en segundos antes de iniciar la animación |
| `y` | `number` | `24` | Desplazamiento vertical inicial en píxeles |
| `className` | `string` | — | Clases del `motion.div` resultante |

```tsx
<FadeIn delay={0.15}>
  <ProductCard product={product} />
</FadeIn>
```

**Patrón recomendado en grillas:** usar `delay={(index % 3) * 0.08}` para escalonar la entrada de los primeros elementos de cada fila sin acumular retrasos excesivos en listas largas (ver `ServicesGrid`, `ProductsShowcase`).

---

### SocialIcons

**Archivo:** `components/ui/social-icons.tsx` · **Tipo:** Server

Exporta `LinkedinIcon`, `FacebookIcon`, `InstagramIcon`, `GithubIcon` — SVG propios (no de Lucide, ver [TECHNOLOGIES.md](./TECHNOLOGIES.md)). Misma API que cualquier ícono de Lucide (`size-4`, `aria-hidden`, etc. vía `SVGProps<SVGSVGElement>`).

```tsx
<LinkedinIcon aria-hidden className="size-4" />
```

---

## components/layout

### Header

**Archivo:** `components/layout/header.tsx` · **Tipo:** Server (compone Client Components como hojas)

Sin props — lee `mainNav` de `@/config/site` internamente. Renderiza: `Logo`, navegación desktop (`hidden lg:flex`), `ThemeToggle`, botón "Solicitar Cotización" (desktop), `MobileNav`. `sticky top-0 z-50` con `backdrop-blur-lg`.

```tsx
// Usado una única vez, en app/(marketing)/layout.tsx
<Header />
```

### Footer

**Archivo:** `components/layout/footer.tsx` · **Tipo:** Server

Sin props — lee `siteConfig` y `footerNav` de `@/config/site`. Incluye logo, descripción, datos de contacto, iconos sociales, y las 4 columnas de enlaces (`FooterColumn` interno, no exportado).

### Logo

**Archivo:** `components/layout/logo.tsx` · **Tipo:** Server

| Prop | Tipo | Descripción |
|---|---|---|
| `className` | `string` | Clases adicionales (usado para forzar color blanco dentro del `Footer`: `<Logo className="text-white" />`) |

Renderiza el isotipo "LS" (degradado `brand-500→brand-700`) + wordmark "LOGIKA**SOFT**", enlazado a `/`.

### MobileNav

**Archivo:** `components/layout/mobile-nav.tsx` · **Tipo:** Client (estado `open`)

| Prop | Tipo | Descripción |
|---|---|---|
| `items` | `NavItem[]` (`{ label: string; href: string }[]`) | Enlaces a mostrar en el menú desplegable |

```tsx
<MobileNav items={mainNav} />
```

Visible solo por debajo de `lg:` (`className="lg:hidden"` en el contenedor). Incluye el CTA "Solicitar Cotización" al final del menú.

### ThemeToggle

**Archivo:** `components/layout/theme-toggle.tsx` · **Tipo:** Client (`useTheme`)

| Prop | Tipo | Descripción |
|---|---|---|
| `className` | `string` | Clases adicionales |

Sin más props: alterna entre `"light"` y `"dark"` leyendo/escribiendo `resolvedTheme` de `next-themes`.

### ThemeProvider

**Archivo:** `components/layout/theme-provider.tsx` · **Tipo:** Client (envoltorio de `next-themes`)

Reexporta `ThemeProvider` de `next-themes` marcado como Client Component (necesario porque `next-themes` usa contexto de React, y los layouts de Server Components no pueden proveer contexto directamente). Se usa una sola vez en `app/layout.tsx`:

```tsx
<ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
  {children}
</ThemeProvider>
```

---

## components/sections

### Hero

**Archivo:** `components/sections/hero.tsx` · **Tipo:** Client (animaciones de entrada con Framer Motion)

Sin props — contenido fijo del Hero de Home (título, subtítulo, CTAs, contadores animados, panel de "dashboard" simulado). Si se necesitara un Hero parametrizable para otras páginas, extraer una versión con props (`title`, `subtitle`, `stats`) en lugar de modificar este componente — ver nota en [MAINTENANCE.md](./MAINTENANCE.md).

### CompanyOverview

**Archivo:** `components/sections/company-overview.tsx` · **Tipo:** Server

Sin props. Sección resumen de "Quiénes somos" usada en Home, con enlace a `/empresa`.

### ServicesGrid

**Archivo:** `components/sections/services-grid.tsx` · **Tipo:** Server

| Prop | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `limit` | `number` | — (sin límite) | Muestra solo los primeros N servicios de `config/services.ts` |
| `showCta` | `boolean` | `false` | Muestra un botón "Ver todos los servicios" enlazando a `/servicios` |
| `tone` | `"default" \| "muted" \| "dark"` | — | Pasado directamente a `Section` |

```tsx
// En Home: resumen de 6 servicios con CTA
<ServicesGrid limit={6} showCta tone="muted" />

// En /servicios: los 12 servicios completos
<ServicesGrid />
```

### ProductCard / ProductVisual / ProductsShowcase

**Archivos:** `components/sections/product-card.tsx`, `product-visual.tsx`, `products-showcase.tsx` · **Tipo:** Server

`ProductVisual` — placeholder visual degradado (usado en lugar de una imagen real, ver [FUTURE_IMPROVEMENTS.md](./FUTURE_IMPROVEMENTS.md)):

| Prop | Tipo | Descripción |
|---|---|---|
| `name` | `string` (requerido) | Nombre accesible (`sr-only`) del producto/ítem representado |
| `className` | `string` | Controla la altura (`h-44`, `h-72`, etc.) y el radio de esquina |

`ProductCard`:

| Prop | Tipo | Descripción |
|---|---|---|
| `product` | `Product` (requerido, ver `types/index.ts`) | Datos completos del producto |

`ProductsShowcase`:

| Prop | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `items` | `Product[]` | Todos los productos de `config/products.ts` | Subconjunto a mostrar (usado en Home para mostrar solo destacados) |
| `showCta` | `boolean` | `false` | Botón "Ver todos los productos" |
| `tone` | `"default" \| "muted" \| "dark"` | — | Pasado a `Section` |

```tsx
<ProductsShowcase items={featuredProducts} showCta />
```

### TechStack

**Archivo:** `components/sections/tech-stack.tsx` · **Tipo:** Server

| Prop | Tipo | Por defecto |
|---|---|---|
| `tone` | `"default" \| "muted" \| "dark"` | `"dark"` |

Renderiza el *marquee* infinito de tecnologías (`config/technologies.ts`) con gradientes de desvanecido en los bordes izquierdo/derecho.

### SuccessStoriesSection

**Archivo:** `components/sections/success-stories.tsx` · **Tipo:** Server

| Prop | Tipo | Por defecto |
|---|---|---|
| `showCta` | `boolean` | `false` |

Incluye la grilla de casos de éxito (`config/success-stories.ts`) y la lista de logos de clientes.

### TestimonialsSection

**Archivo:** `components/sections/testimonials.tsx` · **Tipo:** Server

Sin props. Lee `config/testimonials.ts`.

### PricingTable

**Archivo:** `components/sections/pricing-table.tsx` · **Tipo:** Server

Sin props. Lee `config/pricing.ts`. El plan con `featured: true` recibe estilos distintivos (fondo oscuro, badge "Más popular").

### CtaBanner

**Archivo:** `components/sections/cta-banner.tsx` · **Tipo:** Server

Sin props. Banner de cierre reutilizado al final de casi todas las páginas internas.

### BlogCard / BlogList

**Archivos:** `components/sections/blog-card.tsx` (Server), `blog-list.tsx` (Client — estado de búsqueda/filtro)

`BlogCard`:

| Prop | Tipo | Descripción |
|---|---|---|
| `post` | `BlogFrontmatter & { readingTime: string }` (requerido) | Metadatos de un artículo |

`BlogList`:

| Prop | Tipo | Descripción |
|---|---|---|
| `posts` | `(BlogFrontmatter & { readingTime: string })[]` (requerido) | Lista completa de artículos (ya cargada por el servidor) |
| `categories` | `string[]` (requerido) | Categorías disponibles para el filtro |

```tsx
// En app/(marketing)/blog/page.tsx (Server Component)
const posts = getAllPostsMeta();
const categories = getAllCategories();
<BlogList posts={posts} categories={categories} />
```

**Importante:** `BlogList` nunca vuelve a leer el sistema de archivos — solo filtra en memoria los `posts` que ya recibió como prop (ver patrón de "isla de interactividad" en [ARCHITECTURE.md](./ARCHITECTURE.md)).

### PortfolioGrid

**Archivo:** `components/sections/portfolio-grid.tsx` · **Tipo:** Client (estado de filtro)

Sin props — lee `portfolioItems`/`portfolioCategories` de `config/portfolio.ts` internamente (a diferencia de `BlogList`, que sí recibe sus datos por props; ambos enfoques son válidos ya que `config/portfolio.ts` no requiere lectura de `fs` y puede importarse directamente incluso desde un Client Component).

---

## Convenciones transversales a todos los componentes

1. Todos aceptan `className` cuando tiene sentido visualmente, fusionado con `cn()` para permitir sobrescritura desde el consumidor.
2. Ningún componente de `sections/` importa a otro componente de `sections/` — la composición ocurre siempre en la página.
3. Los componentes de `ui/` no dependen de `config/` ni `types/index.ts` (excepto tipos estructurales genéricos).
4. Ver [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) para el detalle visual (colores, espaciados, animaciones) que subyace a cada componente descrito aquí.
