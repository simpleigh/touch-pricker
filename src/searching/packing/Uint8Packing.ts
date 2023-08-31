/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import AbstractPacking from './AbstractPacking';

/**
 * A table packing algorithm.
 *
 * Once a table has been built it can be compressed by packing multiple rows
 * into a smaller number of bytes. Tables containing smaller values can be
 * packed more tightly.
 *
 * This algorithm does no packing at all! It thus consumes _n!_ bytes on stage
 * _n_ in order to store 8 bits per row.
 */
class Uint8Packing extends AbstractPacking {
    /**
     * The compression ratio achieved by this packing algorithm.
     */
    public readonly compression: number = 1;

    /**
     * The maximum value that can be stored using this packing algorithm.
     */
    public readonly maximum: number = 255;

    /**
     * Implementation of the packing algorithm.
     */
    protected doPack(from: Uint8Array, to: Uint8Array): void {
        for (let i = 0; i < from.length; i += 1) {
            to[i] = from[i];
        }
    }

    /**
     * Implementation of the unpacking algorithm.
     */
    protected doUnpack(from: Uint8Array, to: Uint8Array): void {
        for (let i = 0; i < from.length; i += 1) {
            to[i] = from[i];
        }
    }
}

export default Uint8Packing;
