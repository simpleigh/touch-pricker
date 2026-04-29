/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { AbstractLead, Call } from '../../../leads';
import type { Row } from '../../../rows';
import * as Templates from '../../../templates';
import * as Changes from '../../changes';
import type SixType from '../../SixType';
import mbd from './mbd.dot';
import siril from './siril.dot';

/**
 * Base class for sixes
 */
@Templates.makePrintable({ mbd, siril }, { Call })
abstract class AbstractSix extends AbstractLead implements Templates.Interface {
    /**
     * Type of the six
     */
    public abstract readonly type: SixType;

    /**
     * Notation (excluding call)
     */
    public abstract readonly notation: string[];

    /* templating *************************************************************/

    public print: Templates.Print;

    /* AbstractBlock methods **************************************************/

    /**
     * Number of rows in the block
     * This doesn't take into account coming round part-way through
     */
    public readonly rows: number = 6;

    /* AbstractSix methods ****************************************************/

    /**
     * Computes a place notation string for a number of rows
     * @param rows  Number of rows (from 1 to 5)
     */
    public getNotationString(rows: number): string {
        return `+${this.notation.slice(0, rows).join('.')}`;
    }

    /**
     * Returns the six head
     */
    public getFirst(): Row {
        const start = this._initialRow.slice();
        Changes.permuteCall(start, this._call);
        return start;
    }
}

export default AbstractSix;
