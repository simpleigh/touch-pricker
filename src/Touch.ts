/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="Row.ts" />
/// <reference path="Changes.ts" />
/// <reference path="Visitor/Abstract.ts" />

namespace Pricker {
    'use strict';

    /**
     * A touch, being a set of courses
     */
    export class Touch extends AbstractContainer<Course> {

        /* AbstractBlock methods **********************************************/

        /**
         * Receives a visitor that will be called to process each row
         */
        public accept(visitor: Visitor.AbstractVisitor): this {
            const row: Row = this._initialRow.slice();

            Changes.permute1(row);  // Go backwards one change from _initialRow
            visitor.visit(row);
            visitor.visit(this._initialRow);

            return super.accept(visitor);
        }

        /**
         * Provides the path for this class' templates
         */
        protected getTemplatePath(): string {
            return 'Touch';
        }

        /* AbstractContainer methods ******************************************/

        /**
         * Returns the default length of new containers of this type
         *
         * Derived classes should override this method if required.
         */
        protected getDefaultLength(initialRow: Row): number {
            return 0;
        }

        /**
         * Creates a new block for the container
         *
         * Used by extend() when creating the container or increasing its
         * length.
         * @param {Row}     initialRow - initial row for the block
         * @param {number}  index      - index of block in container
         */
        protected createBlock(initialRow: Row, index: number): Course {
            return new Course(initialRow, this, index);
        }

        /**
         * Returns the limits on length for the particular concrete class
         *
         * minimum, maximum
         */
        protected getLengthLimits(): [number, number] {
            return [0, 100];
        }

        /* Touch methods ******************************************************/

        /**
         * Read access to courses
         */
        public getCourse(index: number): Course {
            return this.getBlock(index);
        }

        /**
         * Inserts a course at the specified index
         */
        public insertCourse(index: number, course: Course): this {
            this._blocks.splice(index - 1, 0, course);
            this.fixupOwnership(index);

            this.notify(index - 1);
            return this;
        }

        /**
         * Deletes the course at the specified index
         */
        public deleteCourse(index: number): Course {
            const course: Course = this.getBlock(index);

            this._blocks.splice(index - 1, 1);
            course.clearOwnership();
            this.fixupOwnership(index);

            this.notify(index - 1);
            return course;
        }

        /**
         * Helper to fixup ownership of blocks
         */
        private fixupOwnership(index: number): void {
            for (let i: number = index; i <= this.getLength(); i++) {
                this.getCourse(i).setOwnership(this, i);
            }
        }
    }
}
