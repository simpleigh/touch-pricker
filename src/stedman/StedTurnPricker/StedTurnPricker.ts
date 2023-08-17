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
import { Calling, search } from '../searching';
import css from './css.dot';
import html from './html.dot';
import select from './select.dot';

/**
 * A turning course generator
 */
@Templates.makePrintable({ css, html, select }, { Stage })
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
     * Number of steps for the search
     */
    private _steps: number;

    /**
     * Courses that the search has found
     */
    private _courses: Calling[];

    /**
     * Course selected in courses list
     */
    private _selectedIndex?: number;

    /**
     * Table with row distance information
     */
    private _table: Uint4Table;

    /* Pricker methods ********************************************************/

    public onLoad(): void {
        polyfillTree(document);
        this.onStage();
    }

    public async onStage(): Promise<void> {
        this._stage = parseInt(this.getEl<HTMLSelectElement>('stage').value);
        this._targetRow = rounds(this._stage);
        this._steps = 0;
        this._courses = [];
        this._selectedIndex = undefined;

        this.redraw();

        // TODO: table download URL needs to be customisable
        // TODO: need to handle errors downloading tables
        this._table = await Uint4Table.load(
            this._stage,
            `../data/stedman.${this._stage}.dat`,
        );

        this.search(); // calls redraw() when it completes
    }

    private search(): void {
        const targetRank = rankFromRow(this._targetRow);
        this._steps = this._table.getValue(targetRank);
        this._courses = search(this._table, targetRank, this._steps);
        this._selectedIndex = undefined;

        this.redraw();
    }

    private redraw(): void {
        this.getEl<HTMLInputElement>('targetRow').value = stringFromRow(
            this._targetRow,
        );
        this.getEl<HTMLSpanElement>('sixes').innerText = (
            2 * this._steps
        ).toString();

        this.getEl<HTMLDivElement>(
            'numCourses',
        ).innerHTML = `${this._courses.length} courses`;
        this.getEl<HTMLDivElement>('courses').innerHTML = this.print('select', {
            courses: this._courses,
            selectedIndex: this._selectedIndex,
        });

        this.resize();
    }

    public onSetTargetRow(): void {
        const input = this.getEl<HTMLInputElement>('targetRow').value;

        try {
            const targetRow = rowFromString(input, this._stage);
            this._targetRow = targetRow;
        } catch {
            return;
        }

        this.search();
    }

    public onResetTargetRow(): void {
        this._targetRow = rounds(this._stage);
        this.search();
    }

    public onSelectCourse(index: number): void {
        // Only redraw when selection changes to avoid breaking ondblclick by
        // swapping out DOM elements underneath it.
        if (index !== this._selectedIndex) {
            this._selectedIndex = index;
            this.redraw();
        }
    }
}

export default StedTurnPricker;
