import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { API_BASE } from '../../core/config';
import { ImgFallbackDirective } from '../../shared/img-fallback.directive';

interface Location {
  id: string;
  name: string;
  address?: string;
  city?: string;
  phone?: string;
  isVirtual: boolean;
}

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [CommonModule, ImgFallbackDirective],
  template: `
    <section class="page-head">
      <div class="container">
        <span class="eyebrow">Sedes de atención</span>
        <h1>Nuestras ubicaciones</h1>
        <p class="lead">Visítanos en cualquiera de nuestras sedes o agenda una consulta por telemedicina.</p>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="grid cols-2">
          @for (loc of locations(); track loc.id) {
            <div class="card location-card">
              <div class="location-header">
                <h3>{{ loc.name }}</h3>
                @if (loc.isVirtual) {
                  <span class="badge">Virtual</span>
                } @else {
                  <span class="badge presencial">Presencial</span>
                }
              </div>

              <div class="location-details">
                @if (loc.address) {
                  <div class="detail">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{{ loc.address }} @if (loc.city) { · {{ loc.city }} }</span>
                  </div>
                }

                @if (loc.phone) {
                  <div class="detail">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
                    </svg>
                    <a [href]="'tel:' + loc.phone">{{ loc.phone }}</a>
                  </div>
                }
              </div>

              @if (loc.isVirtual) {
                <button class="btn btn-primary btn-block">Agendar telemedicina</button>
              } @else {
                <div class="location-actions">
                  <button class="btn btn-primary">Agendar cita</button>
                  <button class="btn btn-ghost">Cómo llegar</button>
                </div>
              }
            </div>
          } @empty {
            <p class="muted">Cargando sedes…</p>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .page-head {
      background: linear-gradient(180deg, var(--brand-050), var(--bg));
      padding: clamp(2.5rem, 5vw, 4rem) 0 2.5rem;
    }
    .page-head .lead { margin-top: 0.5rem; }

    .location-card {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1.5rem 1.4rem;
    }

    .location-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
    }
    .location-header h3 { margin: 0; font-size: 1.2rem; }
    .badge.presencial { background: #fef3c7; color: #b45309; }

    .location-details {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      flex: 1;
    }
    .detail {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      color: var(--muted);
      font-size: 0.92rem;
    }
    .detail svg {
      width: 18px;
      height: 18px;
      color: var(--brand-700);
      flex: none;
      margin-top: 2px;
    }
    .detail a { color: var(--brand-700); text-decoration: none; }
    .detail a:hover { text-decoration: underline; }

    .location-actions {
      display: flex;
      gap: 0.75rem;
    }
    .location-actions .btn { flex: 1; }
    .btn-block { width: 100%; }

    @media (max-width: 560px) {
      .grid { grid-template-columns: 1fr; }
    }
  `
})
export class Locations {
  private readonly http = inject(HttpClient);
  protected readonly locations = signal<Location[]>([]);

  constructor() {
    this.http.get<Location[]>(`${API_BASE}/api/catalog/locations`)
      .subscribe(locs => this.locations.set(locs));
  }
}
