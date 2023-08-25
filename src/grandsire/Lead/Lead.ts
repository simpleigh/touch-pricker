/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { AbstractLead, Call, type LeadHeadTable } from '../../leads';
import { type MutableRow, Stage, symbolFromBell } from '../../rows';
import * as Templates from '../../templates';
import type { AbstractVisitor } from '../../visitors';
import * as Changes from '../changes';
import mbd from './mbd.dot';
import siril from './siril.dot';

/**
 * A lead of grandsire
 */
@Templates.makePrintable({ mbd, siril }, { Call })
class Lead extends AbstractLead implements Templates.Interface {
    /* templating *************************************************************/

    public print: Templates.Print;

    /* AbstractBlock methods **************************************************/

    /**
     * Number of rows in the block
     * This doesn't take into account coming round part-way through
     */
    get rows(): number {
        return this.stage * 2;
    }

    /**
     * Receives a visitor that will be called to process each row
     */
    public accept(...visitors: AbstractVisitor[]): this {
        const row = this.initialRow as MutableRow;

        Changes.permute3(row);
        this.visitAll(visitors, row);

        Changes.permute1(row);
        this.visitAll(visitors, row);

        for (let i = 1; i <= this.stage - 2; i += 1) {
            Changes.permuteN(row);
            this.visitAll(visitors, row);

            Changes.permute1(row);
            this.visitAll(visitors, row);
        }

        if (this.call) {
            Changes.permute3(row); // "early thirds"
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

    /* AbstractLead methods ***************************************************/

    /**
     * Returns a table of lead heads from rounds for each stage and call
     */
    protected get leadHeadTable(): LeadHeadTable {
        // prettier-ignore
        return {
            [Call.Plain]: {
                [Stage.Doubles]:   [1, 2, 5, 3, 4],
                [Stage.Triples]:   [1, 2, 5, 3, 7, 4, 6],
                [Stage.Caters]:    [1, 2, 5, 3, 7, 4, 9, 6, 8],
                [Stage.Cinques]:   [1, 2, 5, 3, 7, 4, 9, 6, 11, 8, 10],
                [Stage.Sextuples]: [1, 2, 5, 3, 7, 4, 9, 6, 11, 8, 13, 10, 12],
                [Stage.Septuples]: [1, 2, 5, 3, 7, 4, 9, 6, 11, 8, 13, 10, 15, 12, 14],
            },
            [Call.Bob]: {
                [Stage.Doubles]:   [1, 4, 5, 2, 3],
                [Stage.Triples]:   [1, 7, 5, 2, 6, 3, 4],
                [Stage.Caters]:    [1, 7, 5, 2, 9, 3, 8, 4, 6],
                [Stage.Cinques]:   [1, 7, 5, 2, 9, 3, 11, 4, 10, 6, 8],
                [Stage.Sextuples]: [1, 7, 5, 2, 9, 3, 11, 4, 13, 6, 12, 8, 10],
                [Stage.Septuples]: [1, 7, 5, 2, 9, 3, 11, 4, 13, 6, 15, 8, 14, 10, 12],
            },
            [Call.Single]: {
                [Stage.Doubles]:   [1, 5, 4, 2, 3],
                [Stage.Triples]:   [1, 5, 7, 2, 6, 3, 4],
                [Stage.Caters]:    [1, 5, 7, 2, 9, 3, 8, 4, 6],
                [Stage.Cinques]:   [1, 5, 7, 2, 9, 3, 11, 4, 10, 6, 8],
                [Stage.Sextuples]: [1, 5, 7, 2, 9, 3, 11, 4, 13, 6, 12, 8, 10],
                [Stage.Septuples]: [1, 5, 7, 2, 9, 3, 11, 4, 13, 6, 15, 8, 14, 10, 12],
            },
        };
    }

    /* Lead methods ***********************************************************/

    /**
     * Computes the place notation for the lead
     */
    get notation(): string[] {
        const nNotation = symbolFromBell(this.stage);
        const result = ['3', '1'];

        for (let i = 1; i <= this.stage - 2; i += 1) {
            result.push(nNotation);
            result.push('1');
        }

        if (this.call) {
            result.push('3'); // "early thirds"
        } else {
            result.push(nNotation);
        }

        if (this.call === Call.Single) {
            result.push('123');
        } else {
            result.push('1');
        }

        return result;
    }
}

export default Lead;
