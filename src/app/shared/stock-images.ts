/**
 * Imágenes de stock (Unsplash). Si alguna no resuelve, la directiva `img[fallback]`
 * la reemplaza por una imagen estable de picsum. Así nunca se ve una imagen rota.
 */
export const STOCK = {
  hero: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=60',
  doctorsTeam: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=1200&q=60',
  consultation: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=1200&q=60',
  telemedicine: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=60',
};

export function picsum(seed: string, w = 800, h = 400): string {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;
}
