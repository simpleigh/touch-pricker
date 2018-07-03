/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import Bell from './Bell';
import Call from './Call';
import Row from './Row';

/**
 * Simple functions to permute rows
 */

/**
 * Helper function to swap two bells
 */
function swapPair(row: Row, index: number): void {
    let bell: Bell;

    bell = row[index];
    row[index] = row[index + 1];
    row[index + 1] = bell;
}

/**
 * Notation <1>
 */
export function permute1(row: Row): void {
    let index: number;

    for (index = 1; index < row.length - 1; index += 2) {
        swapPair(row, index);
    }
}

/**
 * Notation <3>
 */
export function permute3(row: Row): void {
    let index: number;

    swapPair(row, 0);

    for (index = 3; index < row.length - 1; index += 2) {
        swapPair(row, index);
    }
}

/**
 * Notation <n>
 */
export function permuteN(row: Row): void {
    let index: number;

    for (index = 0; index < row.length - 1; index += 2) {
        swapPair(row, index);
    }
}

/**
 * Notation <9> for Cinques
 */
export function permuteBob(row: Row): void {
    permuteSingle(row);
    swapPair(row, row.length - 2);
}

/**
 * Notation <90E> for Cinques
 */
export function permuteSingle(row: Row): void {
    let index: number;

    for (index = 0; index < row.length - 3; index += 2) {
        swapPair(row, index);
    }
}

/**
 * Notation dependent on call
 */
export function permuteCall(row: Row, call: Call): void {
    if (call === Call.Plain) {
        permuteN(row);
    } else if (call === Call.Bob) {
        permuteBob(row);
    } else if (call === Call.Single) {
        permuteSingle(row);
    }
}
