import js from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';

export default [
  js.configs.recommended,
  {
    ...reactPlugin.configs.flat.recommended,
    settings: {
      react: {
        version: '19.1.1',
      },
    },
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // React
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      
      // JavaScript
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'no-case-declarations': 'error', // Оставляем как ошибку чтобы пофиксить
      'no-useless-catch': 'error',     // Оставляем как ошибку чтобы пофиксить
    },
  },
  {
    ignores: [
      'build/**',
      'public/**',
      'node_modules/**',
      '*.worker.*',
      'generate-sitemap.js'
    ]
  }
];