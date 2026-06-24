import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DoctorSummary, Specialty } from '../../core/models/models';
import { ImgFallbackDirective } from '../../shared/img-fallback.directive';
import { SpecialtyIcon } from '../../shared/specialty-icon';
import { STOCK, doctorPhoto, isFemaleName } from '../../shared/stock-images';
import { API_BASE } from '../../core/config';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink, ImgFallbackDirective, SpecialtyIcon],
  template: `
    <!-- HERO -->
    <section class="hero">
      <div class="hero-bg" aria-hidden="true"></div>
      <div class="container hero-grid">
        <div class="hero-copy">
          <span class="eyebrow">Telemedicina y citas médicas</span>
          <h1>Tu salud, más cerca <span class="hl">y a tiempo</span></h1>
          <p class="lead">
            Encuentra especialistas verificados, agenda consultas presenciales o
            virtuales y lleva el control de tu atención médica desde un solo lugar.
          </p>

          <div class="cta-row">
            <a routerLink="/medicos" class="btn btn-primary btn-lg">Ver médicos</a>
            <a routerLink="/especialidades" class="btn btn-ghost btn-lg">Explorar especialidades</a>
          </div>

          <div class="hero-trust">
            <div class="avatars" aria-hidden="true">
              @for (a of heroAvatars; track a) {
                <img [src]="a" alt="" />
              }
            </div>
            <p><strong>+12.000 pacientes</strong> atendidos · <span class="stars">★ 4.9</span> valoración media</p>
          </div>
        </div>

        <div class="hero-visual">
          <img class="hero-img" [src]="stock.hero" fallback="hero" alt="Médica de OMEDICALL" />
          <div class="float-card float-appt">
            <span class="icon-tile sm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            </span>
            <div>
              <strong>Cita confirmada</strong>
              <small class="muted">Hoy 4:30 p. m. · Telemedicina</small>
            </div>
          </div>
          <div class="float-card float-rating">
            <span class="stars">★★★★★</span>
            <small class="muted">Atención excelente, muy puntual.</small>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS -->
    <section class="section-tight">
      <div class="container">
        <div class="stats">
          @for (s of stats; track s.label) {
            <div class="stat">
              <span class="stat-num">{{ s.value }}</span>
              <span class="stat-label">{{ s.label }}</span>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ESPECIALIDADES -->
    <section class="section">
      <div class="container">
        <div class="head-row">
          <div>
            <span class="eyebrow">Áreas médicas</span>
            <h2>Explora por especialidad</h2>
          </div>
          <a routerLink="/especialidades" class="btn btn-ghost">Ver todas</a>
        </div>
        <div class="grid cols-4" style="margin-top:1.75rem">
          @for (s of topSpecialties(); track s.id) {
            <a routerLink="/especialidades" class="card hoverable spec-card">
              <span class="icon-tile"><app-specialty-icon [key]="s.iconKey" /></span>
              <h3>{{ s.name }}</h3>
              <p class="muted">{{ s.description }}</p>
            </a>
          } @empty {
            <p class="muted">Cargando especialidades…</p>
          }
        </div>
      </div>
    </section>

    <!-- CÓMO FUNCIONA -->
    <section class="section how">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Simple y rápido</span>
          <h2>Atención en tres pasos</h2>
          <p class="lead">Sin filas ni llamadas: del síntoma a la consulta en minutos.</p>
        </div>
        <div class="grid cols-3">
          @for (step of steps; track step.n) {
            <div class="step">
              <span class="step-num">{{ step.n }}</span>
              <span class="icon-tile">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  @switch (step.n) {
                    @case (1) { <rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/> }
                    @case (2) { <circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/> }
                    @default { <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M9 16l2 2 4-4"/> }
                  }
                </svg>
              </span>
              <h3>{{ step.title }}</h3>
              <p class="muted">{{ step.text }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- MÉDICOS DESTACADOS -->
    <section class="section">
      <div class="container">
        <div class="head-row">
          <div>
            <span class="eyebrow">Profesionales verificados</span>
            <h2>Médicos destacados</h2>
          </div>
          <a routerLink="/medicos" class="btn btn-ghost">Ver directorio</a>
        </div>
        <div class="grid cols-3" style="margin-top:1.75rem">
          @for (d of featuredDoctors(); track d.id) {
            <div class="card hoverable doc">
              <div class="doc-photo">
                <img [src]="photo(d)" [fallback]="'doc-' + d.id" [alt]="d.fullName" />
                @if (d.isAcceptingPatients) { <span class="doc-flag">Disponible</span> }
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
                  <span class="fee">Consulta desde {{ money(d.consultationFee) }}</span>
                </div>
              </div>
            </div>
          } @empty {
            <p class="muted">Cargando médicos…</p>
          }
        </div>
      </div>
    </section>

    <!-- TELEMEDICINA -->
    <section class="section">
      <div class="container split">
        <div class="split-media">
          <img [src]="stock.telemedicine" fallback="tele" alt="Consulta por telemedicina" />
        </div>
        <div class="split-copy">
          <span class="eyebrow">Telemedicina</span>
          <h2>Consulta desde donde estés</h2>
          <p class="lead">Videoconsultas seguras con tu especialista, fórmula médica digital y seguimiento de tu historia clínica.</p>
          <ul class="checks">
            @for (b of teleBenefits; track b) {
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {{ b }}
              </li>
            }
          </ul>
          <a routerLink="/medicos" class="btn btn-primary btn-lg">Agendar telemedicina</a>
        </div>
      </div>
    </section>

    <!-- TESTIMONIOS -->
    <section class="section testimonials">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Pacientes reales</span>
          <h2>Lo que dicen de OMEDICALL</h2>
        </div>
        <div class="grid cols-3">
          @for (t of testimonials; track t.name) {
            <figure class="card pad quote">
              <span class="stars">★★★★★</span>
              <blockquote>“{{ t.text }}”</blockquote>
              <figcaption>
                <img [src]="t.avatar" alt="" />
                <span><strong>{{ t.name }}</strong><small class="muted">{{ t.city }}</small></span>
              </figcaption>
            </figure>
          }
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section-tight">
      <div class="container">
        <div class="cta-band">
          <div>
            <h2>Agenda tu próxima consulta hoy</h2>
            <p>Crea tu cuenta gratis y encuentra al especialista ideal para ti.</p>
          </div>
          <div class="cta-actions">
            <a routerLink="/medicos" class="btn btn-light btn-lg">Ver médicos</a>
            <a routerLink="/login" class="btn btn-primary btn-lg">Crear cuenta</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    /* HERO */
    .hero { position: relative; overflow: hidden; padding: clamp(2.5rem, 6vw, 5rem) 0; }
    .hero-bg {
      position: absolute; inset: 0; z-index: 0;
      background:
        radial-gradient(60% 80% at 85% 10%, rgba(16,163,160,.16), transparent 60%),
        radial-gradient(50% 60% at 10% 90%, rgba(16,163,160,.10), transparent 60%),
        linear-gradient(180deg, var(--brand-050), var(--bg));
    }
    .hero-grid { position: relative; z-index: 1; display: grid; grid-template-columns: 1.05fr .95fr; gap: 3rem; align-items: center; }
    .hero h1 { margin-bottom: 1rem; }
    .hero h1 .hl { color: var(--brand-700); }
    .hero .lead { margin-bottom: 1.75rem; }

    .search {
      display: flex; align-items: center; gap: .5rem; background: #fff;
      border: 1px solid var(--line); border-radius: 999px; padding: .4rem .4rem .4rem 1rem;
      box-shadow: var(--shadow); max-width: 520px;
    }
    .search-ico { display: grid; place-items: center; color: var(--muted); }
    .search-ico svg { width: 20px; height: 20px; }
    .search-input { flex: 1; border: 0; outline: none; font-size: 1rem; font-family: inherit; color: var(--ink); background: transparent; }
    .search .btn { padding: .7rem 1.4rem; }

    .hero-trust { display: flex; align-items: center; gap: .9rem; margin-top: 1.5rem; }
    .hero-trust p { margin: 0; font-size: .92rem; color: var(--ink-soft); }
    .avatars { display: flex; }
    .avatars img { width: 40px; height: 40px; border-radius: 50%; border: 2px solid #fff; object-fit: cover; margin-left: -10px; box-shadow: var(--shadow-sm); }
    .avatars img:first-child { margin-left: 0; }

    .hero-visual { position: relative; }
    .hero-img { width: 100%; height: 460px; object-fit: cover; border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); }
    .float-card {
      position: absolute; background: #fff; border-radius: 14px; box-shadow: var(--shadow-lg);
      padding: .8rem 1rem; display: flex; align-items: center; gap: .7rem;
    }
    .float-card strong { display: block; font-size: .9rem; }
    .float-card small { font-size: .78rem; }
    .icon-tile.sm { width: 38px; height: 38px; border-radius: 10px; }
    .icon-tile.sm svg { width: 20px; height: 20px; }
    .float-appt { top: 1.5rem; left: -1.25rem; }
    .float-rating { bottom: 1.5rem; right: -1.25rem; flex-direction: column; align-items: flex-start; gap: .2rem; max-width: 190px; }

    /* STATS */
    .stats {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;
      background: #fff; border: 1px solid var(--line); border-radius: var(--radius);
      box-shadow: var(--shadow-sm); padding: 1.75rem 1rem;
    }
    .stat { text-align: center; border-right: 1px solid var(--line); }
    .stat:last-child { border-right: 0; }
    .stat-num { display: block; font-family: 'Lexend', sans-serif; font-size: 2rem; font-weight: 700; color: var(--brand-700); }
    .stat-label { color: var(--muted); font-size: .9rem; }

    /* Cabecera de sección con acción a la derecha */
    .head-row { display: flex; justify-content: space-between; align-items: flex-end; gap: 1rem; }

    /* ESPECIALIDADES */
    .spec-card { display: block; padding: 1.5rem 1.35rem; }
    .spec-card .icon-tile { margin-bottom: .9rem; }
    .spec-card h3 { margin-bottom: .35rem; }
    .spec-card p { font-size: .9rem; margin: 0;
      display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

    /* CÓMO FUNCIONA */
    .how { background: var(--surface-2); }
    .step { text-align: center; padding: 1rem; position: relative; }
    .step .icon-tile { width: 64px; height: 64px; border-radius: 18px; margin: 0 auto 1rem; background: #fff; box-shadow: var(--shadow-sm); }
    .step .icon-tile svg { width: 30px; height: 30px; }
    .step-num {
      position: absolute; top: 0; left: 50%; transform: translateX(34px);
      width: 26px; height: 26px; border-radius: 50%; background: var(--brand); color: #fff;
      font-family: 'Lexend', sans-serif; font-weight: 700; font-size: .85rem;
      display: grid; place-items: center;
    }

    /* MÉDICOS */
    .doc-photo { position: relative; }
    .doc-photo img { width: 100%; height: 230px; object-fit: cover; }
    .doc-flag {
      position: absolute; top: .75rem; left: .75rem; background: rgba(255,255,255,.95);
      color: var(--ok); font-size: .76rem; font-weight: 600; padding: .25rem .6rem; border-radius: 999px;
      box-shadow: var(--shadow-sm);
    }
    .doc-top { display: flex; justify-content: space-between; align-items: center; gap: .5rem; }
    .doc-top h3 { margin: 0; font-size: 1.05rem; }
    .doc-loc { display: flex; align-items: center; gap: .35rem; margin: .6rem 0 1rem; font-size: .9rem; }
    .doc-loc svg { width: 16px; height: 16px; color: var(--muted); flex: none; }
    .doc-meta { display: flex; align-items: center; }
    .doc-meta .fee { font-family: 'Lexend', sans-serif; font-weight: 700; font-size: 1.05rem; }

    .cta-row { display: flex; gap: 1rem; margin-top: 1.25rem; }
    .cta-row .btn { flex: 1; }

    /* SPLIT (telemedicina) */
    .split { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; }
    .split-media img { width: 100%; height: 400px; object-fit: cover; border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); }
    .checks { list-style: none; padding: 0; margin: 1.25rem 0 1.75rem; display: grid; gap: .7rem; }
    .checks li { display: flex; align-items: center; gap: .65rem; font-weight: 500; color: var(--ink-soft); }
    .checks svg { width: 20px; height: 20px; color: #fff; background: var(--brand); border-radius: 50%; padding: 3px; flex: none; }

    /* TESTIMONIOS */
    .testimonials { background: var(--surface-2); }
    .quote { display: flex; flex-direction: column; gap: .75rem; }
    .quote blockquote { margin: 0; font-size: 1rem; color: var(--ink); line-height: 1.6; }
    .quote figcaption { display: flex; align-items: center; gap: .7rem; margin-top: auto; }
    .quote figcaption img { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; }
    .quote figcaption strong { display: block; font-size: .92rem; }
    .quote figcaption small { font-size: .82rem; }

    /* CTA */
    .cta-band {
      display: flex; justify-content: space-between; align-items: center; gap: 2rem; flex-wrap: wrap;
      background: linear-gradient(135deg, var(--brand-700) 0%, var(--brand-800) 100%);
      border-radius: var(--radius-lg); padding: clamp(2rem, 4vw, 3rem); color: #fff;
      box-shadow: var(--shadow-lg);
    }
    .cta-band h2 { color: #fff; margin-bottom: .35rem; }
    .cta-band p { color: rgba(255,255,255,.85); margin: 0; }
    .cta-actions { display: flex; gap: .75rem; flex-wrap: wrap; }

    @media (max-width: 920px) {
      .hero-grid, .split { grid-template-columns: 1fr; }
      .hero-visual { order: -1; }
      .hero-img { height: 320px; }
      .stats { grid-template-columns: repeat(2, 1fr); }
      .stat:nth-child(2) { border-right: 0; }
    }
    @media (max-width: 560px) {
      .stats { grid-template-columns: 1fr 1fr; }
      .stat { border-right: 0; }
      .float-appt { left: 0; } .float-rating { right: 0; }
      .head-row { flex-direction: column; align-items: flex-start; }
    }
  `,
})
export class Landing {
  private readonly http = inject(HttpClient);
  protected readonly stock = STOCK;

  private readonly specialties = signal<Specialty[]>([]);
  private readonly doctors = signal<DoctorSummary[]>([]);

  protected readonly topSpecialties = computed(() => this.specialties().slice(0, 8));
  protected readonly featuredDoctors = computed(() =>
    [...this.doctors()].sort((a, b) => b.ratingAverage - a.ratingAverage).slice(0, 3),
  );

  protected readonly heroAvatars = [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=70',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=70',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=70',
    'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=80&q=70',
  ];

  protected readonly stats = [
    { value: '350+', label: 'Médicos verificados' },
    { value: '24', label: 'Especialidades' },
    { value: '+12 mil', label: 'Pacientes atendidos' },
    { value: '4.9★', label: 'Satisfacción media' },
  ];

  protected readonly steps = [
    { n: 1, title: 'Elige especialidad', text: 'Encuentra el área médica que necesitas en nuestro directorio.' },
    { n: 2, title: 'Encuentra tu médico', text: 'Compara por experiencia, sede, valoraciones y disponibilidad.' },
    { n: 3, title: 'Agenda y atiéndete', text: 'Reserva tu cita presencial o por telemedicina, a tu medida.' },
  ];

  protected readonly teleBenefits = [
    'Videoconsulta segura y cifrada',
    'Fórmula médica y certificados digitales',
    'Historia clínica siempre disponible',
    'Seguimiento posconsulta con tu médico',
  ];

  protected readonly testimonials = [
    { name: 'Laura Gómez', city: 'Bogotá', text: 'Agendé con una dermatóloga el mismo día y me atendió desde casa. Excelente experiencia.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=70' },
    { name: 'Carlos Méndez', city: 'Medellín', text: 'La telemedicina me ahorró el desplazamiento. Recibí mi fórmula al instante.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=70' },
    { name: 'Andrea Ruiz', city: 'Cali', text: 'Encontré pediatra para mi hijo en minutos. La plataforma es clarísima y confiable.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=70' },
  ];

  constructor() {
    this.http.get<Specialty[]>(`${API_BASE}/api/catalog/specialties`)
      .subscribe(d => this.specialties.set(d));
    this.http.get<DoctorSummary[]>(`${API_BASE}/api/providers`)
      .subscribe(d => this.doctors.set(d));
  }

  protected photo(d: DoctorSummary): string {
    return doctorPhoto(d.id, isFemaleName(d.fullName));
  }

  protected money(value: number): string {
    return '$ ' + value.toLocaleString('es-CO');
  }
}
