# Solución de Problemas (Troubleshooting)

Este documento recopila problemas **reales** enfrentados durante el desarrollo de este proyecto (no hipotéticos), junto con su causa raíz y la solución aplicada. Consultarlo primero ante cualquier error que coincida con la descripción.

---

## 1. `'node' no se reconoce como un comando` / Node.js no instalado

**Síntoma:** cualquier comando (`node -v`, `npm -v`, `pnpm install`) falla con "command not found" o "no se reconoce como un comando".

**Causa:** Node.js no está instalado en el sistema, o no está en el `PATH` de la terminal actual.

**Solución:**

```bash
# Windows (winget)
winget install OpenJS.NodeJS.LTS

# Verificar tras instalar (puede requerir abrir una nueva terminal)
node -v
npm -v
```

Si `winget` instaló Node.js pero el comando sigue sin reconocerse en la sesión actual de terminal, refrescar el `PATH` manualmente en esa sesión (PowerShell):

```powershell
$env:PATH = [System.Environment]::GetEnvironmentVariable("PATH","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("PATH","User")
```

o simplemente abrir una terminal nueva.

---

## 2. `create-next-app` falla: "name can only contain URL-friendly characters" / "name can no longer contain capital letters"

**Síntoma:** al ejecutar `create-next-app` apuntando directamente a una carpeta con espacios o mayúsculas en el nombre (por ejemplo, `Pagina web Logika Soft`), el comando falla antes de crear nada.

**Causa:** `create-next-app` deriva el campo `"name"` de `package.json` del nombre de la carpeta de destino cuando se usa `.` como target, y `npm` exige que ese campo sea un nombre de paquete válido (minúsculas, sin espacios).

**Solución aplicada en este proyecto:** generar el scaffold en una carpeta temporal con nombre válido (`logika-soft-tmp`) fuera del destino final, y luego mover **todo el contenido** (incluyendo archivos ocultos como `.git` y `.gitignore`) a la carpeta final con `robocopy /E /MOVE` (Windows) o `mv` (Unix). Tras mover el proyecto, corregir manualmente el campo `"name"` en `package.json` (quedó como `"logika-soft-tmp"` tras el `mv`; se corrigió a `"logika-soft"`).

**Alternativa más simple para el futuro:** ejecutar `create-next-app nombre-valido` en un directorio padre y luego renombrar/mover la carpeta resultante completa (en lugar de mover solo su contenido), evitando el paso intermedio de `robocopy`.

---

## 3. `[ERR_PNPM_UNEXPECTED_VIRTUAL_STORE]` tras mover la carpeta del proyecto

**Síntoma:**

```
[ERR_PNPM_UNEXPECTED_VIRTUAL_STORE] Unexpected virtual store location
The dependencies at "...\node_modules" are currently symlinked from the virtual store directory at "...\ruta-anterior\node_modules\.pnpm".
```

**Causa:** pnpm usa un *virtual store* (`node_modules/.pnpm`) enlazado mediante *junctions* (symlinks de Windows) que contienen **rutas absolutas**. Si la carpeta `node_modules` se mueve o copia (por ejemplo, con `robocopy`, como ocurrió en el punto 2 de este documento) desde su ubicación original, esos enlaces quedan rotos porque siguen apuntando a la ruta antigua.

**Solución:**

```bash
rm -rf node_modules
pnpm install
```

**Regla general:** nunca mover ni copiar manualmente una carpeta `node_modules` generada por pnpm entre ubicaciones del sistema de archivos. Siempre borrarla y regenerarla con `pnpm install` en la ubicación definitiva.

---

## 4. Next.js instala la versión 16 en lugar de la 15 esperada

**Síntoma:** `create-next-app@latest` instala `next@16.3.0` cuando el plan original especificaba Next.js 15.

**Causa:** `create-next-app@latest` siempre instala la versión estable más reciente de Next.js disponible en el momento de ejecución, no una versión fija.

**Resolución aplicada:** se evaluó forzar la versión 15 (`create-next-app@15`) versus aceptar la 16, y se decidió **mantener la 16** — es la versión estable más reciente, totalmente compatible con la arquitectura planeada (App Router, Server Components, Server Actions), y con mayor ventana de soporte a futuro. Ver la decisión documentada en [TECHNOLOGIES.md](./TECHNOLOGIES.md).

**Lección para el futuro:** si un proyecto requiere una versión **exacta** de Next.js (por compatibilidad con otra herramienta, por ejemplo), fijarla explícitamente desde el inicio:

```bash
npx create-next-app@15 ...
```

en lugar de `@latest`, y verificar la versión instalada inmediatamente después con `cat package.json`.

---

## 5. Error de compilación: `Export Facebook doesn't exist in target module "lucide-react"` (y lo mismo con `Github`, `Instagram`, `Linkedin`)

**Síntoma:**

```
Error: Export Facebook doesn't exist in target module
The export Facebook was not found in module [...] lucide-react [...]
Did you mean to import Webhook?
```

Errores equivalentes para `Github` (sugiere `Gift`), `Instagram` (sugiere `Star`), `Linkedin` (sugiere `Link`).

**Causa raíz:** la versión de `lucide-react` instalada en este proyecto es `1.28.0` (rango `^1.28.0`). Esta versión mayor **eliminó todos los íconos de marcas/logos registrados** (Facebook, Instagram, LinkedIn, GitHub, Twitter, etc.) de la librería, presumiblemente por motivos de licenciamiento de marca — solo se conservan íconos genéricos (formas, objetos, conceptos abstractos como `git-branch`, `git-commit`, que no son logos de marca).

**Solución aplicada:** se crearon íconos SVG propios y simplificados para las redes sociales necesarias, en `components/ui/social-icons.tsx` (`LinkedinIcon`, `FacebookIcon`, `InstagramIcon`, `GithubIcon`), con la misma interfaz de props que un ícono de Lucide (`SVGProps<SVGSVGElement>`), y se reemplazaron los imports en `components/layout/footer.tsx`.

**Cómo verificar si un ícono de Lucide existe antes de importarlo** (evita este error preventivamente):

```bash
ls node_modules/lucide-react/dist/esm/icons/ | grep -i "nombre-del-icono"
```

o revisar la documentación oficial de la versión exacta instalada en [lucide.dev](https://lucide.dev/icons/) filtrando por versión.

**Lección para el futuro:** al actualizar `lucide-react`, **nunca asumir** que un ícono usado en una versión anterior sigue existiendo — volver a verificar, especialmente íconos de marcas/logos.

---

## 6. Los logs del servidor de desarrollo y de la consola del navegador muestran errores "fantasma" ya corregidos

**Síntoma:** tras corregir un error de compilación (por ejemplo, el del punto 5), volver a consultar los logs del servidor o la consola del navegador sigue mostrando el mismo error, aunque el archivo ya esté corregido y la página cargue correctamente.

**Causa:** las herramientas de inspección de logs/consola de este entorno de desarrollo **acumulan el historial completo** desde que el proceso se inició, no solo el estado más reciente. Un log antiguo que coincide con una búsqueda (`search: "Error"`) puede reaparecer aunque el problema ya no exista.

**Solución / cómo verificar el estado real:**

1. **No confiar únicamente en los logs acumulados.** Verificar el estado *actual* con una de estas señales, más confiables:
   - El `<title>` de la página tras una navegación fresca (`navigate` con `force: true`).
   - El código de estado HTTP real de la petición (`read_network_requests`, confirmar `200 OK`).
   - El contenido de texto renderizado (`get_page_text`) coincide con lo esperado.
   - Releer el archivo fuente directamente para confirmar que el cambio se guardó.
2. Si es indispensable limpiar el historial, reiniciar el proceso del servidor de desarrollo.

---

## 7. Regla de ESLint `react-hooks/set-state-in-effect` — "Calling setState synchronously within an effect can trigger cascading renders"

**Síntoma:** `pnpm lint` falla con un error apuntando a un `useEffect` que llama a `setState` en su cuerpo, por ejemplo:

```tsx
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []); // ❌ flagged
```

**Causa:** este patrón (usado originalmente en `theme-toggle.tsx` para evitar un *mismatch* de hidratación entre servidor y cliente al leer el tema actual) es un antipatrón conocido de React: causa un render adicional inmediatamente después del montaje, y la regla `react-hooks/set-state-in-effect` (incluida en `eslint-config-next`) lo detecta.

**Solución aplicada:** eliminar por completo el estado `mounted` y el efecto, aprovechando que `next-themes` ya retorna `resolvedTheme === undefined` durante el renderizado previo a la hidratación — la condición `resolvedTheme === "dark"` es `false` tanto en el servidor como en el cliente antes de hidratar (coincide con el `defaultTheme="light"` configurado), por lo que no hay *mismatch* que evitar manualmente:

```tsx
// ✅ Sin estado ni efecto adicional
const { resolvedTheme, setTheme } = useTheme();
return (
  <button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
    {resolvedTheme === "dark" ? <Sun /> : <Moon />}
  </button>
);
```

**Lección general:** antes de usar el patrón `useState(false)` + `useEffect(() => setTrue, [])` para detectar "ya estamos en el cliente", verificar si la librería en uso (como `next-themes`) ya expone un valor `undefined`/inicial que cumple la misma función sin necesitar un efecto adicional.

---

## 8. El formulario de contacto no envía correos (pero tampoco muestra un error de servidor)

**Síntoma:** al enviar el formulario de `/contacto` con datos válidos, se muestra el mensaje "No pudimos enviar tu mensaje en este momento...".

**Causa:** la variable de entorno `RESEND_API_KEY` no está configurada en el entorno actual.

**Solución:** este es el **comportamiento esperado y diseñado** cuando falta la variable (ver `services/resend.ts` y [API.md](./API.md)) — no es un bug. Configurar `RESEND_API_KEY` en `.env.local` (desarrollo) o en las variables de entorno de la plataforma de despliegue (producción). Ver [ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md).

**Cómo diferenciar esto de un error real de Resend:** revisar los logs del servidor — `services/resend.ts`/`app/actions/contact.ts` registran con `console.error` tanto el caso de "clave no configurada" como cualquier excepción real de la llamada a `resend.emails.send()`; el mensaje de log indica cuál de los dos casos ocurrió.

---

## 9. Puerto 3000 ya está en uso al ejecutar `pnpm dev`

**Síntoma:** Next.js indica que el puerto 3000 está ocupado y ofrece automáticamente el siguiente disponible (3001, etc.), o falla si ese comportamiento está deshabilitado.

**Solución:**

```bash
# Forzar un puerto específico
pnpm dev -- -p 4000

# o, en Windows, identificar y cerrar el proceso que ocupa el puerto 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

## 10. Errores de tipos tras actualizar dependencias

**Síntoma:** `pnpm build` falla con errores de TypeScript después de `pnpm update` o de actualizar una dependencia puntual.

**Solución:**

```bash
rm -rf .next
pnpm install
pnpm build
```

Si el error persiste, revisar el *changelog* de la dependencia actualizada — es probable que haya un cambio de firma de tipos entre versiones mayores (ver la política de actualización en [MAINTENANCE.md](./MAINTENANCE.md)).

---

## 11. ¿Dónde buscar ayuda si el problema no está en esta lista?

1. **Documentación bundleada de Next.js** en `node_modules/next/dist/docs/` — más confiable que la memoria de un asistente de IA para la versión *exacta* instalada (ver el hallazgo del punto 4).
2. [MAINTENANCE.md](./MAINTENANCE.md) — sección de deuda técnica conocida.
3. [SECURITY.md](./SECURITY.md) y [PERFORMANCE.md](./PERFORMANCE.md) — para problemas específicos de esas categorías.
4. Los mensajes de error de Next.js en modo desarrollo suelen incluir un enlace a `nextjs.org/docs/messages/<código>` con una explicación detallada — seguir siempre ese enlace antes de buscar en otra fuente.
