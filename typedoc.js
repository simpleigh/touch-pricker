'use strict';

const { paths } = require('./config');

module.exports = {
    exclude: '**/*.spec.ts',
    excludePrivate: true,
    excludeProtected: true,
    ignoreCompilerErrors: true,  // ignore errors loading .dot templates
    mode: 'file',
    name: 'Free Touch Pricker',
    out: paths.docsPath,
};
