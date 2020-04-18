'use strict';

// Require all .spec files so they're added to the bundle
// eslint-disable-next-line no-var
var contexts = [
    require.context('../src', true, /\.spec\.ts$/),
    require.context('./matchers', true, /\.spec\.ts$/),
];

// Initial test setup
// eslint-disable-next-line import/no-unassigned-import
require('./setup.ts');

// eslint-disable-next-line func-style
function runContext(context) {
    context.keys().forEach(context);
}

contexts.forEach(runContext);
