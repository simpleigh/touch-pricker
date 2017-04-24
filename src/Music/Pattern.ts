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
             * @param {string}   pattern   - String to match
             * @param {string}   name      - Name of this pattern
             * @param {boolean}  terminate - Stop matching after this pattern
             * @param {number}   start     - First row character to match
             * @param {number}   end       - Last row character to match
             */
            constructor(
                protected _pattern: string,
                protected _name: string,
                protected _terminate: boolean = false,
                protected _start?: number,
                protected _end?: number,
            ) {
                // NOOP
            }

            /**
             * Matches a row
             */
            public match(row: Row): MatchResult {
                const rowString = stringFromRow(row),
                    result: MatchResult = {
                        'isMatch': false,
                        'text': this._name,
                        'terminate': this._terminate,
                    };

                if (rowString.slice(this._start, this._end) === this._pattern) {
                    result.isMatch = true;
                }

                return result;
            }

        }

    }

}
