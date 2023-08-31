/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

/**
 * A table packing algorithm.
 *
 * Once a table has been built it can be compressed by packing multiple rows
 * into a smaller number of bytes. Tables containing smaller values can be
 * packed more tightly.
 *
 * A packing algorithm contains a pair of functions - `pack` and `unpack` - that
 * can be used to compress a table containing values up to the `maximum`.
 */
abstract class AbstractPacking {
    /**
     * The compression ratio achieved by this packing algorithm.
     */
    public abstract readonly compression: number;

    /**
     * The maximum value that can be stored using this packing algorithm.
     */
    public abstract readonly maximum: number;

    /**
     * Packs entries from a source array into a packed target array.
     * @param from  Source array
     * @param to  Target array
     */
    public pack(from: Uint8Array, to: Uint8Array): void {
        const expectedBytes = from.length * this.compression;
        if (to.length !== expectedBytes) {
            throw new Error(
                `Cannot pack ${expectedBytes} bytes into ${to.length}.`,
            );
        }

        this.doPack(from, to);
    }

    /**
     * Implementation of the packing algorithm.
     */
    protected abstract doPack(from: Uint8Array, to: Uint8Array): void;

    /**
     * Unpacks entries from a packed source array into a target array.
     * @param from  Source array
     * @param to  Target array
     */
    public unpack(from: Uint8Array, to: Uint8Array): void {
        const expectedBytes = from.length / this.compression;
        if (to.length !== expectedBytes) {
            throw new Error(
                `Cannot unpack ${expectedBytes} bytes into ${to.length}.`,
            );
        }

        this.doUnpack(from, to);
    }

    /**
     * Implementation of the unpacking algorithm.
     */
    protected abstract doUnpack(from: Uint8Array, to: Uint8Array): void;
}

export default AbstractPacking;
