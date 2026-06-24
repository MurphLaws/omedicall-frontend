import { describe, it, expect } from 'vitest';
import { isFemaleName, doctorPhoto } from './stock-images';

describe('stock-images', () => {
  it('detecta médicas por el prefijo "Dra."', () => {
    expect(isFemaleName('Dra. Patricia Morales')).toBe(true);
    expect(isFemaleName('Dr. Andrés Castro')).toBe(false);
    expect(isFemaleName('')).toBe(false);
  });

  it('doctorPhoto es determinista para la misma semilla', () => {
    expect(doctorPhoto('seed-1', true)).toBe(doctorPhoto('seed-1', true));
  });

  it('doctorPhoto devuelve un retrato de Unsplash', () => {
    expect(doctorPhoto('abc', false)).toMatch(/^https:\/\/images\.unsplash\.com\/photo-/);
  });
});
