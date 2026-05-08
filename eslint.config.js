/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-26 Leigh Simpson. All rights reserved.
 */

'use strict';

/**
 * Configuration for ESLint
 */

/* eslint-disable sort-keys */

const { defineConfig, globalIgnores } = require('eslint/config');

// https://github.com/prettier/eslint-config-prettier
const eslintConfigPrettier = require('eslint-config-prettier/flat'); // eslint-disable-line import/no-internal-modules

const globals = require('globals');

// https://github.com/import-js/eslint-plugin-import
const importPlugin = require('eslint-plugin-import');

// https://eslint.org/docs/rules/
const js = require('@eslint/js');

// https://github.com/gajus/eslint-plugin-jsdoc
const jsdoc = require('eslint-plugin-jsdoc');

// https://typescript-eslint.io/
const tseslint = require('typescript-eslint');

module.exports = defineConfig([
    globalIgnores(['coverage/', 'dist/'], 'touch-pricker/ignores'),

    {
        name: 'touch-pricker/files',
        files: ['**/*.js', '**/*.ts'],
    },

    {
        name: 'touch-pricker/defaults',
        extends: ['js/all', jsdoc.configs['flat/recommended-error']],
        plugins: {
            import: importPlugin,
            js,
        },
        rules: {
            'capitalized-comments': 'off', // needed for e.g. eslint comments
            'class-methods-use-this': 'off',
            'id-length': ['error', { exceptions: ['_', 'i', 'j'] }],
            'max-lines': 'off',
            'max-lines-per-function': 'off',
            'max-params': 'off',
            'max-statements': 'off',
            'no-console': 'warn',
            'no-inline-comments': 'off',
            'no-magic-numbers': 'off',
            'no-param-reassign': 'off',
            'no-restricted-syntax': [
                'error',
                { selector: 'SequenceExpression' },
            ],
            'no-ternary': 'off',
            'no-undefined': 'off',
            'no-underscore-dangle': ['error', { allowAfterThis: true }],
            'no-warning-comments': 'warn',
            'one-var': ['error', 'never'],
            'prefer-destructuring': ['error', { array: true, object: false }],
            radix: ['error', 'as-needed'],
            'sort-imports': 'off',

            // eslint-plugin-import: Helpful warnings
            'import/export': 'error',
            'import/no-deprecated': 'error',
            'import/no-empty-named-blocks': 'error',
            'import/no-extraneous-dependencies': 'error',
            'import/no-mutable-exports': 'error',
            'import/no-named-as-default': 'error',
            'import/no-named-as-default-member': 'error',
            'import/no-unused-modules': 'error',

            // eslint-plugin-import: Module systems
            'import/no-amd': 'error',
            'import/no-commonjs': 'error',
            'import/no-import-module-exports': 'error',
            'import/no-nodejs-modules': 'error',
            'import/unambiguous': 'off',

            // eslint-plugin-import: Static analysis
            'import/default': 'error',
            'import/enforce-node-protocol-usage': ['error', 'always'],
            'import/named': 'error',
            'import/namespace': 'error',
            'import/no-absolute-path': 'error',
            'import/no-cycle': 'warn',
            'import/no-dynamic-require': 'error',
            'import/no-internal-modules': 'error',
            'import/no-relative-packages': 'error',
            'import/no-relative-parent-imports': 'off',
            'import/no-restricted-paths': 'error',
            'import/no-self-import': 'error',
            'import/no-unresolved': 'error',
            'import/no-useless-path-segments': 'error',
            'import/no-webpack-loader-syntax': 'error',

            // eslint-plugin-import: Style guide
            'import/consistent-type-specifier-style': 'off',
            'import/dynamic-import-chunkname': 'error',
            'import/exports-last': 'off',
            'import/extensions': 'error',
            'import/first': 'error',
            'import/group-exports': 'off',
            'import/max-dependencies': 'off',
            'import/newline-after-import': 'error',
            'import/no-anonymous-default-export': 'error',
            'import/no-default-export': 'off',
            'import/no-duplicates': 'error',
            'import/no-named-default': 'error',
            'import/no-named-export': 'off',
            'import/no-namespace': 'off',
            'import/no-unassigned-import': 'error',
            'import/order': 'error',
            'import/prefer-default-export': 'off',

            // eslint-plugin-jsdoc
            'jsdoc/check-indentation': 'error',
            'jsdoc/check-line-alignment': 'error',
            'jsdoc/check-syntax': 'error',
            'jsdoc/check-template-names': 'error',
            'jsdoc/convert-to-jsdoc-comments': 'error',
            'jsdoc/imports-as-dependencies': 'error',
            'jsdoc/informative-docs': 'error',
            'jsdoc/lines-before-block': 'error',
            'jsdoc/match-description': 'error',
            'jsdoc/match-name': 'error',
            'jsdoc/no-bad-blocks': 'error',
            'jsdoc/no-blank-block-descriptions': 'error',
            'jsdoc/no-missing-syntax': 'off',
            'jsdoc/no-restricted-syntax': 'error',
            'jsdoc/require-asterisk-prefix': 'error',
            'jsdoc/require-description': 'error',
            'jsdoc/require-description-complete-sentence': 'off',
            'jsdoc/require-example': 'error',
            'jsdoc/require-file-overview': 'off',
            'jsdoc/require-hyphen-before-param-description': ['error', 'never'],
            'jsdoc/require-next-description': 'error',
            'jsdoc/require-template': 'error',
            'jsdoc/require-template-description': 'error',
            'jsdoc/require-throws': 'error',
            'jsdoc/require-throws-description': 'error',
            'jsdoc/require-yields-description': 'error',
            'jsdoc/sort-tags': 'off',
            'jsdoc/text-escaping': 'off',
            'jsdoc/ts-method-signature-style': 'error',
            'jsdoc/ts-prefer-function-type': 'error',
            'jsdoc/ts-no-unnecessary-template-expression': 'error',
            'jsdoc/type-formatting': 'error',
        },
    },

    {
        name: 'touch-pricker/.js',
        files: ['**/*.js'],
        languageOptions: {
            globals: {
                ...globals.node,
            },
            sourceType: 'commonjs',
        },
        rules: {
            'no-console': 'off',

            // eslint-plugin-import: Module systems
            'import/no-commonjs': 'off',
            'import/no-nodejs-modules': 'off',
        },
    },

    {
        name: 'touch-pricker/.ts/defaults',
        files: ['**/*.ts'],
        extends: [
            importPlugin.configs.typescript,
            jsdoc.configs['flat/recommended-tsdoc-error'],
            tseslint.configs.all,
        ],
        languageOptions: {
            globals: {
                ...globals.browser,
            },
            parserOptions: { projectService: true },
        },
        rules: {
            // eslint-plugin-jsdoc
            'jsdoc/require-param': 'off',
            'jsdoc/require-returns': 'off',

            // typescript-eslint
            '@typescript-eslint/class-methods-use-this': 'off',
            '@typescript-eslint/explicit-member-accessibility': [
                'error',
                {
                    accessibility: 'explicit',
                    overrides: {
                        accessors: 'no-public',
                        constructors: 'no-public',
                    },
                },
            ],
            '@typescript-eslint/lines-around-comment': [
                'error',
                { allowBlockStart: true, allowInterfaceStart: true },
            ],
            '@typescript-eslint/max-params': 'off',
            '@typescript-eslint/member-ordering': 'off',
            '@typescript-eslint/naming-convention': [
                'error',
                {
                    selector: 'default',
                    format: ['PascalCase', 'strictCamelCase'],
                    leadingUnderscore: 'allow',
                    trailingUnderscore: 'allow',
                },
                {
                    selector: 'variable',
                    format: ['PascalCase', 'strictCamelCase', 'UPPER_CASE'],
                    leadingUnderscore: 'allow',
                    trailingUnderscore: 'allow',
                },
            ],
            '@typescript-eslint/no-inferrable-types': 'off', // explicit is OK
            '@typescript-eslint/no-magic-numbers': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off', // this escape hatch is sometimes useful
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    args: 'none',
                },
            ],
            '@typescript-eslint/no-unnecessary-type-assertion': 'off',
            '@typescript-eslint/no-unsafe-type-assertion': 'off',
            '@typescript-eslint/parameter-properties': [
                'error',
                {
                    prefer: 'parameter-property',
                },
            ],
            '@typescript-eslint/prefer-destructuring': [
                'error',
                { array: true, object: false },
            ],
            '@typescript-eslint/prefer-enum-initializers': 'off',
            '@typescript-eslint/prefer-readonly-parameter-types': 'off', // TODO: enable this
            '@typescript-eslint/quotes': [
                'error',
                'single',
                {
                    allowTemplateLiterals: false,
                    avoidEscape: true,
                },
            ],
            '@typescript-eslint/related-getter-setter-pairs': 'off',
            '@typescript-eslint/strict-boolean-expressions': 'off',
        },
        settings: {
            jsdoc: {
                mode: 'typescript',
            },
        },
    },

    {
        name: 'touch-pricker/.ts/tests',
        files: ['**/*.spec.ts', '**/test*.ts'],
        languageOptions: {
            globals: {
                ...globals.jest,
            },
        },
        rules: {
            'id-length': 'off',
            'init-declarations': 'off',
            'max-classes-per-file': 'off',
            'no-new': 'off',

            // eslint-plugin-import: Module systems
            'import/no-nodejs-modules': 'off',

            // eslint-plugin-import: Static analysis
            'import/no-internal-modules': 'off',

            // typescript-eslint
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/init-declarations': 'off',
            '@typescript-eslint/no-loop-func': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-return': 'off',
            '@typescript-eslint/unbound-method': 'off',
        },
    },

    eslintConfigPrettier,
]);
