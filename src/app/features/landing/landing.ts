import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImgFallbackDirective } from '../../shared/img-fallback.directive';
import { STOCK } from '../../shared/stock-images';

@Component({
  selector: 'app-landing',
  imports: [RouterLink, ImgFallbackDirective],
  template: `
    <section class="hero">
      <div class="container hero-grid">
        <div class="hero-copy">
          <span class="badge">Telemedicina y citas médicas</span>
          <h1>Tu salud, más cerca y a tiempo</h1>
          <p class="muted">
            Encuentra especialistas, agenda consultas presenciales o virtuales y lleva el
            control de tu atención médica desde un solo lugar.
          </p>
          <div class="cta">
            <a routerLink="/medicos" class="btn btn-primary">Ver médicos</a>
            <a routerLink="/especialidades" class="btn btn-ghost">Explorar especialidades</a>
          </div>
        </div>
        <img class="hero-img" [src]="stock.hero" fallback="hero-medical" alt="Equipo médico" />
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2 class="center">¿Cómo funciona?</h2>
        <div class="grid cols-3" style="margin-top:1.5rem">
          <div class="card pad">
            <h3>1. Elige especialidad</h3>
            <p class="muted">Revisa el directorio de especialidades y encuentra la atención que necesitas.</p>
          </div>
          <div class="card pad">
            <h3>2. Encuentra tu médico</h3>
            <p class="muted">Compara médicos por experiencia, sede y valoraciones.</p>
          </div>
          <div class="card pad">
            <h3>3. Agenda y atiéndete</h3>
            <p class="muted">Reserva tu cita presencial o por telemedicina, según tu preferencia.</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .hero { background: linear-gradient(180deg, #e9f6f6, #f4f7f9); padding: 3rem 0; }
    .hero-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: 2rem; align-items: center; }
    .hero h1 { font-size: 2.4rem; }
    .cta { display: flex; gap: .75rem; margin-top: 1.25rem; }
    .hero-img { width: 100%; height: 340px; object-fit: cover; border-radius: 18px; box-shadow: var(--shadow); }
    @media (max-width: 820px) { .hero-grid { grid-template-columns: 1fr; } .hero-img { height: 220px; } }
  `
})
export class Landing {
  protected readonly stock = STOCK;
}
