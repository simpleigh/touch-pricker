/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GLP-3.0
 * @copyright © 2015 Leigh Simpson. All rights reserved.
 */

/**
 * Top-level namespace
 */
namespace Pricker {
    'use strict';


    /**
     * Bell number
     */
    type Bell = number;


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
     * Converts a row array to a string (for debugging)
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
            protected _call: Call;

            /**
             * Constructs the six
             * @param {Row}  previousSixEnd    - Six end of the previous six
             * @param {Call} [call=Call.Plain] - Call used to start the six
             */
            constructor(previousSixEnd: Row, call: Call = Call.Plain) {
                this._previousSixEnd = previousSixEnd;
                this._call = call;
                this.calculateSixEnd();
            }

            /**
             * Recalculates the six end
             */
            protected calculateSixEnd(): AbstractSix {
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
             * Toggles the call type between Plain -> Bob -> Single -> Plain
             */
            public toggleCall(): Call {
                this._call = (this._call % 3) + 1;
                return this._call;
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
            public setPreviousSixEnd(row: Row): AbstractSix {
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
            public setCall(call: Call): AbstractSix {
                this._call = call;
                this.calculateSixEnd();
                return this;
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
            protected transposeFrontThree(): AbstractSix {
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
         * Course end of this course
         */
        protected _courseEnd: Row;

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
            this._courseEnd = previousCourseEnd;
            this._sixes = [undefined];  // Include zeroth entry for getLength()

            // ... and extend it to the right length
            this.addSixes(stage * 2);
        }

        /**
         * Creates sixes
         * @param {number} sixes - number of sixes to create
         */
        private addSixes(sixes: number): Course {
            let six: number,
                oldLength: number = this.getLength(),
                previousSixEnd: Row = this._courseEnd;

            for (six = oldLength + 1; six <= oldLength + sixes; six += 1) {
                this._sixes[six] = six % 2
                    ? new Six.Slow(previousSixEnd)
                    : new Six.Quick(previousSixEnd);
                previousSixEnd = this._sixes[six].getSixEnd();
            }

            this._courseEnd = previousSixEnd;

            return this;
        }

        /**
         * Recalculates all the sixes within the course
         */
        private calculateSixes(): Course {
            let six: number,
                previousSixEnd: Row = this._previousCourseEnd;

            for (six = 1; six <= this.getLength(); six += 1) {
                this._sixes[six].setPreviousSixEnd(previousSixEnd);
                previousSixEnd = this._sixes[six].getSixEnd();
            }

            this._courseEnd = previousSixEnd;

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
        public setPreviousCourseEnd(previousCourseEnd: Row): Course {
            this._previousCourseEnd = previousCourseEnd;
            this.calculateSixes();
            return this;
        }

        /**
         * Read access to the course end
         */
        public getCourseEnd(): Row {
            return this._courseEnd;
        }

        /**
         * Read access to the sixes
         */
        public getSixes(): Six.AbstractSix[] {
            return this._sixes.slice();
        }

        /**
         * Read access to the length
         */
        public getLength(): number {
            return this._sixes.length - 1;
        }

        /**
         * Write access to the length
         */
        public setLength(sixes: number): Course {
            if (sixes > this.getLength()) {
                this.addSixes(sixes - this.getLength());
            } else {
                this._sixes = this._sixes.slice(0, sixes + 1);
                this._courseEnd = this._sixes[sixes].getSixEnd();
            }

            return this;
        }

        /**
         * Through access to toggle calls
         */
        public toggleCall(six: number): Call {
            this.checkSixNumber(six);
            this._sixes[six].toggleCall();
            this.calculateSixes();
            return this._sixes[six].getCall();
        }

        /**
         * Through read access to six ends
         */
        public getSixEnd(six: number): Row {
            this.checkSixNumber(six);
            return this._sixes[six].getSixEnd();
        }

        /**
         * Through read access to calls
         */
        public getCall(six: number): Call {
            this.checkSixNumber(six);
            return this._sixes[six].getCall();
        }

        /**
         * Through write access to calls
         */
        public setCall(six: number, call: Call): Course {
            this.checkSixNumber(six);
            this._sixes[six].setCall(call);
            this.calculateSixes();
            return this;
        }

        /**
         * Check a six number is in range
         * @throws Error if it isn't
         */
        private checkSixNumber(six: number): Course {
            if (six < 1 || six > this.getLength()) {
                throw new Error('Six number out of range');
            }
            return this;
        }
    }


    export interface RowRenderer {
        print(row: number[]): string;
        print(row: number[], call: Call, sixNumber: number): string;
    }


    export class MbdPrickerRowRenderer implements RowRenderer {
        print(row: number[], call?: Call, sixNumber?: number): string {
            let rowIndex: number,
                bellRenderer: BellRenderer = new TextBellRenderer(),
                callRenderer: CallRenderer = new MbdPrickerCallRenderer(),
                output: string = '';

            for (rowIndex = 0; rowIndex < row.length; rowIndex += 1) {
                output = output.concat(bellRenderer.print(row[rowIndex]));
            }

            if (call && sixNumber) {
                output = output.concat(callRenderer.print(call, sixNumber));
                output = output.concat(sixNumber.toString());
            }

            output = output.concat('<br />');

            return output;
        }
    }


    export interface BellRenderer {
        print(bell: number): string;
    }


    export class TextBellRenderer implements BellRenderer {
        print(bell: number): string {
            return BELL_SYMBOLS[bell];
        }
    }


    export interface CallRenderer {
        print(call: Call, sixNumber: number): string;
    }


    export class MbdPrickerCallRenderer implements CallRenderer {
        print(call: Call, sixNumber: number): string {
            return '<span class="'
                + (sixNumber % 2 ? 'oddCall' : 'evenCall')
                + '" onclick="c('
                + sixNumber
                + ')">'
                + (call === Call.Bob ? ' - ' : '')
                + (call === Call.Single ? ' s ' : '')
                + '</span>';
        }
    }


    export class Pricker {
        stage: Stage;
        startingRow: string;
        calls: Call[];
        sixes: Six.AbstractSix[];
    }
}


let row: Pricker.Row = Pricker.rowFromString('231', Pricker.Stage.Cinques);
let renderer: Pricker.RowRenderer = new Pricker.MbdPrickerRowRenderer();
let course: Pricker.Course = new Pricker.Course(row);
let i: number;

document.write(renderer.print(row));
for (i = 1; i <= course.getLength(); i += 2) {
    course.setCall(i, Pricker.Call.Bob);
}
for (i = 1; i <= course.getLength(); i += 1) {
    document.write(renderer.print(course.getSixEnd(i), course.getCall(i), i));
}
