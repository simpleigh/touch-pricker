/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import { AbstractBlock, BlockOwnership } from '../../blocks';
import { multiply, Row, rowFromString, Stage } from '../../rows';
import * as Templates from '../../templates';
import { AbstractVisitor } from '../../visitors';
import library from '../library';
import Method from '../Method';
import html from './html.dot';

/**
 * Lead for Tuesday touch pricker
 */
@Templates.makePrintable({ html })
class Lead extends AbstractBlock implements Templates.Interface {

    /**
     * Lead head of the next row
     */
    private _last: Row;

    /**
     * Method selected for the lead
     */
    protected _method: Method = Method.Bristol;

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
        const methodRows = library[this._method];
        const leadHeadString = methodRows[methodRows.length - 1];
        const leadHead = rowFromString(leadHeadString, Stage.Maximus);

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
        const methodRowStrings = library[this._method];
        for (const methodRowString of methodRowStrings) {
            const methodRow = rowFromString(methodRowString, Stage.Maximus);
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
        return library[this._method].length;
    }

    /** Lead methods */

    /**
     * Read access to the method
     */
    get method(): Method {
        return this._method;
    }

    /**
     * Write access to the method
     */
    set method(method: Method) {
        this._method = method;
        this.calculate();
        this.notifyContainer();
    }
}

export default Lead;
