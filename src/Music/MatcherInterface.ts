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
         * Interface supported by classes that can match a row for music
         */
        export interface MatcherInterface {

            /**
             * Matches a row
             */
            match(row: Row): MatchResult;

            /**
             * Provides read access to the name
             */
            getName(): string;

            /**
             * Provides read access to the count of matches
             */
            getMatches(): number;

        }

    }

}
