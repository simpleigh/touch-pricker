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

            /**
             * Constructor
             */
            constructor() {
                let element: HTMLOptionElement;

                for (let i = Stage.Triples; i <= Stage.Septuples; i += 2) {
                    element = document.createElement('option');
                    element.value = i.toString();
                    element.innerText = Stage[i];
                    document.getElementById('stage').appendChild(element);
                }
                document.getElementById('stage').value = Stage.Cinques;

                this.setStage();
            }

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

            public setStage(): void {
                this._stage =
                    parseInt(document.getElementById('stage').value, 10);
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
                document.getElementById('sixends').innerHTML =
                    this._course.print('mbd', {
                        'falseness': this._falseness,
                        'music': this._music,
                        'courseIndex': this._copiedIndex,
                        'extraSixes': this._extraSixes,
                    });

                document.getElementById('calling').innerHTML =
                    this._course.print('html');

                newCourse.setInitialRow(this._initialRow);
                document.getElementById('callingFromRounds').innerHTML =
                    newCourse.print('html');

                document.getElementById('initialRow').value =
                    stringFromRow(this._course.getInitialRow());

                document.getElementById('courseLength').value =
                    this._course.getLength();

                if (this._savedCourse) {
                    document.getElementById('savedCalling').innerHTML =
                        this._savedCourse.print('html');
                } else {
                    document.getElementById('savedCalling').innerText = 'None';
                }

                // Proof and number of rows
                document.getElementById('proofResult').innerText =
                    this._proofText || '';
                if (this._rowCount) {
                    document.getElementById('numRows').innerText =
                        this._rowCount + ' Stedman ' + Stage[this._stage];
                } else {
                    document.getElementById('numRows').innerText =
                        this._touch.estimateRows() + ' changes';
                }

                // Touch display
                document.getElementById('courses').outerHTML =
                    '<select id="courses"'
                        + 'ondblclick="pricker.copyCourse()">'
                        + this._touch.print('select', {
                            'touchRows': this._rowCount,
                            'styleUnreached': 'color:gray',
                            'falseness': this._falseness,
                            'styleFalse': 'color:red',
                        })
                        + '</select>';
                document.getElementById('courses').size = Math.max(
                    this._touch.getLength() + 1,
                    2,
                );
                document.getElementById('courses').value = this._selectedIndex;
            }

            public c(six: number): void {
                this._course.getSix(six).toggleCall();
            }

            public setInitialRow(): void {
                const input = document.getElementById('initialRow').value;
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

            public resetInitialRow(): void {
                this._course.setInitialRow(this._initialRow);
                this._extraSixes.setInitialRow(this._course.getEnd());
                this.redraw();
            }

            public setLength(): void {
                const input = document.getElementById('courseLength').value,
                    length = parseInt(input, 10);

                if (length) {
                    this._course.safeSetLength(length);
                }
            }

            public resetLength(): void {
                this._course.resetLength();
            }

            public resetCalls(): void {
                this._course.resetCalls();
                this.redraw();
            }

            public saveCalling(): void {
                this._savedCourse = this._course.clone();
                this._savedCourse.setInitialRow(this._initialRow);
            }

            public loadCalling(): void {
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
            }

            public selectCourse(index: number) {
                this._selectedIndex = index;
            }

            public insertCourse(): void {
                this._touch.insertCourse(
                    this._selectedIndex + 1,
                    this._course.clone(),
                );
                this._selectedIndex += 1;

                if (document.getElementById('rolling').checked) {
                    this._course.setInitialRow(
                        this._touch.getCourse(this._selectedIndex).getEnd(),
                    );
                    this._course.resetLength();
                    this._course.resetCalls();
                }

                this.redraw();
            }

            public pasteCourse(): void {
                if (this._selectedIndex) {
                    this._touch.deleteCourse(this._selectedIndex);
                    this._touch.insertCourse(
                        this._selectedIndex,
                        this._course.clone(),
                    );

                    if (document.getElementById('rolling').checked) {
                        this._course.setInitialRow(
                            this._touch.getCourse(this._selectedIndex).getEnd(),
                        );
                        this._course.resetLength();
                        this._course.resetCalls();
                        this._selectedIndex = Math.min(
                            this._selectedIndex + 1,
                            this._touch.getLength(),
                        );
                    }

                    this.redraw();
                }
            }

            public copyCourse(): void {
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

            public cutCourse(): void {
                this.copyCourse();
                this.deleteCourse();
            }

            public deleteCourse(): void {
                if (this._selectedIndex) {
                    this._touch.deleteCourse(this._selectedIndex);
                    this._selectedIndex = Math.min(
                        this._selectedIndex,
                        this._touch.getLength(),
                    );
                    this.redraw();
                }
            }

            public loadTouch() {
                const input = document.getElementById('loadSaveTextarea').value;
                let newTouch: Touch;

                try {
                    newTouch = Touch.fromString(input);
                } catch (e) {
                    // Ignore
                    return;
                }

                this._stage = newTouch.getInitialRow().length;
                document.getElementById('stage').value = this._stage;
                this.setStage();

                this._touch = newTouch;
                this._touch.setOwnership({
                    'container': this,
                    'index': Block.Touch,
                });

                this.redraw();
            }

            public saveTouch() {
                document.getElementById('loadSaveTextarea').innerText =
                    this._touch.print('text');
            }

            public generateSiril(): void {
                document.getElementById('sirilTextarea').innerText =
                    this._touch.print('siril', {'touchRows': this._rowCount});
            }

            public analyseMusic(): void {
                const visitor = new Visitor.Music(this._musicScheme);
                this._touch.accept(visitor);
                document.getElementById('musicTextarea').innerText =
                    visitor.getMatcher().print('text');
                this._music = visitor.getDirectory();
            }

            public prove(): boolean {
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

            public switchTab(pageId: string): void {
                const tabs = document.getElementById('tabs').children,
                    tab = document.getElementById('tab_' + pageId),
                    pages = document.getElementById('pages').children,
                    page = document.getElementById('page_' + pageId);

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
