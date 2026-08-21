import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  site: 'https://oss.arcabot.ai',
  output: 'static',
  integrations: [react()],
  vite: { resolve: { alias: { '@': fileURLToPath(new URL('.', import.meta.url)) } } },
});
