import js from '@eslint/js';
import globals from 'globals';
import json from '@eslint/json';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['node_modules/**', 'lesson-notes/**', 'package-lock.json']),
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      'no-var': 'error',
      'no-console': 'off',
      'prefer-const': 'warn',
      'no-unused-vars': 'warn',
    },
  },
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended'],
  },
  {
    files: ['**/*.jsonc'],
    plugins: { json },
    language: 'json/jsonc',
    extends: ['json/recommended'],
  },
]);
