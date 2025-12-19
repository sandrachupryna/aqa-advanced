import js from '@eslint/js';
import globals from 'globals';
import json from '@eslint/json';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default defineConfig([
  globalIgnores(['node_modules/**', 'lesson-notes/**', 'package-lock.json']),
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-var': 'error',
      'no-console': 'off',
      'prefer-const': 'warn',
      'no-unused-vars': 'warn',
    },
  },
  {
    files: ['**/*.{json}'],
    ...json.configs.recommended,
    language: 'json/json',
  },
  {
    files: ['**/*.jsonc'],
    ...json.configs.recommended,
    language: 'json/jsonc',
  },
  eslintConfigPrettier,
]);
