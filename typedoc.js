/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

/**
 * Configuration for TypeDoc
 * @see https://typedoc.org/options/configuration/
 */

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
