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
     * Abstract class representing blocks of rows
     * 
     * A block:
     *  - is initialised from a row
     *  - provides access to the end row at the end of the block
     *  - recalculates that end row if the initial row is changed
     *  - provides mechanisms for controlling how the end row is created
     *  - notifies any parent block whenever the end row changes
     * 
     * Blocks are designed to be aggregated into containers.
     * Containers notify blocks of changes by setting a new initial row.
     * Blocks notify containers of changes via a callback (receiveNotification).
     */
    export abstract class AbstractBlock {
        /**
         * Initial row for the block
         */
        protected _initialRow: Row;

        /**
         * Constructor
         * @param {Row}                initialRow - initial row for the block
         * @param {AbstractContainer}  container  - container of this block
         * @param {number}             index      - index of block in container
         */
        constructor(
            initialRow: Row,
            protected _container?: AbstractContainer<AbstractBlock>,
            protected _index?: number
        ) {
            this._initialRow = initialRow.slice();
        }

        /**
         * Does any calculation needed by the block
         */
        protected abstract calculate(): void;

        /**
         * Read access to the initial row
         */
        public getInitialRow(): Row {
            return this._initialRow.slice();
        }

        /**
         * Write access to the initial row
         */
        public setInitialRow(initialRow: Row): AbstractBlock {
            this._initialRow = initialRow.slice();
            this.calculate();
            return this;
        }

        /**
         * Returns the end row
         */
        public abstract getEnd(): Row;

        /**
         * Notifies the parent container
         * 
         * Derived classes should call this whenever the end row changes.
         */
        protected notifyContainer(): void {
            if (this._container) {
                this._container.notify(this._index);
            }
        }
    }

    /**
     * Base class for sixes
     */
    export abstract class AbstractSix extends AbstractBlock {
        /**
         * Six end of this six
         */
        protected _end: Row;

        /**
         * Call used to start the six
         */
        protected _call: Call;

        /**
         * Constructor
         */
        constructor(
            initialRow: Row,
            protected _container?: AbstractContainer<AbstractSix>,
            protected _index?: number
        ) {
            super(initialRow, _container, _index);
            this._call = Call.Plain;
            this.calculate();
        }

        /* AbstractBlock methods **********************************************/

        /**
         * Does any calculation needed by the block
         */
        protected calculate(): void {
            let n: number;
            this._end = this._initialRow.slice(); // Create new array

            this.transposeFrontThree();

            // Odd places go up
            for (n = 4; n < this._end.length; n += 2) {
                this._end[n] = this._initialRow[n - 2];
            }

            // Even places go in
            for (n = 5; n < this._end.length; n += 2) {
                this._end[n - 2] = this._initialRow[n];
            }

            // Random stuff happens at the back
            n = this._end.length - 1;
            if (this._call === Call.Plain) {
                this._end[n - 1] = this._initialRow[n];
            } else {
                this._end[n - 3] = this._initialRow[n - 2];
                if (this._call === Call.Bob) {
                    this._end[n - 1] = this._initialRow[n - 1];
                    this._end[n] = this._initialRow[n];
                } else {
                    this._end[n - 1] = this._initialRow[n];
                    this._end[n] = this._initialRow[n - 1];
                }
            }
        }

        /**
         * Returns the end row
         */
        public getEnd(): Row {
            return this._end.slice();
        }

        /* AbstractSix methods ************************************************/

        /**
         * Read access to the call
         */
        public getCall(): Call {
            return this._call;
        }

        /**
         * Write access to the call
         */
        public setCall(call: Call): AbstractSix {
            this._call = call;
            this.calculate();
            this.notifyContainer();
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
        protected transposeFrontThree(): AbstractSix {
            this._end[0] = this._initialRow[1];
            this._end[1] = this._initialRow[3];
            this._end[2] = this._initialRow[0];
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
        protected transposeFrontThree(): AbstractSix {
            this._end[0] = this._initialRow[0];
            this._end[1] = this._initialRow[1];
            this._end[2] = this._initialRow[3];
            return this;
        }
    }


    /**
     * Abstract class representing containers for blocks of rows
     * 
     * Note that containers are also blocks themselves.
     */
    export abstract class AbstractContainer<Block extends AbstractBlock>
        extends AbstractBlock {
        /**
         * Blocks within the container
         */
        protected _blocks: Block[];

        /**
         * Constructor
         * 
         * Extends the AbstractBlock container to create contained blocks.
         */
        constructor(
            initialRow: Row,
            protected _container?: AbstractContainer<AbstractBlock>,
            protected _index?: number
        ) {
            super(initialRow, _container, _index);

            this._blocks = [];
            this.extend(this.getDefaultLength(initialRow));
        }

        /* AbstractBlock methods **********************************************/

        /**
         * Does any calculation needed by the block
         */
        protected calculate(): void {
            this.calculateBlocks();
        }

        /**
         * Returns the end row
         */
        public getEnd(): Row {
            if (this._blocks.length) {
                return this._blocks[this._blocks.length - 1].getEnd();
            }

            // Handle case with zero blocks
            return this._initialRow.slice();
        }

        /* AbstractContainer methods ******************************************/

        /**
         * Extends the container by adding the specified number of blocks
         * @param {number}  blocks - blocks to add
         */
        private extend(blocks: number): this {
            let index: number,
                oldLength: number = this.getLength(),
                newLength: number = oldLength + blocks,
                initialRow: Row = this.getEnd();

            for (index = oldLength + 1; index <= newLength; index += 1) {
                this._blocks[index - 1] = this.createBlock(initialRow, index);
                initialRow = this._blocks[index - 1].getEnd();
            }

            return this;
        }

        /**
         * Returns the default length of new containers of this type
         * 
         * Derived classes should override this method if required.
         */
        protected getDefaultLength(initialRow: Row): number {
            return 1;
        }

        /**
         * Creates a new block for the container
         * 
         * Used by extend() when creating the container or increasing its
         * length.
         * @param {Row}     initialRow - initial row for the block
         * @param {number}  index      - index of block in container
         */
        protected abstract createBlock(initialRow: Row, index: number): Block;

        /**
         * Calculates blocks within the course
         * @param {number} index - where to start when recalculating
         */
        private calculateBlocks(index: number = 0): void {
            let initialRow: Row = this._initialRow;

            if (index) {
                initialRow = this._blocks[index - 1].getEnd();
            }

            for (; index < this.getLength(); index += 1) {
                this._blocks[index].setInitialRow(initialRow);
                initialRow = this._blocks[index].getEnd();
            }

            this.notifyContainer();
        }

        /**
         * Read access to the length
         */
        public getLength(): number {
            return this._blocks.length;
        }


        /**
         * Write access to the length
         */
        public setLength(length: number): this {
            let [minimum, maximum]: [number, number] = this.getLengthLimits();
            if ((length < minimum) || (length > maximum)) {
                throw new Error('Length out of range');
            }

            if (length > this.getLength()) {
                this.extend(length - this.getLength());
            } else {
                this._blocks = this._blocks.slice(0, length);
            }

            this.notifyContainer();

            return this;
        }

        /**
         * Write access to the length: ignores out-of-range values
         */
        public safeSetLength(length: number): this {
            let [minimum, maximum]: [number, number] = this.getLengthLimits();
            length = Math.max(length, minimum);
            length = Math.min(length, maximum);
            return this.setLength(length);
        }

        /**
         * Returns the limits on length for the particular concrete class
         * 
         * minimum, maximum
         */
        protected abstract getLengthLimits(): [number, number];

        /**
         * Read access to a block
         * 
         * Derived classes should provide public access via a more
         * suitably-named method
         */
        protected getBlock(index: number): Block {
            if (index < 1 || index > this.getLength()) {
                throw new Error('Block index out of range');
            }
            return this._blocks[index - 1];
        }

        /**
         * Receives a notification from a block that has changed
         * @param {number}  index - index of changed block in container
         */
        public notify(index: number): void {
            this.calculateBlocks(index);
        }
    }


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
    }

    /**
     * A touch, being a set of courses
     */
    export class Touch extends AbstractContainer<Course> {

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
        public getCourse(course: number): Course {
            return this.getBlock(course);
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
            export interface AbstractLayout {
                /**
                 * Manipulates a format to print out a course
                 */
                print(course: Course, format: Format.AbstractFormat): string;
            }

            /**
             * Displays each six-end on a separate line
             */
            export class Pricker implements AbstractLayout {
                /**
                 * Manipulates a format to print out a course
                 */
                print(course: Course, format: Format.AbstractFormat): string {
                    let index: number;
                    format.clearBuffer();

                    for (index = 1; index <= course.getLength(); index++) {
                        format
                            .startLine()
                            .printRow(course.getSix(index).getEnd())
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
            export class Calling implements AbstractLayout {
                /**
                 * Manipulates a format to print out a course
                 */
                print(course: Course, format: Format.AbstractFormat): string {
                    let index: number,
                        calls: string[] = [],
                        bells: number = course.getEnd().length;

                    format
                        .clearBuffer()
                        .startLine()
                        .printRow(course.getEnd())
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
        sixes: AbstractSix[];
    }
}
