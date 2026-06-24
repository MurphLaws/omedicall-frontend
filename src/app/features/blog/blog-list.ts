import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/http/api.service';
import { ArticleSummary } from '../../core/models/models';
import { ImgFallbackDirective } from '../../shared/img-fallback.directive';

@Component({
  selector: 'app-blog-list',
  imports: [RouterLink, ImgFallbackDirective, DatePipe],
  template: `
    <section class="section">
      <div class="container">
        <h2>Blog de salud</h2>
        <p class="muted">Consejos y guías escritas por nuestros especialistas.</p>

        <div class="grid cols-3" style="margin-top:1.5rem">
          @for (a of items(); track a.id) {
            <a class="card post" [routerLink]="['/blog', a.slug]">
              <img class="cover" [src]="a.featuredImageUrl" [fallback]="a.slug" [alt]="a.title" />
              <div class="pad">
                <span class="badge">{{ a.category }}</span>
                <h3>{{ a.title }}</h3>
                <p class="muted">{{ a.summary }}</p>
                <p class="meta">{{ a.authorName }} · {{ a.publishedAt | date:'longDate' }}</p>
              </div>
            </a>
          } @empty {
            <p class="muted">Cargando artículos…</p>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .post { color: inherit; display: block; }
    .post .cover { width: 100%; height: 180px; object-fit: cover; }
    .post h3 { margin: .4rem 0; }
    .post .meta { font-size: .82rem; color: var(--muted); margin-top: .6rem; }
  `
})
export class BlogList {
  private readonly api = inject(ApiService);
  protected readonly items = signal<ArticleSummary[]>([]);

  constructor() {
    this.api.get<ArticleSummary[]>('/api/content/articles').subscribe(d => this.items.set(d));
  }
}
