# Pruebas (Testing)

## 1. Estado actual: pruebas manuales únicamente

El proyecto **no tiene todavía pruebas automatizadas** (no hay `vitest`, `jest`, `playwright` ni `cypress` instalados). Toda la verificación de calidad se ha realizado hasta ahora mediante:

1. **Verificación estática:** `pnpm lint` (ESLint) + `pnpm build` (TypeScript en modo `strict` + generación de todas las rutas).
2. **Verificación manual en navegador**, siguiendo el checklist de la sección 2.

Esto es aceptable para el tamaño y la criticidad actual del sitio (predominantemente contenido estático, sin lógica de negocio compleja ni transacciones financieras), pero **debe evolucionar** a medida que el proyecto incorpore funcionalidades más críticas (portal de clientes, autenticación) — ver la sección 4 y [FUTURE_IMPROVEMENTS.md](./FUTURE_IMPROVEMENTS.md).

## 2. Checklist de pruebas manuales (ejecutar antes de cada despliegue a producción)

### 2.1. Verificación de build y calidad estática

- [ ] `pnpm lint` → cero errores, cero warnings.
- [ ] `pnpm build` → compila sin errores de TypeScript; todas las rutas aparecen como `○` (Static) o `●` (SSG) en la salida, ninguna como error.
- [ ] `pnpm start` (sobre el build de producción) levanta el sitio en `http://localhost:3000` sin errores en consola del servidor.

### 2.2. Navegación y contenido — recorrer cada ruta

Para cada una de las siguientes rutas: confirmar carga con código `200`, título de pestaña correcto, sin errores en la consola del navegador (`F12` → Console).

- [ ] `/`
- [ ] `/empresa`
- [ ] `/servicios`
- [ ] `/productos`
- [ ] `/productos/logikasoft-erp` (y al menos otro producto más, ej. uno con `status: "proximamente"`)
- [ ] `/tecnologias`
- [ ] `/casos-de-exito`
- [ ] `/portafolio`
- [ ] `/planes`
- [ ] `/blog`
- [ ] `/blog/<cualquier-slug-existente>`
- [ ] `/faq`
- [ ] `/contacto`
- [ ] `/sitemap.xml` (responde XML válido con todas las rutas esperadas)
- [ ] `/robots.txt` (responde con `Allow: /` y referencia al sitemap)
- [ ] Una ruta inexistente (ej. `/esto-no-existe`) → responde `404`

### 2.3. Interactividad

- [ ] **Menú móvil:** en viewport `< 1024px`, el botón hamburguesa abre/cierra el menú; todos los enlaces del menú navegan correctamente; el menú se cierra al seleccionar un enlace.
- [ ] **Dark mode:** el botón de tema alterna correctamente entre claro/oscuro; la preferencia persiste al recargar la página (via `localStorage`, gestionado por `next-themes`); no hay parpadeo (*flash*) del tema incorrecto al cargar.
- [ ] **Acordeón de FAQ:** cada pregunta se expande/colapsa correctamente; solo una pregunta permanece abierta a la vez.
- [ ] **Filtro de portafolio:** cada botón de categoría filtra correctamente los ítems mostrados; el botón "Todos" muestra todo.
- [ ] **Búsqueda y filtro de blog:** el campo de búsqueda filtra por título/extracto/tags en tiempo real; los botones de categoría filtran correctamente; la combinación de ambos filtros funciona (búsqueda + categoría a la vez); el mensaje de "no se encontraron artículos" aparece cuando corresponde.
- [ ] **Contadores animados del Hero:** al hacer scroll hasta que sean visibles, los números animan de 0 hasta su valor final una sola vez (no se reinician al seguir scrolleando).

### 2.4. Formulario de contacto (`/contacto`) — el flujo más crítico del sitio

- [ ] **Validación de campos vacíos:** enviar el formulario completamente vacío muestra un mensaje de error específico bajo cada campo obligatorio (`name`, `email`, `serviceInterest`, `message`), sin recargar la página.
- [ ] **Validación de formato de correo:** ingresar un valor sin `@` en el campo de correo muestra el error "Ingresa un correo válido".
- [ ] **Validación de longitud del mensaje:** un mensaje de menos de 10 caracteres muestra el error correspondiente.
- [ ] **Envío exitoso con `RESEND_API_KEY` configurada:** completar todos los campos válidamente, enviar, y confirmar:
  - El botón muestra el estado "Enviando..." con el ícono de carga mientras la Server Action se ejecuta.
  - Al finalizar, se muestra el mensaje de éxito (`role="status"`) y el formulario se limpia (`reset()`).
  - El correo llega realmente a la bandeja de `contacto@logikasoft.com` (o la configurada), con el `Reply-To` apuntando al correo del remitente.
- [ ] **Comportamiento sin `RESEND_API_KEY`:** el formulario debe mostrar el mensaje de error controlado ("No pudimos enviar tu mensaje...") — **nunca** debe romperse la página ni lanzar una excepción no controlada en consola.
- [ ] **Accesibilidad del formulario:** navegar el formulario completo solo con teclado (`Tab`/`Shift+Tab`/`Enter`); cada campo tiene su `<label>` correctamente asociado (verificable con el inspector de accesibilidad del navegador).

### 2.5. Responsive

- [ ] Verificar Header, Hero, grillas de productos/servicios y el formulario de contacto en al menos dos anchos de viewport: `375px` (mobile) y `1280px`+ (desktop). Ningún elemento debe desbordar horizontalmente ni superponerse.

### 2.6. SEO y metadatos (verificación rápida)

- [ ] Cada página tiene un `<title>` único (inspeccionar la pestaña del navegador o `document.title`).
- [ ] El código fuente de al menos una página de producto y un artículo de blog incluye un bloque `<script type="application/ld+json">` con datos coherentes con el contenido visible.
- [ ] Compartir la URL de una página (por ejemplo, en un chat) muestra una vista previa de Open Graph razonable (título, descripción) — puede verificarse con herramientas como el [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) o el [Card Validator de Twitter/X](https://cards-dev.twitter.com/validator) tras el despliegue.

## 3. Cómo se verificó esta versión (referencia histórica)

Durante el desarrollo inicial del sitio, la verificación se realizó con el servidor de desarrollo (`pnpm dev`) usando un navegador controlado, confirmando:

- Las 16 rutas públicas devuelven `200` (14 páginas + `sitemap.xml` + `robots.txt`), y una ruta inexistente devuelve `404`.
- `pnpm build` genera exitosamente las 27 rutas totales (incluyendo las variantes dinámicas de producto y blog) sin errores de tipos.
- `pnpm lint` en cero errores/warnings.
- El formulario de contacto valida correctamente campos vacíos e inválidos, y — al no tener `RESEND_API_KEY` configurada en ese entorno — devuelve el mensaje de error controlado esperado (confirmando que la Server Action y el guard de `getResendClient()` funcionan como se diseñaron).
- El menú móvil abre y muestra los enlaces esperados en viewport de 375px.
- El toggle de modo oscuro aplica correctamente la clase `dark` al elemento `<html>`.

## 4. Plan de pruebas automatizadas futuras

No implementado todavía; se documenta como hoja de ruta para cuando el proyecto lo justifique (ver también [FUTURE_IMPROVEMENTS.md](./FUTURE_IMPROVEMENTS.md)).

### 4.1. Pruebas unitarias — recomendación: Vitest

**Candidatos prioritarios** (lógica pura, fácil de testear sin renderizar componentes):

```ts
// Ejemplo ilustrativo — features/contact/schema.test.ts (no implementado aún)
import { describe, expect, it } from "vitest";
import { contactFormSchema } from "./schema";

describe("contactFormSchema", () => {
  it("rechaza un correo con formato inválido", () => {
    const result = contactFormSchema.safeParse({
      name: "Test",
      email: "no-es-correo",
      serviceInterest: "ERP Empresarial",
      message: "Mensaje de prueba con más de diez caracteres.",
    });
    expect(result.success).toBe(false);
  });

  it("acepta un payload completamente válido", () => {
    const result = contactFormSchema.safeParse({
      name: "Test",
      email: "test@logikasoft.com",
      serviceInterest: "ERP Empresarial",
      message: "Mensaje de prueba con más de diez caracteres.",
    });
    expect(result.success).toBe(true);
  });
});
```

Otros candidatos: `utils/cn.ts` (fusión de clases), `utils/seo.ts` (`buildMetadata` genera el objeto esperado), `features/blog/mdx.ts` (`getAllPostsMeta` ordena correctamente por fecha).

### 4.2. Pruebas de componentes — recomendación: React Testing Library (sobre Vitest)

Candidatos: `Accordion` (solo un ítem abierto a la vez), `BlogList` (el filtro combinado de búsqueda + categoría retorna el subconjunto correcto), `ContactForm` (los mensajes de error de Zod se renderizan en el campo correcto).

### 4.3. Pruebas end-to-end (E2E) — recomendación: Playwright

Es la inversión con mejor retorno para este proyecto específico, dado que es predominantemente de navegación + un formulario crítico:

```ts
// Ejemplo ilustrativo — e2e/contacto.spec.ts (no implementado aún)
import { test, expect } from "@playwright/test";

test("el formulario de contacto valida campos vacíos", async ({ page }) => {
  await page.goto("/contacto");
  await page.getByRole("button", { name: "Solicitar Cotización" }).click();
  await expect(page.getByText("Ingresa tu nombre completo")).toBeVisible();
});

test("todas las rutas principales cargan sin error", async ({ page }) => {
  for (const path of ["/", "/empresa", "/servicios", "/productos", "/blog", "/contacto"]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
  }
});
```

### 4.4. Integración con CI

Cuando se implemente cualquiera de las anteriores, agregar un workflow de GitHub Actions que ejecute, en cada Pull Request:

```yaml
# .github/workflows/ci.yml (propuesta, no implementado aún)
name: CI
on: [pull_request]
jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "pnpm"
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm build
      # - run: pnpm test        (cuando exista Vitest)
      # - run: pnpm test:e2e    (cuando exista Playwright)
```

### 4.5. Priorización sugerida

1. Playwright para el flujo del formulario de contacto (es el único punto del sitio con lógica de negocio real y el de mayor impacto si se rompe silenciosamente).
2. Vitest para `contactFormSchema` y `buildMetadata` (lógica pura, alto valor, bajo esfuerzo).
3. CI en GitHub Actions ejecutando `lint` + `build` en cada PR (incluso antes de tener pruebas, ya aporta valor).
4. React Testing Library para componentes interactivos complejos (`BlogList`, `PortfolioGrid`) si su lógica de filtrado crece en complejidad.
