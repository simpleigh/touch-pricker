/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { AbstractBlock } from '../blocks';
import { multiply, Row } from '../rows';
import Call from './Call';
import LeadHeadTable from './LeadHeadTable';

/**
 * Lead class
 *
 * A lead is an [[AbstractBlock]] that:
 * - uses two standard calls (bobs and singles)
 * - calculates the last row using a table of lead heads
 */
abstract class AbstractLead extends AbstractBlock {

    /**
     * Lead head reached by this lead
     */
    protected _last: Row;

    /**
     * Call used during the lead
     */
    protected _call: Call = Call.Plain;

    /**
     * Constructor
     */
    constructor(initialRow: Row) {
        super(initialRow);
        this.calculate();
    }

    /* AbstractBlock methods **************************************************/

    /**
     * Does any calculation needed by the block
     */
    protected calculate(): void {
        const leadHead = this.leadHeadTable[this._call][this.stage];
        if (!leadHead) {
            throw new Error(`Cannot find lead head for stage '${this.stage}'`);
        }

        this._last = multiply(this._initialRow, leadHead);
    }

    /**
     * Returns the last row in the block (the six end)
     */
    public getLast(): Row {
        return this._last.slice();
    }

    /* AbstractLead methods ***************************************************/

    /**
     * Returns a table of lead heads from rounds for each stage and call
     */
    protected abstract get leadHeadTable(): LeadHeadTable;

    /**
     * Read access to the call
     */
    get call(): Call {
        return this._call;
    }

    /**
     * Write access to the call
     */
    set call(call: Call) {
        this.setCall(call);
    }

    /**
     * Write access to the call, with the ability to suppress updates
     */
    public setCall(call: Call, update: boolean = true): this {
        this._call = call;
        if (update) {
            this.calculate();
            this.notifyContainer();
        }
        return this;
    }

    /**
     * Toggles the call type between Plain -> Bob -> Single -> Plain
     */
    public toggleCall(): Call {
        const call: Call = (this._call + 1) % 3;
        this.setCall(call);
        return call;
    }

}

export default AbstractLead;
