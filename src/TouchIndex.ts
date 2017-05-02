/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="AbstractSix.ts" />

namespace Pricker {
    'use strict';

    /**
     * A touch index
     * Files information about blocks in a touch, indexed by their location
     */
    export class TouchIndex {

        /**
         * The index itself
         */
        protected _index: boolean[][];

        /**
         * Constructor
         */
        constructor() {
            this._index = [ ];
        }

        /**
         * Adds a six to the index
         */
        public add(six: AbstractSix): this;
        public add(courseIndex: number, sixIndex: number): this;

        public add(param1: any, param2?: number): this {
            let courseIndex: number,
                sixIndex: number;

            if (param2) {
                [courseIndex, sixIndex] = [param1, param2];
            } else {
                [courseIndex, sixIndex] = this.getCoordinates(param1);
            }

            if (!this._index[courseIndex]) {
                this._index[courseIndex] = [ ];
            }

            this._index[courseIndex][sixIndex] = true;
            return this;
        }

        /**
         * Checks whether a six is in the index
         */
        public contains(six: AbstractSix): boolean;
        public contains(courseIndex: number, sixIndex: number): boolean;

        public contains(param1: any, param2?: number) {
            let courseIndex: number,
                sixIndex: number;

            if (param2) {
                [courseIndex, sixIndex] = [param1, param2];
            } else {
                [courseIndex, sixIndex] = this.getCoordinates(param1);
            }

            if (!this._index[courseIndex]) {
                return false;
            }

            return !!this._index[courseIndex][sixIndex];
        }

        /**
         * Helper to find the indices for a six
         */
        private getCoordinates(six: AbstractSix): [number, number] {
            const [course, sixIndex] = six.getOwnership();
            let courseIndex: number | undefined;

            if (course) {
                courseIndex = course.getOwnership()[1];
            }

            if (courseIndex && sixIndex) {
                return [courseIndex, sixIndex];
            }

            throw new Error('Cannot index six: bad ownership');
        }

        /**
         * Checks whether the index is empty
         */
        public isEmpty(): boolean {
            return !this._index.length;
        }

    }

}
