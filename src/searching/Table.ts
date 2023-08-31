/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { FACTORIALS } from '../constants';
import type { Stage } from '../rows';
import {
    type AbstractPacking,
    Uint4Packing,
    Uint6Packing,
    Uint8Packing,
} from './packing';

const PACKING_ALGORITHMS: AbstractPacking[] = [
    new Uint4Packing(),
    new Uint6Packing(),
    new Uint8Packing(),
];

/**
 * Data table that stores a number for each row.
 *
 * Data tables can be large and are stored separately from the core library.
 * They can be downloaded when required.
 *
 * Once a table has been built it can be compressed by packing multiple rows
 * into a smaller number of bytes. Tables containing smaller values can be
 * packed more tightly.
 *
 * ```
 * > const buffer = readFileSync('stedman.7.dat');
 * > const data = new Uint8Array(buffer.buffer);
 * > const table = new Table(Stage.Triples, data);
 * > table.getValue(0);
 * 0
 * > table.getValue(5039);
 * 7
 * ```
 */
class Table {
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
     * @throws if the provided data cannot be unpacked
     */
    constructor(
        private readonly _stage: Stage,
        data?: Uint8Array,
    ) {
        this._data = new Uint8Array(FACTORIALS[this._stage]);

        if (data) {
            this.unpack(data);
        } else {
            // Start out with the largest possible value.
            // As the table is built shorter paths will be found to each row.
            // After every row has been found the maximum value will be small.
            this._data.fill(255);
        }
    }

    /**
     * Unpacks compressed table data into the internal data array.
     * @param data  Compressed table data to unpack
     * @throws if the data cannot be unpacked
     */
    protected unpack(data: Uint8Array): void {
        for (const algorithm of PACKING_ALGORITHMS) {
            if (data.length === this.length * algorithm.compression) {
                algorithm.unpack(data, this._data);
                return;
            }
        }

        throw new Error(
            `Cannot unpack ${data.length} bytes on stage ${this.stage}.`,
        );
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
     * Provides easy access to the maximum value in the table.
     */
    get maximum(): number {
        return this._data.reduce((result, current) =>
            current > result ? current : result,
        );
    }

    /**
     * Provides read access to compressed table data.
     */
    get data(): Uint8Array {
        const maximum = this.maximum;
        for (const algorithm of PACKING_ALGORITHMS) {
            // This `-1` is very hacky.
            // 250 rows in the Stedman Cinques table are 16 steps from rounds.
            if (maximum <= algorithm.maximum) {
                const result = new Uint8Array(
                    this.length * algorithm.compression,
                );
                algorithm.pack(this._data, result);
                return result;
            }
        }

        // Shouldn't be possible to get here: Uint8Packing will always work.
        throw new Error('Logic error: missing algorithm.');
    }

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
}

export default Table;
