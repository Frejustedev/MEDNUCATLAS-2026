import { defineConfig } from 'vitest/config';

// Tests des règles Firestore — nécessitent l'émulateur Firestore
// (lancés via `npm run test:rules`, qui démarre l'émulateur).
export default defineConfig({
  test: {
    include: ['tests/rules/**/*.test.ts'],
    environment: 'node',
    testTimeout: 20000,
    hookTimeout: 30000,
    fileParallelism: false,
  },
});
