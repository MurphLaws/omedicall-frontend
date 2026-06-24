import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ArticleSummary, DoctorSummary, Specialty } from '../../core/models/models';
import { API_BASE } from '../../core/config';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
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
    .stat .n { font-size: 2rem; font-weight: 800; color: var(--brand-700); }
    .stat .l { font-size: .9rem; color: var(--muted); }
    .tbl { width: 100%; border-collapse: collapse; }
    .tbl th { text-align: left; padding: .7rem; border-bottom: 2px solid var(--line); font-weight: 600; }
    .tbl td { padding: .7rem; border-bottom: 1px solid var(--line); }
  `
})
export class Admin {
  private readonly http = inject(HttpClient);
  protected readonly specialties = signal<Specialty[]>([]);
  protected readonly doctors = signal<DoctorSummary[]>([]);
  protected readonly articles = signal<ArticleSummary[]>([]);

  constructor() {
    this.http.get<Specialty[]>(`${API_BASE}/api/catalog/specialties`)
      .subscribe(d => this.specialties.set(d));
    this.http.get<DoctorSummary[]>(`${API_BASE}/api/providers`)
      .subscribe(d => this.doctors.set(d));
    this.http.get<ArticleSummary[]>(`${API_BASE}/api/content/articles`)
      .subscribe(d => this.articles.set(d));
  }
}
