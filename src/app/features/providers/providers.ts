import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DoctorSummary } from '../../core/models/models';
import { ImgFallbackDirective } from '../../shared/img-fallback.directive';
import { doctorPhoto, isFemaleName } from '../../shared/stock-images';
import { API_BASE } from '../../core/config';

@Component({
  selector: 'app-providers',
  standalone: true,
  imports: [CommonModule, ImgFallbackDirective],
  template: `
    <section class="page-head">
      <div class="container">
        <span class="eyebrow">Directorio médico</span>
        <h1>Encuentra a tu especialista</h1>
        <p class="lead">{{ items().length }} profesionales verificados, listos para atenderte presencial o por telemedicina.</p>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="grid cols-3">
          @for (d of items(); track d.id) {
            <div class="card hoverable doc">
              <div class="doc-photo">
                <img [src]="photo(d)" [fallback]="'doc-' + d.id" [alt]="d.fullName" />
                @if (d.isAcceptingPatients) {
                  <span class="doc-flag ok">Acepta pacientes</span>
                } @else {
                  <span class="doc-flag off">Sin cupos</span>
                }
              </div>
              <div class="pad">
                <div class="doc-top">
                  <h3>{{ d.fullName }}</h3>
                  <span class="stars">★ {{ d.ratingAverage.toFixed(1) }}</span>
                </div>
                <span class="badge">{{ d.primarySpecialtyName }}</span>
                <p class="muted doc-loc">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                  {{ d.locationName }}
                </p>
                <div class="doc-meta">
                  <span class="fee-wrap"><small class="muted">Consulta desde</small><span class="fee">{{ money(d.consultationFee) }}</span></span>
                </div>
              </div>
            </div>
          } @empty {
            <p class="muted">Cargando médicos…</p>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .page-head { background: linear-gradient(180deg, var(--brand-050), var(--bg)); padding: clamp(2.5rem, 5vw, 4rem) 0 2.5rem; }
    .page-head .lead { margin-top: .5rem; }

    .doc-photo { position: relative; }
    .doc-photo img { width: 100%; height: 240px; object-fit: cover; }
    .doc-flag {
      position: absolute; top: .75rem; left: .75rem; font-size: .76rem; font-weight: 600;
      padding: .25rem .65rem; border-radius: 999px; background: rgba(255,255,255,.95); box-shadow: var(--shadow-sm);
    }
    .doc-flag.ok { color: var(--ok); }
    .doc-flag.off { color: var(--muted); }
    .doc-top { display: flex; justify-content: space-between; align-items: center; gap: .5rem; }
    .doc-top h3 { margin: 0; font-size: 1.08rem; }
    .doc-loc { display: flex; align-items: center; gap: .35rem; margin: .65rem 0 1rem; font-size: .9rem; }
    .doc-loc svg { width: 16px; height: 16px; color: var(--muted); flex: none; }
    .doc-meta { display: flex; align-items: center; }
    .fee-wrap { display: flex; flex-direction: column; }
    .fee-wrap small { font-size: .72rem; }
    .doc-meta .fee { font-family: 'Lexend', sans-serif; font-weight: 700; font-size: 1.1rem; }
  `,
})
export class Providers {
  private readonly http = inject(HttpClient);
  protected readonly items = signal<DoctorSummary[]>([]);

  constructor() {
    this.http.get<DoctorSummary[]>(`${API_BASE}/api/providers`)
      .subscribe(d => this.items.set(d));
  }

  protected photo(d: DoctorSummary): string {
    return doctorPhoto(d.id, isFemaleName(d.fullName));
  }

  protected money(value: number): string {
    return '$ ' + value.toLocaleString('es-CO');
  }
}
