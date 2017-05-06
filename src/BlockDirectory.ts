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
        protected _directory: any = [ ];

        /**
         * Adds a six to the directory
         */
        public add(block: AbstractBlock): this;
        public add(...indices: number[]): this;

        public add(param: any, ...indices: number[]): this {
            let directory: any,
                finalIndex: number | undefined;

            if (typeof param === 'object') {
                indices = BlockDirectory.getIndexArray(param);
            } else {
                indices.unshift(param);
            }

            finalIndex = indices.pop();
            if (!finalIndex) {
                throw new Error('Bad ownership: must have at least one index');
            }

            directory = this._directory;
            for (const index of indices) {
                if (!directory[index]) {
                    directory[index] = [ ];
                }
                directory = directory[index];
            }

            directory[finalIndex] = true;
            return this;
        }

        /**
         * Checks whether a six is in the directory
         */
        public contains(block: AbstractBlock): boolean;
        public contains(...indices: number[]): boolean;

        public contains(param: any, ...indices: number[]): boolean {
            let directory: any;

            if (typeof param === 'object') {
                indices = BlockDirectory.getIndexArray(param);
            } else {
                indices.unshift(param);
            }

            directory = this._directory;
            for (const index of indices) {
                if (!directory[index]) {
                    return false;
                }
                directory = directory[index];
            }

            return true;
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
         * Checks whether the index is empty
         */
        public isEmpty(): boolean {
            return !this._directory.length;
        }

    }

}
