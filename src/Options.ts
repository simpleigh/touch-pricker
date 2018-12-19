/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-19 Leigh Simpson. All rights reserved.
 */

import Type from './Type';

/**
 * Interface for options passed to create()
 */
interface Options {

    /**
     * Whether to package the pricker in an iframe.
     * @default true
     */
    iframe?: boolean;

    /**
     * Pricker type
     * @default 'mbd'
     */
    type?: Type;

}

export default Options;
