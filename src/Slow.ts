/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

/// <reference path="AbstractSix.ts" />
/// <reference path="Changes.ts" />
/// <reference path="SixType" />
/// <reference path="Visitor/Abstract.ts" />

namespace Pricker {

    /**
     * A slow six
     */
    export class Slow extends AbstractSix {

        /**
         * Type of the six
         */
        public readonly type = SixType.Slow;

        /**
         * Notation (excluding call)
         */
        public static readonly notation = ['3', '1', '3', '1', '3'];
        public readonly notation = Slow.notation;

        /* AbstractBlock methods **********************************************/

        /**
         * Receives a visitor that will be called to process each row
         */
        public accept(...visitors: Visitor.AbstractVisitor[]): this {
            const row = this.getInitialRow();

            for (const visitor of visitors) {
                Changes.permuteCall(row, this._call);
                visitor.visit(row, this);

                Changes.permute3(row);
                visitor.visit(row, this);

                Changes.permute1(row);
                visitor.visit(row, this);

                Changes.permute3(row);
                visitor.visit(row, this);

                Changes.permute1(row);
                visitor.visit(row, this);

                visitor.visit(this._end, this);
            }

            return this;
        }

        /* AbstractSix methods ************************************************/

        /**
         * Transposes the front three bells depending upon the type of six
         */
        protected applySixTransposition(): void {
            Changes.permute1(this._end);
        }

    }

}
