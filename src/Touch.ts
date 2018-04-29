/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

/// <reference path="Changes.ts" />
/// <reference path="Course.ts" />
/// <reference path="RandomAccessContainer.ts" />
/// <reference path="Row.ts" />
/// <reference path="Stage.ts" />
/// <reference path="Visitor/Abstract.ts" />

namespace Pricker {

    /**
     * A touch, being a set of courses
     */
    export class Touch extends RandomAccessContainer<Course> {

        /* AbstractBlock methods **********************************************/

        /**
         * Receives a visitor that will be called to process each row
         */
        public accept(...visitors: Visitor.AbstractVisitor[]): this {
            const row: Row = this._initialRow.slice();

            Changes.permute1(row);  // Go backwards one change from _initialRow

            for (const visitor of visitors) {
                visitor.visit(row);
                visitor.visit(this._initialRow);
            }

            return super.accept(...visitors);
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
         * Propagates data from a previous block to a current block
         */
        protected propagateCurrentBlock(
            previous: Course,
            current: Course,
        ): void {
            const sixType = previous.getSix(previous.getLength()).type;
            current.setInitialRow(previous.getLast());
            current.setFirstSixType((sixType + 1) % 2);
        }

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
        public insertCourse: (index: number, course: Course) => this =
            this.insertBlock;

        /**
         * Deletes the course at the specified index
         */
        public deleteCourse: (index: number) => Course = this.deleteBlock;

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
                    course = Course.fromString(touch.getLast(), line);
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
