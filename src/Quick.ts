/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="AbstractSix.ts" />
/// <reference path="Changes.ts" />
/// <reference path="Visitor/Abstract.ts" />

namespace Pricker {

    /**
     * A quick six
     */
    export class Quick extends AbstractSix {

        /* AbstractBlock methods **********************************************/

        /**
         * Receives a visitor that will be called to process each row
         */
        public accept(...visitors: Visitor.AbstractVisitor[]): this {
            const row = this.getInitialRow();

            for (const visitor of visitors) {
                Changes.permuteCall(row, this._call);
                visitor.visit(row, this);

                Changes.permute1(row);
                visitor.visit(row, this);

                Changes.permute3(row);
                visitor.visit(row, this);

                Changes.permute1(row);
                visitor.visit(row, this);

                Changes.permute3(row);
                visitor.visit(row, this);

                visitor.visit(this._end, this);
            }

            return this;
        }

        /* PrintableMixin methods *********************************************/

        /**
         * Path for this class' templates
         */
        public readonly templatePath: string = 'Quick';

        /* AbstractSix methods ************************************************/

        /**
         * Transposes the front three bells depending upon the type of six
         */
        protected applySixTransposition(): void {
            Changes.permute3(this._end);
        }

    }

}
