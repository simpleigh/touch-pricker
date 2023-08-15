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
     * Starting row
     */
    private _initialRow: Row;

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
        this._initialRow = rounds(this._stage);

        // TODO: table download URL needs to be customisable
        // TODO: need to handle errors downloading tables
        this._table = await Uint4Table.load(
            this._stage,
            `../data/stedman.${this._stage}.dat`,
        );

        this.redraw();
    }

    private redraw(): void {
        this.getEl<HTMLInputElement>('initialRow').value = stringFromRow(
            this._initialRow,
        );

        const rank = rankFromRow(this._initialRow);
        this.getEl('distance').innerText = this._table
            .getValue(rank)
            .toString();
    }

    public onStage(): void {
        this._stage = parseInt(this.getEl<HTMLSelectElement>('stage').value);
        this.reboot();
    }

    public onSetInitialRow(): void {
        const input = this.getEl<HTMLInputElement>('initialRow').value;

        try {
            const initialRow = rowFromString(input, this._stage);
            this._initialRow = initialRow;
        } catch {
            return;
        }

        this.redraw();
    }

    public onResetInitialRow(): void {
        this._initialRow = rounds(this._stage);
        this.redraw();
    }
}

export default StedTurnPricker;
