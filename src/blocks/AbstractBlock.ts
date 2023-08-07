/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { Row, Stage } from '../rows';
import { AbstractVisitor } from '../visitors';
import BlockOwnership from './BlockOwnership';
import Notifiable from './Notifiable';

/**
 * Abstract class representing blocks of rows
 *
 * A block:
 * - is initialised from a row
 * - provides access to the last row in the block
 * - recalculates that row if the initial row is changed
 * - provides mechanisms for controlling how the last row is created
 * - notifies any parent block whenever those mechanisms are actuated
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
     * Ownership of this block
     */
    protected _ownership?: BlockOwnership;

    /**
     * Constructor
     * @param initialRow  initial row for the block
     */
    constructor(initialRow: Row) {
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
    get initialRow(): Row {
        return this._initialRow.slice();
    }

    /**
     * Write access to the initial row
     */
    set initialRow(initialRow: Row) {
        this._initialRow = initialRow.slice();
        this.calculate();
    }

    /**
     * Returns the last row in the block
     * e.g. a lead head or a six end (for Stedman)
     */
    public abstract getLast(): Row;

    /**
     * Stage for the block
     */
    get stage(): Stage {
        return this._initialRow.length;
    }

    /**
     * Number of rows in the block
     * This doesn't take into account coming round part-way through
     */
    abstract get rows(): number;

    /**
     * Updates references to the parent container
     */
    // eslint-disable-next-line accessor-pairs
    set ownership(ownership: BlockOwnership) {
        this._ownership = ownership;
    }

    /**
     * Allows public access to the container
     */
    get container(): Notifiable | undefined {
        return this._ownership ? this._ownership.container : undefined;
    }

    /**
     * Allows public access to the index
     */
    get index(): number | undefined {
        return this._ownership ? this._ownership.index : undefined;
    }

    /**
     * Clears references to the parent container
     */
    public clearOwnership(): this {
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
     * Receives visitor(s) that will be called to process each row
     */
    public abstract accept(...visitors: AbstractVisitor[]): this;

    /**
     * Helper function to correctly fan out calls to multiple visitors
     */
    protected visitAll(visitors: AbstractVisitor[], row: Row): void {
        for (const visitor of visitors) {
            visitor.visit(row, this);
        }
    }

}

export default AbstractBlock;
