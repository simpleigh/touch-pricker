/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 * The algorithm in this file is adapted from the C++ implementation of StedTurn
 * written by Philip Saddleton.
 */

/* eslint-disable no-bitwise */

import { FACTORIALS } from '../constants';
import type { Stage } from '../rows';

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
     * Raw table data.
     */
    private readonly _data: Uint8Array;

    /**
     * Constructor.
     * @param _stage  Stage on which the data is valid
     * @param data  Raw table data (omit to create an empty table)
     * @throws if the provided data is the incorrect size
     */
    constructor(
        private readonly _stage: Stage,
        data?: Uint8Array,
    ) {
        const expectedBytes = FACTORIALS[this._stage] / 2;
        data ??= new Uint8Array(expectedBytes);

        if (data.length !== expectedBytes) {
            throw new Error(
                `Have ${data.length} bytes but expected ${expectedBytes}`,
            );
        }

        this._data = data;
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
     * Provides easy access to the number of entries in the table.
     */
    get length(): number {
        return FACTORIALS[this._stage];
    }

    /**
     * Provides read access to the data.
     */
    get data(): Uint8Array {
        return this._data;
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
     * Stores a value in the table.
     * @param rank  Rank of the row for which to set the value
     * @param value  Value to set
     * @throws if the provided `rank` or `value` are out of range
     */
    public setValue(rank: number, value: number): void {
        if (value < 0 || value > 15) {
            throw new Error(`Value '${value}' out of range of Uint4`);
        }

        const [i, j] = this._computeIndices(rank);
        this.data[i] = (this.data[i] & (0xf0 >> j)) | (value << j);
    }

    /**
     * Verifies that a `rank` value is within range.
     * @param rank  Rank value to check
     * @returns [number, number] indices of the row in the table
     * @throws if the provided `rank` is out of range
     */
    private _computeIndices(rank: number) {
        if (rank < 0 || rank >= this.length) {
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
