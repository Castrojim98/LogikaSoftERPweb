# Sistema de Diseño

Este documento describe el sistema de diseño visual implementado en el sitio: la fuente de verdad para cualquier decisión de estilo futura. **Toda la paleta de colores actual es provisional** (ver sección 1) hasta que LOGIKA SOFT entregue su manual de identidad visual oficial.

## 0. Principio rector

> Reemplazar la marca visual completa del sitio debe ser un cambio de **un solo archivo**: `app/globals.css`.

Todos los componentes consumen los colores a través de las clases de utilidad de Tailwind generadas desde las variables CSS (`bg-brand-600`, `text-brand-300`, etc.), nunca con valores hexadecimales sueltos dentro de un componente. Esto es lo que hace posible el reemplazo centralizado.

---

## 1. Colores

### 1.1. Paleta de marca (provisional)

Definida como variables CSS en `app/globals.css` y expuesta a Tailwind mediante el bloque `@theme inline`:

| Token | Valor HEX | Uso principal |
|---|---|---|
| `--color-brand-950` | `#050b1a` | Fondos oscuros más profundos (hero, footer) |
| `--color-brand-900` | `#0a1128` | Azul oscuro corporativo — fondo de secciones `tone="dark"` |
| `--color-brand-800` | `#0f1b3d` | Superficies oscuras (tarjetas en dark mode) |
| `--color-brand-700` | `#142c5c` | Degradados, hover de superficies oscuras |
| `--color-brand-600` | `#1e5aa8` | **Azul principal** — CTA primario, enlaces, ícono activo |
| `--color-brand-500` | `#2e72c4` | Estados hover del azul principal, acentos |
| `--color-brand-400` | `#4fa3e3` | **Azul claro** — resaltados sobre fondo oscuro |
| `--color-brand-300` | `#7fc1ee` | Textos/iconos secundarios sobre fondo oscuro |
| `--color-brand-200` | `#b3daf5` | Acentos muy claros |
| `--color-brand-100` | `#e1f0fb` | Fondos de íconos en modo claro |
| `--color-brand-50` | `#f2f9fe` | Fondos sutiles, hover claro |

### 1.2. Colores semánticos (adaptables a modo claro/oscuro)

| Token | Modo claro | Modo oscuro | Uso |
|---|---|---|---|
| `--background` | `#ffffff` | `--color-brand-950` | Fondo de página |
| `--foreground` | `--color-brand-950` | `#f2f9fe` | Color de texto por defecto |
| `--surface` | `#ffffff` | `--color-brand-900` | Fondo de tarjetas y contenedores |
| `--surface-muted` | `#f6f8fb` | `--color-brand-800` | Fondo de secciones alternas (`tone="muted"`) |
| `--border-subtle` | `#e2e8f0` | `#1e2a4a` | Bordes de tarjetas, inputs, divisores |

Estos tokens se consumen como `bg-background`, `text-foreground`, `bg-surface`, `bg-surface-muted`, `border-border-subtle`.

### 1.3. Colores de estado (Badge)

| Estado | Clases (modo claro / oscuro) | Uso |
|---|---|---|
| `available` (Disponible) | `bg-emerald-100 text-emerald-700` / `bg-emerald-500/10 text-emerald-400` | Producto disponible |
| `upcoming` (Próximamente) | `bg-amber-100 text-amber-700` / `bg-amber-500/10 text-amber-400` | Producto/módulo en desarrollo |
| `beta` | `bg-brand-100 text-brand-700` / `bg-brand-500/10 text-brand-300` | Producto en fase beta |
| `neutral` | `bg-slate-100 text-slate-700` / `bg-slate-500/10 text-slate-300` | Badge genérico |

Definido en `components/ui/badge.tsx`.

### 1.4. Reemplazo de la paleta real de marca

Cuando LOGIKA SOFT entregue su manual de identidad visual, el proceso es:

1. Abrir `app/globals.css`.
2. Reemplazar los 11 valores HEX de `--color-brand-*` por los colores oficiales (manteniendo la relación de luminosidad: `950` el más oscuro, `50` el más claro).
3. Verificar el contraste de accesibilidad de la nueva paleta (ver sección 12).
4. No es necesario tocar ningún componente — todos consumen los tokens, no valores fijos.

---

## 2. Tipografía

### 2.1. Familia tipográfica

**Montserrat** (Google Fonts), cargada mediante `next/font/google` en `app/layout.tsx`:

```ts
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});
```

`next/font` auto-hostea la fuente (sin llamadas a Google Fonts en tiempo de ejecución, evitando *layout shift* y mejorando privacidad/rendimiento — ver [PERFORMANCE.md](./PERFORMANCE.md)). La variable `--font-montserrat` se mapea a `--font-sans` en el `@theme` de Tailwind, por lo que **toda** clase `font-sans` (y el body por defecto) usa Montserrat automáticamente.

### 2.2. Jerarquía tipográfica

| Elemento | Clases típicas | Tamaño (desktop) |
|---|---|---|
| H1 (Hero) | `text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight` | 36px → 60px |
| H1 (páginas internas) | `text-4xl sm:text-5xl font-bold tracking-tight` | 36px → 48px |
| H2 (título de sección) | `text-3xl sm:text-4xl font-bold tracking-tight` | 30px → 36px |
| H3 (título de tarjeta) | `text-lg font-semibold` / `text-xl font-bold` | 18px–20px |
| Cuerpo destacado (subtítulo de sección) | `text-lg` | 18px |
| Cuerpo estándar | `text-sm` / `text-base` | 14px–16px |
| Eyebrow (etiqueta sobre título) | `text-sm font-semibold uppercase tracking-widest` | 14px |
| Texto pequeño (metadatos, fechas) | `text-xs` / `text-sm` | 12px–14px |

Componente centralizador: `SectionHeading` (`components/ui/section.tsx`) — estandariza `eyebrow` + `title` (H2) + `description` en todas las secciones, con la variante `invert` para uso sobre fondos oscuros.

---

## 3. Espaciado

- **Escala:** la escala numérica estándar de Tailwind (múltiplos de `0.25rem` / 4px): `gap-2`, `gap-4`, `gap-6`, `p-6`, `p-8`, etc.
- **Padding vertical de sección:** `py-20 sm:py-28` (definido una sola vez en `sectionVariants`, `components/ui/section.tsx`) — nunca se redefine manualmente en cada sección.
- **Contenedor máximo:** `max-w-7xl` con `px-6 lg:px-8` (componente `Container`, `components/ui/container.tsx`) — todas las secciones usan este mismo ancho máximo salvo excepciones explícitas (ej. `containerClassName="max-w-3xl"` en `/faq` y en el artículo de blog, para mejorar la legibilidad de texto largo).
- **Separación entre elementos de una tarjeta:** `gap-6` entre tarjetas de una grilla; `mt-4`/`mt-6` entre bloques internos de una tarjeta.

---

## 4. Botones

Componente: `components/ui/button.tsx`, construido con `class-variance-authority`.

### 4.1. Variantes (`variant`)

| Variante | Apariencia | Uso |
|---|---|---|
| `primary` (por defecto) | Fondo `brand-600`, texto blanco, sombra de color | CTA principal ("Solicitar Cotización") |
| `secondary` | Fondo blanco/`brand-800` en dark, texto oscuro/blanco | CTA secundario sobre fondos de color (ej. banner de degradado) |
| `outline` | Borde blanco translúcido, texto blanco | CTA secundario sobre fondo oscuro (Hero) |
| `outlineDark` | Borde `brand-200`/`brand-700`, texto oscuro/blanco | CTA secundario sobre fondo claro |
| `ghost` | Sin fondo, hover sutil | Acciones terciarias |
| `link` | Texto `brand-600` subrayado al hover | Enlaces tipo "Ver más" dentro de tarjetas |

### 4.2. Tamaños (`size`)

| Tamaño | Altura | Uso |
|---|---|---|
| `sm` | `h-9`, `text-sm` | Botón del header, acciones compactas |
| `md` (por defecto) | `h-11`, `text-base` | Uso general |
| `lg` | `h-14`, `text-base` | CTAs de hero y banners finales |

### 4.3. Polimorfismo botón/enlace

`Button` puede renderizarse como `<button>` nativo o como `next/link` (`<Link>`) según si recibe la prop `href`, manteniendo exactamente los mismos estilos visuales:

```tsx
<Button href="/contacto" size="lg">Solicitar Cotización</Button>
<Button type="submit" disabled={isPending}>Enviar</Button>
```

---

## 5. Tarjetas (Cards)

Componente base: `components/ui/card.tsx` (`Card`, `CardIcon`, `CardTitle`, `CardDescription`).

- Fondo `bg-surface`, borde `border-border-subtle`, esquinas `rounded-2xl`, `padding p-8`.
- Micro-interacción estándar: `hover:-translate-y-1 hover:shadow-xl` — toda tarjeta del sitio "flota" ligeramente al pasar el cursor (servicios, productos, portafolio, casos de éxito, blog).
- `CardIcon`: contenedor circular/redondeado de `size-12`, fondo `brand-50` (o `brand-800` en dark), usado para el ícono de Lucide de cada tarjeta de servicio.

Variantes especializadas construidas sobre el mismo patrón visual: `ProductCard` (con `ProductVisual` como cabecera y `Badge` de estado), tarjetas de casos de éxito, tarjetas de blog (`BlogCard`).

---

## 6. Inputs y formularios

Componente: `components/ui/field.tsx` (`FieldGroup`, `FieldLabel`, `FieldError`, `Input`, `Textarea`, `Select`).

- Todos los controles comparten la misma clase base (`fieldControlClass`): `rounded-xl border border-border-subtle bg-surface px-4 py-3 text-sm`, con foco `focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20`.
- `FieldLabel` soporta la prop `required`, que agrega un asterisco en `text-brand-500`.
- `FieldError` renderiza el mensaje de error de Zod/React Hook Form en `text-red-600` (claro) / `text-red-400` (oscuro), y no renderiza nada (`null`) si no hay error — evita saltos de layout innecesarios cuando se gestiona bien el espacio reservado.

---

## 7. Iconografía

- Librería: **Lucide React** (ver justificación en [TECHNOLOGIES.md](./TECHNOLOGIES.md)).
- Tamaño estándar: `size-4` (16px, iconos inline en texto), `size-5` (20px, iconos de botón/nav), `size-6` (24px, iconos de `CardIcon`).
- Todo ícono puramente decorativo debe llevar `aria-hidden` (ver sección 12, Accesibilidad).
- **Excepción documentada:** los íconos de redes sociales (LinkedIn, Facebook, Instagram, GitHub) **no** usan Lucide — se implementan como SVG propios en `components/ui/social-icons.tsx`, porque `lucide-react@1.x` eliminó los íconos de marcas registradas. Ver [TECHNOLOGIES.md](./TECHNOLOGIES.md) y [TROUBLESHOOTING.md](./TROUBLESHOOTING.md).

---

## 8. Animaciones

Librería: **Framer Motion** (ver justificación en [TECHNOLOGIES.md](./TECHNOLOGIES.md)).

| Patrón | Componente | Comportamiento |
|---|---|---|
| Entrada al hacer scroll | `FadeIn` (`components/ui/fade-in.tsx`) | `opacity 0→1`, `translateY 24px→0`, disparado una sola vez cuando el 60px superior del elemento entra en el viewport (`whileInView`, `viewport={{ once: true }}`) |
| Contador numérico animado | `AnimatedCounter` (`components/ui/animated-counter.tsx`) | Anima un `MotionValue` de 0 al valor final en ~1.8s con `ease: "easeOut"`, disparado por `useInView` |
| Entradas escalonadas del Hero | `hero.tsx` | Cada bloque (badge, título, subtítulo, CTAs, stats) anima con un `delay` incremental (0, 0.1, 0.2, 0.3, 0.4s) |
| Acordeón (FAQ) | `Accordion` (`components/ui/accordion.tsx`) | `AnimatePresence` + animación de `height`/`opacity` al expandir/contraer |
| Menú móvil | `MobileNav` (`components/layout/mobile-nav.tsx`) | Igual patrón de `height`/`opacity` |
| Marquee de tecnologías | CSS puro (`animate-marquee`, `@theme` en `globals.css`) | Desplazamiento horizontal infinito (`translateX(0) → translateX(-50%)`, 30s lineal) — se usa CSS y no Framer Motion porque es una animación continua e infinita, más eficiente como *keyframe* de CSS que como animación de JS. |

**Regla:** toda animación debe respetar `prefers-reduced-motion` implícitamente delegando en el comportamiento por defecto de Framer Motion (que ya reduce animaciones cuando el sistema operativo lo solicita). No se debe forzar una animación con `!important` que ignore esta preferencia.

---

## 9. Sombras

| Token de Tailwind | Uso |
|---|---|
| `shadow-sm` | Estado de reposo de tarjetas |
| `shadow-xl shadow-brand-900/10` (claro) | Estado hover de tarjetas — sombra teñida con el color de marca en lugar de un gris neutro |
| `shadow-lg shadow-brand-600/25` | Botón primario (sombra de color a juego con el fondo) |
| `shadow-2xl shadow-brand-950/20` | `GlassPanel` (panel de vidrio del Hero) |

**Convención:** las sombras del sitio casi nunca son grises puras — se tiñen con `brand-*` en baja opacidad, reforzando la identidad de marca incluso en detalles sutiles.

---

## 10. Degradados (Gradients)

| Uso | Clases |
|---|---|
| Fondo del Hero | `bg-brand-950` + overlay `radial-gradient` en dos puntos (`rgba(79,163,227,0.25)` y `rgba(30,90,168,0.35)`), aplicado inline vía `bg-[radial-gradient(...)]` |
| Banner de CTA final | `bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500` |
| Placeholder visual de producto/portafolio/blog | `ProductVisual` — `bg-gradient-to-br from-brand-700 via-brand-600 to-brand-400` + overlay radial blanco sutil |
| Título destacado del Hero | Texto con degradado (`bg-gradient-to-r from-brand-300 to-white bg-clip-text text-transparent`) |
| Logo (isotipo "LS") | `bg-gradient-to-br from-brand-500 to-brand-700` |

---

## 11. Responsive

Breakpoints estándar de Tailwind, usados consistentemente en *mobile-first*:

| Breakpoint | Ancho mínimo | Uso típico en este proyecto |
|---|---|---|
| (base, sin prefijo) | 0px | Mobile: navegación colapsada en menú hamburguesa, grillas en 1 columna, hero en columna única |
| `sm:` | 640px | Grillas de 2 columnas (servicios, productos, blog) |
| `lg:` | 1024px | Navegación desktop visible, grillas de 3–4 columnas, layout de 2 columnas del Hero y del formulario de contacto |

**Patrón de navegación responsive:** `Header` (`components/layout/header.tsx`) oculta la navegación de escritorio (`hidden lg:flex`) y el CTA de escritorio (`hidden lg:inline-flex`) por debajo de `1024px`, y muestra en su lugar `MobileNav` (`className="lg:hidden"`) — ambos conjuntos de enlaces existen en el DOM simultáneamente; solo la visibilidad cambia por CSS (impacto en accesibilidad: ver sección 12).

Verificado manualmente en los presets `mobile` (375×812) y `desktop` durante el desarrollo — ver checklist en [TESTING.md](./TESTING.md).

---

## 12. Modo oscuro (Dark Mode)

- Librería: `next-themes`, estrategia `attribute="class"` (agrega/quita la clase `dark` en `<html>`).
- Tailwind v4 se configura para reaccionar a esa clase (no a `prefers-color-scheme` del sistema) mediante:

  ```css
  @custom-variant dark (&:where(.dark, .dark *));
  ```

- Todos los tokens semánticos (`--background`, `--foreground`, `--surface`, `--surface-muted`, `--border-subtle`) tienen su valor alternativo dentro del selector `.dark { ... }` en `app/globals.css` — los componentes casi nunca necesitan escribir `dark:` explícitamente porque consumen estos tokens ya resueltos (`bg-background`, `text-foreground`).
- Cuando un componente necesita un color que **no** es un token semántico (por ejemplo, `text-slate-600 dark:text-slate-300` en descripciones de tarjetas), sí se usa el prefijo `dark:` explícito.
- **Configuración por defecto:** `defaultTheme="light"`, `enableSystem={false}` (`app/layout.tsx`) — el sitio no sigue automáticamente la preferencia del sistema operativo del visitante; arranca siempre en modo claro y el usuario cambia manualmente con `ThemeToggle`. Esta es una decisión de producto (consistencia de marca en la primera impresión) documentada aquí para no revertirse accidentalmente.
- Sin *flash* de tema incorrecto: `next-themes` inyecta un script inline antes de la hidratación que aplica la clase `dark` guardada en `localStorage` antes del primer pintado.

---

## 13. Accesibilidad (WCAG)

- **Navegación por teclado:** todos los elementos interactivos son elementos nativos (`<button>`, `<a>`, `<input>`) — nunca `<div onClick>`. El estado de foco es visible globalmente vía `:focus-visible { outline: 2px solid var(--color-brand-500); outline-offset: 2px; }` en `globals.css`.
- **Iconos decorativos:** todo ícono de Lucide usado junto a un texto visible lleva `aria-hidden="true"` (el texto ya transmite el significado; el ícono no debe duplicarse en el árbol de accesibilidad).
- **Botones sin texto visible:** llevan `aria-label` explícito (`aria-label="Cambiar tema"` en `ThemeToggle`, `aria-label="Abrir menú"/"Cerrar menú"` en `MobileNav`).
- **Estado expandido/colapsado:** `aria-expanded` en el botón del menú móvil y en cada ítem del acordeón de FAQ; `aria-pressed` en los filtros de categoría del portafolio y del blog.
- **Roles de estado:** el resultado del formulario de contacto se anuncia con `role="status"`, permitiendo que lectores de pantalla lean el mensaje de éxito/error sin que el usuario deba navegar manualmente hasta él.
- **Contraste de color:** la paleta provisional fue elegida verificando contraste mínimo AA (4.5:1 para texto normal) entre `brand-600`/`brand-950` y sus fondos correspondientes. **Al reemplazar la paleta con la marca real (sección 1.4), volver a verificar el contraste** con una herramienta como el *Colour Contrast Analyser* o Chrome DevTools.
- **Semántica de encabezados:** cada página tiene un único `<h1>` (en el Hero de sección o en el título de la página), seguido de `<h2>` para cada sección (`SectionHeading`) y `<h3>` para títulos de tarjeta — nunca se saltan niveles.
- **Formularios:** cada `<input>`/`<select>`/`<textarea>` está asociado a su `<label>` mediante `htmlFor`/`id` (`FieldLabel` + `Input`/`Select`/`Textarea` en `contact-form.tsx`).

---

## 14. Glassmorphism (uso deliberadamente limitado)

Componente: `GlassPanel` (`components/ui/glass-panel.tsx`) — `bg-white/10`, `backdrop-blur-xl`, `border border-white/15`.

**Dónde se usa:** únicamente en el panel de dashboard simulado del Hero de Home, sobre el fondo oscuro degradado. **No se usa** en tarjetas de contenido, formularios ni sobre fondos claros — el brief de diseño pedía "glassmorphism únicamente donde sea apropiado", y este es el único punto del sitio donde aporta valor visual sin sacrificar legibilidad.

---

## 15. Referencias cruzadas

- Componentes que implementan estos patrones: [COMPONENT_GUIDE.md](./COMPONENT_GUIDE.md).
- Decisiones de arquitectura de estilos (Tailwind v4 CSS-first): [ARCHITECTURE.md](./ARCHITECTURE.md), [TECHNOLOGIES.md](./TECHNOLOGIES.md).
- Impacto de fuentes/animaciones en rendimiento: [PERFORMANCE.md](./PERFORMANCE.md).
