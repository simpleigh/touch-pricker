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
let i: number;

document.write(renderer.print(row));
for (i = 0; i < 22; i += 1) {
    let six: Pricker.Six.AbstractSix,
        call: Pricker.Call = i % 2 ? Pricker.Call.Plain : Pricker.Call.Bob;
    six = i % 2
        ? new Pricker.Six.Quick(row, call)
        : new Pricker.Six.Slow(row, call);
    document.write(renderer.print(six.getSixEnd(), call, i + 1));
    row = six.getSixEnd();
}
