/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

namespace Pricker {
    'use strict';

    /**
     * Music classes to analyse rows
     */
    export namespace Music {

        /**
         * Result of matching a row for music
         */
        export interface MatchResult {

            /**
             * Whether this result represents a match
             */
            isMatch: boolean;

        }

    }

}
