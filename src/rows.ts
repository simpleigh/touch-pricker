/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015 Leigh Simpson. All rights reserved.
 */


/**
 * Bell number
 * 
 * n.b. Bell numbers are 1-indexed, i.e.:
 *   treble =  1
 *   eleven = 11
 */
export type Bell = number;


/**
 * A row (permutation of bells)
 */
export type Row = Bell[];


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
 * Lookup table from bell characters back to numbers
 */
const BELL_SYMBOLS_REVERSE: any = {
    '1': 1, '2': 2, '3': 3, '4': 4, '5': 5,
    '6': 6, '7': 7, '8': 8, '9': 9, '0': 10,
    'E': 11, 'T': 12, 'A': 13, 'B': 14, 'C': 15,
};


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
 * Symbols to be used for bells
 */
const BELL_SYMBOLS: string = ' 1234567890ETABC';


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
