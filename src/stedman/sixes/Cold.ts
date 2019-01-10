/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-19 Leigh Simpson. All rights reserved.
 */

import { rowFromString, stringFromRow } from '../../rows';
import { AbstractVisitor } from '../../visitors';
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
        const row = rowFromString('213', this._initialRow.length);
        Changes.permute1(row);
        const notation = `'${stringFromRow(row)}'`;
        return [notation, notation, notation, notation, notation];
    }

    /* AbstractBlock methods **************************************************/

    /**
     * Receives a visitor that will be called to process each row
     */
    public accept(...visitors: AbstractVisitor[]): this {
        const row = this.initialRow;

        for (const visitor of visitors) {
            Changes.permuteCall(row, this._call);
            visitor.visit(row, this);

            Changes.permuteUp(row);
            visitor.visit(row, this);

            Changes.permuteUp(row);
            visitor.visit(row, this);

            Changes.permuteUp(row);
            visitor.visit(row, this);

            Changes.permuteUp(row);
            visitor.visit(row, this);

            visitor.visit(this._end, this);
        }

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
        Changes.permuteDown(this._end);
    }

}

export default Cold;
