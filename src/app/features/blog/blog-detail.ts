import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../core/http/api.service';
import { ArticleDetail } from '../../core/models/models';
import { ImgFallbackDirective } from '../../shared/img-fallback.directive';

@Component({
  selector: 'app-blog-detail',
  imports: [RouterLink, ImgFallbackDirective, DatePipe],
  template: `
    <section class="section">
      <div class="container narrow">
        <a routerLink="/blog" class="back">← Volver al blog</a>
        @if (article(); as a) {
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
  private readonly api = inject(ApiService);
  private readonly route = inject(ActivatedRoute);
  protected readonly article = signal<ArticleDetail | null>(null);

  constructor() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.api.get<ArticleDetail>(`/api/content/articles/${slug}`).subscribe(a => this.article.set(a));
    }
  }
}
