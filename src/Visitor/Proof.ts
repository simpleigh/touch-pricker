/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../AbstractSix.ts" />
/// <reference path="../BlockDirectory.ts" />
/// <reference path="../Row.ts" />
/// <reference path="../stringFromRow.ts" />
/// <reference path="Abstract.ts" />

namespace Pricker {
    'use strict';

    /**
     * Visitor classes to analyse blocks
     */
    export namespace Visitor {

        /**
         * Visitor for proving touches
         *
         * Stores the rows that have been visited and reports when whether any
         * rows were repeated.
         * This visitor also accumulates a [[BlockDirectory]] referencing
         * each block containing a false row.
         */
        export class Proof extends AbstractVisitor {

            /**
             * Log of rows that we've seen.
             * Rows are accumulated into a dictionary indexed by the string
             * representation of a row (the JavaScript implementation will thus
             * store a hash table, ensuring good performance).
             * Each value is an array of all blocks that contain the indexed
             * row.
             */
            private _rowCounts:
                { [index: string]: Array<AbstractSix | undefined> } = { };

            /**
             * Directory of false blocks.
             */
            private _directory: Pricker.BlockDirectory =
                new Pricker.BlockDirectory();

            /**
             * Flag recording truth.
             * Truth can easily be calculated from [[_rowCounts]], but keeping a
             * flag up-to-date is a simple optimisation to avoid iterating over
             * this property each time we check truth.
             */
            private _isTrue: boolean = true;

            /**
             * Reports the number of times each row has been processed.
             * Processes [[_rowCounts]] to convert each array of blocks into a
             * count.
             * @returns Dictionary containing the count of each row seen,
             * indexed by the string representation of that row.
             */
            public getRowCounts(): { [index: string]: number } {
                const result: { [index: string]: number } = { };

                for (const rowString in this._rowCounts) {
                    if (this._rowCounts.hasOwnProperty(rowString)) {
                        result[rowString] = this._rowCounts[rowString].length;
                    }
                }

                return result;
            }

            /**
             * Reports on the distribution of falseness within a touch by
             * providing public access to [[_directory]].
             */
            public getDirectory(): Pricker.BlockDirectory {
                return this._directory;
            }

            /**
             * Reports whether a touch is true by providing public access to
             * [[_isTrue]].
             */
            public isTrue(): boolean {
                return this._isTrue;
            }

            /* AbstractVisitor methods ****************************************/

            /**
             * Receives a row for processing.
             */
            protected visitImplementation(row: Row, six?: AbstractSix): void {
                const rowString: string = stringFromRow(row);

                if (rowString in this._rowCounts) {
                    // Already seen - i.e. false

                    if (this._rowCounts[rowString].length === 1) {
                        // First time this row has run false
                        // need to add the previous block to the directory
                        const previousSix = this._rowCounts[rowString][0];
                        if (previousSix) {
                            this._directory.add(previousSix);
                        }
                    }

                    this._isTrue = false;
                    if (six) {
                        this._directory.add(six);
                    }
                    this._rowCounts[rowString].push(six);

                } else {
                    // Not seen - i.e. true
                    this._rowCounts[rowString] = [six];
                }
            }

        }

    }

}
