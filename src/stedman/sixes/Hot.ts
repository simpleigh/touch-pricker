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
        const row = '312547698E0ATCB'.slice(0, this._initialRow.length);
        const notation = `'${row}'`;
        return [notation, notation, notation, notation, notation];
    }

    /* AbstractBlock methods **************************************************/

    /**
     * Receives a visitor that will be called to process each row
     */
    public accept(...visitors: AbstractVisitor[]): this {
        const row = this.initialRow;

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

        this.visitAll(visitors, this._end);

        return this;
    }

    /* AbstractSix methods ****************************************************/

    /**
     * Computes a place notation string for a number of rows
     * @param {number} rows  Number of rows (from 1 to 5)
     */
    public getNotationString(rows: number): string {
        return this.notation.slice(0, rows).join(', ');
    }

    /**
     * Transposes the front three bells depending upon the type of six
     */
    protected applySixTransposition(): void {
        Changes.permuteUp(this._end);
    }

}

export default Hot;
