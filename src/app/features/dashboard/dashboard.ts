import { Component, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthStore } from '../../core/auth/auth.store';
import { NotificationDto } from '../../core/models/models';
import { API_BASE } from '../../core/config';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DatePipe],
  template: `
    <section class="section">
      <div class="container">
        <h2>Hola, {{ auth.user()?.fullName }}</h2>
        <div class="roles">
          @for (r of auth.roles(); track r) { <span class="badge">{{ r }}</span> }
        </div>

        <div class="grid cols-2" style="margin-top:1.5rem">
          <div class="card pad">
            <h3>Notificaciones</h3>
            @for (n of notifications(); track n.id) {
              <div class="notif" [class.unread]="!n.isRead">
                <div>
                  <strong>{{ n.title }}</strong>
                  <p class="muted">{{ n.message }}</p>
                  <span class="when">{{ n.createdAt | date:'short' }}</span>
                </div>
                @if (!n.isRead) {
                  <button class="btn btn-ghost" (click)="markRead(n.id)">Marcar leída</button>
                }
              </div>
            } @empty {
              <p class="muted">No tienes notificaciones.</p>
            }
          </div>

          <div class="card pad">
            <h3>Tu actividad</h3>
            <p class="muted">
              Aquí verás tus próximas citas y tu historial cuando esas funcionalidades estén
              disponibles. Por ahora puedes explorar especialidades, médicos y el blog.
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .roles { display: flex; gap: .4rem; margin-top: .3rem; }
    .grid.cols-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
    @media (max-width: 820px) { .grid.cols-2 { grid-template-columns: 1fr; } }
    .notif { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; padding: .8rem 0; border-bottom: 1px solid var(--line); }
    .notif:last-child { border-bottom: 0; }
    .notif.unread { background: #f0faf9; margin: 0 -1.2rem; padding: .8rem 1.2rem; }
    .when { font-size: .78rem; color: var(--muted); }
  `
})
export class Dashboard {
  protected readonly auth = inject(AuthStore);
  private readonly http = inject(HttpClient);
  protected readonly notifications = signal<NotificationDto[]>([]);

  constructor() {
    this.load();
  }

  private load(): void {
    this.http.get<NotificationDto[]>(`${API_BASE}/api/notifications/me`)
      .subscribe(d => this.notifications.set(d));
  }

  protected markRead(id: string): void {
    this.http.post<void>(`${API_BASE}/api/notifications/${id}/read`, {})
      .subscribe(() => this.load());
  }
}
