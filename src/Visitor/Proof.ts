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
            protected _rowBlocks: { [index: string]: AbstractBlock[] } = { };

            /**
             * Flag recording truth
             */
            protected _isTrue: boolean = true;

            /**
             * Read access to row counts
             */
            public getRowCounts(): { [index: string]: number } {
                const result: { [index: string]: number } = { };

                for (const rowString in this._rowBlocks) {
                    if (this._rowBlocks.hasOwnProperty(rowString)) {
                        result[rowString] = this._rowBlocks[rowString].length;
                    }
                }

                return result;
            }

            /**
             * Receives a row for processing
             */
            public visitImplementation(row: Row, block: AbstractBlock): void {
                const rowString: string = stringFromRow(row);
                if (rowString in this._rowBlocks) {
                    // Already seen - i.e. false
                    this._rowBlocks[rowString].push(block);
                    this._isTrue = false;
                } else {
                    // Not seen - i.e. true
                    this._rowBlocks[rowString] = [block];
                }
            }

            /**
             * Checks whether the visited touch was true
             */
            public isTrue(): boolean {
                return this._isTrue;
            }
        }

    }

}
