import { Directive, ElementRef, HostListener, inject, input } from '@angular/core';
import { picsum } from './stock-images';

/** Si la imagen falla al cargar, sustituye el src por un fallback estable (picsum). */
@Directive({
  selector: 'img[fallback]',
  standalone: true,
})
export class ImgFallbackDirective {
  /** Semilla para el fallback (estable por recurso). */
  readonly fallback = input<string>('omedicall');
  private readonly el = inject(ElementRef<HTMLImageElement>);
  private applied = false;

  @HostListener('error')
  onError(): void {
    if (this.applied) return;
    this.applied = true;
    this.el.nativeElement.src = picsum(this.fallback());
  }
}
