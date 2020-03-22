/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { Row } from '../rows';
import { AbstractVisitor } from '../visitors';
import AbstractBlock from './AbstractBlock';
import Notifiable from './Notifiable';

/**
 * Abstract class representing containers for blocks of rows
 *
 * Containers are blocks that contain other blocks.
 * Like blocks, containers:
 *  - are initialised from a row
 *  - provide access to the last row in the container
 *  - etc.
 * In addition to this containers propagate changes between child blocks.
 */
abstract class AbstractContainer<Block extends AbstractBlock>
    extends AbstractBlock implements Notifiable {

    /**
     * Blocks within the container
     */
    protected _blocks: Block[] = [ ];

    /* AbstractBlock methods **************************************************/

    /**
     * Does any calculation needed by the block
     */
    protected calculate(): void {
        this.propagateBlocks();
    }

    /**
     * Returns the last row in the block
     * e.g. a course head or a course end (for Stedman)
     */
    public getLast(): Row {
        if (this._blocks.length) {
            return this._blocks[this._blocks.length - 1].getLast();
        }

        // Handle case with zero blocks
        return this._initialRow.slice();
    }

    /**
     * Receives a visitor that will be called to process each row
     */
    public accept(...visitors: AbstractVisitor[]): this {
        for (const block of this._blocks) {
            for (const visitor of visitors) {
                block.accept(visitor);
            }
        }
        return this;
    }

    /**
     * Estimates the number of rows in the block
     * The estimate doesn't take into account coming round part-way through
     */
    public estimateRows(): number {
        let rows = 0;
        for (const block of this._blocks) {
            rows += block.estimateRows();
        }
        return rows;
    }

    /* Notifiable methods *****************************************************/

    /**
     * Receives a notification from a block that has changed
     * @param index  index of changed block in container
     */
    public notify(index: number): void {
        this.propagateBlocks(index);
        this.notifyContainer();
    }

    /* AbstractContainer methods **********************************************/

    /**
     * Propagates data between blocks within the container
     * @param index  where to start when recalculating
     */
    protected propagateBlocks(index: number = 0): void {
        // Handle first block
        if (!index && this.length) {
            this._blocks[0].initialRow = this._initialRow;
            index = 1;
        }

        for (; index < this.length; index += 1) {
            this._blocks[index].initialRow = this._blocks[index - 1].getLast();
        }
    }

    /**
     * Read access to the length
     */
    get length(): number {
        return this._blocks.length;
    }

    /**
     * Read access to the blocks
     */
    get blocks(): Block[] {
        return this._blocks.slice();
    }

    /**
     * Read access to a block
     *
     * Derived classes should provide public access via a more
     * suitably-named method
     */
    public getBlock(index: number): Block {
        if (index < 1 || index > this.length) {
            throw new Error('Block index out of range');
        }
        return this._blocks[index - 1];
    }

}

export default AbstractContainer;
