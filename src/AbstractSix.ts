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
/// <reference path="TemplateContext.ts" />
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
            protected _index?: number,
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
            this._end = this._initialRow.slice(); // Create new array
            Changes.permuteCall(this._end, this._call);
            this.applySixTransposition();
        }

        /**
         * Returns the end row
         */
        public getEnd(): Row {
            return this._end.slice();
        }

        /**
         * Estimates the number of rows in the block
         * The estimate doesn't take into account coming round part-way through
         */
        public estimateRows(): number {
            return 6;
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
         * Finishes transposing the end row depending upon the type of six
         */
        protected abstract applySixTransposition(): void;

        /**
         * Computes the first row of the six by applying notation <n>
         */
        protected getFirstRow(): Row {
            const row: Row = this._initialRow.slice();
            Changes.permuteCall(row, this._call);
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
            visitor.visit(oddRow, this);
            visitor.visit(evenRow, this);

            oddRotator(oddRow);
            evenRotator(evenRow);

            visitor.visit(oddRow, this);
            visitor.visit(evenRow, this);

            oddRotator(oddRow);
            evenRotator(evenRow);

            visitor.visit(oddRow, this);
            visitor.visit(evenRow, this);

            return this;
        }
    }
}
