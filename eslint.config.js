// eslint.config.js
const js = require('@eslint/js');

module.exports = [
  js.configs.recommended, // Cargar la configuración recomendada directamente
  {
    files: ['**/*.{js,jsx,ts,tsx}'], // Especifica los archivos que se van a lintar
    env: {
      browser: true, // Permitir código para navegadores
      node: true, // Permitir código para Node.js
      es2021: true, // Habilitar características de ES2021
    },
    parserOptions: {
      ecmaVersion: 12, // Soporte para ECMAScript 2021
      sourceType: 'module', // Permitir imports/exports
    },
    rules: {
      // Añade o ajusta reglas específicas aquí
    },
  },
];
