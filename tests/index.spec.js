'use strict';

// Require all .spec files so they're added to the bundle
// eslint-disable-next-line no-var
var contexts = [
    require.context('../src', true, /\.spec\.ts$/u),
    require.context('./matchers', true, /\.spec\.ts$/u),
];

// Initial test setup
// eslint-disable-next-line import/no-unassigned-import
require('./setup.ts');

// eslint-disable-next-line func-style, jsdoc/require-jsdoc
function runContext(context) {
    context.keys().forEach(context);
}

contexts.forEach(runContext);
