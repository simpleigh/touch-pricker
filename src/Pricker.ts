/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="BlockDirectory.ts" />
/// <reference path="Course.ts" />
/// <reference path="Notifiable.ts" />
/// <reference path="PrintableMixin.ts" />
/// <reference path="rowFromString.ts" />
/// <reference path="Row.ts" />
/// <reference path="Stage.ts" />
/// <reference path="Touch.ts" />
/// <reference path="Music/AbstractScheme.ts" />
/// <reference path="Visitor/Counter.ts" />
/// <reference path="Visitor/Music.ts" />
/// <reference path="Visitor/Proof.ts" />

namespace Pricker {
    'use strict';

    enum Block {Course, Touch}

    export class Pricker implements Notifiable, PrintableMixin {

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
         * Directory of musical sixes
         */
        private _music: BlockDirectory | undefined;

        /**
         * Constructor
         * @param stage     Stage were pricking on
         * @param redrawFn  Function to redraw the environment
         */
        constructor(
            private _stage: Stage,
            private _redrawFn: (pricker: Pricker) => void,
        ) {
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
            this._redrawFn(this);
        }

        /* Notifiable methods *************************************************/

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
            this._redrawFn(this);
        }

        /* PrintableMixin methods *********************************************/

        /**
         * Renders the object with a template
         */
        public print: (t: string, c?: TemplateContext) => string;

        /**
         * Path for this class' templates
         */
        public readonly templatePath: string = 'Pricker';

        /* Pricker methods ****************************************************/

        public c(six: number): void {
            this._course.getSix(six).toggleCall();
        }

        public setInitialRow(row?: string): void {
            let initialRow: Row;
            if (row) {
                try {
                    initialRow = rowFromString(row, this._stage);
                } catch (e) {
                    return;
                }
            } else {
                initialRow = this._initialRow;
            }

            this._course.setInitialRow(initialRow);
            this._extraSixes.setInitialRow(this._course.getEnd());
            this._redrawFn(this);
        }

        public setLength(length?: number): void {
            if (length) {
                this._course.safeSetLength(length);
            } else {
                this._course.resetLength();
            }
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
                this._course = new Course(
                    this._initialRow,
                    {'container': this, 'index': Block.Course},
                );
            }
        }

        public selectCourse(index: number) {
            this._selectedIndex = index;
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

            this._redrawFn(this);
            return proof.isTrue();
        }

        public analyseMusic(scheme: Music.AbstractScheme): void {
            const music = new Visitor.Music(scheme);
            this._touch.accept(music);
        }

    }

    PrintableMixin.makePrintable(Pricker);

}
