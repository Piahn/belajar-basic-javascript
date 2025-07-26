import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import daStyle from 'eslint-config-dicodingacademy';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  daStyle,
  {
    files: ['src/**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  { files: ['src/**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  {
    files: ['src/**/*.{js,mjs,cjs}'],
    languageOptions: { globals: globals.browser },
  },
  {
    rules: {
      'no-undef': 'off',
    },
  },
  prettierConfig,
]);
