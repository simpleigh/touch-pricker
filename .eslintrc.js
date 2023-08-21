/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

/**
 * Configuration for ESLint
 * @see https://eslint.org/docs/rules/
 * @see https://github.com/gajus/eslint-plugin-jsdoc
 * @see https://github.com/import-js/eslint-plugin-import
 * @see https://typescript-eslint.io/
 */

/* eslint-disable sort-keys */

'use strict';

module.exports = {
    root: true,
    env: {
        es2017: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:jsdoc/recommended-error',
        'prettier',
    ],
    plugins: [
        '@typescript-eslint',
        'eslint-plugin-import',
        'jsdoc',
    ],
    rules: {
        // Possible Problems
        'array-callback-return': 'error',
        'no-await-in-loop': 'error',
        'no-constant-binary-expression': 'error',
        'no-constructor-return': 'error',
        'no-duplicate-imports': 'error',
        'no-new-native-nonconstructor': 'error',
        'no-promise-executor-return': 'error',
        'no-self-compare': 'error',
        'no-template-curly-in-string': 'error',
        'no-unmodified-loop-condition': 'error',
        'no-unreachable-loop': 'error',
        'no-unused-private-class-members': 'error',
        'no-use-before-define': 'error',
        'require-atomic-updates': 'error',

        // Suggestions
        'accessor-pairs': 'error',
        'arrow-body-style': 'error',
        'block-scoped-var': 'error',
        'camelcase': 'error',
        'complexity': 'error',
        'consistent-return': 'error',
        'consistent-this': 'error',
        'curly': 'error',
        'default-case': 'error',
        'default-case-last': 'error',
        'default-param-last': 'error',
        'dot-notation': 'error',
        'eqeqeq': 'error',
        'func-name-matching': 'error',
        'func-names': 'error',
        'func-style': 'error',
        'grouped-accessor-pairs': 'error',
        'guard-for-in': 'error',
        'id-length': ['error', { exceptions: ['_', 'i', 'j'] }],
        'init-declarations': 'error',
        'logical-assignment-operators': 'error',
        'max-depth': 'error',
        'max-nested-callbacks': 'error',
        'multiline-comment-style': ['error', 'separate-lines'],
        'new-cap': 'error',
        'no-alert': 'error',
        'no-array-constructor': 'error',
        'no-bitwise': 'error',
        'no-caller': 'error',
        'no-confusing-arrow': ['error', { allowParens: false }],
        'no-console': 'warn',
        'no-continue': 'error',
        'no-div-regex': 'error',
        'no-else-return': 'error',
        'no-empty-function': 'error',
        'no-empty-static-block': 'error',
        'no-eq-null': 'error',
        'no-eval': 'error',
        'no-extend-native': 'error',
        'no-extra-bind': 'error',
        'no-extra-label': 'error',
        'no-floating-decimal': 'error',
        'no-implicit-coercion': 'error',
        'no-implicit-globals': 'error',
        'no-implied-eval': 'error',
        'no-invalid-this': 'error',
        'no-iterator': 'error',
        'no-label-var': 'error',
        'no-labels': 'error',
        'no-lone-blocks': 'error',
        'no-lonely-if': 'error',
        'no-loop-func': 'error',
        'no-mixed-operators': 'error',
        'no-multi-assign': 'error',
        'no-multi-str': 'error',
        'no-negated-condition': 'error',
        'no-nested-ternary': 'error',
        'no-new': 'error',
        'no-new-func': 'error',
        'no-new-object': 'error',
        'no-new-wrappers': 'error',
        'no-octal-escape': 'error',
        'no-plusplus': 'error',
        'no-proto': 'error',
        'no-restricted-syntax': ['error', { selector: 'SequenceExpression' }],
        'no-return-assign': 'error',
        'no-script-url': 'error',
        'no-sequences': 'error',
        'no-shadow': 'error',
        'no-throw-literal': 'error',
        'no-undef-init': 'error',
        'no-underscore-dangle': ['error', { allowAfterThis: true }],
        'no-unneeded-ternary': 'error',
        'no-unused-expressions': 'error',
        'no-useless-call': 'error',
        'no-useless-computed-key': 'error',
        'no-useless-concat': 'error',
        'no-useless-constructor': 'error',
        'no-useless-rename': 'error',
        'no-useless-return': 'error',
        'no-var': 'error',
        'no-void': 'error',
        'no-warning-comments': 'warn',
        'object-shorthand': 'error',
        'one-var': ['error', 'never'],
        'one-var-declaration-per-line': 'error',
        'operator-assignment': 'error',
        'prefer-arrow-callback': 'error',
        'prefer-const': 'error',
        'prefer-destructuring': ['error', { array: true, object: false }],
        'prefer-exponentiation-operator': 'error',
        'prefer-named-capture-group': 'error',
        'prefer-numeric-literals': 'error',
        'prefer-object-spread': 'error',
        'prefer-promise-reject-errors': 'error',
        'prefer-regex-literals': 'error',
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'prefer-template': 'error',
        'quote-props': ['error', 'consistent-as-needed'],
        'radix': ['error', 'as-needed'],
        'require-await': 'error',
        'require-unicode-regexp': 'error',
        'require-yield': 'error',
        'sort-keys': 'error',
        'sort-vars': 'error',
        'spaced-comment': 'error',
        'strict': 'error',
        'symbol-description': 'error',
        'vars-on-top': 'error',
        'yoda': 'error',

        // Layout & Formatting
        'lines-around-comment': ['error', { allowBlockStart: true }],
        'no-tabs': 'error',
        'padding-line-between-statements': 'error',
        'quotes': ['error', 'single', { allowTemplateLiterals: false, avoidEscape: true }],
        'unicode-bom': 'error',

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
        'import/consistent-type-specifier-style': 'error',
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
        'jsdoc/check-syntax': 'error',
        'jsdoc/no-blank-block-descriptions': 'error',
        'jsdoc/no-blank-blocks': 'error',
        'jsdoc/no-types': 'error',
        'jsdoc/no-undefined-types': 'error',
        'jsdoc/require-asterisk-prefix': 'error',
        'jsdoc/require-hyphen-before-param-description': ['error', 'never'],
        'jsdoc/require-param-type': 'error',
        'jsdoc/require-property-type': 'error',
        'jsdoc/require-returns-type': 'error',
        'jsdoc/require-throws': 'off',  // TODO: enable this
    },
    overrides: [
        {
            files: ['**/*.js'],
            env: {
                node: true,
            },
            rules: {
                // eslint-plugin-import: Module systems
                'import/no-commonjs': 'off',
                'import/no-nodejs-modules': 'off',
            },
        },
        {
            files: ['**/*.ts'],
            settings: {
                jsdoc: {
                    mode: 'typescript',
                },
            },
            env: {
                browser: true,
            },
            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/strict-type-checked',
                'plugin:@typescript-eslint/stylistic-type-checked',
                'plugin:import/typescript',
                'plugin:jsdoc/recommended-typescript-error',
                'prettier',
            ],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                project: './tsconfig.json',
            },
            rules: {
                // eslint-plugin-jsdoc
                'jsdoc/require-param': 'off',
                'jsdoc/require-returns': 'off',

                // ESLint Plugin TypeScript
                '@typescript-eslint/consistent-type-exports': 'error',
                '@typescript-eslint/consistent-type-imports': 'off',  // TODO: enable this
                '@typescript-eslint/explicit-member-accessibility': ['error', {
                    accessibility: 'explicit',
                    overrides: {
                        accessors: 'no-public',
                        constructors: 'no-public',
                    },
                }],
                '@typescript-eslint/explicit-module-boundary-types': 'error',
                '@typescript-eslint/method-signature-style': 'error',
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
                '@typescript-eslint/no-import-type-side-effects': 'error',
                '@typescript-eslint/no-inferrable-types': 'off',  // explicit is OK
                '@typescript-eslint/no-non-null-assertion': 'off',  // this escape hatch is sometimes useful
                '@typescript-eslint/no-require-imports': 'error',
                '@typescript-eslint/no-unnecessary-qualifier': 'error',
                '@typescript-eslint/no-useless-empty-export': 'error',
                '@typescript-eslint/parameter-properties': ['error', {
                    prefer: 'parameter-property',
                }],
                '@typescript-eslint/prefer-readonly': 'error',
                '@typescript-eslint/prefer-readonly-parameter-types': 'off',  // TODO: enable this
                '@typescript-eslint/prefer-regexp-exec': 'error',
                '@typescript-eslint/prefer-string-starts-ends-with': 'off',  // poor browser support
                '@typescript-eslint/promise-function-async': 'error',
                '@typescript-eslint/require-array-sort-compare': 'error',
                '@typescript-eslint/sort-type-constituents': 'error',
                '@typescript-eslint/switch-exhaustiveness-check': 'error',

                // ESLint Plugin TypeScript: Extension Rules
                'default-param-last': 'off',
                '@typescript-eslint/default-param-last': 'error',
                'lines-around-comment': 'off',
                '@typescript-eslint/lines-around-comment': ['error', { allowBlockStart: true, allowInterfaceStart: true }],
                'no-dupe-class-members': 'off',
                '@typescript-eslint/no-dupe-class-members': 'error',
                'no-invalid-this': 'off',
                '@typescript-eslint/no-invalid-this': 'error',
                'no-loop-func': 'off',
                '@typescript-eslint/no-loop-func': 'error',
                'no-redeclare': 'off',
                '@typescript-eslint/no-redeclare': 'error',
                'no-shadow': 'off',
                '@typescript-eslint/no-shadow': 'error',
                'no-unused-expressions': 'off',
                '@typescript-eslint/no-unused-expressions': 'error',
                'no-unused-vars': 'off',
                '@typescript-eslint/no-unused-vars': ['error', {
                    args: 'none',
                }],
                'no-use-before-define': 'off',
                '@typescript-eslint/no-use-before-define': 'error',
                'quotes': 'off',
                '@typescript-eslint/quotes': ['error', 'single', {
                    allowTemplateLiterals: false,
                    avoidEscape: true,
                }],
                'no-return-await': 'off',
                '@typescript-eslint/return-await': 'error',
            },
            overrides: [
                {
                    files: ['**/*.spec.ts', '**/test*.ts'],
                    env: {
                        jest: true,
                    },
                    rules: {
                        // Best Practices
                        'no-multi-spaces': 'off',

                        // Variables
                        'init-declarations': 'off',

                        // Stylistic Issues
                        'max-statements-per-line': 'off',

                        // eslint-plugin-import: Module systems
                        'import/no-nodejs-modules': 'off',

                        // eslint-plugin-import: Static analysis
                        'import/no-internal-modules': 'off',

                        // ESLint Plugin TypeScript
                        '@typescript-eslint/no-loop-func': 'off',
                        '@typescript-eslint/no-unused-vars': 'off',
                        '@typescript-eslint/no-unsafe-argument': 'off',
                        '@typescript-eslint/no-unsafe-assignment': 'off',
                        '@typescript-eslint/no-unsafe-call': 'off',
                        '@typescript-eslint/no-unsafe-member-access': 'off',
                        '@typescript-eslint/no-unsafe-return': 'off',
                        '@typescript-eslint/unbound-method': 'off',
                    },
                },
            ],
        },
    ],
};
