/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import { Row } from '../rows';
import AbstractBlock from './AbstractBlock';
import AbstractContainer from './AbstractContainer';
import BlockOwnership from './BlockOwnership';

/**
 * Abstract container that manages a series of child blocks
 *
 * Child blocks are managed by changing the length of the container.
 * Might be used to represent a course of Stedman or a single method.
 */
abstract class SerialContainer<Block extends AbstractBlock>
    extends AbstractContainer<Block> {

    /**
     * Constructor
     *
     * Extends the AbstractBlock container to create contained blocks.
     */
    constructor(initialRow: Row, protected _ownership?: BlockOwnership) {
        super(initialRow, _ownership);
        this.extend(this.getDefaultLength(initialRow));
    }

    /* SerialContainer methods ************************************************/

    /**
     * Extends the container by adding the specified number of blocks
     * @param blocks  blocks to add
     */
    private extend(blocks: number): this {
        const oldLength = this.getLength();
        const newLength = oldLength + blocks;

        let initialRow = this.getLast();

        for (let index = oldLength + 1; index <= newLength; index += 1) {
            this._blocks[index - 1] = this.createBlock(initialRow, index);
            initialRow = this._blocks[index - 1].getLast();
        }

        return this;
    }

    /**
     * Returns the default length of new containers of this type
     *
     * Derived classes should override this method if required.
     */
    protected getDefaultLength(initialRow: Row): number {
        return 1;
    }

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
        if ((length < this.minLength) || (length > this.maxLength)) {
            throw new Error('Length out of range');
        }

        if (length > this.getLength()) {
            this.extend(length - this.getLength());
        } else {
            this._blocks = this._blocks.slice(0, length);
        }

        this.notifyContainer();

        return this;
    }

    /**
     * Write access to the length: ignores out-of-range values
     */
    public safeSetLength(length: number): this {
        length = Math.max(length, this.minLength);
        length = Math.min(length, this.maxLength);
        return this.setLength(length);
    }

    /**
     * Lower limit on length for the particular concrete class
     */
    protected readonly abstract minLength: number;

    /**
     * Upper limit on length for the particular concrete class
     */
    protected readonly abstract maxLength: number;

}

export default SerialContainer;
