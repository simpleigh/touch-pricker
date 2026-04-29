/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

/**
 * Jest transformer for `.dot` files.
 *
 * Allows Jest to load our doT.js templates.
 *
 * > Jest runs the code of your project as JavaScript, hence a transformer is
 * > needed if you use some syntax not supported by Node out of the box.
 * @see https://jestjs.io/docs/code-transformation
 */

'use strict';

const doT = require('dot');

const process = (sourceText) => {
    doT.templateSettings.varname = 'context';
    doT.templateSettings.selfcontained = true;

    // Export the compiled template as a CommonJS module.
    // N.b. this is affected by the `esModuleInterop` Typescript setting.
    const code = `module.exports = ${doT.template(sourceText)};`;

    return { code };
};

module.exports = {
    process,
};
