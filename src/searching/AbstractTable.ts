/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 * The algorithm in this file is adapted from the C++ implementation of StedTurn
 * written by Philip Saddleton.
 */

import { FACTORIALS } from '../constants';
import type { Stage } from '../rows';

/**
 * Data table that stores a number for each row.
 *
 * Data tables can be large and are stored separately from the core library.
 * They can be downloaded when required.
 *
 * Tables pack values for multiple rows into a smaller number of bytes and
 * derived classes are responsible for implementing this packing logic.
 *
 * ```
 * > const table = await Uint4Table.load(Stage.Triples, 'stedman.7.dat');
 * > table.getValue(0);
 * 0
 * > table.getValue(5039);
 * 7
 * ```
 */
abstract class AbstractTable {
    /**
     * Table data.
     *
     * Stores the value for each row indexed by rank. On stage _n_ this array
     * will contain _n_! entries.
     */
    protected readonly _data: Uint8Array;

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
            this.unpack(data);
        }
    }

    /**
     * Unpacks compressed table data into the internal data array.
     * @param data  Compressed table data to unpack
     * @throws if the data cannot be unpacked
     */
    protected abstract unpack(data: Uint8Array): void;

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
    abstract get data(): Uint8Array;

    /**
     * Retrieves a value from the table.
     * @param rank  Rank of the row for which to retrieve the value
     * @returns retrieved value (this must be between 0 and 15)
     * @throws if the provided `rank` is out of range
     */
    public getValue(rank: number): number {
        this.checkRank(rank);
        return this._data[rank];
    }

    /**
     * Stores a value in the table.
     * @param rank  Rank of the row for which to set the value
     * @param value  Value to set
     * @throws if the provided `rank` or `value` are out of range
     */
    public setValue(rank: number, value: number): void {
        this.checkRank(rank);
        this.checkValue(value);
        this._data[rank] = value;
    }

    /**
     * Checks that a rank is in range.
     * @throws if the provided `rank` is out of range
     */
    private checkRank(rank: number): void {
        if (rank < 0 || rank >= this.length) {
            throw new Error(
                `Rank '${rank}' out of range on stage '${this._stage}'`,
            );
        }
    }

    /**
     * Checks that a value is in range.
     * @throws if the provided `vaule` is out of range
     */
    protected abstract checkValue(value: number): void;
}

export default AbstractTable;
