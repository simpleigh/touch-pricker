/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

namespace Pricker {
    'use strict';

    /**
     * Container for templates
     *
     * Dictionary of template functions that map data to a string
     */
    // tslint:disable-next-line:variable-name
    export let Templates: {[index: string]: (data: any) => string} = { };
}
