/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../AbstractBlock.ts" />
/// <reference path="../Row.ts" />
/// <reference path="../stringFromRow.ts" />
/// <reference path="Abstract.ts" />

namespace Pricker {
    'use strict';

    /**
     * Visitor classes to traverse blocks
     */
    export namespace Visitor {

        /**
         * Proof visitor that proves touches
         */
        export class Proof extends AbstractVisitor {
            /**
             * Log of rows that we've seen
             */
            protected _rowCounts: { [index: string]: number } = { };

            /**
             * Read access to row counts
             */
            public getRowCounts(): { [index: string]: number } {
                const result: { [index: string]: number } = { };

                for (const rowString in this._rowCounts) {
                    if (this._rowCounts.hasOwnProperty(rowString)) {
                        result[rowString] = this._rowCounts[rowString];
                    }
                }

                return result;
            }

            /**
             * Receives a row for processing
             */
            public visitImplementation(row: Row, block: AbstractBlock): void {
                const rowString: string = stringFromRow(row);
                if (rowString in this._rowCounts) {
                    this._rowCounts[rowString] += 1;
                } else {
                    this._rowCounts[rowString] = 1;
                }
            }

            /**
             * Checks whether the visited touch was true
             */
            public isTrue(): boolean {
                for (const rowString in this._rowCounts) {
                    if (this._rowCounts.hasOwnProperty(rowString)) {
                        if (this._rowCounts[rowString] > 1) {
                            return false;
                        }
                    }
                }
                return true;
            }
        }

    }

}
