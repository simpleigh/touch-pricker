/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { Call, LeadHeadTable } from '../../leads';
import { MutableRow, Stage } from '../../rows';
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
        const row = this.initialRow as MutableRow;

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

        this.visitAll(visitors, this.getLast());

        return this;
    }

    /* AbstractLead methods ***************************************************/

    /**
     * Returns a table of lead heads from rounds for each stage and call
     */
    protected get leadHeadTable(): LeadHeadTable {
        /* eslint-disable max-len */
        return {
            [Call.Plain]: {
                [Stage.Triples]:   [2, 4, 1, 6, 3, 7, 5],
                [Stage.Caters]:    [2, 4, 1, 6, 3, 8, 5, 9, 7],
                [Stage.Cinques]:   [2, 4, 1, 6, 3, 8, 5, 10, 7, 11, 9],
                [Stage.Sextuples]: [2, 4, 1, 6, 3, 8, 5, 10, 7, 12, 9, 13, 11],
                [Stage.Septuples]: [2, 4, 1, 6, 3, 8, 5, 10, 7, 12, 9, 14, 11, 15, 13],
            },
            [Call.Bob]: {
                [Stage.Triples]:   [2, 4, 1, 5, 3, 6, 7],
                [Stage.Caters]:    [2, 4, 1, 6, 3, 7, 5, 8, 9],
                [Stage.Cinques]:   [2, 4, 1, 6, 3, 8, 5, 9, 7, 10, 11],
                [Stage.Sextuples]: [2, 4, 1, 6, 3, 8, 5, 10, 7, 11, 9, 12, 13],
                [Stage.Septuples]: [2, 4, 1, 6, 3, 8, 5, 10, 7, 12, 9, 13, 11, 14, 15],
            },
            [Call.Single]: {
                [Stage.Triples]:   [2, 4, 1, 5, 3, 7, 6],
                [Stage.Caters]:    [2, 4, 1, 6, 3, 7, 5, 9, 8],
                [Stage.Cinques]:   [2, 4, 1, 6, 3, 8, 5, 9, 7, 11, 10],
                [Stage.Sextuples]: [2, 4, 1, 6, 3, 8, 5, 10, 7, 11, 9, 13, 12],
                [Stage.Septuples]: [2, 4, 1, 6, 3, 8, 5, 10, 7, 12, 9, 13, 11, 15, 14],
            },
        };
        /* eslint-enable max-len */
    }

}

export default Slow;
