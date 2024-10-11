module.exports = {
  env: {
    browser: true,
    node: true, // Permitir sintaxis de CommonJS
    es2021: true, // Usar características de ES2021
  },
  extends: [
    'eslint:recommended',
    'airbnb-base', // O el estilo que hayas elegido
  ],
  parserOptions: {
    ecmaVersion: 12, // Usa la versión de ECMAScript que prefieras
    sourceType: 'module', // Permitir import/export
  },
  rules: {},
};
