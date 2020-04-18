'use strict';

/* eslint-disable no-var */

var testsContext;

// Initial test setup
require('./setup.ts');

// Require all .spec files so they're added to the bundle
testsContext = require.context('../src', true, /\.spec\.ts$/);
testsContext.keys().forEach(testsContext);
