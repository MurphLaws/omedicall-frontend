import { Component, input } from '@angular/core';

/**
 * Ícono de línea (estilo Lucide) por especialidad. Reemplaza los emojis por
 * un set SVG uniforme y profesional. `key` es el `iconKey` del catálogo.
 */
@Component({
  selector: 'app-specialty-icon',
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      @switch (key()) {
        @case ('heart') {
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
        }
        @case ('skin') {
          <path d="M12 2.69 17.66 8.35a8 8 0 1 1-11.31 0z" />
        }
        @case ('female') {
          <circle cx="12" cy="8" r="5" />
          <path d="M12 13v8M9 18h6" />
        }
        @case ('stethoscope') {
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        }
        @case ('nerve') {
          <path d="M13 2 3 14h9l-1 8 10-12h-9z" />
        }
        @case ('apple') {
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6" />
        }
        @case ('eye') {
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        }
        @case ('bone') {
          <path d="M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z" />
        }
        @case ('baby') {
          <circle cx="12" cy="12" r="9" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <path d="M9 9h.01M15 9h.01" />
        }
        @case ('brain') {
          <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
        }
        @default {
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        }
      }
    </svg>
  `,
  styles: `
    :host { display: inline-flex; }
    svg { width: 100%; height: 100%; }
  `,
})
export class SpecialtyIcon {
  readonly key = input<string>('stethoscope');
}
