/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { Call } from '../leads';
import { Change, MutableRow } from '../rows';

/**
 * Simple functions to permute rows
 */

/**
 * Helper function to swap two bells
 */
const swapPair = (row: MutableRow, index: number): void => {
    const bell = row[index];
    row[index] = row[index + 1];
    row[index + 1] = bell;
};

/**
 * Notation <1>
 */
export const permute1: Change = (row) => {
    for (let index = 1; index < row.length - 1; index += 2) {
        swapPair(row, index);
    }
};

/**
 * Notation <3>
 */
export const permute3: Change = (row) => {
    swapPair(row, 0);

    for (let index = 3; index < row.length - 1; index += 2) {
        swapPair(row, index);
    }
};

/**
 * Notation <5>
 */
export const permute5: Change = (row) => {
    swapPair(row, 0);
    swapPair(row, 2);

    for (let index = 5; index < row.length - 1; index += 2) {
        swapPair(row, index);
    }
};

/**
 * Notation <231>
 */
export const permuteUp: Change = (row) => {
    swapPair(row, 0);
    swapPair(row, 1);

    for (let index = 3; index < row.length - 1; index += 2) {
        swapPair(row, index);
    }
};

/**
 * Notation <312>
 */
export const permuteDown: Change = (row) => {
    swapPair(row, 1);
    swapPair(row, 0);

    for (let index = 3; index < row.length - 1; index += 2) {
        swapPair(row, index);
    }
};

/**
 * Notation <n>
 */
export const permuteN: Change = (row) => {
    for (let index = 0; index < row.length - 1; index += 2) {
        swapPair(row, index);
    }
};

/**
 * Notation <90E> for Cinques
 */
export const permuteSingle: Change = (row) => {
    for (let index = 0; index < row.length - 3; index += 2) {
        swapPair(row, index);
    }
};

/**
 * Notation <9> for Cinques
 */
export const permuteBob: Change = (row) => {
    permuteSingle(row);
    swapPair(row, row.length - 2);
};

/**
 * Notation dependent on call
 */
export const permuteCall = (row: MutableRow, call: Call): void => {
    if (call === Call.Plain) {
        permuteN(row);
    } else if (call === Call.Bob) {
        permuteBob(row);
    } else {
        permuteSingle(row);
    }
};
