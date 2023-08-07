/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import AbstractBlock from './AbstractBlock';

type DirectoryArray = (DirectoryArray | boolean)[];

/**
 * A block directory
 * Files information about blocks in a touch, indexed by their location
 */
class BlockDirectory {

    /**
     * The directory itself
     */
    protected _directory: DirectoryArray = [];

    /**
     * Adds a six to the directory
     */
    public add(block: AbstractBlock): this;

    public add(...indices: number[]): this;

    public add(param: unknown, ...indices: number[]): this {
        if (typeof param === 'object') {
            indices = BlockDirectory.getIndices(param as AbstractBlock);
        } else {
            indices.unshift(param as number);
        }

        // We must have at least one index or getIndices() would have thrown
        const finalIndex = indices.pop()!;

        // Use indices to build a tree
        let directory = this._directory;
        for (const index of indices) {
            if (!directory[index]) {
                directory[index] = [];
            }
            directory = directory[index] as DirectoryArray;
        }

        directory[finalIndex] = true;
        return this;
    }

    /**
     * Checks whether a six is in the directory
     */
    public contains(block: AbstractBlock): boolean;

    public contains(...indices: number[]): boolean;

    public contains(param: unknown, ...indices: number[]): boolean {
        if (typeof param === 'object') {
            indices = BlockDirectory.getIndices(param as AbstractBlock);
        } else {
            indices.unshift(param as number);
        }

        let directory = this._directory;
        for (const index of indices) {
            if (!directory[index]) {
                return false;
            }
            directory = directory[index] as DirectoryArray;
        }

        return true;
    }

    /**
     * Computes an array of ownership indices for block
     */
    public static getIndices(block: AbstractBlock): number[] {
        const ownershipArray: number[] = [];

        let container = block.container;
        let index = block.index;
        if (!container) {
            throw new Error('Bad ownership: block has no container');
        }

        while (container instanceof AbstractBlock) {
            if (!index) {
                throw new Error('Bad ownership: container but no index');
            }
            ownershipArray.unshift(index);
            index = container.index;
            container = container.container;
        }

        return ownershipArray;
    }

    /**
     * Checks whether the index is empty
     */
    get empty(): boolean {
        return !this._directory.length;
    }

}

export default BlockDirectory;
