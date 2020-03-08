// Initial test setup
import './setup.ts';

// Require all .spec files so they're added to the bundle
var testsContext = require.context('../src', true, /\.spec\.ts$/);
testsContext.keys().forEach(testsContext);
