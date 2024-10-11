import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc'; // Para compatibilidad con configuraciones antiguas como 'airbnb-base'

// Usamos FlatCompat para facilitar la transición desde el formato antiguo de .eslintrc
const compat = new FlatCompat({
  baseDirectory: import.meta.url, // Ruta base del proyecto
});

export default [
  js.configs.recommended, // Configuraciones recomendadas de ESLint
  ...compat.config({
    extends: [
      'eslint:recommended',
      'airbnb-base', // O el estilo que hayas elegido
    ],
    env: {
      browser: true, // Permitir código que corre en el navegador
      node: true, // Permitir sintaxis de Node.js
      es2021: true, // Usar características de ES2021
    },
    parserOptions: {
      ecmaVersion: 12, // Usar ECMAScript 2021
      sourceType: 'module', // Permitir import/export
    },
    rules: {},
  }),
];
