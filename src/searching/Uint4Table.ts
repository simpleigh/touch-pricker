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
     * Table data.
     *
     * Stores the value for each row indexed by rank. On stage _n_ this array
     * will contain _n_! entries.
     */
    private readonly _data: Uint8Array;

    /**
     * Constructor.
     * @param _stage  Stage on which the data is valid
     * @param data  Compressed table data (omit to create an empty table)
     * @throws if the provided data is the incorrect size
     */
    constructor(
        private readonly _stage: Stage,
        data?: Uint8Array,
    ) {
        this._data = new Uint8Array(FACTORIALS[this._stage]);

        if (data) {
            const expectedBytes = FACTORIALS[this._stage] / 2;
            if (data.length !== expectedBytes) {
                throw new Error(
                    `Have ${data.length} bytes but expected ${expectedBytes}`,
                );
            }

            for (let i = 0; i < data.length; i += 1) {
                this._data[2 * i] = data[i] & 0xf;
                this._data[2 * i + 1] = (data[i] >> 4) & 0xf;
            }
        }
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
     * Provides read access to compressed table data.
     */
    get data(): Uint8Array {
        const result = new Uint8Array(FACTORIALS[this._stage] / 2);

        for (let i = 0; i < result.length; i += 1) {
            result[i] = this._data[2 * i] | this._data[2 * i + 1] << 4;
        }

        return result;
    }

    /**
     * Retrieves a value from the table.
     * @param rank  Rank of the row for which to retrieve the value
     * @returns retrieved value (this must be between 0 and 15)
     * @throws if the provided `rank` is out of range
     */
    public getValue(rank: number): number {
        if (rank < 0 || rank >= this.length) {
            throw new Error(
                `Rank '${rank}' out of range on stage '${this._stage}'`,
            );
        }

        return this._data[rank];
    }

    /**
     * Stores a value in the table.
     * @param rank  Rank of the row for which to set the value
     * @param value  Value to set
     * @throws if the provided `rank` or `value` are out of range
     */
    public setValue(rank: number, value: number): void {
        if (rank < 0 || rank >= this.length) {
            throw new Error(
                `Rank '${rank}' out of range on stage '${this._stage}'`,
            );
        }

        if (value < 0 || value > 15) {
            throw new Error(`Value '${value}' out of range of Uint4`);
        }

        this._data[rank] = value;
    }
}

export default Uint4Table;
