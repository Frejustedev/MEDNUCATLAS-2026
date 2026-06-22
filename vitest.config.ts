import { defineConfig } from 'vitest/config';

// Tests unitaires (fonctions pures) — rapides, sans infrastructure.
export default defineConfig({
  test: {
    include: ['tests/unit/**/*.test.ts'],
    environment: 'node',
  },
});
