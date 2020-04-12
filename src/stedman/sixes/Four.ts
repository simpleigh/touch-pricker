/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { Call, multiply, Row } from '../../rows';
import { AbstractVisitor } from '../../visitors';
import * as Changes from '../changes';
import SixType from '../SixType';
import AbstractSix from './AbstractSix';

/**
 * A "four" six for Carter's
 */
class Four extends AbstractSix {

    /**
     * Type of the six
     */
    public readonly type: SixType = SixType.Four;

    /**
     * Notation (excluding call)
     */
    public readonly notation: string[] = ['3', '1', '3'];

    /* AbstractBlock methods **************************************************/

    /**
     * Does any calculation needed by the block
     */
    protected calculate(): void {
        this._end = multiply(
            this._initialRow,
            this.leadHeads[this._call][this.stage],
        );
    }

    /**
     * Number of rows in the block
     * This doesn't take into account coming round part-way through
     */
    public readonly rows: number = 4;

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

        this.visitAll(visitors, this._end);

        return this;
    }

    /* Four methods ***********************************************************/

    /**
     * First lead heads for each stage and call
     */
    private get leadHeads(): { [call: number]: { [stage: number]: Row } } {
        return {
            [Call.Plain]: {
                7: [4, 1, 2, 6, 3, 7, 5],
                9: [4, 1, 2, 6, 3, 8, 5, 9, 7],
                11: [4, 1, 2, 6, 3, 8, 5, 10, 7, 11, 9],
                13: [4, 1, 2, 6, 3, 8, 5, 10, 7, 12, 9, 13, 11],
                15: [4, 1, 2, 6, 3, 8, 5, 10, 7, 12, 9, 14, 11, 15, 13],
            },
            [Call.Bob]: {
                7: [4, 1, 2, 5, 3, 6, 7],
                9: [4, 1, 2, 6, 3, 7, 5, 8, 9],
                11: [4, 1, 2, 6, 3, 8, 5, 9, 7, 10, 11],
                13: [4, 1, 2, 6, 3, 8, 5, 10, 7, 11, 9, 12, 13],
                15: [4, 1, 2, 6, 3, 8, 5, 10, 7, 12, 9, 13, 11, 14, 15],
            },
            [Call.Single]: {
                7: [4, 1, 2, 5, 3, 7, 6],
                9: [4, 1, 2, 6, 3, 7, 5, 9, 8],
                11: [4, 1, 2, 6, 3, 8, 5, 9, 7, 11, 10],
                13: [4, 1, 2, 6, 3, 8, 5, 10, 7, 11, 9, 13, 12],
                15: [4, 1, 2, 6, 3, 8, 5, 10, 7, 12, 9, 13, 11, 15, 14],
            },
        };
    };

}

export default Four;
