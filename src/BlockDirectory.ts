/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="AbstractBlock.ts" />
/// <reference path="AbstractSix.ts" />
/// <reference path="Course.ts" />

namespace Pricker {
    'use strict';

    /**
     * A block directory
     * Files information about blocks in a touch, indexed by their location
     */
    export class BlockDirectory {

        /**
         * The directory itself
         */
        protected _directory: boolean[][] = [ ];

        /**
         * Adds a six to the directory
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

            if (!this._directory[courseIndex]) {
                this._directory[courseIndex] = [ ];
            }

            this._directory[courseIndex][sixIndex] = true;
            return this;
        }

        /**
         * Checks whether a six is in the directory
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

            if (!this._directory[courseIndex]) {
                return false;
            }

            return !!this._directory[courseIndex][sixIndex];
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
         * Computes an array of ownership indices for block
         */
        public static getIndexArray(block: AbstractBlock): number[] {
            const ownershipArray: number[] = [ ];
            let container: AbstractContainer<AbstractBlock> | undefined,
                index: number | undefined;

            [container, index] = block.getOwnership();
            if (!container) {
                throw new Error('Bad ownership: block has no container');
            }

            while (container) {
                if (!index) {
                    throw new Error('Bad ownership: container but no index');
                }
                ownershipArray.unshift(index);
                [container, index] = container.getOwnership();
            }

            return ownershipArray;
        }

        /**
         * Checks whether any sixes from a course are in the directory
         */
        public containsFrom(param: Course | number): boolean {
            let courseIndex: number | undefined;

            if (typeof param === 'object') {
                courseIndex = param.getOwnership()[1];
            } else {
                courseIndex = param;
            }

            if (courseIndex) {
                return !!this._directory[courseIndex];
            }

            throw new Error('Cannot check course: bad ownerhsip');

        }

        /**
         * Checks whether the index is empty
         */
        public isEmpty(): boolean {
            return !this._directory.length;
        }

    }

}
