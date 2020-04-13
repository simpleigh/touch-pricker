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
            },
            overrides: [
                {
                    files: ['**/*.spec.ts'],
                    env: {
                        jasmine: true,
                    },
                },
            ],
        },
    ],
};
