import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../core/http/api.service';
import { ArticleSummary, DoctorSummary, Specialty } from '../../core/models/models';

@Component({
  selector: 'app-admin',
  template: `
    <section class="section">
      <div class="container">
        <h2>Panel administrativo</h2>
        <p class="muted">Vista de solo lectura de los datos cargados en la plataforma.</p>

        <div class="grid cols-3" style="margin:1.25rem 0 2rem">
          <div class="card pad stat"><span class="n">{{ specialties().length }}</span><span class="l">Especialidades</span></div>
          <div class="card pad stat"><span class="n">{{ doctors().length }}</span><span class="l">Médicos</span></div>
          <div class="card pad stat"><span class="n">{{ articles().length }}</span><span class="l">Artículos</span></div>
        </div>

        <div class="card pad">
          <h3>Médicos registrados</h3>
          <table class="tbl">
            <thead><tr><th>Nombre</th><th>Especialidad</th><th>Sede</th><th>Rating</th></tr></thead>
            <tbody>
              @for (d of doctors(); track d.id) {
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
    .stat .n { font-size: 2rem; font-weight: 800; color: var(--teal-dark); }
    .stat .l { color: var(--muted); }
    .tbl { width: 100%; border-collapse: collapse; margin-top: .5rem; }
    .tbl th, .tbl td { text-align: left; padding: .6rem .4rem; border-bottom: 1px solid var(--line); }
    .tbl th { color: var(--muted); font-size: .85rem; }
  `
})
export class Admin {
  private readonly api = inject(ApiService);
  protected readonly specialties = signal<Specialty[]>([]);
  protected readonly doctors = signal<DoctorSummary[]>([]);
  protected readonly articles = signal<ArticleSummary[]>([]);

  constructor() {
    this.api.get<Specialty[]>('/api/catalog/specialties').subscribe(d => this.specialties.set(d));
    this.api.get<DoctorSummary[]>('/api/providers').subscribe(d => this.doctors.set(d));
    this.api.get<ArticleSummary[]>('/api/content/articles').subscribe(d => this.articles.set(d));
  }
}
