/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import { AbstractBlock, BlockOwnership } from '../../blocks';
import { multiply, Row } from '../../rows';
import * as Templates from '../../templates';
import { AbstractVisitor } from '../../visitors';
import library from '../library';
import html from './html.dot';

/**
 * Lead for Tuesday touch pricker
 */
@Templates.makePrintable({ html }, { library })
class Lead extends AbstractBlock implements Templates.Interface {

    /**
     * Lead head of the next row
     */
    private _last: Row;

    /**
     * Method selected for the lead
     */
    protected _method: string = 'Bristol';

    /**
     * Constructor
     */
    constructor(initialRow: Row, protected _ownership?: BlockOwnership) {
        super(initialRow, _ownership);
        this.calculate();
    }

    /* templating *************************************************************/

    public print: Templates.Print;

    /* AbstractBlock methods **************************************************/

    /**
     * Does any calculation needed by the block
     */
    protected calculate(): void {
        const leadHead = library.getLeadHead(this._method)!;

        this._last = multiply(
            this._initialRow,
            leadHead,
        );
    }

    /**
     * Returns the last row in the block (the six end)
     */
    public getLast(): Row {
        return this._last.slice();
    }

    /**
     * Receives a visitor that will be called to process each row
     */
    public accept(...visitors: AbstractVisitor[]): this {
        const methodRows = library.getRows(this._method)!;
        for (const methodRow of methodRows) {
            const row = multiply(this._initialRow, methodRow);
            for (const visitor of visitors) {
                visitor.visit(row);
            }
        }

        return this;
    }

    /**
     * Estimates the number of rows in the block
     * The estimate doesn't take into account coming round part-way through
     */
    public estimateRows(): number {
        return library.getRowCount(this._method)!;
    }

    /** Lead methods */

    /**
     * Read access to the method
     */
    get method(): string {
        return this._method;
    }

    /**
     * Write access to the method
     */
    set method(method: string) {
        if (!library.getRowCount(method)) {
            throw new Error(`Method "${method}" not found`);
        }

        this._method = method;
        this.calculate();
        this.notifyContainer();
    }
}

export default Lead;
