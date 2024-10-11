// eslint.config.js
const js = require('@eslint/js');

module.exports = [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
      globals: {
        browser: true,
        node: true,
      },
    },
    rules: {},
  },
];
