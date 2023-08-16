/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

/* eslint-disable @typescript-eslint/no-floating-promises */

import AbstractPricker from '../../AbstractPricker';
import { polyfillTree } from '../../dom';
import {
    rankFromRow,
    rounds,
    Row,
    rowFromString,
    Stage,
    stringFromRow,
    Uint4Table,
} from '../../rows';
import * as Templates from '../../templates';
import { search } from '../searching';
import css from './css.dot';
import html from './html.dot';

/**
 * A turning course generator
 */
@Templates.makePrintable({ css, html }, { Stage })
class StedTurnPricker extends AbstractPricker {
    /**
     * Stage we're generating on
     */
    private _stage: Stage = Stage.Triples;

    /**
     * Target row
     */
    private _targetRow: Row;

    /**
     * Table with row distance information
     */
    private _table: Uint4Table;

    /* Pricker methods ********************************************************/

    public onLoad(): void {
        polyfillTree(document);
        this.reboot();
    }

    private async reboot(): Promise<void> {
        this._targetRow = rounds(this._stage);

        // TODO: table download URL needs to be customisable
        // TODO: need to handle errors downloading tables
        this._table = await Uint4Table.load(
            this._stage,
            `../data/stedman.${this._stage}.dat`,
        );

        this.redraw();
    }

    private redraw(): void {
        this.getEl<HTMLInputElement>('targetRow').value = stringFromRow(
            this._targetRow,
        );

        const targetRank = rankFromRow(this._targetRow);
        this.getEl<HTMLSpanElement>('sixes').innerText = (
            2 * this._table.getValue(targetRank)
        ).toString();

        const touches = search(this._table, targetRank);
        this.getEl<HTMLDivElement>('touches').innerHTML =
            touches.join('<br />');
        this.resize();
    }

    public onStage(): void {
        this._stage = parseInt(this.getEl<HTMLSelectElement>('stage').value);
        this.reboot();
    }

    public onSetTargetRow(): void {
        const input = this.getEl<HTMLInputElement>('targetRow').value;

        try {
            const targetRow = rowFromString(input, this._stage);
            this._targetRow = targetRow;
        } catch {
            return;
        }

        this.redraw();
    }

    public onResetTargetRow(): void {
        this._targetRow = rounds(this._stage);
        this.redraw();
    }
}

export default StedTurnPricker;
