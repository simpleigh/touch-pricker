/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="Row.ts" />
/// <reference path="Changes.ts" />
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
            const oddRow: Row = this.getFirstRow(),
                evenRow: Row = oddRow.slice();

            Changes.permute3(evenRow);

            return this.acceptHelper(
                visitor,
                oddRow,
                this.forwardRotator,
                evenRow,
                this.backwardRotator,
            );
        }

        /* PrintableMixin methods *********************************************/

        /**
         * Path for this class' templates
         */
        public readonly templatePath: string = 'Slow';

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
