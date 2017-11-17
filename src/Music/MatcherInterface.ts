/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../PrintableMixin" />

namespace Pricker {

    /**
     * Music classes to analyse rows
     */
    export namespace Music {

        /**
         * Interface supported by classes that can match a row for music
         */
        export interface MatcherInterface extends PrintableMixin {

            /**
             * Matches a row string
             */
            match(row: string): boolean;

            /**
             * Provides read access to the name
             */
            getName(): string;

            /**
             * Provides read access to the count of matches
             */
            getMatchCount(): number;

        }

    }

}
