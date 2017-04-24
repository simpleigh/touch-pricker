/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../Row.ts" />
/// <reference path="../stringFromRow.ts" />
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
        export class Pattern {

            /**
             * Constructor
             * @param {string}     pattern   - String to match
             * @param {string}     name      - Name of this pattern
             * @param {boolean}    terminate - Stop matching after this pattern
             * @param {MatchType}  type      - Type of match
             */
            constructor(
                protected _pattern: string,
                protected _name: string,
                protected _terminate: boolean = false,
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
                        'terminate': this._terminate,
                    };

                let rowString = stringFromRow(row);

                if (this._type === MatchType.End) {
                    rowString = rowString.slice(-this._pattern.length);
                } else if (this._type === MatchType.Start) {
                    rowString = rowString.slice(0, this._pattern.length);
                }

                if (rowString === this._pattern) {
                    result.isMatch = true;
                }

                return result;
            }

        }

    }

}
