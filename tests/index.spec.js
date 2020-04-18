'use strict';

// Require all .spec files so they're added to the bundle
// eslint-disable-next-line no-var
var testsContext = require.context('../src', true, /\.spec\.ts$/);

// Initial test setup
// eslint-disable-next-line import/no-unassigned-import
require('./setup.ts');

testsContext.keys().forEach(testsContext);
