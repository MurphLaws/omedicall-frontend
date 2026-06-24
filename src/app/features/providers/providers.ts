import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../core/http/api.service';
import { DoctorSummary } from '../../core/models/models';
import { ImgFallbackDirective } from '../../shared/img-fallback.directive';

@Component({
  selector: 'app-providers',
  imports: [ImgFallbackDirective],
  template: `
    <section class="section">
      <div class="container">
        <h2>Médicos</h2>
        <p class="muted">Directorio de profesionales. (La búsqueda por filtros y el perfil completo llegan pronto.)</p>

        <div class="grid cols-3" style="margin-top:1.5rem">
          @for (d of items(); track d.id) {
            <div class="card doc">
              <img class="photo" [src]="d.photoUrl" [fallback]="'doctor-' + d.id" [alt]="d.fullName" />
              <div class="pad">
                <div class="row">
                  <h3>{{ d.fullName }}</h3>
                  <span class="rating">★ {{ d.ratingAverage.toFixed(1) }}</span>
                </div>
                <span class="badge">{{ d.primarySpecialtyName }}</span>
                <p class="muted loc">{{ d.locationName }}</p>
                <div class="foot">
                  <span class="fee">{{ money(d.consultationFee) }}</span>
                  @if (d.isAcceptingPatients) {
                    <span class="open">Acepta pacientes</span>
                  } @else {
                    <span class="closed">Sin cupos</span>
                  }
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
    .doc .photo { width: 100%; height: 200px; object-fit: cover; }
    .doc .row { display: flex; justify-content: space-between; align-items: center; }
    .doc .rating { color: var(--warn); font-weight: 700; }
    .doc .loc { margin: .4rem 0 .6rem; }
    .doc .foot { display: flex; justify-content: space-between; align-items: center; }
    .doc .fee { font-weight: 700; }
    .open { color: var(--teal-dark); font-size: .82rem; font-weight: 600; }
    .closed { color: var(--muted); font-size: .82rem; }
  `
})
export class Providers {
  private readonly api = inject(ApiService);
  protected readonly items = signal<DoctorSummary[]>([]);

  constructor() {
    this.api.get<DoctorSummary[]>('/api/providers').subscribe(d => this.items.set(d));
  }

  money(value: number): string {
    return '$ ' + value.toLocaleString('es-CO');
  }
}
