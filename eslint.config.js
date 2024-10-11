// eslint.config.js
const { FlatCompat } = require('@eslint/eslintrc'); // Usar require si estás en CommonJS
const js = require('@eslint/js'); // Mantén la compatibilidad con las configuraciones predeterminadas de ESLint

// Usamos FlatCompat para facilitar la transición desde el formato antiguo de .eslintrc
const compat = new FlatCompat({
  baseDirectory: __dirname, // Ruta base del proyecto
  recommendedConfig: js.configs.recommended, // Aquí se debe pasar explícitamente la configuración recomendada
});

module.exports = [
  compat.config({
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
    rules: {
      // Puedes agregar o ajustar reglas específicas aquí
    },
  }),
];
