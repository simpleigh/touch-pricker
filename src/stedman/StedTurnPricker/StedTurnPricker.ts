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
    private _fromRow?: Row;

    /**
     * Ending row
     */
    private _toRow?: Row;

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

        // TODO: table download URL needs to be customisable
        // TODO: need to handle errors downloading tables
        this._table = await Uint4Table.load(
            this._stage,
            `../data/stedman.${this._stage}.dat`,
        );

        this.fromRow = rounds(this._stage);
        this.toRow = rounds(this._stage);
        this.courses = [];

        this.search();
    }

    private search(): void {
        if (this.steps === 0) {
            // Avoid returning a single (empty) calling if we're already there.
            this.courses = [];
        } else {
            this.courses = search(this._table, this._targetRank, this.steps);
        }
    }

    private get fromRow(): Row | undefined {
        return this._fromRow;
    }

    private set fromRow(fromRow: Row) {
        this._fromRow = fromRow;
        this.getEl<HTMLInputElement>('fromRow').value = stringFromRow(fromRow);
        this.setRowProperties();
    }

    private get toRow(): Row | undefined {
        return this._toRow;
    }

    private set toRow(toRow: Row) {
        this._toRow = toRow;
        this.getEl<HTMLInputElement>('toRow').value = stringFromRow(toRow);
        this.setRowProperties();
    }

    private get steps(): number {
        return this._steps;
    }

    private set steps(steps: number) {
        this._steps = steps;
        this.getEl<HTMLInputElement>('sixes').value = `${2 * steps}`;

        this.getEl<HTMLButtonElement>('minus').disabled =
            this._steps === this._minimumSteps;
    }

    private get courses(): Calling[] {
        return this._courses;
    }

    private set courses(courses: Calling[]) {
        this._courses = courses;

        this.getEl<HTMLDivElement>(
            'numCourses',
        ).innerHTML = `${courses.length} courses`;

        this.selectedIndex = undefined; // triggers redraw of courses display
        this.course = undefined; // triggers redraw of pricker display

        this.resize();
    }

    private get selectedIndex(): number | undefined {
        return this._selectedIndex;
    }

    private set selectedIndex(selectedIndex: number | undefined) {
        this._selectedIndex = selectedIndex;

        const courses = this.getEl<HTMLDivElement>('courses');
        courses.innerHTML = this.print('select', {
            courses: this.courses,
            selectedIndex: this.selectedIndex,
        });

        polyfillTree(courses);
    }

    private get course(): Course | undefined {
        return this._course;
    }

    private set course(course: Course | undefined) {
        this._course = course;

        this.getEl<HTMLDivElement>('sixends').innerHTML = course
            ? course.print('mbd', { extraSixes: 0 })
            : '';

        this.resize();
    }

    private setRowProperties(): void {
        if (this.fromRow && this.toRow) {
            const targetRow = multiply(inverse(this.fromRow), this.toRow);
            this._targetRank = rankFromRow(targetRow);
            this._minimumSteps = this._table.getValue(this._targetRank);
            this.steps = this._minimumSteps;
        }
    }

    public onSetFromRow(): void {
        const input = this.getEl<HTMLInputElement>('fromRow').value;

        try {
            const initialRow = rowFromString(input, this._stage);
            this.fromRow = initialRow;
        } catch {
            return;
        }

        this.search();
    }

    public onResetFromRow(): void {
        this.fromRow = rounds(this._stage);
        this.search();
    }

    public onSetToRow(): void {
        const input = this.getEl<HTMLInputElement>('toRow').value;

        try {
            const toRow = rowFromString(input, this._stage);
            this.toRow = toRow;
        } catch {
            return;
        }

        this.search();
    }

    public onResetToRow(): void {
        this.toRow = rounds(this._stage);
        this.search();
    }

    public onMinus(): void {
        do {
            this.steps -= 1;
            this.search();
        } while (!this.courses.length && this.steps !== this._minimumSteps);
    }

    public onPlus(): void {
        do {
            this.steps += 1;
            this.search();
        } while (!this.courses.length);
    }

    public onSelectCourse(index: number): void {
        // Only redraw when selection changes to avoid breaking ondblclick by
        // swapping out DOM elements underneath it.
        if (index !== this.selectedIndex) {
            this.selectedIndex = index;
        }
    }

    public onOpenCourse(): void {
        const calling = this._courses[this.selectedIndex!];
        this.course = calling.createCourse(this.fromRow!);
    }

    // eslint-disable-next-line id-length
    public c(): void {
        // NOOP
    }
}

export default StedTurnPricker;
