/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { AbstractLead } from '../../../leads';
import { Call, Row } from '../../../rows';
import * as Templates from '../../../templates';
import * as Changes from '../../changes';
import SixType from '../../SixType';
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
    public readonly abstract type: SixType;

    /**
     * Notation (excluding call)
     */
    public readonly abstract notation: string[];

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

}

export default AbstractSix;
