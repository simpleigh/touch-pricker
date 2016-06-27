/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015 Leigh Simpson. All rights reserved.
 */


import { Row } from './rows';


/**
 * Abstract class representing blocks of rows
 * 
 * A block:
 *  - is initialised from a row
 *  - provides access to the end row at the end of the block
 *  - recalculates that end row if the initial row is changed
 *  - provides mechanisms for controlling how the end row is created
 *  - notifies any parent block whenever the end row changes
 * 
 * Blocks are designed to be aggregated into containers.
 * Containers notify blocks of changes by setting a new initial row.
 * Blocks notify containers of changes via a callback (receiveNotification).
 */
export abstract class AbstractBlock {
    /**
     * Initial row for the block
     */
    protected _initialRow: Row;

    /**
     * Constructor
     * @param {Row}                initialRow - initial row for the block
     * @param {AbstractContainer}  container  - container of this block
     * @param {number}             index      - index of block in container
     */
    constructor(
        initialRow: Row,
        protected _container?: AbstractContainer<AbstractBlock>,
        protected _index?: number
    ) {
        this._initialRow = initialRow.slice();
    }

    /**
     * Does any calculation needed by the block
     */
    protected abstract calculate(): void;

    /**
     * Read access to the initial row
     */
    public getInitialRow(): Row {
        return this._initialRow.slice();
    }

    /**
     * Write access to the initial row
     */
    public setInitialRow(initialRow: Row): AbstractBlock {
        this._initialRow = initialRow.slice();
        this.calculate();
        return this;
    }

    /**
     * Returns the end row
     */
    public abstract getEnd(): Row;

    /**
     * Notifies the parent container
     * 
     * Derived classes should call this whenever the end row changes.
     */
    protected notifyContainer(): void {
        if (this._container) {
            this._container.notify(this._index);
        }
    }
}


/**
 * Abstract class representing containers for blocks of rows
 * 
 * Note that containers are also blocks themselves.
 */
export abstract class AbstractContainer<Block extends AbstractBlock>
    extends AbstractBlock {
    /**
     * Blocks within the container
     */
    protected _blocks: Block[];

    /**
     * Constructor
     * 
     * Extends the AbstractBlock container to create contained blocks.
     */
    constructor(
        initialRow: Row,
        protected _container?: AbstractContainer<AbstractBlock>,
        protected _index?: number
    ) {
        super(initialRow, _container, _index);

        this._blocks = [];
        this.extend(this.getDefaultLength(initialRow));
    }

    /* AbstractBlock methods **************************************************/

    /**
     * Does any calculation needed by the block
     */
    protected calculate(): void {
        this.calculateBlocks();
    }

    /**
     * Returns the end row
     */
    public getEnd(): Row {
        if (this._blocks.length) {
            return this._blocks[this._blocks.length - 1].getEnd();
        }

        // Handle case with zero blocks
        return this._initialRow.slice();
    }

    /* AbstractContainer methods **********************************************/

    /**
     * Extends the container by adding the specified number of blocks
     * @param {number}  blocks - blocks to add
     */
    private extend(blocks: number): this {
        let index: number,
            oldLength: number = this.getLength(),
            newLength: number = oldLength + blocks,
            initialRow: Row = this.getEnd();

        for (index = oldLength + 1; index <= newLength; index += 1) {
            this._blocks[index - 1] = this.createBlock(initialRow, index);
            initialRow = this._blocks[index - 1].getEnd();
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
     * @param {Row}     initialRow - initial row for the block
     * @param {number}  index      - index of block in container
     */
    protected abstract createBlock(initialRow: Row, index: number): Block;

    /**
     * Calculates blocks within the course
     * @param {number} index - where to start when recalculating
     */
    private calculateBlocks(index: number = 0): void {
        let initialRow: Row = this._initialRow;

        if (index) {
            initialRow = this._blocks[index - 1].getEnd();
        }

        for (; index < this.getLength(); index += 1) {
            this._blocks[index].setInitialRow(initialRow);
            initialRow = this._blocks[index].getEnd();
        }

        this.notifyContainer();
    }

    /**
     * Read access to the length
     */
    public getLength(): number {
        return this._blocks.length;
    }


    /**
     * Write access to the length
     */
    public setLength(length: number): this {
        let [minimum, maximum]: [number, number] = this.getLengthLimits();
        if ((length < minimum) || (length > maximum)) {
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
        let [minimum, maximum]: [number, number] = this.getLengthLimits();
        length = Math.max(length, minimum);
        length = Math.min(length, maximum);
        return this.setLength(length);
    }

    /**
     * Returns the limits on length for the particular concrete class
     * 
     * minimum, maximum
     */
    protected abstract getLengthLimits(): [number, number];

    /**
     * Read access to a block
     * 
     * Derived classes should provide public access via a more
     * suitably-named method
     */
    protected getBlock(index: number): Block {
        if (index < 1 || index > this.getLength()) {
            throw new Error('Block index out of range');
        }
        return this._blocks[index - 1];
    }

    /**
     * Receives a notification from a block that has changed
     * @param {number}  index - index of changed block in container
     */
    public notify(index: number): void {
        this.calculateBlocks(index);
    }
}
