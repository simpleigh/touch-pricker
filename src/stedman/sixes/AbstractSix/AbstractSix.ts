/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import { AbstractBlock, BlockOwnership } from '../../../blocks';
import { Row } from '../../../rows';
import * as Templates from '../../../templates';
import Call from '../../Call';
import * as Changes from '../../Changes';
import SixType from '../../SixType';
import mbd from './mbd.dot';
import siril from './siril.dot';

/**
 * Base class for sixes
 */
@Templates.makePrintable({ mbd, siril }, { Call })
abstract class AbstractSix
    extends AbstractBlock
    implements Templates.Interface {

    /**
     * Type of the six
     */
    public readonly abstract type: SixType;

    /**
     * Notation (excluding call)
     */
    public readonly abstract notation: string[];

    /**
     * Six end of this six
     */
    protected _end: Row;

    /**
     * Call used to start the six
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
        this._end = this._initialRow.slice();  // Create new array
        Changes.permuteCall(this._end, this._call);
        this.applySixTransposition();
    }

    /**
     * Returns the last row in the block (the six end)
     */
    public getLast(): Row {
        return this._end.slice();
    }

    /**
     * Estimates the number of rows in the block
     * The estimate doesn't take into account coming round part-way through
     */
    public estimateRows(): number {
        return 6;
    }

    /* AbstractSix methods ****************************************************/

    /**
     * Computes a place notation string for a number of rows
     * @param {number} rows  Number of rows (from 1 to 5)
     */
    public getNotationString(rows: number): string {
        return '+' + this.notation.slice(0, rows).join('.');
    }

    /**
     * Returns the six head
     */
    public getFirst(): Row {
        const start = this._initialRow.slice();
        Changes.permuteCall(start, this._call);
        return start;
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
    public setCall(call: Call, update: boolean = true): AbstractSix {
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

    /**
     * Finishes transposing the end row depending upon the type of six
     */
    protected abstract applySixTransposition(): void;

}

export default AbstractSix;
