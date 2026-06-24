import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStore } from '../../core/auth/auth.store';
import { ImgFallbackDirective } from '../../shared/img-fallback.directive';
import { STOCK } from '../../shared/stock-images';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ImgFallbackDirective],
  template: `
    <div class="login-container">
      <div class="login-visual">
        <img [src]="stock.clinic" fallback="clinic" alt="Clínica OMEDICALL" />
        <div class="visual-overlay">
          <div class="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>
          <h2>OMEDICALL</h2>
          <p>Tu salud, más cerca y a tiempo.</p>
        </div>
      </div>

      <div class="login-form-wrapper">
        <div class="login-form">
          <h1>Ingresar</h1>
          <p class="lead">Accede con tu cuenta de OMEDICALL.</p>

          <form (ngSubmit)="submit()">
            <div class="field">
              <label for="email">Correo electrónico</label>
              <input
                id="email"
                class="input"
                type="email"
                placeholder="correo@omedicall.test"
                [(ngModel)]="email"
                name="email"
                required
                [disabled]="store.loading()"
              />
            </div>

            <div class="field">
              <label for="password">Contraseña</label>
              <input
                id="password"
                class="input"
                type="password"
                placeholder="••••••••"
                [(ngModel)]="password"
                name="password"
                required
                [disabled]="store.loading()"
              />
            </div>

            @if (store.error()) {
              <div class="error-box">{{ store.error() }}</div>
            }

            <button class="btn btn-primary btn-lg" type="submit" [disabled]="store.loading()">
              @if (store.loading()) { Ingresando… } @else { Ingresar }
            </button>
          </form>

          <div class="demo-section">
            <h3>Cuentas de demostración</h3>
            <p class="muted">Contraseña: <code>Demo1234!</code></p>
            <div class="chips">
              <div class="chip" (click)="fillEmail('juan.perez@omedicall.test')">
                <span class="chip-label">juan.perez</span>
                <span class="chip-role">paciente</span>
              </div>
              <div class="chip" (click)="fillEmail('dra.morales@omedicall.test')">
                <span class="chip-label">dra.morales</span>
                <span class="chip-role">médica</span>
              </div>
              <div class="chip" (click)="fillEmail('admin@omedicall.test')">
                <span class="chip-label">admin</span>
                <span class="chip-role">admin</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .login-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      height: 100vh;
      background: #fff;
    }

    .login-visual {
      position: relative;
      overflow: hidden;
      background: linear-gradient(135deg, var(--brand-700) 0%, var(--brand-800) 100%);
    }
    .login-visual img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.4;
    }
    .visual-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      background: linear-gradient(180deg, rgba(10, 113, 111, 0.7) 0%, rgba(7, 88, 86, 0.8) 100%);
      color: #fff;
      text-align: center;
      padding: 2rem;
    }
    .brand-mark {
      display: grid;
      place-items: center;
      width: 56px;
      height: 56px;
      background: rgba(255,255,255,0.2);
      border: 1px solid rgba(255,255,255,0.3);
      border-radius: 16px;
      backdrop-filter: blur(10px);
    }
    .brand-mark svg { width: 28px; height: 28px; }
    .visual-overlay h2 { font-size: 2rem; margin: 0; font-weight: 800; letter-spacing: -0.02em; }
    .visual-overlay p { font-size: 1.1rem; margin: 0; opacity: 0.9; }

    .login-form-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      background: var(--bg);
    }
    .login-form {
      width: 100%;
      max-width: 420px;
    }
    .login-form h1 {
      font-size: 1.75rem;
      margin-bottom: 0.5rem;
      color: var(--ink);
    }
    .login-form .lead {
      color: var(--muted);
      margin-bottom: 1.75rem;
      font-size: 0.95rem;
    }

    .field {
      margin-bottom: 1.25rem;
    }
    .field label {
      display: block;
      font-weight: 600;
      margin-bottom: 0.4rem;
      font-size: 0.9rem;
      color: var(--ink);
    }
    .input {
      width: 100%;
      padding: 0.75rem 0.9rem;
      border: 1px solid var(--line-strong);
      border-radius: var(--radius-sm);
      font-size: 1rem;
      font-family: inherit;
      background: #fff;
      color: var(--ink);
      transition: border-color 0.15s, box-shadow 0.15s;
    }
    .input:focus {
      outline: none;
      border-color: var(--brand);
      box-shadow: 0 0 0 3px var(--brand-050);
    }
    .input:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .error-box {
      background: #fef2f2;
      border: 1px solid #fecaca;
      color: #991b1b;
      padding: 0.75rem 0.9rem;
      border-radius: 8px;
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }

    .btn {
      width: 100%;
      margin-bottom: 1.5rem;
    }

    .demo-section {
      padding-top: 1.5rem;
      border-top: 1px solid var(--line);
    }
    .demo-section h3 {
      font-size: 0.9rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: var(--ink);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .demo-section .muted {
      font-size: 0.82rem;
      margin-bottom: 0.75rem;
    }
    code {
      background: var(--surface-2);
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-family: 'Monaco', monospace;
      font-size: 0.85em;
    }

    .chips {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .chip {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.75rem;
      padding: 0.65rem 0.9rem;
      background: var(--surface-2);
      border: 1px solid var(--line);
      border-radius: 999px;
      cursor: pointer;
      transition: all 0.15s;
    }
    .chip:hover {
      background: #e0f2f1;
      border-color: var(--brand);
      transform: translateX(3px);
    }
    .chip-label {
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--ink);
    }
    .chip-role {
      font-size: 0.75rem;
      background: rgba(10, 163, 160, 0.1);
      color: var(--brand-700);
      padding: 0.15rem 0.45rem;
      border-radius: 999px;
      font-weight: 600;
    }

    @media (max-width: 820px) {
      .login-container { grid-template-columns: 1fr; }
      .login-visual { display: none; }
      .login-form-wrapper { padding: 1.5rem; }
    }
  `
})
export class Login {
  protected readonly store = inject(AuthStore);
  protected readonly router = inject(Router);
  protected readonly stock = STOCK;

  protected email = '';
  protected password = '';

  protected async submit() {
    try {
      await this.store.login(this.email, this.password);
      this.router.navigate(['/dashboard']);
    } catch {
      // error manejado por store.error()
    }
  }

  protected fillEmail(email: string) {
    this.email = email;
    this.password = 'Demo1234!';
  }
}
