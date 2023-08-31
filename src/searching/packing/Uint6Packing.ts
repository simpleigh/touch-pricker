/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

/* eslint-disable no-bitwise */

import AbstractPacking from './AbstractPacking';

/**
 * Number of rows in each block of packed storage.
 */
const ROWS = 4;

/**
 * Number of bytes consumed by each block of packed storage.
 */
const BYTES = 3;

/**
 * A table packing algorithm.
 *
 * Once a table has been built it can be compressed by packing multiple rows
 * into a smaller number of bytes. Tables containing smaller values can be
 * packed more tightly.
 *
 * This algorithm packs values for four rows into three bytes and thus consumes
 * _n! × 3 / 4_ bytes on stage _n_ in order to store 6 bits per row.
 * We know that the value zero can only occur once (at the beginning of the
 * array representing rounds) so can ignore this value. We can therefore store
 * values from 1 to 64 within six bits by subtracting one from each value.
 *
 * Rows 0, 1, 2, 3 are laid out in three bytes as follows:
 *
 * ```
 * ┌──────────┬──────────┬──────────┐
 * │ 33000000 │ 33111111 │ 33222222 │
 * └──────────┴──────────┴──────────┘
 * ```
 */
class Uint6Packing extends AbstractPacking {
    /**
     * The compression ratio achieved by this packing algorithm.
     */
    public readonly compression: number = 0.75;

    /**
     * The maximum value that can be stored using this packing algorithm.
     */
    public readonly maximum: number = 64;

    /**
     * Implementation of the packing algorithm.
     */
    protected doPack(from: Uint8Array, to: Uint8Array): void {
        for (let i = 0; i < to.length / BYTES; i += 1) {
            const from0 = i === 0 ? 0 : from[ROWS * i + 0] - 1;
            const from1 = from[ROWS * i + 1] - 1;
            const from2 = from[ROWS * i + 2] - 1;
            const from3 = from[ROWS * i + 3] - 1;

            to[BYTES * i + 0] = from0 | ((from3 << 2) & 0xc0);
            to[BYTES * i + 1] = from1 | ((from3 << 4) & 0xc0);
            to[BYTES * i + 2] = from2 | ((from3 << 6) & 0xc0);
        }
    }

    /**
     * Implementation of the unpacking algorithm.
     */
    protected doUnpack(from: Uint8Array, to: Uint8Array): void {
        for (let i = 0; i < from.length / BYTES; i += 1) {
            const to0 = from[BYTES * i + 0] & 0x3f;
            const to1 = from[BYTES * i + 1] & 0x3f;
            const to2 = from[BYTES * i + 2] & 0x3f;
            const to3 =
                ((from[BYTES * i + 0] >> 2) & 0x30) |
                ((from[BYTES * i + 1] >> 4) & 0xc) |
                ((from[BYTES * i + 2] >> 6) & 0x3);

            to[ROWS * i + 0] = to0 + 1;
            to[ROWS * i + 1] = to1 + 1;
            to[ROWS * i + 2] = to2 + 1;
            to[ROWS * i + 3] = to3 + 1;
        }
    }
}

export default Uint6Packing;
