/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 * The algorithm in this file is adapted from the C++ implementation of StedTurn
 * written by Philip Saddleton.
 */

/* eslint-disable no-bitwise */

import AbstractPacking from './AbstractPacking';

/**
 * Number of rows in each block of packed storage.
 */
const ROWS = 2;

/**
 * A table packing algorithm.
 *
 * Once a table has been built it can be compressed by packing multiple rows
 * into a smaller number of bytes. Tables containing smaller values can be
 * packed more tightly.
 *
 * This algorithm packs values for two rows into each byte and thus consumes
 * _n! / 2_ bytes on stage _n_ in order to store 4 bits per row.
 * We know that the value zero can only occur once (at the beginning of the
 * array representing rounds) so can ignore this value. We can therefore store
 * values from 1 to 16 within four bits by subtracting one from each value.
 *
 * Rows 0, 1 are laid out in a byte as follows:
 *
 * ```
 * ┌──────────┐
 * │ 00001111 │
 * └──────────┘
 * ```
 */
class Uint4Packing extends AbstractPacking {
    /**
     * The compression ratio achieved by this packing algorithm.
     */
    public readonly compression: number = 0.5;

    /**
     * The maximum value that can be stored using this packing algorithm.
     */
    public readonly maximum: number = 16;

    /**
     * Implementation of the packing algorithm.
     */
    protected doPack(from: Uint8Array, to: Uint8Array): void {
        for (let i = 0; i < to.length; i += 1) {
            const from0 = i === 0 ? 0 : from[ROWS * i + 0] - 1;
            const from1 = from[ROWS * i + 1] - 1;

            to[i] = (from0 << 4) | from1;
        }
    }

    /**
     * Implementation of the unpacking algorithm.
     */
    protected doUnpack(from: Uint8Array, to: Uint8Array): void {
        for (let i = 0; i < from.length; i += 1) {
            const to0 = (from[i] >> 4) & 0xf;
            const to1 = from[i] & 0xf;

            to[ROWS * i + 0] = to0 + 1;
            to[ROWS * i + 1] = to1 + 1;
        }
    }
}

export default Uint4Packing;
