import { defineConfig } from 'vitest/config';
import { getViteConfig } from '@angular/build';

export default defineConfig(
  getViteConfig({
    tsconfig: './tsconfig.spec.json',
    inlineStyleLanguage: 'scss'
  }, {
    previewCommand: 'ng serve',
    serveCommand: 'ng serve'
  })
);
