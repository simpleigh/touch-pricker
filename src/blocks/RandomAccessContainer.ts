/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-19 Leigh Simpson. All rights reserved.
 */

import AbstractBlock from './AbstractBlock';
import AbstractContainer from './AbstractContainer';

/**
 * Abstract container that allows random insertion of child blocks
 *
 * Child blocks may be inserted or removed anywhere within the container.
 * Might be used to represent a touch of Stedman or a course of spliced.
 */
abstract class RandomAccessContainer<Block extends AbstractBlock>
    extends AbstractContainer<Block> {

    /* RandomAccessContainer methods ******************************************/

    /**
     * Inserts a course at the specified index
     */
    public insertBlock(index: number, block: Block): this {
        this._blocks.splice(index - 1, 0, block);
        this.fixupOwnership(index);

        this.notify(index - 1);
        return this;
    }

    /**
     * Deletes the course at the specified index
     */
    public deleteBlock(index: number): Block {
        const block = this.getBlock(index);

        this._blocks.splice(index - 1, 1);
        block.clearOwnership();
        this.fixupOwnership(index);

        this.notify(index - 1);
        return block;
    }

    /**
     * Helper to fixup ownership of blocks
     */
    private fixupOwnership(index: number): void {
        for (let i: number = index; i <= this.length; i += 1) {
            this.getBlock(i).ownership = { container: this, index: i };
        }
    }

}

export default RandomAccessContainer;
