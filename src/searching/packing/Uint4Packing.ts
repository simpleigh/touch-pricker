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
 * A table packing algorithm.
 *
 * Once a table has been built it can be compressed by packing multiple rows
 * into a smaller number of bytes. Tables containing smaller values can be
 * packed more tightly.
 *
 * This algorithm packs values for two rows into each byte and thus consumes
 * _n! / 2_ bytes on stage _n_ in order to store 4 bits per row.
 *
 * Rows 0, 1 are laid out in a byte as follows:
 *
 * ```
 * ┌──────────┐
 * │ 11110000 │
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
    public readonly maximum: number = 15;

    /**
     * Implementation of the packing algorithm.
     */
    protected doPack(from: Uint8Array, to: Uint8Array): void {
        for (let i = 0; i < to.length; i += 1) {
            to[i] = from[2 * i] | (from[2 * i + 1] << 4);
        }
    }

    /**
     * Implementation of the unpacking algorithm.
     */
    protected doUnpack(from: Uint8Array, to: Uint8Array): void {
        for (let i = 0; i < from.length; i += 1) {
            to[2 * i] = from[i] & 0xf;
            to[2 * i + 1] = (from[i] >> 4) & 0xf;
        }
    }
}

export default Uint4Packing;
