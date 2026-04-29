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
    // Specifies the entry points to be documented by TypeDoc.
    // @see https://typedoc.org/options/input/#entrypoints
    entryPoints: [paths.srcEntryFile],

    // Exclude files by the given pattern when a path is provided as source.
    // @see https://typedoc.org/options/input/#exclude
    exclude: '**/*.spec.ts',

    // Prevent externally resolved TypeScript files from being documented.
    // @see https://typedoc.org/options/input/#excludeexternals
    excludeExternals: true,

    // Removes private class members from the generated documentation.
    // @see https://typedoc.org/options/input/#excludeprivate
    excludePrivate: true,

    // Set the name of the project that will be used in the header of the
    // template.
    // @see https://typedoc.org/options/input/#name
    name: 'Free Touch Pricker',

    // Specifies the location the html documentation should be written to.
    // @see https://typedoc.org/options/output/#out
    out: paths.docsPath,

    // Specifies the plugins that should be loaded.
    // @see https://typedoc.org/options/configuration/#plugin
    plugin: ['typedoc-plugin-missing-exports'],

    // Causes TypeDoc to treat any reported warnings as fatal errors that can
    // prevent documentation from being generated.
    // @see https://typedoc.org/options/validation/#treatwarningsaserrors
    treatWarningsAsErrors: true,
};
