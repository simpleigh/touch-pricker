/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { AbstractVisitor } from '../../visitors';
import * as Changes from '../changes';
import SixType from '../SixType';
import AbstractSix from './AbstractSix';

/**
 * A slow six
 */
class Slow extends AbstractSix {

    /**
     * Type of the six
     */
    public readonly type: SixType = SixType.Slow;

    /**
     * Notation (excluding call)
     */
    public readonly notation: string[] = ['3', '1', '3', '1', '3'];

    /* AbstractBlock methods **************************************************/

    /**
     * Receives a visitor that will be called to process each row
     */
    public accept(...visitors: AbstractVisitor[]): this {
        const row = this.initialRow;

        Changes.permuteCall(row, this._call);
        this.visitAll(visitors, row);

        Changes.permute3(row);
        this.visitAll(visitors, row);

        Changes.permute1(row);
        this.visitAll(visitors, row);

        Changes.permute3(row);
        this.visitAll(visitors, row);

        Changes.permute1(row);
        this.visitAll(visitors, row);

        this.visitAll(visitors, this._end);

        return this;
    }

    /* AbstractSix methods ****************************************************/

    /**
     * Transposes the front three bells depending upon the type of six
     */
    protected applySixTransposition(): void {
        Changes.permute1(this._end);
    }

}

export default Slow;
