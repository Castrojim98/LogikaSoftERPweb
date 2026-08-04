# Guía de Instalación

Esta guía documenta el proceso completo para instalar y ejecutar el proyecto **LOGIKA SOFT** en un entorno de desarrollo local, desde cero, en Windows, macOS o Linux.

---

## 1. Requisitos previos

| Herramienta | Versión mínima | Versión usada en desarrollo | Notas |
|---|---|---|---|
| [Node.js](https://nodejs.org/) | 20.x LTS | 24.19.0 | Requerido por Next.js 16. |
| [pnpm](https://pnpm.io/) | 9.x | 11.20.0 | Gestor de paquetes oficial del proyecto. |
| Git | 2.x | 2.55 | Control de versiones. |
| Editor recomendado | — | VS Code | Con extensiones de ESLint y Tailwind CSS IntelliSense. |

> **¿Por qué pnpm y no npm o yarn?** pnpm usa un almacén de contenido direccionado (*content-addressable store*) que enlaza los paquetes mediante *hard links*, lo que reduce drásticamente el espacio en disco y acelera las instalaciones en máquinas con múltiples proyectos Next.js. El proyecto fija `packageManager: "pnpm@11.20.0"` en `package.json` para garantizar reproducibilidad.

### 1.1. Instalación de Node.js

**Windows (con winget):**

```bash
winget install OpenJS.NodeJS.LTS
```

**macOS (con Homebrew):**

```bash
brew install node@20
```

**Linux (Ubuntu/Debian, con NodeSource):**

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Verificar la instalación:

```bash
node -v
npm -v
```

### 1.2. Instalación de pnpm

Una vez instalado Node.js (que incluye npm), instalar pnpm globalmente:

```bash
npm install -g pnpm
```

Verificar:

```bash
pnpm -v
```

> Alternativa sin npm: `corepack enable` (Node 20+ incluye Corepack, que puede gestionar pnpm automáticamente según el campo `packageManager` del `package.json`).

### 1.3. Instalación de npm (referencia)

npm se instala automáticamente junto con Node.js — no requiere un paso adicional. El proyecto **no usa npm como gestor de paquetes** (usa pnpm), pero npm sigue siendo necesario porque:

- Es el runtime que ejecuta `npx` para herramientas puntuales (por ejemplo, `npx create-next-app` al iniciar el proyecto).
- Sirve como mecanismo de respaldo si pnpm no está disponible en un entorno de CI.

Si por alguna razón se necesita instalar dependencias con npm en lugar de pnpm, usar:

```bash
npm install
```

> **No mezclar gestores de paquetes.** Usar únicamente pnpm en este proyecto para evitar archivos de lockfile duplicados o inconsistentes (`package-lock.json` junto a `pnpm-lock.yaml`). Si se genera un `package-lock.json` por error, eliminarlo.

---

## 2. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd "Pagina web Logika Soft"
```

---

## 3. Instalación de dependencias

Desde la raíz del proyecto (donde está `package.json`):

```bash
pnpm install
```

Esto instala todas las dependencias listadas en `package.json`, incluyendo:

- `next`, `react`, `react-dom`
- `framer-motion`, `lucide-react`
- `react-hook-form`, `zod`, `@hookform/resolvers`
- `resend`, `next-themes`
- `gray-matter`, `next-mdx-remote`, `reading-time`
- `clsx`, `tailwind-merge`, `class-variance-authority`
- `tailwindcss`, `@tailwindcss/postcss`, `@tailwindcss/typography` (devDependencies)
- `typescript`, `eslint`, `eslint-config-next` (devDependencies)

Ver la lista completa y su propósito en [TECHNOLOGIES.md](./TECHNOLOGIES.md).

---

## 4. Configuración de variables de entorno

El proyecto usa un único archivo de variables de entorno: `.env.local` (no versionado en Git).

1. Copiar la plantilla incluida en el repositorio:

   ```bash
   cp .env.example .env.local
   ```

2. Completar el valor de `RESEND_API_KEY`:

   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
   ```

   Esta clave se obtiene creando una cuenta en [resend.com](https://resend.com), verificando el dominio de envío (`logikasoft.com`) y generando una API Key desde el panel de Resend.

   > **Sin esta variable el sitio funciona igual**, pero el formulario de `/contacto` mostrará un mensaje de error controlado en lugar de enviar el correo real (ver `app/actions/contact.ts` y [ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md)).

Ver el detalle completo de cada variable en [ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md).

---

## 5. Ejecutar el proyecto en desarrollo

```bash
pnpm dev
```

Esto levanta el servidor de desarrollo de Next.js con **Turbopack** en `http://localhost:3000`. El servidor recarga automáticamente (Fast Refresh) al guardar cambios en cualquier archivo dentro de `app/`, `components/`, `config/`, `features/`, etc.

---

## 6. Compilar para producción (verificación local)

Antes de desplegar, siempre verificar que el build de producción compila sin errores:

```bash
pnpm build
```

Esto:

- Compila TypeScript en modo `strict` (falla si hay errores de tipos).
- Ejecuta el linter de build integrado de Next.js.
- Pre-renderiza todas las rutas estáticas y las rutas dinámicas listadas por `generateStaticParams` (productos y artículos del blog).
- Genera el reporte de rutas (`○` estático, `●` SSG) en la terminal.

Para servir ese build de producción localmente:

```bash
pnpm start
```

Y abrir `http://localhost:3000`.

---

## 7. Ejecutar el linter

```bash
pnpm lint
```

El proyecto debe mantenerse siempre con **cero errores y cero warnings** de ESLint antes de cualquier commit o despliegue. Ver las reglas activas en [CODING_STANDARDS.md](./CODING_STANDARDS.md).

---

## 8. Estructura mínima verificada tras la instalación

Tras `pnpm install` correctamente, deberían existir:

```
node_modules/          ← generado por pnpm
.next/                 ← generado tras el primer `pnpm dev` o `pnpm build`
.env.local             ← creado manualmente en el paso 4
```

Ninguno de estos tres directorios/archivos debe subirse a Git (ver `.gitignore` en la raíz).

---

## 9. Errores comunes durante la instalación

### 9.1. `'node' no se reconoce como un comando`

Node.js no está instalado o no está en el `PATH` del sistema. Reinstalar Node.js y abrir una nueva terminal (en Windows, puede requerir cerrar sesión o reiniciar para que el `PATH` se actualice).

### 9.2. `ERR_PNPM_UNEXPECTED_VIRTUAL_STORE`

Ocurre cuando la carpeta `node_modules` fue movida o copiada desde otra ruta del sistema de archivos (pnpm usa *junctions*/symlinks en Windows que apuntan a rutas absolutas). **Solución:**

```bash
rm -rf node_modules
pnpm install
```

Nunca copiar o mover manualmente una carpeta `node_modules` generada por pnpm; siempre regenerarla con `pnpm install` en la ubicación final.

### 9.3. El proyecto no puede crearse en una carpeta con espacios o mayúsculas

`create-next-app` (usado solo durante el scaffolding inicial del proyecto) exige que el nombre del paquete sea una URL-friendly string en minúsculas. Esto es una restricción de `npm`/`create-next-app`, no del proyecto en sí — el campo `"name"` en `package.json` ya está fijado en `"logika-soft"` y no requiere cambios. La carpeta del repositorio en disco (`Pagina web Logika Soft`) puede tener espacios y mayúsculas sin ningún problema.

### 9.4. El formulario de contacto no envía correos

Ver la sección 4 de este documento y [ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md) — falta configurar `RESEND_API_KEY`.

### 9.5. Puerto 3000 ya está en uso

Otro proceso está usando el puerto. Next.js ofrece automáticamente el siguiente puerto libre (3001, 3002, ...) o se puede forzar uno específico:

```bash
pnpm dev -- -p 4000
```

### 9.6. Errores de tipos tras actualizar dependencias

Ejecutar:

```bash
rm -rf .next
pnpm install
pnpm build
```

Si persisten, revisar [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) y [MAINTENANCE.md](./MAINTENANCE.md).

---

## 10. Siguientes pasos

- Para desplegar el proyecto: [DEPLOYMENT.md](./DEPLOYMENT.md)
- Para entender la arquitectura antes de modificar código: [ARCHITECTURE.md](./ARCHITECTURE.md)
- Para agregar contenido (productos, artículos de blog): [CMS.md](./CMS.md) y [MAINTENANCE.md](./MAINTENANCE.md)
