/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { Bell, Call, Row } from '../rows';

/**
 * Simple functions to permute rows
 */

/**
 * Helper function to swap two bells
 */
const swapPair = (row: Row, index: number): void => {
    let bell: Bell;

    bell = row[index];
    row[index] = row[index + 1];
    row[index + 1] = bell;
};

/**
 * Notation <1>
 */
export const permute1 = (row: Row): void => {
    let index: number;

    for (index = 1; index < row.length - 1; index += 2) {
        swapPair(row, index);
    }
};

/**
 * Notation <3>
 */
export const permute3 = (row: Row): void => {
    let index: number;

    swapPair(row, 0);

    for (index = 3; index < row.length - 1; index += 2) {
        swapPair(row, index);
    }
};

/**
 * Notation <5>
 */
export const permute5 = (row: Row): void => {
    let index: number;

    swapPair(row, 0);
    swapPair(row, 2);

    for (index = 5; index < row.length - 1; index += 2) {
        swapPair(row, index);
    }
};

/**
 * Notation <231>
 */
export const permuteUp = (row: Row): void => {
    let index: number;

    swapPair(row, 0);
    swapPair(row, 1);

    for (index = 3; index < row.length - 1; index += 2) {
        swapPair(row, index);
    }
};

/**
 * Notation <312>
 */
export const permuteDown = (row: Row): void => {
    let index: number;

    swapPair(row, 1);
    swapPair(row, 0);

    for (index = 3; index < row.length - 1; index += 2) {
        swapPair(row, index);
    }
};

/**
 * Notation <n>
 */
export const permuteN = (row: Row): void => {
    let index: number;

    for (index = 0; index < row.length - 1; index += 2) {
        swapPair(row, index);
    }
};

/**
 * Notation <9> for Cinques
 */
export const permuteBob = (row: Row): void => {
    permuteSingle(row);
    swapPair(row, row.length - 2);
};

/**
 * Notation <90E> for Cinques
 */
export const permuteSingle = (row: Row): void => {
    let index: number;

    for (index = 0; index < row.length - 3; index += 2) {
        swapPair(row, index);
    }
};

/**
 * Notation dependent on call
 */
export const permuteCall = (row: Row, call: Call): void => {
    if (call === Call.Plain) {
        permuteN(row);
    } else if (call === Call.Bob) {
        permuteBob(row);
    } else {
        permuteSingle(row);
    }
};
