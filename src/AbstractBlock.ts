/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import BlockOwnership from './BlockOwnership';
import Notifiable from './Notifiable';
import { Row } from './rows';
import * as Visitor from './Visitor';

/**
 * Abstract class representing blocks of rows
 *
 * A block:
 *  - is initialised from a row
 *  - provides access to the last row in the block
 *  - recalculates that row if the initial row is changed
 *  - provides mechanisms for controlling how the last row is created
 *  - notifies any parent block whenever those mechanisms are actuated
 *
 * Blocks are designed to be aggregated into containers.
 * Containers notify blocks of changes by setting a new initial row.
 * Blocks notify containers of changes via a callback (receiveNotification).
 */
abstract class AbstractBlock {

    /**
     * Initial row for the block
     */
    protected _initialRow: Row;

    /**
     * Constructor
     * @param initialRow  initial row for the block
     * @param ownership   ownership of this block
     */
    constructor(initialRow: Row, protected _ownership?: BlockOwnership) {
        this._initialRow = initialRow.slice();
    }

    /* AbstractBlock methods **************************************************/

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
    public setInitialRow(initialRow: Row): this {
        this._initialRow = initialRow.slice();
        this.calculate();
        return this;
    }

    /**
     * Returns the last row in the block
     * e.g. a lead head or a six end (for Stedman)
     */
    public abstract getLast(): Row;

    /**
     * Updates references to the parent container
     */
    public setOwnership(ownership: BlockOwnership): AbstractBlock {
        this._ownership = ownership;
        return this;
    }

    /**
     * Allows public access to the container
     */
    public getContainer(): Notifiable | undefined {
        return this._ownership ? this._ownership.container : undefined;
    }

    /**
     * Allows public access to the index
     */
    public getIndex(): number | undefined {
        return this._ownership ? this._ownership.index : undefined;
    }

    /**
     * Clears references to the parent container
     */
    public clearOwnership(): AbstractBlock {
        this._ownership = undefined;
        return this;
    }

    /**
     * Notifies the parent container
     *
     * Derived classes should call this whenever the last row changes.
     */
    protected notifyContainer(): void {
        if (this._ownership) {
            this._ownership.container.notify(this._ownership.index);
        }
    }

    /**
     * Receives a visitor that will be called to process each row
     */
    public abstract accept(...visitors: Visitor.AbstractVisitor[]): this;

    /**
     * Estimates the number of rows in the block
     * The estimate doesn't take into account coming round part-way through
     */
    public abstract estimateRows(): number;

}

export default AbstractBlock;
