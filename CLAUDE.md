# OMEDICALL Frontend — Angular 21 zoneless + SignalStore

Sandbox de **entrenamiento** para Sesión 3 "Claude Code para Developers" (Innovaitors).

## Stack (Angular 21)

- **Angular 21** · **zoneless** (`provideZonelessChangeDetection()`) · **standalone everywhere**
- **Signals-first** con `signal()`, `computed()`, `.asReadonly()`
- **Control flow nativo** — `@if/@for/@switch/@defer` (NUNCA `*ngIf/*ngFor/*ngSwitch`)
- **Data fetching con `HttpClient`** directo (subscriptions finales en templates y constructores)
- **NgRx SignalStore** (`@ngrx/signals`) para AuthStore — estado global de autenticación
- **Vitest** como test runner (no Karma/Jasmine)
- Rutas con lazy `loadComponent`; JWT via `auth.interceptor.ts` (excluye `/api/auth/login`)
- Imágenes de stock verificadas (Unsplash) + fallback automático a clínica neutral

## Estructura

- `src/app/core/` — auth (store, guard, interceptor), http (removed), models, config
- `src/app/features/` — landing, auth/login, dashboard, specialties, providers, locations, help, blog (list+detail), admin
- `src/app/shared/` — specialty-icon.ts, stock-images.ts, img-fallback.directive.ts
- `src/styles.scss` — paleta médica (teal/navy), Lexend + Inter, sombras por capas

## Patrón a seguir

Componentes `standalone` con `template` inline, `HttpClient` en constructor,
`signal()` para estado local, `@if/@for/@switch/@defer` nativo.
**NO** `.subscribe()` anidados; termina en el template o en el constructor/método.
**NO** `effect()` para sincronización (usa `computed()`).

## ⚠️ Features RESERVADAS del Sprint 1 (NO implementadas)

| CU | Feature | Estado |
|---|---|---|
| CU-01 | Registro de paciente | ❌ |
| CU-02 | Registro de médico | ❌ |
| CU-03 | Perfil de salud del paciente | ❌ |
| CU-04 | Búsqueda por filtros | ❌ |
| CU-07 | Perfil completo del médico | ❌ |
| — | Agendamiento de citas | ❌ |

**Módulos nuevos, completos, independientes de las reservadas:**
- ✅ **Sedes** (`/sedes`) — lista de ubicaciones con telemedicina
- ✅ **Centro de Ayuda/FAQ** (`/ayuda`) — acordeón de preguntas frecuentes + contacto

✅ Existe: landing, login, especialidades, médicos (listado básico), blog, dashboard, admin.

## Cómo correr

```bash
npm install --legacy-peer-deps
npm start          # ng serve → http://localhost:4200
npm test           # vitest (runner)
npm run build      # producción
```

**Credenciales demo:**
- `juan.perez@omedicall.test` / `Demo1234!` — paciente
- `dra.morales@omedicall.test` / `Demo1234!` — médica
- `admin@omedicall.test` / `Demo1234!` — admin

## Convenciones

- Español neutro en textos visibles; sin voseo
- `CommonModule` importado en cada componente que use `@for/@if/@switch`
- HTTP calls via `HttpClient`, inyectado en constructor
- Auth via `AuthStore` (SignalStore), inyectado donde sea necesario
- Tipado fuerte en signals: `signal<T>(initialValue)`
