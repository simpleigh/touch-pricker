/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import { BlockDirectory, Notifiable } from '../../blocks';
import { hide, show } from '../../dom';
import { MbdScheme } from '../../music';
import { Row, rowFromString, Stage, stringFromRow } from '../../rows';
import { Course, SixType, Touch } from '../../stedman';
import { AbstractStrategy, Erin, Stedman } from '../../stedman/strategies';
import * as Templates from '../../templates';
import * as Visitors from '../../visitors';
import AbstractPricker from '../AbstractPricker';
import css from './css.dot';
import html from './html.dot';

enum Block { Course, Touch }

/**
 * An MBD pricker
 */
@Templates.makePrintable({ css, html }, { Stage })
class Mbd extends AbstractPricker implements Notifiable {

    /**
     * Strategy for generating rows
     */
    private _strategy: AbstractStrategy = new Stedman();

    /**
     * Stage we're pricking on
     */
    private _stage: Stage;

    /**
     * Cache of the initial row for this stage
     */
    private _initialRow: Row;

    /**
     * The course itself
     */
    private _course: Course;

    /**
     * Additional sixes displayed after the course
     */
    private _extraSixes: Course;

    /**
     * Course being saved for later
     */
    private _savedCourse: Course | undefined;

    /**
     * Touch being composed
     */
    private _touch: Touch;

    /**
     * Whether we're showing six heads
     */
    private _showSixHeads: boolean = false;

    /**
     * Whether we're showing advanced options
     */
    private _showAdvancedOptions: boolean = false;

    /**
     * Course selected in touch view
     */
    private _selectedIndex: number = 0;

    /**
     * Index of course copied from touch view
     */
    private _copiedIndex: number | undefined;

    /**
     * Count of rows in touch
     */
    private _rowCount: number | undefined;

    /**
     * Report of touch proof status
     */
    private _proofText: string | undefined;

    /**
     * Directory of false sixes
     */
    private _falseness: BlockDirectory | undefined;

    /**
     * Directory of musical sixes
     */
    private _music: BlockDirectory | undefined;

    /* Notifiable methods *****************************************************/

    /**
     * Receives a notification from a block that has changed
     * @param index  index of changed block in container
     */
    public notify(index: number): void {
        if (index === Block.Course) {
            this._extraSixes.initialRow = this._course.getLast();
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
        this.onStage();
    }

    public onMethod(): void {
        const method = this.getEl<HTMLSelectElement>('method').value;
        const strategyMap: { [method: string]: AbstractStrategy } = {
            erin: new Erin(),
            stedman: new Stedman(),
        };
        this._strategy = strategyMap[method];
        this.boot();
    }

    public onStage(): void {
        this._stage = parseInt(this.getEl<HTMLSelectElement>('stage').value);
        this.boot();
    }

    private boot(): void {
        this._initialRow = rowFromString('231', this._stage);

        this._course = new Course(
            this._initialRow,
            { container: this, index: Block.Course },
            this._strategy,
        );
        this._extraSixes = new Course(
            this._initialRow,
            undefined,
            this._strategy,
        );

        this._course.resetLength();
        this._extraSixes.setLength(8);

        this._touch = new Touch(
            rowFromString('', this._stage),
            { container: this, index: Block.Touch },
            this._strategy,
        );

        // Call notify() to clear out state from the previous touch
        this.notify(Block.Touch); // calls redraw()
        this.redrawTouch();
    }

    private redraw(): void {
        const newCourse = this._course.clone();

        const lastSix = this._course.getBlock(this._course.length);
        this._extraSixes.setFirstSixType(
            this._strategy.getNextSixType(lastSix.type),
        );
        this._extraSixes.initialRow = this._course.getLast();
        this.getEl('sixends').innerHTML = this._course.print('mbd', {
            courseIndex: this._copiedIndex,
            extraSixes: this._extraSixes,
            falseness: this._falseness,
            music: this._music,
            showSixHeads: this._showSixHeads,
        });

        this.getEl('calling').innerHTML = this._course.print('html');

        newCourse.initialRow = this._initialRow;
        newCourse.setFirstSixType(SixType.Slow);
        this.getEl('callingFromRounds').innerHTML = newCourse.print('html');

        this.getEl<HTMLInputElement>('initialRow').value =
            stringFromRow(this._course.initialRow);

        this.getEl<HTMLSelectElement>('firstSix').value =
            this._course.firstSixType;

        if (this._showAdvancedOptions) {
            show(this.getEl('firstSixBlock'));
        } else {
            hide(this.getEl('firstSixBlock'));
        }

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
        this.getEl('proofResult').innerText = this._proofText || '';
        this.getEl('numRows').innerText = this._rowCount
            ? this._rowCount + ' Stedman ' + Stage[this._stage]
            : this._touch.estimateRows() + ' changes';

        this.getEl<HTMLSelectElement>('rowIndex').value =
            this._touch.start.rowIndex.toString();
        this.getEl<HTMLSelectElement>('sixType').value =
            this._touch.start.sixType.toString();

        if (this._showAdvancedOptions) {
            show(this.getEl('startBlock'));
        } else {
            hide(this.getEl('startBlock'));
        }

        this.getEl('courses').outerHTML =
            '<select id="courses"'
                + ' onclick="pricker.onSelectCourse()"'
                + ' ondblclick="pricker.onCopyCourse()">'
                + this._touch.print('select', {
                    falseness: this._falseness,
                    styleFalse: 'color:red',
                    styleUnreached: 'color:gray',
                    touchRows: this._rowCount,
                })
                + '</select>';
        this.getEl<HTMLSelectElement>('courses').size = Math.max(
            this._touch.length + 1,
            2,
        );
        this.getEl<HTMLSelectElement>('courses').value =
            this._selectedIndex.toString();

        this.resize();
    }

    public c(six: number): void {
        this._course.getBlock(six).toggleCall();
    }

    public onSetInitialRow(): void {
        const input = this.getEl<HTMLInputElement>('initialRow').value;
        let initialRow: Row;

        try {
            initialRow = rowFromString(input, this._stage);
        } catch (e) {
            return;
        }

        this._course.initialRow = initialRow;
        this.redraw();
    }

    public onResetInitialRow(): void {
        this._course.initialRow = this._initialRow;
        this.redraw();
    }

    public onFirstSix(): void {
        const input = this.getEl<HTMLSelectElement>('firstSix').value;
        this._course.setFirstSixType(input as SixType);
        this.redraw();
    }

    public onSetLength(): void {
        const input = this.getEl<HTMLInputElement>('courseLength').value;
        let length = parseInt(input);

        if (length) {
            length = Math.max(2, length);
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
            this._course = new Course(
                this._initialRow,
                undefined,
                this._strategy,
            );
            this._course.resetLength();
        }

        this._course.ownership = { container: this, index: Block.Course };

        this.redraw();
    }

    public onRowIndex(): void {
        const input = this.getEl<HTMLSelectElement>('rowIndex').value;
        this._touch.start.rowIndex = parseInt(input);
        this.redrawTouch();
    }

    public onSixType(): void {
        const input = this.getEl<HTMLSelectElement>('sixType').value;
        this._touch.start.sixType = input as SixType;
        this.redrawTouch();
    }

    public onSelectCourse(): void {
        const input = this.getEl<HTMLSelectElement>('courses').value;
        this._selectedIndex = parseInt(input);
    }

    public onInsertCourse(): void {
        this._selectedIndex += 1;

        this._touch.insertBlock(this._selectedIndex, this._course.clone());

        if (this.getEl<HTMLInputElement>('rolling').checked) {
            const course = this._touch.getBlock(this._selectedIndex);
            const sixType = course.getBlock(course.length).type;
            this._course.setFirstSixType(
                this._strategy.getNextSixType(sixType),
            );
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
                const sixType = course.getBlock(course.length).type;
                this._course.setFirstSixType(
                    this._strategy.getNextSixType(sixType),
                );
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
        let newTouch: Touch;

        try {
            newTouch = Touch.fromString(input, this._strategy);
        } catch (e) {
            // Ignore
            return;
        }

        this._stage = newTouch.initialRow.length;
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

        this.getEl('sirilTextarea').innerText =
            this._touch.print('siril', { touchRows: this._rowCount });
    }

    public onAnalyseMusic(): void {
        const scheme = new MbdScheme(this._stage);
        const visitor = new Visitors.Music(scheme);
        this._touch.accept(visitor);
        this.getEl('musicTextarea').innerText = visitor.matcher.print('text');
        this._music = visitor.directory;
    }

    public onShowSixHeads(): void {
        const element = this.getEl<HTMLInputElement>('showSixHeads');
        this._showSixHeads = element.checked;
        this.redraw();
    }

    public onShowAdvancedOptions(): void {
        const element = this.getEl<HTMLInputElement>('showAdvancedOptions');
        this._showAdvancedOptions = element.checked;
        this.redraw();
        this.redrawTouch();
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
        const tab = this.getEl('tab_' + pageId);
        const pages = this.getEl('pages').children;
        const page = this.getEl('page_' + pageId);

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < tabs.length; i += 1) {
            tabs[i].className = 'tab';
        }
        tab.className = 'tab tab-selected';

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < pages.length; i += 1) {
            pages[i].className = 'page';
        }
        page.className = 'page page-selected';

        this.resize();
    }

}

export default Mbd;
