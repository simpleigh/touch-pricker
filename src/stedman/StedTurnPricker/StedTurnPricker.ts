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
    inverse,
    multiply,
    rankFromRow,
    rounds,
    Row,
    rowFromString,
    Stage,
    stringFromRow,
    Uint4Table,
} from '../../rows';
import * as Templates from '../../templates';
import Course from '../Course';
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
     * Starting row
     */
    private _fromRow: Row;

    /**
     * Ending row
     */
    private _toRow: Row;

    /**
     * Target rank
     * This is the transposition from the initial row to the target row.
     */
    private _targetRank: number;

    /**
     * Minimum possible number of steps for the search
     */
    private _minimumSteps: number;

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
     * Course opened in sixends view
     */
    private _course?: Course;

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
        this._fromRow = rounds(this._stage);
        this._toRow = rounds(this._stage);
        this._targetRank = 0;
        this._minimumSteps = 0;
        this._steps = 0;
        this._courses = [];
        this._selectedIndex = undefined;
        this._course = undefined;

        this.redraw();

        // TODO: table download URL needs to be customisable
        // TODO: need to handle errors downloading tables
        this._table = await Uint4Table.load(
            this._stage,
            `../data/stedman.${this._stage}.dat`,
        );

        this.search(); // calls redraw() when it completes
    }

    private computeRowProperties(): void {
        const targetRow = multiply(inverse(this._fromRow), this._toRow);
        this._targetRank = rankFromRow(targetRow);
        this._minimumSteps = this._table.getValue(this._targetRank);
        this._steps = this._minimumSteps;
    }

    private search(): void {
        if (this._steps === 0) {
            // No point searching if we're already there.
            this._courses = [];
        } else {
            this._courses = search(this._table, this._targetRank, this._steps);
        }

        this._selectedIndex = undefined;
        this._course = undefined;

        this.redraw();
    }

    private redraw(): void {
        this.getEl<HTMLInputElement>('fromRow').value = stringFromRow(
            this._fromRow,
        );
        this.getEl<HTMLInputElement>('toRow').value = stringFromRow(
            this._toRow,
        );
        this.getEl<HTMLSpanElement>('sixes').innerText = (
            2 * this._steps
        ).toString();

        this.getEl<HTMLDivElement>(
            'numCourses',
        ).innerHTML = `${this._courses.length} courses`;
        const courses = this.getEl<HTMLDivElement>('courses');
        courses.innerHTML = this.print('select', {
            courses: this._courses,
            selectedIndex: this._selectedIndex,
        });
        polyfillTree(courses);

        this.getEl<HTMLDivElement>('sixends').innerHTML = this._course
            ? this._course.print('mbd', { extraSixes: 0 })
            : '';

        this.resize();
    }

    public onSetFromRow(): void {
        const input = this.getEl<HTMLInputElement>('fromRow').value;

        try {
            const initialRow = rowFromString(input, this._stage);
            this._fromRow = initialRow;
        } catch {
            return;
        }

        this.computeRowProperties();
        this.search();
    }

    public onResetFromRow(): void {
        this._fromRow = rounds(this._stage);
        this.computeRowProperties();
        this.search();
    }

    public onSetToRow(): void {
        const input = this.getEl<HTMLInputElement>('toRow').value;

        try {
            const toRow = rowFromString(input, this._stage);
            this._toRow = toRow;
        } catch {
            return;
        }

        this.computeRowProperties();
        this.search();
    }

    public onResetToRow(): void {
        this._toRow = rounds(this._stage);
        this.computeRowProperties();
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

    public onOpenCourse(): void {
        const calling = this._courses[this._selectedIndex!];
        this._course = calling.createCourse(this._fromRow);
        this.redraw();
    }

    // eslint-disable-next-line id-length
    public c(): void {
        // NOOP
    }
}

export default StedTurnPricker;
