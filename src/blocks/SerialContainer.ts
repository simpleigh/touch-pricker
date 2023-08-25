/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import type { Row } from '../rows';
import type AbstractBlock from './AbstractBlock';
import AbstractContainer from './AbstractContainer';

/**
 * Abstract container that manages a series of child blocks
 *
 * Child blocks are managed by changing the length of the container.
 * Might be used to represent a course of a single method.
 */
abstract class SerialContainer<
    Block extends AbstractBlock,
> extends AbstractContainer<Block> {
    /* SerialContainer methods ************************************************/

    /**
     * Extends the container by adding the specified number of blocks
     * @param blocks  blocks to add
     */
    private extend(blocks: number): this {
        const oldLength = this.length;
        const newLength = oldLength + blocks;

        let initialRow = this.getLast();

        for (let index = oldLength + 1; index <= newLength; index += 1) {
            this._blocks[index - 1] = this.createBlock(initialRow, index);
            this._blocks[index - 1].ownership = { container: this, index };
            initialRow = this._blocks[index - 1].getLast();
        }

        return this;
    }

    /**
     * Returns the default length for this container
     * N.b. this is likely to vary depending on the stage
     */
    protected abstract get defaultLength(): number;

    /**
     * Creates a new block for the container
     *
     * Used by extend() when creating the container or increasing its
     * length.
     * @param initialRow  initial row for the block
     * @param index       index of block in container
     */
    protected abstract createBlock(initialRow: Row, index: number): Block;

    /**
     * Write access to the length
     */
    public setLength(length: number): this {
        if (length < 0) {
            throw new Error(`Length must be > 0 (was '${length}')`);
        }

        if (length > this.length) {
            this.extend(length - this.length);
        } else {
            this._blocks = this._blocks.slice(0, length);
        }

        this.notifyContainer();

        return this;
    }

    /**
     * Resets the course to be the default length
     */
    public resetLength(): this {
        this.setLength(this.defaultLength);
        return this;
    }
}

export default SerialContainer;
