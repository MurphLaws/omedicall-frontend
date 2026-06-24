import { Injectable, computed, inject, signal } from '@angular/core';
import { tap } from 'rxjs';
import { ApiService } from '../http/api.service';
import { LoginResponse, UserDto } from '../models/models';

const TOKEN_KEY = 'omedicall.token';
const USER_KEY = 'omedicall.user';

/** Estado de autenticación con signals (sin BehaviorSubject). */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = inject(ApiService);

  private readonly _user = signal<UserDto | null>(this.readStoredUser());
  private readonly _token = signal<string | null>(localStorage.getItem(TOKEN_KEY));

  readonly user = this._user.asReadonly();
  readonly isAuthenticated = computed(() => this._user() !== null);
  readonly roles = computed(() => this._user()?.roles ?? []);

  get token(): string | null {
    return this._token();
  }

  hasRole(role: string): boolean {
    return this.roles().includes(role);
  }

  login(email: string, password: string) {
    return this.api.post<LoginResponse>('/api/auth/login', { email, password }).pipe(
      tap((res) => {
        this._token.set(res.accessToken);
        this._user.set(res.user);
        localStorage.setItem(TOKEN_KEY, res.accessToken);
        localStorage.setItem(USER_KEY, JSON.stringify(res.user));
      })
    );
  }

  logout(): void {
    this._token.set(null);
    this._user.set(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  private readStoredUser(): UserDto | null {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as UserDto) : null;
  }
}
