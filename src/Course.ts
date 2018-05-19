/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

/// <reference path="AbstractSix.ts" />
/// <reference path="Call.ts" />
/// <reference path="Row.ts" />
/// <reference path="SerialContainer.ts" />
/// <reference path="SixType.ts" />

namespace Pricker {

    /**
     * A course, being a set of sixes
     */
    export class Course extends SerialContainer<AbstractSix> {

        /**
         * Type of the first six
         */
        private _firstSixType: SixType = SixType.Slow;

        /* PrintableMixin methods *********************************************/

        /**
         * Path for this class' templates
         */
        public readonly templatePath: string = 'Course';

        /* SerialContainer methods ********************************************/

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
         * @param initialRow  initial row for the block
         * @param index       index of block in container
         */
        protected createBlock(initialRow: Row, index: number): AbstractSix {
            return ((this._firstSixType || SixType.Slow) + index) % 2
                ? new Slow(initialRow, {'container': this, 'index': index})
                : new Quick(initialRow, {'container': this, 'index': index});
        }

        /**
         * Lower limit on length for the particular concrete class
         */
        protected readonly minLength: number = 2;

        /**
         * Upper limit on length for the particular concrete class
         */
        protected readonly maxLength: number = 60;

        /* Course methods *****************************************************/

        /**
         * Returns the course end
         */
        public getEnd: () => Row = this.getLast;

        /**
         * Read access to the sixes
         */
        public getSixes: () => AbstractSix[] = this.getBlocks;

        /**
         * Read access to a six
         */
        public getSix: (index: number) => AbstractSix = this.getBlock;

        /**
         * Read access to the type of the first six
         */
        public getFirstSixType(): SixType {
            return this._firstSixType;
        }

        /**
         * Write access to the type of the first six
         */
        public setFirstSixType(type: SixType): this {
            if (this._firstSixType === type) {
                return this;  // nothing to do
            }

            this._firstSixType = type;

            // Create a new array of sixes with the correct parity
            let initialRow = this._initialRow;
            const newSixes: AbstractSix[] = [];
            for (let index = 1; index <= this.getLength(); index += 1) {
                newSixes[index - 1] = this.createBlock(initialRow, index);
                newSixes[index - 1].setCall(this.getSix(index).getCall());
                initialRow = newSixes[index - 1].getLast();
            }

            this._blocks = newSixes;

            return this;
        }

        /**
         * Resets the course to be the default length
         */
        public resetLength(): this {
            this.setLength(this.getDefaultLength(this._initialRow));
            return this;
        }

        /**
         * Makes the course into a plain course
         */
        public resetCalls(): this {
            for (const six of this._blocks) {
                six.setCall(Call.Plain, false);  // Avoid multiple updates...
            }

            // ... and trigger one at the end
            this.getSix(1).setCall(Call.Plain);

            return this;
        }

        /**
         * Checks whether this is a plain course
         */
        public isPlain(): boolean {
            for (const six of this._blocks) {
                if (six.getCall()) {
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
            cloned.setLength(this.getLength());
            cloned.setFirstSixType(this.getFirstSixType());

            // Copy across all the calls
            for (let index = 1; index <= this.getLength(); index += 1) {
                cloned.getSix(index).setCall(
                    this.getSix(index).getCall(),
                    false,  // Avoid multiple updates...
                );
            }

            // ... and trigger one at the end
            cloned.getSix(1).setCall(this.getSix(1).getCall());

            return cloned;
        }

        /**
         * Creates a new course from a string representation
         */
        public static fromString(initialRow: Row, input: string): Course {
            const course: Course = new Course(initialRow),
                patCourseEnd: string = '[0-9a-z]{3,15}',
                patCall: string = '(?:\\d{1,2}|\\d{1,2}s|s\\d{1,2})',
                patSep: string = '[\\s.,]+',
                patCalling: string = patCall + '(?:' + patSep + patCall + ')*',
                patSixes: string = '\\((\\d{1,2})[^\\d\\)]*\\)',
                patAll: string = ''
                    + '^\\s*'
                    + '(?:' + patCourseEnd + '\\s+)?'
                    + '(' + patCalling + '|p)'  // group 1
                    + '(?:\\s+' + patSixes + ')?'  // group 2 in here
                    + '\\s*$',
                rxAll: RegExp = new RegExp(patAll, 'i'),
                matches: null | string[] = rxAll.exec(input);

            let calls: string[],
                i: number,
                call: string;

            if (!matches) {
                throw new Error('Cannot import course');
            }

            // Second group matches length of course
            if (matches[2]) {
                course.setLength(parseInt(matches[2]));
            }

            // If this is a plain course then our job is done
            if (matches[1] === 'p') {
                return course;
            }

            // Otherwise split up the calling and process
            calls = matches[1].split(new RegExp(patSep));
            for (i = 0; i < calls.length; i += 1) {
                call = calls[i];
                if (call.charAt(0) === 's') {
                    call = call.slice(1);
                    course.getSix(parseInt(call)).setCall(Call.Single);
                } else if (call.slice(-1) === 's') {
                    call = call.slice(0, -1);
                    course.getSix(parseInt(call)).setCall(Call.Single);
                } else {
                    course.getSix(parseInt(call)).setCall(Call.Bob);
                }
            }
            return course;
        }
    }
}
