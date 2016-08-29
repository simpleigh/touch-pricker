/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-16 Leigh Simpson. All rights reserved.
 */

/// <reference path="Row.ts" />
/// <reference path="Call.ts" />
/// <reference path="AbstractBlock.ts" />
/// <reference path="AbstractContainer.ts" />


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
        public setCall(call: Call): AbstractSix {
            this._call = call;
            this.calculate();
            this.notifyContainer();
            return this;
        }

        /**
         * Toggles the call type between Plain -> Bob -> Single -> Plain
         */
        public toggleCall(): Call {
            let call: Pricker.Call = (this._call % 3) + 1;
            this.setCall(call);
            return call;
        }

        /**
         * Transposes the front three bells depending upon the type of six
         */
        protected abstract transposeFrontThree(): AbstractSix;
    }
}
