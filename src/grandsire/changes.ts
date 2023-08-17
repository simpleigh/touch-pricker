/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

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
 * Notation <123>
 */
export const permute123: Change = (row) => {
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
