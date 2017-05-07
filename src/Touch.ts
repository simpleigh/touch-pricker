/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="Row.ts" />
/// <reference path="Changes.ts" />
/// <reference path="Course.ts" />
/// <reference path="Stage.ts" />
/// <reference path="stringFromRow.ts" />
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
         * Estimates the number of rows in the block
         * The estimate doesn't take into account coming round part-way through
         */
        public estimateRows(): number {
            return 2 + super.estimateRows();
        }

        /* PrintableMixin methods *********************************************/

        /**
         * Path for this class' templates
         */
        public readonly templatePath: string = 'Touch';

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
         * @param initialRow  initial row for the block
         * @param index       index of block in container
         */
        protected createBlock(initialRow: Row, index: number): Course {
            return new Course(initialRow, {'container': this, 'index': index});
        }

        /**
         * Lower limit on length for the particular concrete class
         */
        protected readonly minLength: number = 0;

        /**
         * Upper limit on length for the particular concrete class
         */
        protected readonly maxLength: number = 100;

        /* Touch methods ******************************************************/

        /**
         * Read access to the courses
         */
        public getCourses: () => Course[] = this.getBlocks;

        /**
         * Read access to a course
         */
        public getCourse: (index: number) => Course = this.getBlock;

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
            const course: Course = this.getCourse(index);

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
            for (let i: number = index; i <= this.getLength(); i += 1) {
                this.getCourse(i).setOwnership({'container': this, 'index': i});
            }
        }

        /**
         * Creates a new touch from a string representation
         */
        public static fromString(input: string): Touch {
            const lines: string[] = input.split('\n');

            let i: number,
                line: string,
                course: Course,
                touch: Touch | undefined;

            // Process each input line, making text substitutions
            for (i = 0; i < lines.length; i += 1) {
                line = lines[i];

                // Drop any content after comment characters "//"
                line = line.replace(/\/\/.*$/, '');

                // Ignore a microsiril comment "/" at the start of a line
                line = line.replace(/^\//, '');

                // Skip this line if it's blank
                if (/^\s*$/.test(line)) {
                    continue;
                }

                if (!touch) {
                    // Create the touch with a stage based on the first line
                    line = line.replace(/\s/g, '');
                    if (!Stage[line.length]) {
                        throw new Error('Cannot recognise stage');
                    }
                    touch = new Touch(rowFromString('231', line.length));
                } else {
                    // Create a course for each remaining line
                    course = Course.fromString(touch.getEnd(), line);
                    touch.insertCourse(touch.getLength() + 1, course);
                }
            }

            if (!touch) {
                throw new Error('No input lines');
            }

            return touch;
        }
    }
}
