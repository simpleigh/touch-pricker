/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../BlockDirectory.ts" />
/// <reference path="../Course.ts" />
/// <reference path="../Notifiable.ts" />
/// <reference path="../PrintableMixin.ts" />
/// <reference path="../rowFromString.ts" />
/// <reference path="../Row.ts" />
/// <reference path="../Stage.ts" />
/// <reference path="../stringFromRow.ts" />
/// <reference path="../Touch.ts" />
/// <reference path="../Music/MbdScheme.ts" />
/// <reference path="../Visitor/Counter.ts" />
/// <reference path="../Visitor/Music.ts" />
/// <reference path="../Visitor/Proof.ts" />

namespace Pricker {
    'use strict';

    enum Block {Course, Touch}

    /**
     * Prickers
     */
    export namespace Pricker {

        /**
         * An MBD pricker
         */
        export class Mbd implements Notifiable, PrintableMixin {

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
             * Music scheme in use
             */
            private _musicScheme: Music.MbdScheme;

            /**
             * Directory of musical sixes
             */
            private _music: BlockDirectory | undefined;

            /* Notifiable methods *********************************************/

            /**
             * Receives a notification from a block that has changed
             * @param index  index of changed block in container
             */
            public notify(index: number): void {
                if (index === Block.Course) {
                    this._extraSixes.setInitialRow(this._course.getEnd());
                    this._copiedIndex = undefined;
                } else if (index === Block.Touch) {
                    this._rowCount = undefined;
                    this._proofText = undefined;
                    this._falseness = undefined;
                    this._music = undefined;
                }
                this.redraw();
            }

            /* PrintableMixin methods *****************************************/

            /**
             * Renders the object with a template
             */
            public print: (t: string, c?: TemplateContext) => string;

            /**
             * Path for this class' templates
             */
            public readonly templatePath: string = 'Pricker.Mbd';

            /* Pricker methods ************************************************/

            /**
             * Wraps document.getElementById to add type information
             */
            protected getEl<T extends HTMLElement>(id: string): T {
                // Ignore risk elements may be null: this is our own HTML doc
                return document.getElementById(id) as T;
            }

            public init(): void {
                let element: HTMLOptionElement;

                for (let i = Stage.Triples; i <= Stage.Septuples; i += 2) {
                    element = document.createElement('option');
                    element.value = i.toString();
                    element.innerText = Stage[i];
                    this.getEl('stage').appendChild(element);
                }
                this.getEl<HTMLSelectElement>('stage').value =
                    Stage.Cinques.toString();

                this.onStage();
            }

            public onStage(): void {
                this._stage =
                    parseInt(this.getEl<HTMLSelectElement>('stage').value);
                this._initialRow = rowFromString('231', this._stage);

                this._course = new Course(
                    this._initialRow,
                    {'container': this, 'index': Block.Course},
                );
                this._extraSixes = new Course(this._initialRow);
                this._extraSixes.setLength(8);
                this._touch = new Touch(
                    this._initialRow,
                    {'container': this, 'index': Block.Touch},
                );
                this._musicScheme = new Music.MbdScheme(this._stage);

                this.redraw();
            }

            private redraw(): void {
                const newCourse = this._course.clone();

                this._extraSixes.setInitialRow(this._course.getEnd());
                this.getEl('sixends').innerHTML = this._course.print('mbd', {
                    'falseness': this._falseness,
                    'music': this._music,
                    'courseIndex': this._copiedIndex,
                    'extraSixes': this._extraSixes,
                });

                this.getEl('calling').innerHTML = this._course.print('html');

                newCourse.setInitialRow(this._initialRow);
                this.getEl('callingFromRounds').innerHTML =
                    newCourse.print('html');

                this.getEl<HTMLInputElement>('initialRow').value =
                    stringFromRow(this._course.getInitialRow());

                this.getEl<HTMLInputElement>('courseLength').value =
                    this._course.getLength().toString();

                if (this._savedCourse) {
                    this.getEl('savedCalling').innerHTML =
                        this._savedCourse.print('html');
                } else {
                    this.getEl('savedCalling').innerText = 'None';
                }

                // Proof and number of rows
                this.getEl('proofResult').innerText = this._proofText || '';
                if (this._rowCount) {
                    this.getEl('numRows').innerText =
                        this._rowCount + ' Stedman ' + Stage[this._stage];
                } else {
                    this.getEl('numRows').innerText =
                        this._touch.estimateRows() + ' changes';
                }

                // Touch display
                this.getEl('courses').outerHTML =
                    '<select id="courses"'
                        + ' onclick="pricker.onSelectCourse()"'
                        + ' ondblclick="pricker.onCopyCourse()">'
                        + this._touch.print('select', {
                            'touchRows': this._rowCount,
                            'styleUnreached': 'color:gray',
                            'falseness': this._falseness,
                            'styleFalse': 'color:red',
                        })
                        + '</select>';
                this.getEl<HTMLSelectElement>('courses').size = Math.max(
                    this._touch.getLength() + 1,
                    2,
                );
                this.getEl<HTMLSelectElement>('courses').value =
                    this._selectedIndex.toString();
            }

            public c(six: number): void {
                this._course.getSix(six).toggleCall();
            }

            public onSetInitialRow(): void {
                const input = this.getEl<HTMLInputElement>('initialRow').value;
                let initialRow: Row;

                try {
                    initialRow = rowFromString(input, this._stage);
                } catch (e) {
                    return;
                }

                this._course.setInitialRow(initialRow);
                this._extraSixes.setInitialRow(this._course.getEnd());
                this.redraw();
            }

            public onResetInitialRow(): void {
                this._course.setInitialRow(this._initialRow);
                this._extraSixes.setInitialRow(this._course.getEnd());
                this.redraw();
            }

            public onSetLength(): void {
                const input =
                        this.getEl<HTMLInputElement>('courseLength').value,
                    length = parseInt(input);

                if (length) {
                    this._course.safeSetLength(length);
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
                this._savedCourse.setInitialRow(this._initialRow);
                this.redraw();
            }

            public onLoadCalling(): void {
                if (this._savedCourse) {
                    this._course = this._savedCourse.clone();
                    this._course.setInitialRow(this._initialRow);
                } else {
                    this._course = new Course(this._initialRow);
                }

                this._course.setOwnership({
                    'container': this,
                    'index': Block.Course,
                });

                this.redraw();
            }

            public onSelectCourse() {
                const input = this.getEl<HTMLSelectElement>('courses').value;
                this._selectedIndex = parseInt(input);
            }

            public onInsertCourse(): void {
                this._selectedIndex += 1;

                this._touch.insertCourse(
                    this._selectedIndex,
                    this._course.clone(),
                );

                if (this.getEl<HTMLInputElement>('rolling').checked) {
                    this._course.setInitialRow(
                        this._touch.getCourse(this._selectedIndex).getEnd(),
                    );
                    this._course.resetLength();
                    this._course.resetCalls();
                }
            }

            public onPasteCourse(): void {
                if (this._selectedIndex) {
                    this._touch.deleteCourse(this._selectedIndex);
                    this._touch.insertCourse(
                        this._selectedIndex,
                        this._course.clone(),
                    );

                    if (this.getEl<HTMLInputElement>('rolling').checked) {
                        this._course.setInitialRow(
                            this._touch.getCourse(this._selectedIndex).getEnd(),
                        );
                        this._selectedIndex = Math.min(
                            this._selectedIndex + 1,
                            this._touch.getLength(),
                        );
                        this._course.resetLength();
                        this._course.resetCalls();
                    }
                }
            }

            public onCopyCourse(): void {
                if (this._selectedIndex) {
                    this._course =
                        this._touch.getCourse(this._selectedIndex).clone();
                    this._course.setOwnership({
                        'container': this,
                        'index': Block.Course,
                    });

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
                    this._touch.deleteCourse(this._selectedIndex);
                    this._selectedIndex = Math.min(
                        this._selectedIndex,
                        this._touch.getLength(),
                    );
                    this.redraw();
                }
            }

            public onLoadTouch() {
                const input =
                    this.getEl<HTMLTextAreaElement>('loadSaveTextarea').value;
                let newTouch: Touch;

                try {
                    newTouch = Touch.fromString(input);
                } catch (e) {
                    // Ignore
                    return;
                }

                this._stage = newTouch.getInitialRow().length;
                this.getEl<HTMLSelectElement>('stage').value =
                    this._stage.toString();
                this.onStage();

                this._touch = newTouch;
                this._touch.setOwnership({
                    'container': this,
                    'index': Block.Touch,
                });

                this.redraw();
            }

            public onSaveTouch() {
                this.getEl('loadSaveTextarea').innerText =
                    this._touch.print('text');
            }

            public onGenerateSiril(): void {
                this.getEl('sirilTextarea').innerText =
                    this._touch.print('siril', {'touchRows': this._rowCount});
            }

            public onAnalyseMusic(): void {
                const visitor = new Visitor.Music(this._musicScheme);
                this._touch.accept(visitor);
                this.getEl('musicTextarea').innerText =
                    visitor.getMatcher().print('text');
                this._music = visitor.getDirectory();
            }

            public onProve(): boolean {
                const proof = new Visitor.Proof(),
                    counter = new Visitor.Counter();

                this._touch.accept(proof, counter);
                this._rowCount = counter.getCount();
                this._falseness = proof.getDirectory();

                if (proof.isTrue()) {
                    if (proof.isVisiting()) {
                        this._proofText = "True, but doesn't come round";
                    } else {
                        this._proofText = 'Composition is true';
                    }
                } else {
                    this._proofText = 'Composition is FALSE';
                }

                this.redraw();
                return proof.isTrue();
            }

            public onTab(pageId: string): void {
                const tabs = this.getEl('tabs').children,
                    tab = this.getEl('tab_' + pageId),
                    pages = this.getEl('pages').children,
                    page = this.getEl('page_' + pageId);

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
            }

        }

        PrintableMixin.makePrintable(Mbd);

    }

}
