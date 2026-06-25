/**
 * Imágenes de stock (Unsplash) curadas para verse profesionales y médicas.
 * Los retratos de médicos se asignan de forma determinista por género (a partir
 * del nombre) para que cada tarjeta muestre un profesional creíble y consistente.
 * Si una imagen no resuelve, la directiva `img[fallback]` la sustituye por una
 * imagen clínica neutra estable (nunca un paisaje aleatorio).
 */

const U = (id: string, w = 800, q = 70) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const STOCK = {
  hero: U('1666214280557-f1b5022eb634', 1100),       // médica sonriente, bata blanca
  clinic: U('1631217868264-e5b90bb7e133', 1100),     // equipo clínico
  telemedicine: U('1576091160399-112ba8d25d1d', 1100), // consulta con tablet
  consultation: U('1551190822-a9333d879b1f', 1100),  // médico atendiendo
  fallback: U('1538108149393-fbbd81895907', 900),    // pasillo de clínica (fallback neutro)
};

/* Retratos profesionales verificados (cargan 200 desde el CDN de Unsplash). */
const PORTRAITS_F = [
  '1559839734-2b71ea197ec2',
  '1582750433449-648ed127bb54',
  '1594824476967-48c8b964273f',
  '1638202993928-7267aad84c31',
  '1651008376811-b90baee60c1f',
];
const PORTRAITS_M = [
  '1645066928295-2506defde470', // médico, bata blanca y corbata
  '1758691463333-c79215e8bc3b', // médico joven con gafas en consulta
  '1642975967602-653d378f3b5b', // médico, bata blanca y traje
];

function hash(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/** ¿El nombre corresponde a una médica? (prefijo "Dra."). */
export function isFemaleName(name: string): boolean {
  return /\bDra\.?/i.test(name ?? '');
}

/** Retrato profesional estable para un médico, según género y semilla. */
export function doctorPhoto(seed: string, female: boolean, w = 400): string {
  const pool = female ? PORTRAITS_F : PORTRAITS_M;
  return U(pool[hash(seed) % pool.length], w);
}

/** Fallback estable cuando una imagen remota no resuelve. */
export function picsum(_seed: string): string {
  return STOCK.fallback;
}
