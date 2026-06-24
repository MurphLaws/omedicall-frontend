import { Component } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { ArticleSummary, DoctorSummary, Specialty } from '../../core/models/models';
import { API_BASE } from '../../core/config';

@Component({
  selector: 'app-admin',
  standalone: true,
  template: `
    <section class="section">
      <div class="container">
        <h2>Panel administrativo</h2>
        <p class="muted">Vista de solo lectura de los datos cargados en la plataforma.</p>

        <div class="grid cols-3" style="margin:1.25rem 0 2rem">
          <div class="card pad stat"><span class="n">{{ specialties.value().length }}</span><span class="l">Especialidades</span></div>
          <div class="card pad stat"><span class="n">{{ doctors.value().length }}</span><span class="l">Médicos</span></div>
          <div class="card pad stat"><span class="n">{{ articles.value().length }}</span><span class="l">Artículos</span></div>
        </div>

        <div class="card pad">
          <h3>Médicos registrados</h3>
          <table class="tbl">
            <thead><tr><th>Nombre</th><th>Especialidad</th><th>Sede</th><th>Rating</th></tr></thead>
            <tbody>
              @for (d of doctors.value(); track d.id) {
                <tr>
                  <td>{{ d.fullName }}</td>
                  <td>{{ d.primarySpecialtyName }}</td>
                  <td>{{ d.locationName }}</td>
                  <td>★ {{ d.ratingAverage.toFixed(1) }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `,
  styles: `
    .stat { display: flex; flex-direction: column; align-items: center; }
    .stat .n { font-size: 2rem; font-weight: 800; color: var(--brand-700); }
    .stat .l { font-size: .9rem; color: var(--muted); }
    .tbl { width: 100%; border-collapse: collapse; }
    .tbl th { text-align: left; padding: .7rem; border-bottom: 2px solid var(--line); font-weight: 600; }
    .tbl td { padding: .7rem; border-bottom: 1px solid var(--line); }
  `
})
export class Admin {
  // Lecturas declarativas con httpResource() (Angular 21).
  protected readonly specialties = httpResource<Specialty[]>(
    () => `${API_BASE}/api/catalog/specialties`, { defaultValue: [] as Specialty[] },
  );
  protected readonly doctors = httpResource<DoctorSummary[]>(
    () => `${API_BASE}/api/providers`, { defaultValue: [] as DoctorSummary[] },
  );
  protected readonly articles = httpResource<ArticleSummary[]>(
    () => `${API_BASE}/api/content/articles`, { defaultValue: [] as ArticleSummary[] },
  );
}
