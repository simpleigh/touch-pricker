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
    type Row,
    rowFromString,
    Stage,
    stringFromRow,
} from '../../rows';
import {
    type Calling,
    createTranspositions,
    searchAsync,
    Uint4Table,
} from '../../searching';
import * as Templates from '../../templates';
import Course from '../Course';
import { Stedman } from '../methods';
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
        this.showModal('Downloading data table...');
        try {
            this._table = await Uint4Table.load(
                this._stage,
                `../data/stedman.${this._stage}.dat`,
            );
        } catch {
            this.showModal('Download failed: please refresh and try again.');
            return;
        }
        this.hideModal();

        this.fromRow = rounds(this._stage);
        this.toRow = rounds(this._stage);
        this.courses = [];

        this.search();
    }

    private async search(): Promise<void> {
        if (this.steps === 0) {
            // Avoid returning a single (empty) calling if we're already there.
            this.courses = [];
        } else {
            this.showModal('Searching for courses...');

            const method = new Stedman();
            const course = new Course(rounds(this._stage), method);
            const transpositions = createTranspositions(
                course,
                method.searchCallingStrings,
                true,
            );

            const courses = await searchAsync(
                this._table,
                transpositions,
                this._targetRank,
                this._steps,
            );

            this.hideModal();

            // Only update after hiding the modal so its width isn't measured
            // during the call to `.resize()`.
            this.courses = courses;
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

        const coursesDiv = this.getEl<HTMLDivElement>('courses');
        coursesDiv.innerHTML = this.print('select', { courses: this.courses });
        polyfillTree(coursesDiv);

        this.selectedIndex = undefined;
        this.course = undefined; // triggers redraw of pricker display

        this.resize();
    }

    private get selectedIndex(): number | undefined {
        return this._selectedIndex;
    }

    private set selectedIndex(selectedIndex: number | undefined) {
        const coursesDiv = this.getEl<HTMLDivElement>('courses');

        if (
            this._selectedIndex !== undefined &&
            coursesDiv.children[this._selectedIndex] // eslint-disable-line @typescript-eslint/no-unnecessary-condition
        ) {
            coursesDiv.children[this._selectedIndex].classList.remove(
                'selected',
            );
        }

        this._selectedIndex = selectedIndex;

        if (this._selectedIndex !== undefined) {
            coursesDiv.children[this._selectedIndex].classList.add('selected');
        }

        const open1 = this.getEl<HTMLButtonElement>('open1');
        const open2 = this.getEl<HTMLButtonElement>('open2');
        open1.disabled = selectedIndex === undefined;
        open2.disabled = selectedIndex === undefined;
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

    private showModal(message: string): void {
        this.getEl<HTMLDivElement>('modal').innerText = message;
        this.getEl<HTMLDivElement>('modalOverlay').style.display = 'block';
    }

    private hideModal(): void {
        this.getEl<HTMLDivElement>('modalOverlay').style.display = 'none';
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

    public async onMinus(): Promise<void> {
        do {
            this.steps -= 1;
            await this.search(); // eslint-disable-line no-await-in-loop
        } while (!this.courses.length && this.steps !== this._minimumSteps);
    }

    public async onPlus(): Promise<void> {
        do {
            this.steps += 1;
            await this.search(); // eslint-disable-line no-await-in-loop
        } while (!this.courses.length);
    }

    public onSelectCourse(index: number): void {
        this.selectedIndex = index;
    }

    public onOpenCourse(): void {
        const calling = this._courses[this.selectedIndex!];
        const course = new Course(this.fromRow!, new Stedman());
        calling.updateCourse(course);
        this.course = course;
    }

    // eslint-disable-next-line id-length
    public c(): void {
        // NOOP
    }
}

export default StedTurnPricker;
