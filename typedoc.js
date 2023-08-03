'use strict';

const { paths } = require('./config');

/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
    entryPoints: [paths.srcEntryFile],
    exclude: '**/*.spec.ts',
    excludeExternals: true,
    excludePrivate: true,
    name: 'Free Touch Pricker',
    out: paths.docsPath,
    plugin: ['typedoc-plugin-missing-exports'],
    treatWarningsAsErrors: true,
};
