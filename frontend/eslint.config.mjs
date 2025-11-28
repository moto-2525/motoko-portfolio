import { defineConfig, globalIgnores } from 'eslint/config';
import next from 'eslint-config-next';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  ...next,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  prettierConfig,
  globalIgnores(['.next/**', 'dist/**']),
]);
