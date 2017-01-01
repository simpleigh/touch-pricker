/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="Stage.ts" />
/// <reference path="Row.ts" />
/// <reference path="AbstractContainer.ts" />

namespace Pricker {
    'use strict';

    /**
     * A course, being a set of sixes
     */
    export class Course extends AbstractContainer<AbstractSix> {

        /* AbstractContainer methods ******************************************/

        /**
         * Returns the default length of new containers of this type
         * 
         * Derived classes should override this method if required.
         */
        protected getDefaultLength(initialRow: Row): number {
            let stage: Stage = initialRow.length;
            return stage * 2;
        }

        /**
         * Creates a new block for the container
         * 
         * Used by extend() when creating the container or increasing its
         * length.
         * @param {Row}     initialRow - initial row for the block
         * @param {number}  index      - index of block in container
         */
        protected createBlock(initialRow: Row, index: number): AbstractSix {
            return index % 2
                ? new Slow(initialRow, this, index)
                : new Quick(initialRow, this, index);
        }

        /**
         * Returns the limits on length for the particular concrete class
         * 
         * minimum, maximum
         */
        protected getLengthLimits(): [number, number] {
            return [2, 60];
        }

        /* Course methods *****************************************************/

        /**
         * Read access to sixes
         */
        public getSix(six: number): AbstractSix {
            return this.getBlock(six);
        }

        /**
         * Clones the course
         */
        public clone(): Course {
            let cloned: Course = new Course(this._initialRow),
                index: number;

            cloned.setLength(this.getLength());

            // Copy across all the calls
            for (index = 1; index <= this.getLength(); index++) {
                cloned.getSix(index).setCall(this.getSix(index).getCall());
            }
            cloned.notify(1);

            return cloned;
        }
    }
}
