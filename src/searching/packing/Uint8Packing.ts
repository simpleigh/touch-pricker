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
 * We know that the value zero can only occur once (at the beginning of the
 * array representing rounds) so can ignore this value. We can therefore store
 * values from 1 to 256 within eight bits by subtracting one from each value.
 * Unfortunately this done't work because we can't actually store a value of 256
 * within the underlying `Uint8Array`. Nevertheless we subtract one anyway for
 * consistency with other packing algorithms.
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
        for (let i = 1; i < from.length; i += 1) {
            to[i] = from[i] - 1;
        }
    }

    /**
     * Implementation of the unpacking algorithm.
     */
    protected doUnpack(from: Uint8Array, to: Uint8Array): void {
        for (let i = 1; i < from.length; i += 1) {
            to[i] = from[i] + 1;
        }
    }
}

export default Uint8Packing;
