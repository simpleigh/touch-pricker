/**
 * Configuration for ESLint
 * @see https://eslint.org/docs/rules/
 * @see https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
 * @see https://github.com/benmosher/eslint-plugin-import
 * @see https://github.com/mysticatea/eslint-plugin-node
 */

module.exports = {
    root: true,
    env: {
        browser: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
    },
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
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
        'no-param-reassign': 'off',  // TODO: try turning this on
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
        'init-declarations': 'off',
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
    },
    overrides: [
        {
            files: ['**/*.js'],
            env: {
                browser: false,
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
            },
        },
        {
            files: ['**/*.ts'],
            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/eslint-recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:@typescript-eslint/recommended-requiring-type-checking',
            ],
            rules: {
                // Possible Errors
                'no-extra-parens': 'off',
                '@typescript-eslint/no-extra-parens': 'error',
                'no-extra-semi': 'off',
                '@typescript-eslint/no-extra-semi': 'error',

                // Best practices
                'default-param-last': 'off',
                '@typescript-eslint/default-param-last': 'error',
                'no-unused-expressions': 'off',
                '@typescript-eslint/no-unused-expressions': 'error',
                'no-return-await': 'off',
                '@typescript-eslint/return-await': 'error',

                // Variables
                '@typescript-eslint/no-unused-vars': ['error', {
                    args: 'none',
                }],

                // Stylistic Issues
                'brace-style': 'off',
                '@typescript-eslint/brace-style': ['error', '1tbs', {
                    allowSingleLine: true,
                }],
                'comma-spacing': 'off',
                '@typescript-eslint/comma-spacing': 'error',
                'quotes': 'off',
                '@typescript-eslint/quotes': ['error', 'single', {
                    avoidEscape: true,
                }],
                'func-call-spacing': 'off',
                '@typescript-eslint/func-call-spacing': 'error',
                '@typescript-eslint/indent': 'off',  // buggy rule
                'semi': 'off',
                '@typescript-eslint/semi': 'error',
                'space-before-function-paren': 'off',
                '@typescript-eslint/space-before-function-paren': ['error', {
                    anonymous: 'always',
                    asyncArrow: 'always',
                    named: 'never',
                }],

                // ECMAScript 6
                'no-dupe-class-members': 'off',
                '@typescript-eslint/no-dupe-class-members': 'error',
                'no-useless-constructor': 'off',
                '@typescript-eslint/no-useless-constructor': 'error',

                // ESLint Plugin TypeScript
                '@typescript-eslint/array-type': ['error', {
                    default: 'array',
                }],
                '@typescript-eslint/ban-ts-comment': 'error',
                '@typescript-eslint/class-literal-property-style': 'error',
                '@typescript-eslint/consistent-type-assertions': ['error', {
                    assertionStyle: 'as',
                }],
                '@typescript-eslint/consistent-type-definitions': [
                    'error',
                    'interface',
                ],
                '@typescript-eslint/explicit-function-return-type': 'off',
                '@typescript-eslint/explicit-member-accessibility': ['error', {
                    accessibility: 'explicit',
                    overrides: {
                        accessors: 'no-public',
                        constructors: 'no-public',
                    },
                }],
                '@typescript-eslint/explicit-module-boundary-types': 'error',
                '@typescript-eslint/member-ordering': 'off', // prefer semantic order
                '@typescript-eslint/method-signature-style': 'error',
                '@typescript-eslint/naming-convention': 'error',
                '@typescript-eslint/no-base-to-string': 'error',
                '@typescript-eslint/no-dynamic-delete': 'error',
                '@typescript-eslint/no-explicit-any': 'error',
                '@typescript-eslint/no-extra-non-null-assertion': 'error',
                '@typescript-eslint/no-extraneous-class': 'error',
                '@typescript-eslint/no-floating-promises': 'error',
                '@typescript-eslint/no-implied-eval': 'error',
                '@typescript-eslint/no-inferrable-types': 'off',  // explicit is OK
                '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
                '@typescript-eslint/no-non-null-assertion': 'off',  // TODO: try turning this on
                '@typescript-eslint/no-parameter-properties': 'off',
                '@typescript-eslint/no-require-imports': 'error',
                '@typescript-eslint/no-throw-literal': 'error',
                '@typescript-eslint/no-type-alias': 'off',  // naming types for clarity
                '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
                '@typescript-eslint/no-unnecessary-condition': 'error',
                '@typescript-eslint/no-unnecessary-qualifier': 'error',
                '@typescript-eslint/no-unnecessary-type-arguments': 'error',
                '@typescript-eslint/no-unsafe-call': 'off',
                '@typescript-eslint/no-unsafe-member-access': 'off',
                '@typescript-eslint/no-unsafe-return': 'off',
                '@typescript-eslint/no-unused-vars-experimental': 'off',
                '@typescript-eslint/prefer-as-const': 'error',
                '@typescript-eslint/prefer-for-of': 'error',
                '@typescript-eslint/prefer-function-type': 'error',
                '@typescript-eslint/prefer-nullish-coalescing': 'error',
                '@typescript-eslint/prefer-optional-chain': 'error',
                '@typescript-eslint/prefer-readonly': 'error',
                '@typescript-eslint/prefer-readonly-parameter-types': 'off',  // TODO: try turning this on (see #4)
                '@typescript-eslint/prefer-string-starts-ends-with': 'off',  // poor browser support
                '@typescript-eslint/promise-function-async': 'error',
                '@typescript-eslint/require-array-sort-compare': 'error',
                '@typescript-eslint/restrict-plus-operands': 'error',
                '@typescript-eslint/restrict-template-expressions': ['error', {
                    allowNumber: true,
                }],
                '@typescript-eslint/strict-boolean-expressions': 'off',  // TODO: try turning this on
                '@typescript-eslint/switch-exhaustiveness-check': 'error',
                '@typescript-eslint/typedef': 'off',  // covered by ts compiler
                '@typescript-eslint/unified-signatures': 'error',
            },
            overrides: [
                {
                    files: ['**/*.spec.ts'],
                    env: {
                        jasmine: true,
                    },
                    rules: {
                        // Best Practices
                        'no-loop-func': 'off',
                        'no-multi-spaces': 'off',

                        // Stylistic Issues
                        'max-statements-per-line': 'off',

                        '@typescript-eslint/explicit-module-boundary-types': 'off',
                        '@typescript-eslint/no-unused-vars': 'off',
                        '@typescript-eslint/unbound-method': 'off',
                    },
                },
            ],
        },
    ],
};
