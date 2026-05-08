/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-26 Leigh Simpson. All rights reserved.
 */

/**
 * Configuration for TypeDoc
 * @see https://typedoc.org/documents/Options.Configuration.html
 */

'use strict';

const { OptionDefaults, TypeDocOptions } = require('typedoc');

const { paths } = require('./config');

/** @type {TypeDocOptions} */
module.exports = {
    // This specifies all of the block tags that TypeDoc considers to be valid.
    // https://typedoc.org/documents/Options.Comments.html#blocktags
    blockTags: [...OptionDefaults.blockTags, '@copyright'],

    // Specifies the entry points to be documented by TypeDoc.
    // @see https://typedoc.org/documents/Options.Input.html#entrypoints
    entryPoints: [paths.srcEntryFile],

    // Exclude files by the given pattern when a path is provided as source.
    // @see https://typedoc.org/documents/Options.Input.html#exclude
    exclude: '**/*.spec.ts',

    // Prevent externally resolved TypeScript files from being documented.
    // @see https://typedoc.org/documents/Options.Input.html#excludeexternals
    excludeExternals: true,

    // Removes private class members from the generated documentation.
    // @see https://typedoc.org/documents/Options.Input.html#excludeprivate
    excludePrivate: true,

    // Set the name of the project that will be used in the header of the
    // template.
    // @see https://typedoc.org/documents/Options.Input.html#name
    name: 'Free Touch Pricker',

    // Defines additional links to be included in the page header.
    // @see https://typedoc.org/documents/Options.Output.html#navigationlinks
    navigationLinks: {
        Examples: 'https://touch-pricker.simpleigh.com/examples/',
        GitHub: 'https://github.com/simpleigh/touch-pricker',
    },

    // Specifies the location the html documentation should be written to.
    // @see https://typedoc.org/documents/Options.Output.html#out
    out: paths.docsPath,

    // Specifies the plugins that should be loaded.
    // @see https://typedoc.org/documents/Options.Configuration.html#plugin
    plugin: ['typedoc-plugin-missing-exports'],

    // Causes TypeDoc to treat any reported warnings as fatal errors that can
    // prevent documentation from being generated.
    // @see https://typedoc.org/documents/Options.Validation.html#treatwarningsaserrors
    treatWarningsAsErrors: true,
};
