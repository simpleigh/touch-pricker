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
 * A "Hot" (jump down) six
 */
class Hot extends AbstractSix {

    /**
     * Type of the six
     */
    public readonly type: SixType = SixType.Hot;

    /**
     * Notation (excluding call)
     */
    get notation(): string[] {
        const row = '312547698E0ATCB'.slice(0, this.stage);
        const notation = `'${row}'`;
        return [notation, notation, notation, notation, notation];
    }

    /* AbstractBlock methods **************************************************/

    /**
     * Receives a visitor that will be called to process each row
     */
    public accept(...visitors: AbstractVisitor[]): this {
        const row = this.initialRow as MutableRow;

        Changes.permuteCall(row, this._call);
        this.visitAll(visitors, row);

        Changes.permuteDown(row);
        this.visitAll(visitors, row);

        Changes.permuteDown(row);
        this.visitAll(visitors, row);

        Changes.permuteDown(row);
        this.visitAll(visitors, row);

        Changes.permuteDown(row);
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
                [Stage.Triples]:   [1, 4, 2, 6, 3, 7, 5],
                [Stage.Caters]:    [1, 4, 2, 6, 3, 8, 5, 9, 7],
                [Stage.Cinques]:   [1, 4, 2, 6, 3, 8, 5, 10, 7, 11, 9],
                [Stage.Sextuples]: [1, 4, 2, 6, 3, 8, 5, 10, 7, 12, 9, 13, 11],
                [Stage.Septuples]: [1, 4, 2, 6, 3, 8, 5, 10, 7, 12, 9, 14, 11, 15, 13],
            },
            [Call.Bob]: {
                [Stage.Triples]:   [1, 4, 2, 5, 3, 6, 7],
                [Stage.Caters]:    [1, 4, 2, 6, 3, 7, 5, 8, 9],
                [Stage.Cinques]:   [1, 4, 2, 6, 3, 8, 5, 9, 7, 10, 11],
                [Stage.Sextuples]: [1, 4, 2, 6, 3, 8, 5, 10, 7, 11, 9, 12, 13],
                [Stage.Septuples]: [1, 4, 2, 6, 3, 8, 5, 10, 7, 12, 9, 13, 11, 14, 15],
            },
            [Call.Single]: {
                [Stage.Triples]:   [1, 4, 2, 5, 3, 7, 6],
                [Stage.Caters]:    [1, 4, 2, 6, 3, 7, 5, 9, 8],
                [Stage.Cinques]:   [1, 4, 2, 6, 3, 8, 5, 9, 7, 11, 10],
                [Stage.Sextuples]: [1, 4, 2, 6, 3, 8, 5, 10, 7, 11, 9, 13, 12],
                [Stage.Septuples]: [1, 4, 2, 6, 3, 8, 5, 10, 7, 12, 9, 13, 11, 15, 14],
            },
        };
        /* eslint-enable */
    }

    /* AbstractSix methods ****************************************************/

    /**
     * Computes a place notation string for a number of rows
     * @param rows  Number of rows (from 1 to 5)
     */
    public override getNotationString(rows: number): string {
        return this.notation.slice(0, rows).join(', ');
    }

}

export default Hot;
