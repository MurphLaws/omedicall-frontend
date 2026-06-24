import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/landing/landing').then(m => m.Landing) },
  { path: 'login', loadComponent: () => import('./features/auth/login').then(m => m.Login) },
  { path: 'especialidades', loadComponent: () => import('./features/specialties/specialties').then(m => m.Specialties) },
  { path: 'medicos', loadComponent: () => import('./features/providers/providers').then(m => m.Providers) },
  { path: 'sedes', loadComponent: () => import('./features/locations/locations').then(m => m.Locations) },
  { path: 'ayuda', loadComponent: () => import('./features/help/help').then(m => m.Help) },
  { path: 'blog', loadComponent: () => import('./features/blog/blog-list').then(m => m.BlogList) },
  { path: 'blog/:slug', loadComponent: () => import('./features/blog/blog-detail').then(m => m.BlogDetail) },
  { path: 'dashboard', canActivate: [authGuard], loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard) },
  { path: 'admin', canActivate: [authGuard], loadComponent: () => import('./features/admin/admin').then(m => m.Admin) },

  // ── Sprint 1 (ejercicio Jornada 2) — rutas RESERVADAS para el participante ──
  // { path: 'registro', ... }            // CU-01 Registro de paciente
  // { path: 'medicos/registro', ... }    // CU-02 Registro de médico
  // { path: 'perfil-salud', ... }        // CU-03 Perfil de salud del paciente
  // (CU-04 búsqueda con filtros y CU-07 perfil completo del médico van sobre /medicos)

  { path: '**', redirectTo: '' }
];
