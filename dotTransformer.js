/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

'use strict';

const doT = require('dot');

const process = (sourceText) => {
    doT.templateSettings.varname = 'context';
    doT.templateSettings.selfcontained = true;
    const code = `module.exports = ${doT.template(sourceText)};`;
    return { code };
};

module.exports = {
    process,
};
