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

        /* AbstractBlock methods **********************************************/

        /**
         * Provides the path for this class' templates
         */
        protected getTemplatePath(): string {
            return 'Course';
        }

        /**
         * Provides template data
         *
         * Derived classes may override this to provide more data to templates
         */
        protected getTemplateData(): any {
            const data: any = super.getTemplateData();
            data.isPlain = this.isPlain();
            return data;
        }

        /* AbstractContainer methods ******************************************/

        /**
         * Returns the default length of new containers of this type
         *
         * Derived classes should override this method if required.
         */
        protected getDefaultLength(initialRow: Row): number {
            return initialRow.length * 2;
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
         * Checks whether this is a plain course
         */
        public isPlain(): boolean {
            let index: number;

            for (index = 1; index <= this.getLength(); index++) {
                if (this.getSix(index).getCall()) {
                    return false;
                }
            }

            return true;
        }

        /**
         * Clones the course
         */
        public clone(): Course {
            const cloned: Course = new Course(this._initialRow);
            let index: number;

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
