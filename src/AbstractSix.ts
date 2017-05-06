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
        protected _call: Call = Call.Plain;

        /**
         * Constructor
         */
        constructor(
            initialRow: Row,
            protected _container?: AbstractContainer<AbstractSix>,
            protected _index?: number,
        ) {
            super(initialRow, _container, _index);
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

    }

}
