/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 * The table packing algorithm in this file is adapted from the C++
 * implementation of StedTurn written by Philip Saddleton.
 */

/* eslint-disable no-bitwise */

import { FACTORIALS } from './constants';
import { Stage } from './types';

/**
 * Data table that stores a 4-bit unsigned integer for each row.
 *
 * Data tables can be large and are stored separately from the core library.
 * They can be downloaded when required.
 *
 * This data table packs values for two rows into each byte and thus consumes
 * _n! / 2_ bytes on stage _n_ in order to store 4 bits per row.
 *
 * ```
 * > const table = await Uint4Table.load(Stage.Triples, 'stedman.7.dat');
 * > table.getValue(0);
 * 0
 * > table.getValue(5039);
 * 7
 * ```
 */
class Uint4Table {
    /**
     * Constructor.
     * @param _stage  Stage on which the data is valid
     * @param _data   Raw table data
     * @throws if the provided data is the incorrect size
     */
    constructor(
       private readonly _stage: Stage,
       private readonly _data: Uint8Array,
    ) {
        const expectedBytes = FACTORIALS[this._stage] / 2;
        if (_data.length !== expectedBytes) {
            throw new Error(
                `Have ${_data.length} bytes but expected ${expectedBytes}`,
            );
        }
    }

    /**
     * Download a table from a remote location.
     * @param stage  Stage on which the table should be valid
     * @param url    URL from which to download the table
     * @throws if the data cannot be downloaded or it is the incorrect size
     */
    public static async load(stage: Stage, url: string): Promise<Uint4Table> {
        const response = await fetch(url);
        const blob = await response.blob();
        const buffer = await blob.arrayBuffer();
        const data = new Uint8Array(buffer);
        return new Uint4Table(stage, data);
    }

    /**
     * Provides read access to the stage.
     */
    get stage(): Stage {
        return this._stage;
    }

    /**
     * Retrieves a value from the table.
     * @param rank  Rank of the row for which to retrieve the value
     * @returns retrieved value (this must be between 0 and 15)
     * @throws if the provided `rank` is out of range
     */
    public getValue(rank: number): number {
        const [i, j] = this._computeIndices(rank);
        return (this._data[i] >> j) & 0xf;
    }

    /**
     * Verifies that a `rank` value is within range.
     * @param rank  Rank value to check
     * @returns [number, number] indices of the row in the table
     * @throws if the provided `rank` is out of range
     */
    private _computeIndices(rank: number) {
        if (rank < 0 || rank >= FACTORIALS[this._stage]) {
            throw new Error(
                `Rank '${rank}' out of range on stage '${this._stage}'`,
            );
        }

        const i = Math.floor(rank / 2);
        const j = (rank % 2) * 4;

        return [i, j];
    }
}

export default Uint4Table;
