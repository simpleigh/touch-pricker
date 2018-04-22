/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

/// <reference path="TemplateContext.ts" />

namespace Pricker {

    /**
     * Container for templates
     *
     * Dictionary of template functions that map data to a string
     */
    // tslint:disable-next-line:variable-name
    export let Templates: {
        [index: string]: (data: TemplateContext) => string,
    } = { };
}
