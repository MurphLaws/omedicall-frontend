import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { App } from './app/app';
import { routes } from './app/app.routes';
import { authInterceptor } from './app/core/auth/auth.interceptor';

bootstrapApplication(App, {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor]))
  ]
}).catch(err => console.error(err));
