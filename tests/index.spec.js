'use strict';

// Require all .spec files so they're added to the bundle
// eslint-disable-next-line no-var
var testsContext = require.context('../src', true, /\.spec\.ts$/);

// Initial test setup
require('./setup.ts');  // eslint-disable-line import/no-unassigned-import

testsContext.keys().forEach(testsContext);
