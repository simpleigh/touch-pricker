module.exports = {
    root: true,
    env: {
        browser: true,
    },
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    rules: {
    },
    overrides: [
        {
            files: ['**/*.js'],
            env: {
                browser: false,
                node: true,
            },
            extends: [
                'eslint:recommended',
            ],
            rules: {
            },
        },
        {
            files: ['**/*.ts'],
            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/eslint-recommended',
                'plugin:@typescript-eslint/recommended',
            ],
            rules: {
                '@typescript-eslint/explicit-function-return-type': 'off',
                '@typescript-eslint/no-explicit-any': 'off',
                '@typescript-eslint/no-inferrable-types': 'off',
            },
            overrides: [
                {
                    files: ['**/*.spec.ts'],
                },
            ],
        },
    ],
};
