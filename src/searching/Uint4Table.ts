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
import AbstractTable from './AbstractTable';

/**
 * Data table that stores a 4-bit unsigned integer for each row.
 *
 * Data tables can be large and are stored separately from the core library.
 * They can be downloaded when required.
 *
 * This data table packs values for two rows into each byte and thus consumes
 * _n! / 2_ bytes on stage _n_ in order to store 4 bits per row.
 *
 * Rows 0, 1 are laid out in a byte as follows:
 *
 * ```
 * ┌──────────┐
 * │ 11110000 │
 * └──────────┘
 * ```
 *
 * ```
 * > const buffer = readFileSync('stedman.7.dat');
 * > const data = new Uint8Array(buffer.buffer)
 * > const table = new Table(Stage.Triples, data);
 * > table.getValue(0);
 * 0
 * > table.getValue(5039);
 * 7
 * ```
 */
class Uint4Table extends AbstractTable {
    /**
     * Unpacks compressed table data into the internal data array.
     * @param data  Compressed table data to unpack
     * @throws if the data cannot be unpacked
     */
    protected unpack(data: Uint8Array): void {
        const expectedBytes = FACTORIALS[this.stage] / 2;
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

    /**
     * Provides read access to compressed table data.
     */
    get data(): Uint8Array {
        const result = new Uint8Array(FACTORIALS[this.stage] / 2);

        for (let i = 0; i < result.length; i += 1) {
            result[i] = this._data[2 * i] | (this._data[2 * i + 1] << 4);
        }

        return result;
    }

    /**
     * Checks that a value is in range.
     * @throws if the provided `vaule` is out of range
     */
    protected checkValue(value: number): void {
        if (value < 0 || value > 15) {
            throw new Error(`Value '${value}' out of range of Uint4`);
        }
    }
}

export default Uint4Table;
