/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015 Leigh Simpson. All rights reserved.
 */

/**
 * Top-level namespace
 */
namespace Pricker {
    'use strict';


    /**
     * Bell number
     * 
     * n.b. Bell numbers are 1-indexed, i.e.:
     *   treble =  1
     *   eleven = 11
     */
    export type Bell = number;


    /**
     * Matches the number of bells to the name of each stage
     */
    export enum Stage {
        Triples = 7,
        Caters = 9,
        Cinques = 11,
        Sextuples = 13,
        Septuples = 15,
    }


    /**
     * Symbols to be used for bells
     */
    const BELL_SYMBOLS: string = ' 1234567890ETABC';


    /**
     * Lookup table from bell characters back to numbers
     */
    const BELL_SYMBOLS_REVERSE: any = {
        '1': 1, '2': 2, '3': 3, '4': 4, '5': 5,
        '6': 6, '7': 7, '8': 8, '9': 9, '0': 10,
        'E': 11, 'T': 12, 'A': 13, 'B': 14, 'C': 15,
    };


    /**
     * A row (permutation of bells)
     */
    export type Row = Bell[];


    /**
     * Converts a string into a row array
     */
    export function rowFromString(input: string, stage: Stage): Row {
        let bellNumber: Bell,
            bellsSeen: boolean[] = [],
            inputIndex: number,
            output: Row = [];

        input = input.toUpperCase();

        if (input.length > stage) {
            throw new Error('Row too long');
        }

        // Build a table to record when we've seen each bell
        for (bellNumber = 1; bellNumber <= stage; bellNumber += 1) {
            bellsSeen[bellNumber] = false;
        }

        for (
            inputIndex = 0;
            inputIndex < input.length && inputIndex < stage;
            inputIndex += 1
        ) {
            bellNumber = BELL_SYMBOLS_REVERSE[input[inputIndex]];

            if (bellNumber && bellNumber <= stage) {
                if (bellsSeen[bellNumber]) {
                    throw new Error('Bell repeated');
                }
                output.push(bellNumber);
                bellsSeen[bellNumber] = true;
            } else {
                throw new Error('Unknown bell');
            }
        }

        if (input.length < stage) {
            for (bellNumber = 1; bellNumber <= stage; bellNumber += 1) {
                if (!bellsSeen[bellNumber]) {
                    output.push(bellNumber);
                }
            }
        }

        return output;
    }


    /**
     * Converts a row array to a string
     */
    export function stringFromRow(row: Row): string {
        let bellCharacters: string[] = [],
            bellIndex: number;

        for (bellIndex = 0; bellIndex < row.length; bellIndex += 1) {
            bellCharacters.push(BELL_SYMBOLS[row[bellIndex]]);
        }

        return bellCharacters.join('');
    }


    /**
     * Types of call
     * @enum {number}
     */
    export enum Call {Plain = 1, Bob, Single};


    /**
     * Sixes, slow and quick
     */
    export namespace Six {

        /**
         * Base class for sixes
         */
        export abstract class AbstractSix {
            /**
             * Six end of the previous six
             */
            protected _previousSixEnd: Row;

            /**
             * Six end of this six
             */
            protected _sixEnd: Row;

            /**
             * Call used to start the six
             */
            protected _call: Call = Call.Plain;

            /**
             * Course that contains the six
             */
            protected _parent: Course;

            /**
             * Number of six within the course
             */
            protected _index: number;

            /**
             * Constructs the six
             * @param {Row}  previousSixEnd    - Six end of the previous six
             * @param {Course} parent          - Course that contains the six
             * @param {number} index           - Number of six within course
             */
            constructor(
                previousSixEnd: Row,
                parent: Course = undefined,
                index: number = undefined
            ) {
                this._previousSixEnd = previousSixEnd;
                this._parent = parent;
                this._index = index;
                this.calculateSixEnd();
            }

            /**
             * Recalculates the six end
             */
            protected calculateSixEnd(): this {
                let n: number;
                this._sixEnd = this._previousSixEnd.slice(); // Create new array

                this.transposeFrontThree();

                // Odd places go up
                for (n = 4; n < this._sixEnd.length; n += 2) {
                    this._sixEnd[n] = this._previousSixEnd[n - 2];
                }

                // Even places go in
                for (n = 5; n < this._sixEnd.length; n += 2) {
                    this._sixEnd[n - 2] = this._previousSixEnd[n];
                }

                // Random stuff happens at the back
                n = this._sixEnd.length - 1;
                if (this._call === Call.Plain) {
                    this._sixEnd[n - 1] = this._previousSixEnd[n];
                } else {
                    this._sixEnd[n - 3] = this._previousSixEnd[n - 2];
                    if (this._call === Call.Bob) {
                        this._sixEnd[n - 1] = this._previousSixEnd[n - 1];
                        this._sixEnd[n] = this._previousSixEnd[n];
                    } else {
                        this._sixEnd[n - 1] = this._previousSixEnd[n];
                        this._sixEnd[n] = this._previousSixEnd[n - 1];
                    }
                }

                return this;
            }

            /**
             * Read access to the previous six end
             */
            public getPreviousSixEnd(): Row {
                return this._previousSixEnd.slice();
            }

            /**
             * Write access to the previous six end
             */
            public setPreviousSixEnd(row: Row): this {
                this._previousSixEnd = row;
                this.calculateSixEnd();
                return this;
            }

            /**
             * Read access to the six end
             */
            public getSixEnd(): Row {
                return this._sixEnd.slice();
            }

            /**
             * Read access to the call
             */
            public getCall(): Call {
                return this._call;
            }

            /**
             * Write access to the call
             */
            public setCall(call: Call): this {
                this._call = call;
                this.calculateSixEnd();
                if (this._parent) {
                    this._parent.calculateSixes(this._index);
                }
                return this;
            }

            /**
             * Toggles the call type between Plain -> Bob -> Single -> Plain
             */
            public toggleCall(): Call {
                let call: Pricker.Call = (this._call % 3) + 1;
                this.setCall(call);
                return call;
            }

            /**
             * Transposes the front three bells depending upon the type of six
             */
            protected abstract transposeFrontThree(): AbstractSix;
        }

        /**
         * A slow six
         */
        export class Slow extends AbstractSix {
            /**
             * Transposes the front three bells depending upon the type of six
             */
            protected transposeFrontThree(): this {
                this._sixEnd[0] = this._previousSixEnd[1];
                this._sixEnd[1] = this._previousSixEnd[3];
                this._sixEnd[2] = this._previousSixEnd[0];
                return this;
            }
        }

        /**
         * A quick six
         */
        export class Quick extends AbstractSix {
            /**
             * Transposes the front three bells depending upon the type of six
             */
            protected transposeFrontThree(): this {
                this._sixEnd[0] = this._previousSixEnd[0];
                this._sixEnd[1] = this._previousSixEnd[1];
                this._sixEnd[2] = this._previousSixEnd[3];
                return this;
            }
        }

    }


    /**
     * A course, being a set of sixes
     */
    export class Course {
        /**
         * Course end of the previous course
         */
        protected _previousCourseEnd: Row;

        /**
         * Sixes within the course
         */
        protected _sixes: Six.AbstractSix[];

        /**
         * Constructs a plain course
         * @param {Row} previousCourseEnd - Course end of the previous course
         */
        constructor(previousCourseEnd: Row) {
            let stage: Stage = previousCourseEnd.length;

            // Set up an empty course
            this._previousCourseEnd = previousCourseEnd;
            this._sixes = [];

            // ... and extend it to the right length
            this.addSixes(stage * 2);
        }

        /**
         * Creates sixes
         * @param {number} sixes - number of sixes to create
         */
        private addSixes(sixes: number): this {
            let index: number,
                oldLength: number = this.getLength(),
                newLength: number = oldLength + sixes,
                previousSixEnd: Row = this.getCourseEnd();

            for (index = oldLength; index < newLength; index += 1) {
                this._sixes[index] = index % 2
                    ? new Six.Quick(previousSixEnd, this, index + 1)
                    : new Six.Slow(previousSixEnd, this, index + 1);
                previousSixEnd = this._sixes[index].getSixEnd();
            }

            return this;
        }

        /**
         * Recalculates sixes within the course
         * @param {number} index - where to start when recalculating
         */
        public calculateSixes(index: number = 0): this {
            let previousSixEnd: Row;

            if (index === 0) {
                previousSixEnd = this._previousCourseEnd;
            } else {
                previousSixEnd = this._sixes[index - 1].getSixEnd();
            }

            for (; index < this.getLength(); index += 1) {
                this._sixes[index].setPreviousSixEnd(previousSixEnd);
                previousSixEnd = this._sixes[index].getSixEnd();
            }

            return this;
        }

        /**
         * Read access to the previous course end
         */
        public getPreviousCourseEnd(): Row {
            return this._previousCourseEnd;
        }

        /**
         * Write access to the previous course end
         */
        public setPreviousCourseEnd(previousCourseEnd: Row): this {
            this._previousCourseEnd = previousCourseEnd;
            this.calculateSixes();
            return this;
        }

        /**
         * Read access to the course end
         */
        public getCourseEnd(): Row {
            if (this._sixes.length) {
                return this._sixes[this._sixes.length - 1].getSixEnd();
            }

            // Handle course with zero sixes
            return this._previousCourseEnd;
        }

        /**
         * Read access to sixes
         */
        public getSix(six: number): Six.AbstractSix {
            if (six < 1 || six > this.getLength()) {
                throw new Error('Six number out of range');
            }
            return this._sixes[six - 1];
        }

        /**
         * Read access to the length
         */
        public getLength(): number {
            return this._sixes.length;
        }

        /**
         * Write access to the length
         */
        public setLength(sixes: number): this {
            if ((sixes < 2) || (sixes > 60)) {
                throw new Error('Number of sixes out of range');
            }

            if (sixes > this.getLength()) {
                this.addSixes(sixes - this.getLength());
            } else {
                this._sixes = this._sixes.slice(0, sixes);
            }

            return this;
        }

        /**
         * Write access to the length: ignores out-of-range values
         */
        public safeSetLength(sixes: number): Course {
            sixes = Math.max(sixes, 2);
            sixes = Math.min(sixes, 60);
            return this.setLength(sixes);
        }
    }


    /**
     * Classes for output
     */
    export namespace Output {

        /**
         * Layouts, e.g. by six-end, calling for each course
         */
        export namespace Layout {

            /**
             * Interface for layouts
             */
            export interface ILayout {
                /**
                 * Manipulates a format to print out a course
                 */
                print(course: Course, format: Format.AbstractFormat): string;
            }

            /**
             * Displays each six-end on a separate line
             */
            export class Pricker implements ILayout {
                /**
                 * Manipulates a format to print out a course
                 */
                print(course: Course, format: Format.AbstractFormat): string {
                    let index: number;
                    format.clearBuffer();

                    for (index = 1; index <= course.getLength(); index++) {
                        format
                            .startLine()
                            .printRow(course.getSix(index).getSixEnd())
                            .newColumn()
                            .printCall(course.getSix(index).getCall(), index)
                            .newColumn()
                            .print(index.toString())
                            .endLine();
                    }
                    return format.getBuffer();
                }
            }

            /**
             * Lists the calling for a course on a single line
             */
            export class Calling implements ILayout {
                /**
                 * Manipulates a format to print out a course
                 */
                print(course: Course, format: Format.AbstractFormat): string {
                    let index: number,
                        calls: string[] = [],
                        bells: number = course.getCourseEnd().length;

                    format
                        .clearBuffer()
                        .startLine()
                        .printRow(course.getCourseEnd())
                        .newColumn();

                    // e.g. '1 5 7 8 10 11 s13 15 16'
                    for (index = 1; index <= course.getLength(); index++) {
                        if (course.getSix(index).getCall() !== Call.Plain) {
                            if (course.getSix(index).getCall() === Call.Bob) {
                                calls.push(index.toString());
                            } else {
                                calls.push('s' + index.toString());
                            }
                        }
                    }
                    if (calls.length) {
                        format.print(calls.join(' '));
                    } else {
                        format.print('p');
                    }

                    // e.g. '(20 sixes)'
                    if (course.getLength() !== (bells * 2)) {
                        format
                            .newColumn()
                            .print('(')
                            .print(course.getLength().toString())
                            .print(' sixes)');
                    }

                    return format
                        .endLine()
                        .getBuffer();
                }
            }

        }

        /**
         * Formats, e.g. HTML, plain text
         */
        export namespace Format {

            export abstract class AbstractFormat {
                /**
                 * Internal buffer of data for printing
                 */
                protected _buffer: string = '';

                /**
                 * Empties the internal buffer
                 */
                public clearBuffer(): this {
                    this._buffer = '';
                    return this;
                }

                /**
                 * Returns the contents of the internal buffer
                 */
                public getBuffer(): string {
                    return this._buffer;
                }

                /**
                 * Starts a line of output
                 */
                public startLine(): this {
                    return this;
                }

                /**
                 * Ends a line of output
                 */
                public abstract endLine(): this;

                /**
                 * Introduces a space between columns of output
                 */
                public abstract newColumn(): this;

                /**
                 * Stores text to the internal buffer
                 */
                public print(text: string): this {
                    this._buffer = this._buffer + text;
                    return this;
                }

                /**
                 * Renders a row, storing to the internal buffer
                 */
                public printRow(row: Row): this {
                    this._buffer = this._buffer + stringFromRow(row);
                    return this;
                }

                /**
                 * Renders a call, storing to the internal buffer
                 */
                public abstract printCall(
                    call: Call,
                    index: number
                ): this;
            }

            /**
             * Plain text
             */
            export class Text extends AbstractFormat {
                /**
                 * Ends a line of output
                 */
                public endLine(): this {
                    return this.print('\n');
                }

                /**
                 * Introduces a space between columns of output
                 */
                public newColumn(): this {
                    return this.print('  ');
                }

                /**
                 * Renders a call, storing to the internal buffer
                 */
                public printCall(call: Call, index: number): this {
                    if (call === Call.Plain) {
                        return this.print(' ');
                    } else if (call === Call.Bob) {
                        return this.print('-');
                    } else {
                        return this.print('s');
                    }
                }
            }

            /**
             * Format matching MBD's course pricker
             */
            export class Mbd extends AbstractFormat {
                /**
                 * Ends a line of output
                 */
                public endLine(): this {
                    return this.print('<br />\n');
                }

                /**
                 * Introduces a space between columns of output
                 */
                public newColumn(): this {
                    return this.print('&nbsp;&nbsp;');
                }

                /**
                 * Renders a call, storing to the internal buffer
                 */
                public printCall(call: Call, index: number): this {
                    return this.print(''
                        + '<span class="'
                        + (index % 2 ? 'oddCall' : 'evenCall')
                        + '" onclick="c('
                        + index
                        + ')">&nbsp;'
                        + (call === Call.Plain ? '&nbsp;' : '')
                        + (call === Call.Bob ? '-' : '')
                        + (call === Call.Single ? 's' : '')
                        + '&nbsp;</span>'
                    );
                }
            }

        }

    }


    export class Pricker {
        stage: Stage;
        startingRow: string;
        calls: Call[];
        sixes: Six.AbstractSix[];
    }
}
