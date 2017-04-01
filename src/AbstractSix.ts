/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="Bell.ts" />
/// <reference path="Row.ts" />
/// <reference path="Call.ts" />
/// <reference path="Changes.ts" />
/// <reference path="AbstractBlock.ts" />
/// <reference path="AbstractContainer.ts" />
/// <reference path="Visitor/Abstract.ts" />

namespace Pricker {
    'use strict';

    /**
     * Base class for sixes
     */
    export abstract class AbstractSix extends AbstractBlock {
        /**
         * Six end of this six
         */
        protected _end: Row;

        /**
         * Call used to start the six
         */
        protected _call: Call;

        /**
         * Constructor
         */
        constructor(
            initialRow: Row,
            protected _container?: AbstractContainer<AbstractSix>,
            protected _index?: number
        ) {
            super(initialRow, _container, _index);
            this._call = Call.Plain;
            this.calculate();
        }

        /* AbstractBlock methods **********************************************/

        /**
         * Does any calculation needed by the block
         */
        protected calculate(): void {
            let n: number;
            this._end = this._initialRow.slice(); // Create new array

            this.transposeFrontThree();

            // Odd places go up
            for (n = 4; n < this._end.length; n += 2) {
                this._end[n] = this._initialRow[n - 2];
            }

            // Even places go in
            for (n = 5; n < this._end.length; n += 2) {
                this._end[n - 2] = this._initialRow[n];
            }

            // Random stuff happens at the back
            n = this._end.length - 1;
            if (this._call === Call.Plain) {
                this._end[n - 1] = this._initialRow[n];
            } else {
                this._end[n - 3] = this._initialRow[n - 2];
                if (this._call === Call.Bob) {
                    this._end[n - 1] = this._initialRow[n - 1];
                    this._end[n] = this._initialRow[n];
                } else {
                    this._end[n - 1] = this._initialRow[n];
                    this._end[n] = this._initialRow[n - 1];
                }
            }
        }

        /**
         * Returns the end row
         */
        public getEnd(): Row {
            return this._end.slice();
        }

        /* AbstractSix methods ************************************************/

        /**
         * Read access to the call
         */
        public getCall(): Call {
            return this._call;
        }

        /**
         * Write access to the call
         */
        public setCall(call: Call, update: boolean = true): AbstractSix {
            this._call = call;
            if (update) {
                this.calculate();
                this.notifyContainer();
            }
            return this;
        }

        /**
         * Toggles the call type between Plain -> Bob -> Single -> Plain
         */
        public toggleCall(): Call {
            const call: Call = (this._call + 1) % 3;
            this.setCall(call);
            return call;
        }

        /**
         * Transposes the front three bells depending upon the type of six
         */
        protected abstract transposeFrontThree(): AbstractSix;

        /**
         * Computes the first row of the six by applying notation <n>
         */
        protected getFirstRow(): Row {
            const row: Row = this._initialRow.slice();

            if (this._call === Call.Plain) {
                Changes.permuteN(row);
            } else if (this._call === Call.Bob) {
                Changes.permuteBob(row);
            } else if (this._call === Call.Single) {
                Changes.permuteSingle(row);
            }

            return row;
        }

        /**
         * Rotates the first three bells forwards (abc -> bca)
         */
        protected forwardRotator(row: Row): void {
            const bell: Bell = row[0];
            row[0] = row[1];
            row[1] = row[2];
            row[2] = bell;
        }

        /**
         * Rotates the first three bells backwards (abc -> cab)
         */
        protected backwardRotator(row: Row): void {
            const bell: Bell = row[2];
            row[2] = row[1];
            row[1] = row[0];
            row[0] = bell;
        }

        /**
         * Visits all rows of the six
         * @param {Visitor.AbstractVisitor} visitor     - visitor being used
         * @param {Row}                     oddRow      - row 1
         * @param {(row: Row) => void}      oddRotator  - rotator row 1 -> row 3
         * @param {Row}                     evenRow     - row 2
         * @param {(row: Row) => void}      evenRotator - rotator row 2 -> row 4
         */
        protected acceptHelper(
            visitor: Visitor.AbstractVisitor,
            oddRow: Row,
            oddRotator: (row: Row) => void,
            evenRow: Row,
            evenRotator: (row: Row) => void,
        ): this {
            visitor.visit(oddRow);
            visitor.visit(evenRow);

            oddRotator(oddRow);
            evenRotator(evenRow);

            visitor.visit(oddRow);
            visitor.visit(evenRow);

            oddRotator(oddRow);
            evenRotator(evenRow);

            visitor.visit(oddRow);
            visitor.visit(evenRow);

            return this;
        }
    }
}
