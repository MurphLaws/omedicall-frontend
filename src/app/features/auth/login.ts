import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  template: `
    <section class="section">
      <div class="container narrow">
        <div class="card pad">
          <h2>Ingresar</h2>
          <p class="muted">Accede con tu cuenta de OMEDICALL.</p>

          <form (ngSubmit)="submit()">
            <div class="field">
              <label for="email">Correo</label>
              <input id="email" class="input" type="email" name="email" [(ngModel)]="email" required />
            </div>
            <div class="field">
              <label for="password">Contraseña</label>
              <input id="password" class="input" type="password" name="password" [(ngModel)]="password" required />
            </div>

            @if (error()) { <p class="error">{{ error() }}</p> }

            <button class="btn btn-primary" type="submit" [disabled]="loading()">
              {{ loading() ? 'Ingresando…' : 'Ingresar' }}
            </button>
          </form>

          <div class="demo">
            <strong>Cuentas demo</strong> (contraseña <code>Demo1234!</code>):
            <ul>
              <li>juan.perez&#64;omedicall.test — paciente</li>
              <li>dra.morales&#64;omedicall.test — médico</li>
              <li>admin&#64;omedicall.test — admin</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .narrow { max-width: 460px; }
    .demo { margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid var(--line); font-size: .9rem; color: var(--muted); }
    .demo ul { margin: .4rem 0 0; padding-left: 1.1rem; }
    code { background: #eef3f5; padding: .1rem .35rem; border-radius: 6px; }
  `
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected email = '';
  protected password = '';
  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);

  submit(): void {
    this.loading.set(true);
    this.error.set(null);
    this.auth.login(this.email, this.password).subscribe({
      next: () => { this.loading.set(false); this.router.navigate(['/dashboard']); },
      error: () => { this.loading.set(false); this.error.set('No pudimos iniciar sesión. Revisa tus credenciales.'); }
    });
  }
}
