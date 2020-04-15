'use strict';

// Initial test setup
require('./setup.ts');

// Require all .spec files so they're added to the bundle
const testsContext = require.context('../src', true, /\.spec\.ts$/);
testsContext.keys().forEach(testsContext);
