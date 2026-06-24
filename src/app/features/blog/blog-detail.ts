import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { httpResource } from '@angular/common/http';
import { ArticleDetail } from '../../core/models/models';
import { ImgFallbackDirective } from '../../shared/img-fallback.directive';
import { API_BASE } from '../../core/config';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [RouterLink, ImgFallbackDirective, DatePipe],
  template: `
    <section class="section">
      <div class="container narrow">
        <a routerLink="/blog" class="back">← Volver al blog</a>
        @if (article.value(); as a) {
          <img class="cover" [src]="a.featuredImageUrl" [fallback]="a.slug" [alt]="a.title" />
          <span class="badge">{{ a.category }}</span>
          <h1>{{ a.title }}</h1>
          <p class="meta">{{ a.authorName }} · {{ a.publishedAt | date:'longDate' }}</p>
          <p class="lead">{{ a.summary }}</p>
          <p>{{ a.body }}</p>
        } @else {
          <p class="muted">Cargando artículo…</p>
        }
      </div>
    </section>
  `,
  styles: `
    .narrow { max-width: 740px; }
    .back { display: inline-block; margin-bottom: 1rem; }
    .cover { width: 100%; height: 320px; object-fit: cover; border-radius: 14px; margin-bottom: 1rem; }
    .meta { color: var(--muted); font-size: .9rem; }
    .lead { font-size: 1.1rem; font-weight: 600; }
  `
})
export class BlogDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly slug = signal(this.route.snapshot.paramMap.get('slug') ?? '');

  // El resource se dispara/recalcula según el slug (reactivo).
  protected readonly article = httpResource<ArticleDetail>(
    () => this.slug() ? `${API_BASE}/api/content/articles/${this.slug()}` : undefined,
  );
}
