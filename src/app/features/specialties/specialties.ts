import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { httpResource } from '@angular/common/http';
import { Specialty } from '../../core/models/models';
import { SpecialtyIcon } from '../../shared/specialty-icon';
import { API_BASE } from '../../core/config';

@Component({
  selector: 'app-specialties',
  standalone: true,
  imports: [RouterLink, SpecialtyIcon],
  template: `
    <section class="page-head">
      <div class="container">
        <span class="eyebrow">Áreas médicas</span>
        <h1>Especialidades</h1>
        <p class="lead">Explora las áreas médicas disponibles en OMEDICALL y encuentra la atención que necesitas.</p>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="grid cols-3">
          @for (s of specialties.value(); track s.id) {
            <a routerLink="/medicos" class="card hoverable spec">
              <span class="icon-tile"><app-specialty-icon [key]="s.iconKey" /></span>
              <div>
                <h3>{{ s.name }}</h3>
                <p class="muted">{{ s.description }}</p>
                <span class="spec-link">Ver médicos
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </span>
              </div>
            </a>
          } @empty {
            <p class="muted">Cargando especialidades…</p>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .page-head { background: linear-gradient(180deg, var(--brand-050), var(--bg)); padding: clamp(2.5rem, 5vw, 4rem) 0 2.5rem; }
    .page-head .lead { margin-top: .5rem; }

    .spec { display: flex; gap: 1rem; align-items: flex-start; padding: 1.5rem 1.4rem; }
    .spec .icon-tile { flex: none; }
    .spec h3 { margin-bottom: .35rem; }
    .spec p { font-size: .92rem; margin: 0 0 .75rem; }
    .spec-link {
      display: inline-flex; align-items: center; gap: .35rem;
      font-family: 'Lexend', sans-serif; font-weight: 600; font-size: .88rem; color: var(--brand-700);
    }
    .spec-link svg { width: 16px; height: 16px; transition: transform .16s; }
    .spec:hover .spec-link svg { transform: translateX(3px); }
  `,
})
export class Specialties {
  // Data fetching declarativo con httpResource() (Angular 21).
  protected readonly specialties = httpResource<Specialty[]>(
    () => `${API_BASE}/api/catalog/specialties`, { defaultValue: [] as Specialty[] },
  );
}
