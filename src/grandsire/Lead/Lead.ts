/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { AbstractBlock, BlockOwnership } from '../../blocks';
import { multiply, Row } from '../../rows';
import { Call } from '../../shared';
import * as Templates from '../../templates';
import { AbstractVisitor } from '../../visitors';
import * as Changes from '../changes';
import mbd from './mbd.dot';

/**
 * A lead of grandsire
 */
@Templates.makePrintable({ mbd }, { Call })
class Lead extends AbstractBlock implements Templates.Interface {
    /**
     * Lead head reached by this lead
     */
    protected _last: Row;

    /**
     * Call used at the end of the lead
     */
    protected _call: Call = Call.Plain;

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
        const stage = this._initialRow.length;
        let leadHead: Row;

        // Figure out lead head starting from rounds for this stage and call
        if (this._call === Call.Plain) {
            leadHead = this.leadHead.slice(0, stage - 1);
            leadHead.push(stage - 1);
        } else {
            leadHead = this.bobbedLeadHeads[stage].slice();
        }

        if (this._call === Call.Single) {
            // swap places 2 and 3; 5 is always in place 3 before we do this
            leadHead[2] = leadHead[1];
            leadHead[1] = 5;
        }

        // then multiply to find the answer
        this._last = multiply(this._initialRow, leadHead);
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
        const stage = this._initialRow.length;
        const row = this.initialRow;

        Changes.permute3(row);
        this.visitAll(visitors, row);

        Changes.permute1(row);
        this.visitAll(visitors, row);

        for (let i = 1; i <= stage - 2; i += 1) {
            Changes.permuteN(row);
            this.visitAll(visitors, row);

            Changes.permute1(row);
            this.visitAll(visitors, row);
        }

        if (this.call) {
            Changes.permute3(row);  // "early thirds"
        } else {
            Changes.permuteN(row);
        }
        this.visitAll(visitors, row);

        if (this.call === Call.Single) {
            Changes.permute123(row);
        } else {
            Changes.permute1(row);
        }
        this.visitAll(visitors, row);

        return this;
    }

    /**
     * Estimates the number of rows in the block
     * The estimate doesn't take into account coming round part-way through
     */
    public estimateRows(): number {
        return this._initialRow.length * 2;
    }

    /* Lead methods ***********************************************************/

    /**
     * First lead head of a plain lead on the maximum supported stage
     */
    private readonly leadHead: Row = [
        1, 2, 5, 3, 7, 4, 9, 6, 11, 8, 13, 10, 15, 12, 14,
    ];

    /**
     * First lead head of a bobbed lead for each supported stage
     *
     * Precompute to avoid complicated computation every `calculate()`.
     */
    private readonly bobbedLeadHeads: { [stage: number]: Row } = {
        5: [1, 4, 5, 2, 3],
        7: [1, 7, 5, 2, 6, 3, 4],
        9: [1, 7, 5, 2, 9, 3, 8, 4, 6],
        11: [1, 7, 5, 2, 9, 3, 11, 4, 10, 6, 8],
        13: [1, 7, 5, 2, 9, 3, 11, 4, 13, 6, 12, 8, 10],
        15: [1, 7, 5, 2, 9, 3, 11, 4, 13, 6, 15, 8, 14, 10, 12],
    }

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
    public setCall(call: Call, update: boolean = true): Lead {
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

export default Lead;
