const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
    js.configs.recommended,
    {
        files: ['**/*.js'],
        languageOptions: {
            sourceType: 'commonjs',
            globals: {
                ...globals.node,
                ...globals.jest,
                __ENV: 'readonly',
            },
        },
        rules: {
            'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            'eqeqeq': ['error', 'always'],
            'semi': ['error', 'always'],
            'no-console': 'off',
        },
    },
    {
        files: ['loadtest/**/*.js'],
        languageOptions: {
            sourceType: 'module',
            globals: {
                ...globals.node,
                __ENV: 'readonly',
            },
        },
        rules: {
            'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            'eqeqeq': ['error', 'always'],
            'semi': ['error', 'always'],
        },
    },
];
