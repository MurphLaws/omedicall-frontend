import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE } from '../config';
import { LoginResponse, UserDto } from '../models/models';

const TOKEN_KEY = 'omedicall.token';
const USER_KEY = 'omedicall.user';

interface AuthState {
  user: UserDto | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem(TOKEN_KEY),
  loading: false,
  error: null
};

try {
  const raw = localStorage.getItem(USER_KEY);
  if (raw) initialState.user = JSON.parse(raw) as UserDto;
} catch {
  // fallback: sin usuario
}

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, http = inject(HttpClient), router = inject(Router)) => ({
    login(email: string, password: string) {
      patchState(store, { loading: true, error: null });
      return new Promise<void>((resolve, reject) => {
        http.post<LoginResponse>(`${API_BASE}/api/auth/login`, { email, password })
          .subscribe({
            next: (res) => {
              patchState(store, { token: res.accessToken, user: res.user, loading: false, error: null });
              localStorage.setItem(TOKEN_KEY, res.accessToken);
              localStorage.setItem(USER_KEY, JSON.stringify(res.user));
              resolve();
            },
            error: () => {
              patchState(store, { loading: false, error: 'Credenciales inválidas' });
              reject();
            }
          });
      });
    },
    logout() {
      patchState(store, { token: null, user: null });
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      router.navigate(['/']);
    }
  })),
  withComputed((store) => ({
    isAuthenticated: computed(() => store.user() !== null),
    roles: computed(() => store.user()?.roles ?? [])
  }))
);
