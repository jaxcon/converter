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
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',

            'no-unused-vars': 'warn',
            'no-console': 'warn',
            'no-case-declarations': 'error',
            'no-useless-catch': 'error',
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