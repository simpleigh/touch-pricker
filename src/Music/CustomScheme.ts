/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

/// <reference path="AbstractScheme.ts" />
/// <reference path="MatcherInterface" />

namespace Pricker {

    /**
     * Music classes to analyse rows
     */
    export namespace Music {

        /**
         * Custom music matching scheme defined at runtime
         */
        export class CustomScheme extends AbstractScheme {

            /* MatcherInterface methods ***************************************/

            /**
             * Provides read access to the name
             */
            public getName(): string {
                return 'Custom scheme';
            }

            /* AbstractScheme methods *****************************************/

            /**
             * Create matchers for this scheme/stage
             */
            protected createMatchers(rounds: string): MatcherInterface[] {
                return [ ];
            }

            /* CustomScheme methods *******************************************/

            /**
             * Allows additional matchers to be added
             */
            public addMatcher(matcher: MatcherInterface) {
                this._matchers.push(matcher);
            }

        }

    }

}
