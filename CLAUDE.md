# OMEDICALL Frontend — guía para Claude Code

Sandbox de **entrenamiento**: la app web de OMEDICALL (telemedicina). Está deliberadamente
**incompleta**: las pantallas del Sprint 1 son el ejercicio del participante.

## Stack
- **Angular 20** · standalone components (sin NgModules) · **signals** para el estado (sin `BehaviorSubject`)
- Rutas con lazy `loadComponent` en `src/app/app.routes.ts`
- HTTP al gateway (`http://localhost:5000`) vía `core/http/api.service.ts`; el JWT lo adjunta `core/auth/auth.interceptor.ts`
- Imágenes de stock por URL (Unsplash) con fallback automático a `picsum` mediante la directiva `img[fallback]`

## Estructura
- `core/` — `auth/` (servicio con signals, guard, interceptor), `http/` (api.service), `models/`, `config.ts`
- `features/` — `landing`, `auth/login`, `dashboard`, `specialties`, `providers`, `blog` (list + detail), `admin`
- `shared/` — `img-fallback.directive.ts`, `stock-images.ts`

## Patrón a seguir
Componentes standalone con `template`/`styles` inline o archivos `.html`/`.scss`. Estado con
`signal()` + `computed()` + `.asReadonly()`. Datos vía `ApiService` (`get`/`post`). Estilos:
reusa las clases globales de `src/styles.scss` (`.card`, `.btn`, `.grid`, `.badge`, `.input`).

## ⚠️ Límites del Sprint 1 — NO IMPLEMENTAR (es el ejercicio de la Jornada 2)
| CU | Pantalla | Estado |
|---|---|---|
| CU-01 | Registro de paciente | ❌ no existe (ruta comentada en `app.routes.ts`) |
| CU-02 | Registro de médico | ❌ no existe |
| CU-03 | Perfil de salud del paciente | ❌ no existe |
| CU-04 | Búsqueda de médicos por filtros | ❌ `/medicos` solo lista, sin filtros |
| CU-07 | Perfil completo del médico | ❌ no existe el detalle `/medicos/:id` |

✅ Sí existe: landing, login, panel (dashboard) con notificaciones, listado de especialidades,
**listado básico** de médicos, blog (lista + detalle), panel admin de solo lectura.

## Cómo correr
`npm ci && npm start` → `http://localhost:4200` (requiere el backend en `http://localhost:5000`).
Build de producción: `npm run build`.

## Convenciones
- Español neutro en textos visibles. Sin emojis en el código (los emojis de iconos de especialidad
  son datos de UI, está bien).
- No romper el patrón signals-first ni introducir NgModules.
