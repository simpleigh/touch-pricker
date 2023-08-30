/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

/* eslint-disable no-bitwise */

import { FACTORIALS } from '../constants';
import AbstractTable from './AbstractTable';

/**
 * Number of rows in each block of packed storage.
 */
const ROWS = 4;

/**
 * Number of bytes consumed by each block of packed storage.
 */
const BYTES = 3;

/**
 * Data table that stores a 6-bit unsigned integer for each row.
 *
 * Data tables can be large and are stored separately from the core library.
 * They can be downloaded when required.
 *
 * This data table packs values for four rows into three bytes and thus consumes
 * _n! × 3 / 4_ bytes on stage _n_ in order to store 6 bits per row.
 *
 * Rows 0, 1, 2, 3 are laid out in three bytes as follows:
 *
 * ```
 * ┌──────────┬──────────┬──────────┐
 * │ 33000000 │ 33111111 │ 33222222 │
 * └──────────┴──────────┴──────────┘
 * ```
 */
class Uint6Table extends AbstractTable {
    /**
     * Unpacks compressed table data into the internal data array.
     * @param data  Compressed table data to unpack
     * @throws if the data cannot be unpacked
     */
    protected unpack(data: Uint8Array): void {
        const expectedBytes = (FACTORIALS[this.stage] * 3) / 4;
        if (data.length !== expectedBytes) {
            throw new Error(
                `Have ${data.length} bytes but expected ${expectedBytes}`,
            );
        }

        for (let i = 0; i < data.length / BYTES; i += 1) {
            this._data[ROWS * i + 0] = data[BYTES * i + 0] & 0x3f;
            this._data[ROWS * i + 1] = data[BYTES * i + 1] & 0x3f;
            this._data[ROWS * i + 2] = data[BYTES * i + 2] & 0x3f;
            this._data[ROWS * i + 3] =
                ((data[BYTES * i + 0] >> 2) & 0x30) |
                ((data[BYTES * i + 1] >> 4) & 0xc) |
                ((data[BYTES * i + 2] >> 6) & 0x3);
        }
    }

    /**
     * Provides read access to compressed table data.
     */
    get data(): Uint8Array {
        const result = new Uint8Array((FACTORIALS[this.stage] * 3) / 4);

        for (let i = 0; i < result.length / BYTES; i += 1) {
            result[BYTES * i + 0] =
                this._data[ROWS * i + 0] |
                ((this._data[ROWS * i + 3] << 2) & 0xc0);
            result[BYTES * i + 1] =
                this._data[ROWS * i + 1] |
                ((this._data[ROWS * i + 3] << 4) & 0xc0);
            result[BYTES * i + 2] =
                this._data[ROWS * i + 2] |
                ((this._data[ROWS * i + 3] << 6) & 0xc0);
        }

        return result;
    }

    /**
     * Checks that a value is in range.
     * @throws if the provided `vaule` is out of range
     */
    protected checkValue(value: number): void {
        if (value < 0 || value > 63) {
            throw new Error(`Value '${value}' out of range of Uint6`);
        }
    }
}

export default Uint6Table;
