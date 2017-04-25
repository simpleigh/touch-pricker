/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../Row.ts" />
/// <reference path="../stringFromRow.ts" />
/// <reference path="MatcherInterface.ts" />
/// <reference path="MatchResult.ts" />

namespace Pricker {
    'use strict';

    /**
     * Music classes to analyse rows
     */
    export namespace Music {

        /**
         * Pattern that can be used to match rows
         */
        export class Pattern implements MatcherInterface {

            /**
             * Count of matches
             */
            protected _matches: number = 0;

            /**
             * Constructor
             * @param {string}     pattern   - String to match
             * @param {string}     name      - Name of this pattern
             * @param {MatchType}  type      - Type of match
             */
            constructor(
                protected _pattern: string,
                protected _name: string,
                protected _type: MatchType = MatchType.All,
            ) {
                // NOOP
            }

            /**
             * Matches a row
             */
            public match(row: Row): MatchResult {
                const result: MatchResult = {
                        'isMatch': false,
                        'text': this._name,
                    };

                let rowString = stringFromRow(row);

                if (this._type === MatchType.End) {
                    rowString = rowString.slice(-this._pattern.length);
                } else if (this._type === MatchType.Start) {
                    rowString = rowString.slice(0, this._pattern.length);
                }

                if (rowString === this._pattern) {
                    result.isMatch = true;
                    this._matches += 1;
                }

                return result;
            }

            /**
             * Provides public access to the count of matches
             */
            public getMatches(): number {
                return this._matches;
            }

        }

    }

}
