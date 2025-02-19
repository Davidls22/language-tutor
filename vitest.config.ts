import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig(({ mode }) => ({
  plugins: [sveltekit()],
  test: {
    environment: 'jsdom',
    globals: true,
    browser: {
      enabled: true,
    },
  },
  resolve: {
    conditions: mode === 'test' ? ['browser'] : [],
  },
}));