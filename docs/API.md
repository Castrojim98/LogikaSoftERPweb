# API

El proyecto **no expone una API REST/GraphQL tradicional**. Toda la "API" del sitio, en su versión actual, consiste en:

1. Una **Server Action** de Next.js (`submitContactForm`) para el formulario de contacto.
2. Dos **rutas de archivo especial** que generan contenido dinámico (`sitemap.xml`, `robots.txt`), documentadas en detalle en [SEO.md](./SEO.md) — no se repiten aquí porque no son "API" en el sentido de datos de negocio.

Este documento se centra en la Server Action, siguiendo el mismo formato que usaría la documentación de un endpoint HTTP convencional, para que sea igual de fácil de consumir y mantener.

## 1. ¿Qué es una Server Action y por qué se documenta como si fuera un endpoint?

Una Server Action de Next.js es una función marcada con `"use server"` que se ejecuta exclusivamente en el servidor, pero que el código del cliente puede invocar **como si fuera una función local** (`await submitContactForm(values)`). Detrás de escena, Next.js serializa esa llamada como una petición `POST` real hacia el servidor, la ejecuta ahí, y serializa la respuesta de vuelta. Por eso tiene sentido — y es una buena práctica — documentarla con el mismo rigor que un endpoint REST: contrato de entrada, contrato de salida, códigos de resultado y errores posibles.

## 2. `submitContactForm`

| | |
|---|---|
| **Ubicación** | `app/actions/contact.ts` |
| **Tipo** | Server Action (`"use server"`) |
| **Invocada desde** | `components/sections/contact-form.tsx` (única invocación actual en todo el proyecto) |
| **Método HTTP subyacente** | `POST` (gestionado internamente por Next.js, no expuesto como ruta pública documentable con una URL fija) |
| **Autenticación requerida** | Ninguna (formulario público) |
| **Rate limiting** | No implementado — ver [SECURITY.md](./SECURITY.md) |

### 2.1. Firma

```ts
async function submitContactForm(values: ContactFormValues): Promise<ContactFormResult>
```

### 2.2. Request — `ContactFormValues`

Definido y validado con Zod en `features/contact/schema.ts`:

```ts
type ContactFormValues = {
  name: string;             // 2–100 caracteres, requerido
  email: string;            // formato de correo válido, requerido
  company?: string;         // máx. 100 caracteres, opcional
  phone?: string;           // máx. 30 caracteres, opcional
  serviceInterest: string;  // no vacío, requerido (una opción de config/services.ts o "Otro")
  message: string;          // 10–2000 caracteres, requerido
};
```

**Ejemplo de payload válido:**

```json
{
  "name": "Jimena Castro",
  "email": "jimena@example.com",
  "company": "Comercializadora Andina",
  "phone": "+57 300 123 4567",
  "serviceInterest": "ERP Empresarial",
  "message": "Quisiera una cotización para implementar el ERP en mi empresa."
}
```

**Ejemplo de payload inválido** (dispara errores de validación):

```json
{
  "name": "A",
  "email": "no-es-un-correo",
  "serviceInterest": "",
  "message": "muy corto"
}
```

### 2.3. Response — `ContactFormResult`

```ts
type ContactFormResult = {
  success: boolean;
  message: string;
};
```

| Campo | Descripción |
|---|---|
| `success` | `true` únicamente si el correo se envió correctamente a través de Resend. `false` en cualquier otro caso (validación fallida, `RESEND_API_KEY` no configurada, error del proveedor de correo). |
| `message` | Mensaje en español, listo para mostrarse directamente al usuario final en la UI (no es un mensaje técnico de depuración). |

### 2.4. Todos los casos de respuesta posibles

| Escenario | `success` | `message` (texto exacto) | Causa |
|---|---|---|---|
| Envío exitoso | `true` | `"¡Gracias! Recibimos tu solicitud y te contactaremos en menos de 24 horas."` | El correo se envió correctamente vía Resend. |
| Validación fallida en servidor | `false` | `"Revisa los campos del formulario e intenta de nuevo."` | `contactFormSchema.safeParse(values)` retornó `success: false`. En la práctica, esto solo debería ocurrir si alguien invoca la Server Action evitando la validación del cliente (ver [SECURITY.md](./SECURITY.md)). |
| `RESEND_API_KEY` no configurada | `false` | `"No pudimos enviar tu mensaje en este momento. Intenta de nuevo más tarde o escríbenos directamente."` | `getResendClient()` retornó `null`. Se registra un `console.error` en el servidor para diagnóstico, sin exponer detalles internos al usuario. |
| Error del proveedor de correo (Resend) | `false` | `"Ocurrió un error al enviar tu mensaje. Intenta de nuevo o escríbenos directamente por correo."` | La llamada a `resend.emails.send()` lanzó una excepción (por ejemplo, dominio no verificado, cuota excedida, timeout de red). Se captura en un `try/catch` y se registra con `console.error`. |

**Contrato importante:** la Server Action **nunca lanza una excepción hacia el componente que la invoca** — todos los caminos de error se capturan internamente y se traducen a un `ContactFormResult` con `success: false`. Esto simplifica el consumo en el cliente: `ContactForm` no necesita un bloque `try/catch` alrededor de la llamada.

### 2.5. Efecto secundario (side effect)

Si `success: true`, se envió un correo electrónico real mediante Resend:

```ts
await resend.emails.send({
  from: `${siteConfig.name} <notificaciones@logikasoft.com>`,
  to: siteConfig.contact.email,        // contacto@logikasoft.com
  replyTo: email,                      // el correo que escribió el remitente
  subject: `Nueva solicitud de cotización — ${name}`,
  text: [
    `Nombre: ${name}`,
    `Correo: ${email}`,
    `Empresa: ${company || "No especificada"}`,
    `Teléfono: ${phone || "No especificado"}`,
    `Servicio de interés: ${serviceInterest}`,
    "",
    "Mensaje:",
    message,
  ].join("\n"),
});
```

**No hay persistencia en base de datos.** El único registro de la solicitud queda en la bandeja de correo de `contacto@logikasoft.com` (vía Resend) — no existe todavía una tabla ni un CRM que almacene los leads (ver la oportunidad de integrar un CRM/base de datos en [FUTURE_IMPROVEMENTS.md](./FUTURE_IMPROVEMENTS.md)).

### 2.6. Cómo probarla manualmente (sin la UI)

Desde un componente de servidor o un script temporal de Node dentro del proyecto (nunca desde el navegador, ya que es una función de servidor):

```ts
import { submitContactForm } from "@/app/actions/contact";

const result = await submitContactForm({
  name: "Prueba QA",
  email: "qa@logikasoft.com",
  company: "",
  phone: "",
  serviceInterest: "Consultoría Tecnológica",
  message: "Este es un mensaje de prueba de al menos diez caracteres.",
});

console.log(result); // { success: true/false, message: "..." }
```

Ver el checklist de pruebas manuales completo del formulario en [TESTING.md](./TESTING.md).

## 3. Extender o agregar una nueva Server Action

Al agregar una Server Action nueva (por ejemplo, una futura suscripción a newsletter), seguir el mismo patrón que `submitContactForm`:

1. Definir el esquema de Zod y sus tipos en `features/<dominio>/schema.ts`.
2. Crear el archivo en `app/actions/<nombre>.ts` con `"use server"` en la primera línea.
3. Validar la entrada con `schema.safeParse()` como primera instrucción de la función.
4. Envolver cualquier llamada a un servicio externo en `try/catch`, retornando siempre un objeto de resultado tipado, nunca lanzando la excepción hacia el cliente.
5. Documentar la nueva acción en este archivo (`API.md`) siguiendo la misma estructura (Request, Response, casos de respuesta, efectos secundarios).
6. Actualizar [SECURITY.md](./SECURITY.md) si la acción introduce un nuevo tipo de riesgo (por ejemplo, un nuevo secreto o una nueva integración externa).

## 4. Futuras APIs (fuera de alcance de esta versión)

Ver el detalle de estas iniciativas en [FUTURE_IMPROVEMENTS.md](./FUTURE_IMPROVEMENTS.md):

- API REST/GraphQL para un futuro portal de clientes (autenticación, consulta de facturas, tickets de soporte).
- Webhook receptor para notificaciones de Resend (confirmación de entrega/rebote de correos).
- Endpoint de búsqueda del blog en servidor (si el volumen de artículos crece más allá de lo que un filtro en memoria en el cliente puede manejar eficientemente).
