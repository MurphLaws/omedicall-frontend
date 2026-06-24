import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="page-head">
      <div class="container">
        <span class="eyebrow">Centro de ayuda</span>
        <h1>Preguntas frecuentes</h1>
        <p class="lead">Encuentra respuestas a las preguntas más comunes sobre OMEDICALL.</p>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="faq-list">
          @for (item of faqs(); track item.id) {
            <div class="faq-item">
              <button class="faq-header" [class.open]="openId() === item.id" (click)="toggleItem(item.id)">
                <span class="faq-question">{{ item.question }}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              @if (openId() === item.id) {
                <div class="faq-answer">
                  {{ item.answer }}
                </div>
              }
            </div>
          }
        </div>
      </div>
    </section>

    <section class="section contact-cta">
      <div class="container">
        <div class="contact-box">
          <h2>¿No encontraste la respuesta?</h2>
          <p>Nuestro equipo de soporte está disponible 24/7 para ayudarte.</p>
          <div class="contact-info">
            <div class="contact-item">
              <strong>Teléfono</strong>
              <a href="tel:018000123456">01 8000 123 456</a>
              <small class="muted">Lun a Dom · 24 horas</small>
            </div>
            <div class="contact-item">
              <strong>Email</strong>
              <a href="mailto:soporte@omedicall.co">soporte&#64;omedicall.co</a>
              <small class="muted">Respuesta en máx 2 horas</small>
            </div>
            <div class="contact-item">
              <strong>Chat en vivo</strong>
              <p>Disponible en la app de lunes a sábado, 8 a 20 horas</p>
            </div>
          </div>
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

    .faq-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      max-width: 700px;
      margin: 0 auto;
    }

    .faq-item {
      background: #fff;
      border: 1px solid var(--line);
      border-radius: var(--radius);
      overflow: hidden;
      box-shadow: var(--shadow-sm);
    }

    .faq-header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1.5rem;
      padding: 1.1rem 1.25rem;
      background: transparent;
      border: 0;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
      color: var(--ink);
      transition: background 0.15s, color 0.15s;
      text-align: left;
    }

    .faq-header:hover {
      background: var(--surface-2);
    }

    .faq-header.open {
      color: var(--brand-700);
      background: var(--brand-050);
    }

    .faq-question { flex: 1; }

    .faq-header svg {
      width: 20px;
      height: 20px;
      flex: none;
      color: var(--muted);
      transition: transform 0.2s;
    }

    .faq-header.open svg {
      transform: rotate(180deg);
      color: var(--brand-700);
    }

    .faq-answer {
      padding: 1.1rem 1.25rem;
      border-top: 1px solid var(--line);
      background: var(--bg);
      line-height: 1.7;
      color: var(--ink-soft);
      font-size: 0.95rem;
      animation: slideDown 0.2s ease;
    }

    @keyframes slideDown {
      from { opacity: 0; max-height: 0; }
      to { opacity: 1; max-height: 500px; }
    }

    .contact-cta {
      background: var(--surface-2);
    }

    .contact-box {
      max-width: 700px;
      margin: 0 auto;
      text-align: center;
    }

    .contact-box h2 { margin-bottom: 0.5rem; }
    .contact-box .lead { margin: 0.75rem auto 1.75rem; }

    .contact-info {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-top: 1.75rem;
      text-align: left;
    }

    .contact-item {
      padding: 1.25rem;
      background: #fff;
      border: 1px solid var(--line);
      border-radius: var(--radius);
      box-shadow: var(--shadow-sm);
    }

    .contact-item strong {
      display: block;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--muted);
      margin-bottom: 0.5rem;
    }

    .contact-item a {
      display: block;
      font-weight: 600;
      font-size: 1.05rem;
      margin-bottom: 0.35rem;
    }

    .contact-item small {
      display: block;
      font-size: 0.8rem;
      margin-top: 0.3rem;
    }

    .contact-item p {
      margin: 0;
      font-size: 0.92rem;
      color: var(--ink-soft);
    }

    @media (max-width: 560px) {
      .contact-info { grid-template-columns: 1fr; }
    }
  `
})
export class Help {
  protected openId = signal<string | null>(null);

  protected readonly faqs = signal<FaqItem[]>([
    {
      id: 'q1',
      question: '¿Cómo me registro en OMEDICALL?',
      answer: 'Puedes acceder como paciente con tus credenciales. Si aún no tienes cuenta, dirígete a la pantalla de registro y completa tus datos básicos. Solo necesitamos tu correo, nombre completo y una contraseña segura.'
    },
    {
      id: 'q2',
      question: '¿Puedo cambiar mi médico o especialista?',
      answer: 'Sí, puedes cambiar de médico en cualquier momento desde tu panel de citas. Simplemente cancela tu cita actual y agenda con otro especialista. No hay penalización por cambiar.'
    },
    {
      id: 'q3',
      question: '¿Cómo funciona la telemedicina?',
      answer: 'Al agendar una consulta de telemedicina, recibirás un enlace a una videollamada segura. El médico se conectará a la hora programada. Asegúrate de tener una conexión estable a internet y una cámara funcionando.'
    },
    {
      id: 'q4',
      question: '¿Mis datos médicos son seguros?',
      answer: 'Sí. OMEDICALL cumple con todas las normativas de protección de datos personales y salud (Ley 1581 de Habeas Data en Colombia). Tus registros médicos están cifrados y solo tu médico puede acceder a ellos.'
    },
    {
      id: 'q5',
      question: '¿Qué métodos de pago acepta OMEDICALL?',
      answer: 'Aceptamos tarjetas de crédito y débito, transferencias bancarias, y billetera digital. Los pagos se procesan de forma segura a través de plataformas certificadas.'
    },
    {
      id: 'q6',
      question: '¿Puedo solicitar reembolso si cancelo una cita?',
      answer: 'Sí. Si cancelas con al menos 24 horas de anticipación, recibirás el reembolso completo. Si cancelas menos de 24 horas antes, se descontará un 20% por gastos administrativos.'
    }
  ]);

  protected toggleItem(id: string) {
    this.openId.set(this.openId() === id ? null : id);
  }
}
