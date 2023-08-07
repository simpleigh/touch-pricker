/**
 * Configuration for ESLint
 * @see https://eslint.org/docs/rules/
 * @see https://github.com/gajus/eslint-plugin-jsdoc
 * @see https://github.com/import-js/eslint-plugin-import
 * @see https://typescript-eslint.io/
 */

/* eslint-disable max-len, sort-keys */

'use strict';

module.exports = {
    root: true,
    env: {
        es6: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:jsdoc/recommended-error',
    ],
    plugins: [
        '@typescript-eslint',
        'eslint-plugin-import',
        'jsdoc',
    ],
    rules: {
        // Possible Errors
        'no-await-in-loop': 'error',
        'no-console': 'warn',
        'no-extra-parens': 'error',
        'no-template-curly-in-string': 'error',
        'require-atomic-updates': 'error',

        // Best Practices
        'accessor-pairs': 'error',
        'array-callback-return': 'error',
        'block-scoped-var': 'error',
        'class-methods-use-this': 'off',  // const get() for virtual properties
        'complexity': 'error',
        'consistent-return': 'error',
        'curly': 'error',
        'default-case': 'error',
        'default-param-last': 'error',
        'dot-location': ['error', 'property'],
        'dot-notation': 'error',
        'eqeqeq': 'error',
        'grouped-accessor-pairs': 'error',
        'guard-for-in': 'error',
        'max-classes-per-file': 'error',
        'no-alert': 'error',
        'no-caller': 'error',
        'no-constructor-return': 'error',
        'no-div-regex': 'error',
        'no-else-return': 'error',
        'no-empty-function': 'error',
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
        'no-labels': 'error',
        'no-lone-blocks': 'error',
        'no-loop-func': 'error',
        'no-magic-numbers': 'off',
        'no-multi-spaces': ['error', {
            ignoreEOLComments: true,
        }],
        'no-multi-str': 'error',
        'no-new': 'error',
        'no-new-func': 'error',
        'no-new-wrappers': 'error',
        'no-octal-escape': 'error',
        'no-param-reassign': 'off',
        'no-proto': 'error',
        'no-restricted-properties': 'error',
        'no-return-assign': 'error',
        'no-return-await': 'error',
        'no-script-url': 'error',
        'no-self-compare': 'error',
        'no-sequences': 'error',
        'no-throw-literal': 'error',
        'no-unmodified-loop-condition': 'error',
        'no-unused-expressions': 'error',
        'no-useless-call': 'error',
        'no-useless-concat': 'error',
        'no-useless-return': 'error',
        'no-void': 'error',
        'no-warning-comments': 'warn',
        'prefer-named-capture-group': 'off',  // poor browser support
        'prefer-promise-reject-errors': 'error',
        'prefer-regex-literals': 'error',
        'radix': ['error', 'as-needed'],
        'require-await': 'error',
        'require-unicode-regexp': 'off',  // poor browser support
        'vars-on-top': 'error',
        'wrap-iife': 'error',
        'yoda': 'error',

        // Strict Mode
        'strict': 'error',

        // Variables
        'init-declarations': 'error',
        'no-label-var': 'error',
        'no-shadow': 'error',
        'no-undef-init': 'error',
        'no-undefined': 'off',
        'no-use-before-define': 'error',

        // Stylistic Issues
        'array-bracket-newline': ['error', 'consistent'],
        'array-bracket-spacing': 'error',
        'array-element-newline': ['error', 'consistent'],
        'block-spacing': 'error',
        'brace-style': ['error', '1tbs', {
            allowSingleLine: true,
        }],
        'camelcase': 'error',
        'capitalized-comments': 'off',  // allow inline comments
        'comma-dangle': ['error', 'always-multiline'],
        'comma-spacing': 'error',
        'comma-style': 'error',
        'computed-property-spacing': 'error',
        'consistent-this': 'error',
        'eol-last': 'error',
        'func-call-spacing': 'error',
        'func-name-matching': 'error',
        'func-names': 'error',
        'func-style': 'error',
        'function-call-argument-newline': ['error', 'consistent'],
        'function-paren-newline': ['error', 'consistent'],
        'id-blacklist': 'error',
        'id-length': ['error', {
            exceptions: ['_', 'i'],
        }],
        'id-match': 'error',
        'implicit-arrow-linebreak': 'off',
        'indent': ['error', 4, {
            SwitchCase: 1,
        }],
        'jsx-quotes': 'error',
        'key-spacing': ['error', {
            mode: 'minimum',
        }],
        'keyword-spacing': 'error',
        'line-comment-position': 'off',  // allow inline comments
        'linebreak-style': 'error',
        'lines-around-comment': 'error',
        'lines-between-class-members': 'error',
        'max-depth': 'error',
        'max-len': 'error',
        'max-lines': 'off',  // subjective
        'max-lines-per-function': 'off',  // subjective
        'max-nested-callbacks': 'error',
        'max-params': 'off',  // subjective
        'max-statements': 'off',  // subjective
        'max-statements-per-line': 'error',
        'multiline-comment-style': ['error', 'separate-lines'],
        'multiline-ternary': ['error', 'always-multiline'],
        'new-cap': 'error',
        'new-parens': 'error',
        'newline-per-chained-call': ['error', {
            ignoreChainWithDepth: 3,
        }],
        'no-array-constructor': 'error',
        'no-bitwise': 'error',
        'no-continue': 'error',
        'no-inline-comments': 'off',  // allow inline comments
        'no-lonely-if': 'error',
        'no-mixed-operators': 'error',
        'no-mixed-spaces-and-tabs': 'error',
        'no-multi-assign': 'error',
        'no-multiple-empty-lines': 'error',
        'no-negated-condition': 'error',
        'no-nested-ternary': 'error',
        'no-new-object': 'error',
        'no-plusplus': 'error',
        'no-restricted-syntax': 'error',
        'no-tabs': 'error',
        'no-ternary': 'off',
        'no-trailing-spaces': 'error',
        'no-underscore-dangle': ['error', {
            allowAfterThis: true,
        }],
        'no-unneeded-ternary': 'error',
        'no-whitespace-before-property': 'error',
        'nonblock-statement-body-position': 'error',
        'object-curly-newline': 'error',
        'object-curly-spacing': ['error', 'always'],
        'object-property-newline': ['error', {
            allowAllPropertiesOnSameLine: true,
        }],
        'one-var': ['error', 'never'],
        'one-var-declaration-per-line': 'error',
        'operator-assignment': 'error',
        'operator-linebreak': ['error', 'before', {
            overrides: {
                '=': 'after',
            },
        }],
        'padded-blocks': ['error', {
            classes: 'always',
        }],
        'padding-line-between-statements': 'error',
        'prefer-exponentiation-operator': 'error',
        'prefer-object-spread': 'error',
        'quote-props': ['error', 'consistent-as-needed'],
        'quotes': ['error', 'single', {
            avoidEscape: true,
        }],
        'semi': 'error',
        'semi-spacing': 'error',
        'semi-style': 'error',
        'sort-keys': 'error',
        'sort-vars': 'error',
        'space-before-blocks': 'error',
        'space-before-function-paren': ['error', {
            anonymous: 'always',
            asyncArrow: 'always',
            named: 'never',
        }],
        'space-in-parens': 'error',
        'space-infix-ops': 'error',
        'space-unary-ops': 'error',
        'spaced-comment': 'error',
        'switch-colon-spacing': 'error',
        'template-tag-spacing': 'error',
        'unicode-bom': 'error',
        'wrap-regex': 'off',

        // ECMAScript 6
        'arrow-body-style': 'error',
        'arrow-parens': 'error',
        'arrow-spacing': 'error',
        'generator-star-spacing': 'error',
        'no-confusing-arrow': 'error',
        'no-duplicate-imports': 'error',
        'no-restricted-imports': 'error',
        'no-useless-computed-key': 'error',
        'no-useless-constructor': 'error',
        'no-useless-rename': 'error',
        'no-var': 'error',
        'object-shorthand': 'error',
        'prefer-arrow-callback': 'error',
        'prefer-const': 'error',
        'prefer-destructuring': ['error', {
            array: true,
            object: false,
        }],
        'prefer-numeric-literals': 'error',
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'prefer-template': 'error',
        'rest-spread-spacing': 'error',
        'sort-imports': 'off',  // doesn't match our preferred sorting
        'symbol-description': 'error',
        'template-curly-spacing': 'error',
        'yield-star-spacing': 'error',

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
                // Node.js and CommonJS
                'callback-return': 'error',
                'global-require': 'error',
                'handle-callback-err': 'error',
                'no-buffer-constructor': 'error',
                'no-mixed-requires': 'error',
                'no-new-require': 'error',
                'no-path-concat': 'error',
                'no-process-env': 'error',
                'no-process-exit': 'error',
                'no-restricted-modules': 'error',
                'no-sync': 'off',  // all our JS code is CLI, so sync is OK

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
                '@typescript-eslint/member-delimiter-style': 'error',
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
                '@typescript-eslint/type-annotation-spacing': 'error',

                // ESLint Plugin TypeScript: Extension Rules
                'block-spacing': 'off',
                '@typescript-eslint/block-spacing': 'error',
                'brace-style': 'off',
                '@typescript-eslint/brace-style': ['error', '1tbs', {
                    allowSingleLine: true,
                }],
                'comma-spacing': 'off',
                '@typescript-eslint/comma-spacing': 'error',
                'default-param-last': 'off',
                '@typescript-eslint/default-param-last': 'error',
                'func-call-spacing': 'off',
                '@typescript-eslint/func-call-spacing': 'error',
                'key-spacing': 'off',
                '@typescript-eslint/key-spacing': ['error', {
                    mode: 'minimum',
                }],
                'keyword-spacing': 'off',
                '@typescript-eslint/keyword-spacing': 'error',
                'lines-around-comment': 'off',
                '@typescript-eslint/lines-around-comment': 'error',
                'lines-between-class-members': 'off',
                '@typescript-eslint/lines-between-class-members': 'error',
                'no-dupe-class-members': 'off',
                '@typescript-eslint/no-dupe-class-members': 'error',
                'no-extra-parens': 'off',
                '@typescript-eslint/no-extra-parens': 'error',
                'no-extra-semi': 'off',
                '@typescript-eslint/no-extra-semi': 'error',
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
                'object-curly-spacing': 'off',
                '@typescript-eslint/object-curly-spacing': ['error', 'always'],
                'padding-line-between-statements': 'off',
                '@typescript-eslint/padding-line-between-statements': 'error',
                'quotes': 'off',
                '@typescript-eslint/quotes': ['error', 'single', {
                    avoidEscape: true,
                }],
                'no-return-await': 'off',
                '@typescript-eslint/return-await': 'error',
                'semi': 'off',
                '@typescript-eslint/semi': 'error',
                'space-before-blocks': 'off',
                '@typescript-eslint/space-before-blocks': 'error',
                'space-before-function-paren': 'off',
                '@typescript-eslint/space-before-function-paren': ['error', {
                    anonymous: 'always',
                    asyncArrow: 'always',
                    named: 'never',
                }],
                'space-infix-ops': 'off',
                '@typescript-eslint/space-infix-ops': 'error',
            },
            overrides: [
                {
                    files: ['**/*.spec.ts'],
                    env: {
                        jasmine: true,
                    },
                    rules: {
                        // Best Practices
                        'no-multi-spaces': 'off',

                        // Variables
                        'init-declarations': 'off',

                        // Stylistic Issues
                        'max-statements-per-line': 'off',

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
