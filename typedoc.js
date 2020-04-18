'use strict';

// eslint-disable-next-line import/no-internal-modules
const paths = require('./config/paths');

module.exports = {
    exclude: '**/*.spec.ts',
    excludePrivate: true,
    excludeProtected: true,
    ignoreCompilerErrors: true,  // ignore errors loading .dot templates
    mode: 'file',
    name: 'Free Touch Pricker',
    out: paths.docsPath,
};
