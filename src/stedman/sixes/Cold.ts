/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { Call, type LeadHeadTable } from '../../leads';
import { type MutableRow, Stage } from '../../rows';
import type { AbstractVisitor } from '../../visitors';
import * as Changes from '../changes';
import SixType from '../SixType';
import AbstractSix from './AbstractSix';

/**
 * A "cold" (jump up) six
 */
class Cold extends AbstractSix {
    /**
     * Type of the six
     */
    public readonly type: SixType = SixType.Cold;

    /**
     * Notation (excluding call)
     */
    get notation(): string[] {
        const row = '231547698E0ATCB'.slice(0, this.stage);
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

        Changes.permuteUp(row);
        this.visitAll(visitors, row);

        Changes.permuteUp(row);
        this.visitAll(visitors, row);

        Changes.permuteUp(row);
        this.visitAll(visitors, row);

        Changes.permuteUp(row);
        this.visitAll(visitors, row);

        this.visitAll(visitors, this.getLast());

        return this;
    }

    /* AbstractLead methods ***************************************************/

    /**
     * Returns a table of lead heads from rounds for each stage and call
     */
    protected get leadHeadTable(): LeadHeadTable {
        // prettier-ignore
        return {
            [Call.Plain]: {
                [Stage.Triples]:   [4, 2, 1, 6, 3, 7, 5],
                [Stage.Caters]:    [4, 2, 1, 6, 3, 8, 5, 9, 7],
                [Stage.Cinques]:   [4, 2, 1, 6, 3, 8, 5, 10, 7, 11, 9],
                [Stage.Sextuples]: [4, 2, 1, 6, 3, 8, 5, 10, 7, 12, 9, 13, 11],
                [Stage.Septuples]: [4, 2, 1, 6, 3, 8, 5, 10, 7, 12, 9, 14, 11, 15, 13],
            },
            [Call.Bob]: {
                [Stage.Triples]:   [4, 2, 1, 5, 3, 6, 7],
                [Stage.Caters]:    [4, 2, 1, 6, 3, 7, 5, 8, 9],
                [Stage.Cinques]:   [4, 2, 1, 6, 3, 8, 5, 9, 7, 10, 11],
                [Stage.Sextuples]: [4, 2, 1, 6, 3, 8, 5, 10, 7, 11, 9, 12, 13],
                [Stage.Septuples]: [4, 2, 1, 6, 3, 8, 5, 10, 7, 12, 9, 13, 11, 14, 15],
            },
            [Call.Single]: {
                [Stage.Triples]:   [4, 2, 1, 5, 3, 7, 6],
                [Stage.Caters]:    [4, 2, 1, 6, 3, 7, 5, 9, 8],
                [Stage.Cinques]:   [4, 2, 1, 6, 3, 8, 5, 9, 7, 11, 10],
                [Stage.Sextuples]: [4, 2, 1, 6, 3, 8, 5, 10, 7, 11, 9, 13, 12],
                [Stage.Septuples]: [4, 2, 1, 6, 3, 8, 5, 10, 7, 12, 9, 13, 11, 15, 14],
            },
        };
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

export default Cold;
