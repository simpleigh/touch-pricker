/**
 * Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @copyright © 2015 Leigh Simpson. All rights reserved.
 */

/**
 * Top-level namespace
 * @namespace
 */
namespace Pricker {
    'use strict';

    /**
     * Matches the number of bells to the name of each stage.
     * @enum {number}
     */
    export enum Stage {
        Triples = 7,
        Caters = 9,
        Cinques = 11,
        Sextuples = 13,
        Septuples = 15,
    }

    const BELL_SYMBOLS: string = '1234567890ETABC';

    export type Bell = number;

    export type Row = Bell[];

    export enum Call {Plain = 1, Bob, Single};

    export abstract class Six {
        row: Row;

        constructor(spec: Row, call?: Call) {
            if (call) {
                this.calculate(spec, call);
            } else {
                this.row = spec;
            }
        }

        calculate(previous: Row, call: Call): Row {
            this.row = previous.slice();
            this.transposeFrontThree(previous)
                .transposeMiddleBells(previous)
                .transposeCall(previous, call);
            return this.row;
        }

        protected abstract transposeFrontThree(previous: Row): Six;

        private transposeMiddleBells(previous: Row): Six {
            let position: number;

            // Odd places
            for (position = 4; position < this.row.length; position += 2) {
                this.row[position] = previous[position - 2];
            }

            // Even places
            for (position = 5; position < this.row.length; position += 2) {
                this.row[position - 2] = previous[position];
            }

            return this;
        }

        private transposeCall(previous: Row, call: Call): Six {
            let n: number = this.row.length - 1;
            if (call === Call.Plain) {
                this.row[n - 1] = previous[n];
            } else {
                this.row[n - 3] = previous[n - 2];
                if (call === Call.Bob) {
                    this.row[n - 1] = previous[n - 1];
                    this.row[n] = previous[n];
                } else {
                    this.row[n - 1] = previous[n];
                    this.row[n] = previous[n - 1];
                }
            }

            return this;
        }
    }

    export class Slow extends Six {
        protected transposeFrontThree(previous: Row): Six {
            this.row[0] = previous[1];
            this.row[1] = previous[3];
            this.row[2] = previous[0];
            return this;
        }
    }

    export class Quick extends Six {
        protected transposeFrontThree(previous: Row): Six {
            this.row[2] = previous[3];
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
        sixes: Six[];

        private readRow(row: string, stage: Stage): Row {
            let bellNumber: number,
                bellChar: string,
                charToNumberTable: number[],
                numberUsedTable: boolean[],
                rowIndex: number,
                output: number[] = [];

            for (bellNumber = 0; bellNumber < stage; bellNumber += 1) {
                bellChar = BELL_SYMBOLS[bellNumber].toLowerCase();
                charToNumberTable[bellChar] = bellNumber;
                numberUsedTable[bellNumber] = false;
            }

            for (rowIndex = 0;
                rowIndex < row.length && rowIndex < stage;
                rowIndex += 1
            ) {
                bellChar = row[rowIndex].toLowerCase();
                bellNumber = charToNumberTable[bellChar];
                if (bellNumber) {
                    if (numberUsedTable[bellNumber]) {
                        throw new Error('Bell already used');
                    }
                    output.push(bellNumber);
                    numberUsedTable[bellNumber] = true;
                } else {
                    throw new Error('Unknown bell or bell already used');
                }
            }

            if (row.length < stage) {
                for (bellNumber = 0; bellNumber < stage; bellNumber += 1) {
                    if (!numberUsedTable[bellNumber]) {
                        output.push(bellNumber);
                    }
                }
            }

            return output;
        }
    }
}

let row: Pricker.Row = [1, 2, 0, 3, 4, 5, 6, 7, 8, 9, 10];
let renderer: Pricker.RowRenderer = new Pricker.MbdPrickerRowRenderer();
let i: number;

document.write(renderer.print(row));
for (i = 0; i < 22; i += 1) {
    let six: Pricker.Six,
        call: Pricker.Call = i % 2 ? Pricker.Call.Plain : Pricker.Call.Bob;
    six = i % 2 ? new Pricker.Quick(row, call) : new Pricker.Slow(row, call);
    document.write(renderer.print(six.row, call, i + 1));
    row = six.row;
}
