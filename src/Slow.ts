/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="AbstractSix.ts" />
/// <reference path="Visitor/Abstract.ts" />

namespace Pricker {
    'use strict';

    /**
     * A slow six
     */
    export class Slow extends AbstractSix {

        /* AbstractBlock methods **********************************************/

        /**
         * Receives a visitor that will be called to process each row
         */
        public accept(visitor: Visitor.AbstractVisitor): this {
            let oddRow: Row = this.getFirstRow(),
                evenRow: Row = oddRow.slice(),
                bell: Bell;

            this.swapBackBells(evenRow);

            // Notation <3>
            bell = evenRow[1];
            evenRow[1] = evenRow[0];
            evenRow[0] = bell;

            return this.acceptHelper(
                visitor,
                oddRow,
                this.forwardRotator,
                evenRow,
                this.backwardRotator
            );
        }

        /* AbstractSix methods ************************************************/

        /**
         * Transposes the front three bells depending upon the type of six
         */
        protected transposeFrontThree(): AbstractSix {
            this._end[0] = this._initialRow[1];
            this._end[1] = this._initialRow[3];
            this._end[2] = this._initialRow[0];
            return this;
        }
    }
}
