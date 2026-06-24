import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../core/http/api.service';
import { Specialty } from '../../core/models/models';

const ICONS: Record<string, string> = {
  heart: '❤️', baby: '👶', brain: '🧠', skin: '🧴', stethoscope: '🩺',
  female: '🌸', nerve: '⚡', bone: '🦴', apple: '🍎', eye: '👁️',
};

@Component({
  selector: 'app-specialties',
  template: `
    <section class="section">
      <div class="container">
        <h2>Especialidades</h2>
        <p class="muted">Explora las áreas médicas disponibles en OMEDICALL.</p>

        <div class="grid cols-3" style="margin-top:1.5rem">
          @for (s of items(); track s.id) {
            <div class="card pad spec">
              <div class="icon">{{ icon(s.iconKey) }}</div>
              <h3>{{ s.name }}</h3>
              <p class="muted">{{ s.description }}</p>
            </div>
          } @empty {
            <p class="muted">Cargando especialidades…</p>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .spec .icon { font-size: 1.8rem; }
    .spec h3 { margin-top: .4rem; }
  `
})
export class Specialties {
  private readonly api = inject(ApiService);
  protected readonly items = signal<Specialty[]>([]);

  constructor() {
    this.api.get<Specialty[]>('/api/catalog/specialties').subscribe(d => this.items.set(d));
  }

  icon(key: string): string {
    return ICONS[key] ?? '🩺';
  }
}
