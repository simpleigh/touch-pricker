/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import AbstractPricker from '../../AbstractPricker';
import { BlockDirectory, Notifiable } from '../../blocks';
import { polyfillTree } from '../../dom';
import { MbdScheme, RunsScheme } from '../../music';
import { rounds, Row, rowFromString, Stage, stringFromRow } from '../../rows';
import * as Templates from '../../templates';
import * as Visitors from '../../visitors';
import Course from '../Course';
import Touch from '../Touch';
import css from './css.dot';
import html from './html.dot';

// eslint-disable-next-line no-shadow
const enum Block { Course, Touch }

/**
 * An MBD pricker
 */
@Templates.makePrintable({ css, html }, { Stage })
class MbdPricker extends AbstractPricker implements Notifiable {

    /**
     * Stage we're pricking on
     */
    private _stage: Stage = Stage.Triples;

    /**
     * Cache of the initial row for this stage
     */
    private _initialRow: Row;

    /**
     * The course itself
     */
    private _course: Course;

    /**
     * Additional leads displayed after the course
     */
    private _extraLeads: Course;

    /**
     * Course being saved for later
     */
    private _savedCourse?: Course;

    /**
     * Touch being composed
     */
    private _touch: Touch;

    /**
     * Course selected in touch view
     */
    private _selectedIndex?: number;

    /**
     * Index of course copied from touch view
     */
    private _copiedIndex?: number;

    /**
     * Count of rows in touch
     */
    private _rowCount?: number;

    /**
     * Report of touch proof status
     */
    private _proofText?: string;

    /**
     * Directory of false leads
     */
    private _falseness?: Readonly<BlockDirectory>;

    /**
     * Directory of musical leads
     */
    private _music?: Readonly<BlockDirectory>;

    /* Notifiable methods *****************************************************/

    /**
     * Receives a notification from a block that has changed
     * @param index  index of changed block in container
     */
    public notify(index: number): void {
        if (index === Block.Course) {
            this._extraLeads.initialRow = this._course.getLast();
            this._copiedIndex = undefined;
        } else if (index === Block.Touch) {
            this._rowCount = undefined;
            this._proofText = undefined;
            this._falseness = undefined;
            this._music = undefined;
        }
        this.redraw();
    }

    /* Pricker methods ********************************************************/

    public onLoad(): void {
        polyfillTree(document);
        this.reboot();
    }

    private reboot(): void {
        this._initialRow = rounds(this._stage);

        this._touch = new Touch(this._initialRow);
        this._touch.ownership = { container: this, index: Block.Touch };

        this._course = new Course(this._initialRow);
        this._course.ownership = { container: this, index: Block.Course };

        this._extraLeads = new Course(this._initialRow);

        this._course.resetLength();
        this._extraLeads.setLength(Math.ceil(this._stage / 2) - 1);

        this._savedCourse = undefined;
        this._selectedIndex = undefined;
        this._copiedIndex = undefined;

        // Call notify() to clear out state from the previous touch
        this.notify(Block.Touch); // calls redraw()
        this.redrawTouch();
    }

    private redraw(): void {
        const newCourse = this._course.clone();

        this._extraLeads.initialRow = this._course.getLast();
        this.getEl('leadends').innerHTML = this._course.print('mbd', {
            courseIndex: this._copiedIndex,
            extraLeads: this._extraLeads,
            falseness: this._falseness,
            music: this._music,
        });
        polyfillTree(this.getEl('leadends'));

        this.getEl('calling').innerHTML = this._course.print('html');

        newCourse.initialRow = this._initialRow;
        this.getEl('callingFromRounds').innerHTML = newCourse.print('html');

        this.getEl<HTMLInputElement>('initialRow').value =
            stringFromRow(this._course.initialRow);

        this.getEl<HTMLInputElement>('courseLength').value =
            this._course.length.toString();

        if (this._savedCourse) {
            this.getEl('savedCalling').innerHTML =
                this._savedCourse.print('html');
        } else {
            this.getEl('savedCalling').innerText = 'None';
        }

        this.resize();
    }

    private redrawTouch(): void {
        this.getEl('proofResult').innerText = this._proofText ?? '';
        this.getEl('numRows').innerText = this._rowCount
            ? `${this._rowCount} Grandsire ${Stage[this._stage]}`
            : `${this._touch.rows} changes`;

        this.redrawCourses();

        this.resize();
    }

    private redrawCourses(): void {
        this.getEl<HTMLDivElement>('courses').innerHTML =
            this._touch.print('select', {
                falseness: this._falseness,
                selectedIndex: this._selectedIndex,
                touchRows: this._rowCount,
            });
        polyfillTree(this.getEl('courses'));
    }

    public c(lead: number): void {  // eslint-disable-line id-length
        this._course.getBlock(lead).toggleCall();
    }

    public onStage(): void {
        this._stage = parseInt(this.getEl<HTMLSelectElement>('stage').value);
        this.reboot();
    }

    public onSetInitialRow(): void {
        const input = this.getEl<HTMLInputElement>('initialRow').value;

        try {
            const initialRow = rowFromString(input, this._stage);
            this._course.initialRow = initialRow;
        } catch (_) {
            return;
        }

        this.redraw();
    }

    public onResetInitialRow(): void {
        this._course.initialRow = this._initialRow;
        this.redraw();
    }

    public onSetLength(): void {
        const input = this.getEl<HTMLInputElement>('courseLength').value;
        let length = parseInt(input);

        if (length) {
            length = Math.max(1, length);
            length = Math.min(60, length);
            this._course.setLength(length);
        }
    }

    public onResetLength(): void {
        this._course.resetLength();
    }

    public onResetCalls(): void {
        this._course.resetCalls();
    }

    public onSaveCalling(): void {
        this._savedCourse = this._course.clone();
        this._savedCourse.initialRow = this._initialRow;
        this.redraw();
    }

    public onLoadCalling(): void {
        if (this._savedCourse) {
            this._course = this._savedCourse.clone();
            this._course.initialRow = this._initialRow;
        } else {
            this._course = new Course(this._initialRow);
            this._course.resetLength();
        }

        this._course.ownership = { container: this, index: Block.Course };

        this.redraw();
    }

    public onSelectCourse(index: number): void {
        // Only redraw when selection changes to avoid breaking ondblclick by
        // swapping out DOM elements underneath it.
        if (index !== this._selectedIndex) {
            this._selectedIndex = index;
            this.redrawCourses();
        }
    }

    public onInsertCourse(): void {
        if (!this._selectedIndex) {
            this._selectedIndex = 0;
        }

        this._selectedIndex += 1;

        this._touch.insertBlock(this._selectedIndex, this._course.clone());

        if (this.getEl<HTMLInputElement>('rolling').checked) {
            const course = this._touch.getBlock(this._selectedIndex);
            this._course.initialRow = course.getLast();
            this._course.resetLength();
            this._course.resetCalls();
        }

        this.redrawTouch();
    }

    public onPasteCourse(): void {
        if (this._selectedIndex) {
            this._touch.deleteBlock(this._selectedIndex);
            this._touch.insertBlock(this._selectedIndex, this._course.clone());

            if (this.getEl<HTMLInputElement>('rolling').checked) {
                const course = this._touch.getBlock(this._selectedIndex);
                this._course.initialRow = course.getLast();
                this._selectedIndex = Math.min(
                    this._selectedIndex + 1,
                    this._touch.length,
                );
                this._course.resetLength();
                this._course.resetCalls();
            }

            this.redrawTouch();
        }
    }

    public onCopyCourse(): void {
        if (this._selectedIndex) {
            this._course = this._touch.getBlock(this._selectedIndex).clone();
            this._course.ownership = { container: this, index: Block.Course };

            this._copiedIndex = this._selectedIndex;
            this.redraw();
        }
    }

    public onCutCourse(): void {
        this.onCopyCourse();
        this.onDeleteCourse();
    }

    public onDeleteCourse(): void {
        if (this._selectedIndex) {
            this._touch.deleteBlock(this._selectedIndex);
            this._selectedIndex = Math.min(
                this._selectedIndex,
                this._touch.length,
            );
            this.redraw();
            this.redrawTouch();
        }
    }

    public onLoadTouch(): void {
        const input = this.getEl<HTMLTextAreaElement>('loadSaveTextarea').value;
        let newTouch: Touch;  // eslint-disable-line init-declarations

        try {
            newTouch = Touch.fromString(input);
        } catch (_) {
            // Ignore
            return;
        }

        this._stage = newTouch.stage;
        this.getEl<HTMLSelectElement>('stage').value = this._stage.toString();
        this.onStage();

        this._touch = newTouch;
        this._touch.ownership = { container: this, index: Block.Touch };

        // Call notify() to clear out state from the previous touch
        this.notify(Block.Touch); // calls redraw()
        this.redrawTouch();
    }

    public onSaveTouch(): void {
        this.getEl<HTMLTextAreaElement>('loadSaveTextarea').value =
            this._touch.print('text');
    }

    public onGenerateSiril(): void {
        // Make sure we have the count of rows before generating
        if (!this._rowCount) {
            this.onProve();
        }

        this.getEl<HTMLTextAreaElement>('sirilTextarea').value =
            this._touch.print('siril', { touchRows: this._rowCount });
    }

    public onAnalyseMusic(): void {
        const schemeName = this.getEl<HTMLSelectElement>('musicScheme').value;
        const scheme = schemeName === 'runs'
            ? new RunsScheme(this._stage)
            : new MbdScheme(this._stage);
        const visitor = new Visitors.Music(scheme);
        this._touch.accept(visitor);
        this.getEl<HTMLTextAreaElement>('musicTextarea').value =
            visitor.matcher.print('text');
        this._music = visitor.directory;
    }

    public onProve(): boolean {
        const proof = new Visitors.Proof();
        const counter = new Visitors.Counter();

        this._touch.accept(proof, counter);
        this._rowCount = counter.count;
        this._falseness = proof.directory;

        if (proof.isTrue) {
            this._proofText = proof.visiting
                ? "True, but doesn't come round"
                : 'Composition is true';
        } else {
            this._proofText = 'Composition is FALSE';
        }

        this.redraw();
        this.redrawTouch();
        return proof.isTrue;
    }

    public onTab(pageId: string): void {
        const tabs = this.getEl('tabs').children;
        const tab = this.getEl(`tab_${pageId}`);
        const pages = this.getEl('pages').children;
        const page = this.getEl(`page_${pageId}`);

        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < tabs.length; i += 1) {
            tabs[i].className = 'tab';
        }
        tab.className = 'tab tab-selected';

        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < pages.length; i += 1) {
            pages[i].className = 'page';
        }
        page.className = 'page page-selected';

        this.resize();
    }

}

export default MbdPricker;
