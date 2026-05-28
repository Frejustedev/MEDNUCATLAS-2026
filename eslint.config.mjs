import { defineConfig } from 'eslint/config';
import next from 'eslint-config-next';

export default defineConfig([
  {
    extends: [...next],
    rules: {
      // Apostrophes/guillemets non échappés : tolérés (style de rédaction française).
      'react/no-unescaped-entities': 'off',
      // Permet le hook conditionnel docstring next/image alt = '' sur images décoratives.
      '@next/next/no-img-element': 'warn',
    },
  },
]);
