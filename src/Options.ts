/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

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
     * Type of pricker to render
     * @default 'stedman'
     */
    type?: 'grandsire' | 'stedman' | 'stedturn';
}

export default Options;
