# Variables de Entorno

## 1. Filosofía

El proyecto sigue el principio de **configuración mínima por variables de entorno**: solo existe una variable de entorno actualmente, porque casi todo el contenido y la configuración del sitio son datos versionados en el código (`config/site.ts`), no secretos. Esto reduce la superficie de configuración y el riesgo de desincronización entre entornos.

Toda variable de entorno debe:

1. Declararse en `.env.example` (con el nombre, sin el valor real).
2. Documentarse en este archivo.
3. Nunca commitearse con un valor real en ningún archivo `.env*` (todos están en `.gitignore`).
4. Leerse **solo** en código que corre en el servidor (Server Components, Server Actions, `services/`), nunca en un Client Component, salvo que se prefije explícitamente con `NEXT_PUBLIC_` y se asuma que su valor será público.

## 2. Archivo de referencia: `.env.example`

```env
RESEND_API_KEY=
```

Este archivo **sí** se commitea al repositorio (sirve de plantilla). Para configurar el entorno local:

```bash
cp .env.example .env.local
```

## 3. Variables actualmente en uso

### `RESEND_API_KEY`

| | |
|---|---|
| **Tipo** | Secreto (string) |
| **Obligatoria** | No para desarrollo/build. Sí para que el formulario de contacto envíe correos reales en producción. |
| **Dónde se lee** | `services/resend.ts` → `getResendClient()` |
| **Dónde se usa** | `app/actions/contact.ts` → `submitContactForm()` |
| **Formato esperado** | `re_xxxxxxxxxxxxxxxxxxxxxxxx` |
| **Cómo obtenerla** | Crear una cuenta en [resend.com](https://resend.com) → verificar el dominio de envío (`logikasoft.com`, agregando los registros DNS SPF/DKIM que Resend indica) → **API Keys** → **Create API Key**. |
| **Alcance recomendado** | Crear la key con permiso de **Sending access** únicamente (no *Full access*), limitando el daño potencial si la key se filtra. |
| **Comportamiento si falta** | `getResendClient()` retorna `null`. La Server Action detecta esto, registra un error en el log del servidor (`console.error`) y devuelve `{ success: false, message: "No pudimos enviar tu mensaje..." }` al formulario — **el sitio no se rompe**, solo el envío de correo queda deshabilitado. |

**Ejemplo de uso en código (no modificar sin entender el flujo completo, ver [API.md](./API.md)):**

```ts
// services/resend.ts
export function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}
```

## 4. Dónde configurar cada variable según el entorno

| Entorno | Dónde configurarla |
|---|---|
| Desarrollo local | Archivo `.env.local` en la raíz del proyecto (no versionado) |
| Vercel | Project Settings → Environment Variables (separar Production / Preview / Development si los valores difieren) |
| Azure App Service | `az webapp config appsettings set` o Portal → Configuration → Application settings |
| VPS Ubuntu | Archivo `.env.local` en el servidor, con permisos restringidos (`chmod 600 .env.local`) |
| Docker | Flag `-e RESEND_API_KEY=...` en `docker run`, o `environment:` en `docker-compose.yml`, o un *secret* del orquestador en producción |

Ver el detalle de cada plataforma en [DEPLOYMENT.md](./DEPLOYMENT.md).

## 5. Variables públicas (`NEXT_PUBLIC_*`) — no hay ninguna todavía

Next.js expone al navegador **únicamente** las variables de entorno cuyo nombre empieza con `NEXT_PUBLIC_`. Actualmente el proyecto no define ninguna, porque:

- La URL del sitio, el correo de contacto, el teléfono y las redes sociales son datos públicos por naturaleza y ya viven como constantes en `config/site.ts` (`siteConfig`), no necesitan pasar por una variable de entorno.
- No hay integraciones de terceros en el cliente (analítica, mapas con API key, chat en vivo) que requieran una clave pública — ver candidatas futuras abajo.

### Candidatas futuras a `NEXT_PUBLIC_*` (ver [FUTURE_IMPROVEMENTS.md](./FUTURE_IMPROVEMENTS.md))

| Variable futura | Para qué |
|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics / GA4 |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Si se reemplaza el embed de OpenStreetMap de `/contacto` por Google Maps |
| `NEXT_PUBLIC_CHAT_WIDGET_ID` | Si se integra un widget de chat en vivo (Crisp, Intercom, etc.) |

> **Regla de seguridad:** nunca colocar una clave con permisos de escritura/administración en una variable `NEXT_PUBLIC_*` — cualquier cosa con ese prefijo queda embebida en el JavaScript del navegador y es visible para cualquier visitante. Ver [SECURITY.md](./SECURITY.md).

## 6. Buenas prácticas

1. **Nunca** hardcodear secretos directamente en el código, ni siquiera "temporalmente" — usar siempre `process.env.NOMBRE_VARIABLE`.
2. **Nunca** loguear el valor completo de una variable secreta (`console.log(process.env.RESEND_API_KEY)`); si se necesita depurar su presencia, loguear solo un booleano (`console.log(!!process.env.RESEND_API_KEY)`).
3. Cada vez que se agregue una variable nueva:
   - Agregarla a `.env.example` (sin valor).
   - Documentarla en este archivo (tipo, dónde se usa, cómo obtenerla, comportamiento si falta).
   - Configurarla en **todos** los entornos de despliegue activos antes de fusionar el cambio a producción.
4. Rotar `RESEND_API_KEY` inmediatamente si se sospecha que fue expuesta (por ejemplo, si se commiteó por error) — generar una nueva key desde el panel de Resend y revocar la anterior.
5. Preferir variables de entorno **por entorno** (Production/Preview/Development en Vercel) en lugar de una única key compartida entre desarrollo y producción, para poder revocar el acceso de desarrollo sin afectar producción.
