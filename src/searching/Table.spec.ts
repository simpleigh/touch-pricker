/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 * The algorithm in this file is adapted from the C++ implementation of StedTurn
 * written by Philip Saddleton.
 */

import { Stage } from '../rows';
import Table from './Table';

describe('Table class', () => {
    it('can be constructed without any data', () => {
        new Table(Stage.Minimus);
    });

    it('provides read access to the stage', () => {
        const table = new Table(Stage.Minimus);
        expect(table.stage).toBe(Stage.Minimus);
    });

    it('provides read access to the length', () => {
        const table = new Table(Stage.Minimus);
        expect(table.length).toBe(24);
    });

    it('allows values to be written and read back', () => {
        const testValues = [0, 15, 16, 63, 64, 255];
        expect.assertions(testValues.length * 24);

        const table = new Table(Stage.Minimus);

        for (const testValue of testValues) {
            for (let i = 0; i < table.length; i += 1) {
                table.setValue(i, testValue);
                expect(table.getValue(i)).toBe(testValue);
            }
        }
    });

    it('uses the maximum Uint8 value as a default', () => {
        const table = new Table(Stage.Minimus);

        for (let i = 0; i < table.length; i += 1) {
            expect(table.getValue(i)).toBe(255);
        }
    });

    for (const length of [12, 18, 24]) {
        it(`can be constructed with source data of length ${length}`, () => {
            const uint8 = new Uint8Array(length);
            new Table(Stage.Minimus, uint8);
        });

        it(`provides read access to the stage (${length})`, () => {
            const uint8 = new Uint8Array(length);
            const table = new Table(Stage.Minimus, uint8);
            expect(table.stage).toBe(Stage.Minimus);
        });

        it(`provides read access to the length (${length})`, () => {
            const uint8 = new Uint8Array(length);
            const table = new Table(Stage.Minimus, uint8);
            expect(table.length).toBe(24);
        });
    }

    for (const length of [0, 11, 13, 17, 19, 23, 25]) {
        it(`throws for source data of length ${length}`, () => {
            const uint8 = new Uint8Array(length);
            expect(() => {
                new Table(Stage.Minimus, uint8);
            }).toThrow();
        });
    }

    for (const length of [12, 18, 24]) {
        it(`unpacks ${length} bytes of zeros correctly`, () => {
            expect.assertions(24);
            const uint8 = new Uint8Array(length);

            const table = new Table(Stage.Minimus, uint8);

            expect(table.getValue(0)).toBe(0);
            for (let j = 1; j < table.length; j += 1) {
                expect(table.getValue(j)).toBe(1);
            }
        });
    }

    for (const [length, maximum] of [
        [12, 16],
        [18, 64],
    ]) {
        // n.b. skip `Uint8Packing`: ones decode to 256 which can't be stored

        it(`unpacks ${length} bytes of ones correctly`, () => {
            expect.assertions(24);
            const uint8 = new Uint8Array(length);
            uint8.fill(0xff);

            const table = new Table(Stage.Minimus, uint8);

            expect(table.getValue(0)).toBe(0);
            for (let j = 1; j < table.length; j += 1) {
                expect(table.getValue(j)).toBe(maximum);
            }
        });

        it(`packs ${length} bytes of ones correctly`, () => {
            expect.assertions(length);
            const table = new Table(Stage.Minimus);
            table.setValue(0, 0);
            for (let j = 1; j < table.length; j += 1) {
                table.setValue(j, maximum);
            }

            const result = table.data;

            expect(result.length).toBe(length);
            // skip first byte which will have zero for rounds
            for (let j = 1; j < result.length; j += 1) {
                expect(result[j]).toBe(0xff);
            }
        });
    }

    // prettier-ignore
    const fillTestCases: [number, number[]][] = [
        [1, [ // 0
            0x0, 0x0, 0x0, 0x0,
            0x0, 0x0, 0x0, 0x0,
            0x0, 0x0, 0x0, 0x0,
        ]],
        [2, [ // 1
            0x01, 0x11, 0x11, 0x11,
            0x11, 0x11, 0x11, 0x11,
            0x11, 0x11, 0x11, 0x11,
        ]],
        [16, [ // 2
            0x0f, 0xff, 0xff, 0xff,
            0xff, 0xff, 0xff, 0xff,
            0xff, 0xff, 0xff, 0xff,
        ]],
        [17, [ // 3
            0x40, 0x10, 0x10, 0x50, 0x10, 0x10,
            0x50, 0x10, 0x10, 0x50, 0x10, 0x10,
            0x50, 0x10, 0x10, 0x50, 0x10, 0x10,
        ]],
        [64, [ // 4
            0xc0, 0xff, 0xff, 0xff, 0xff, 0xff,
            0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
            0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
        ]],
        [65, [ // 5
            0x00, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40,
            0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40,
            0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40,
        ]],
        [255, [ // 6
            0x00, 0xfe, 0xfe, 0xfe, 0xfe, 0xfe, 0xfe, 0xfe,
            0xfe, 0xfe, 0xfe, 0xfe, 0xfe, 0xfe, 0xfe, 0xfe,
            0xfe, 0xfe, 0xfe, 0xfe, 0xfe, 0xfe, 0xfe, 0xfe,
        ]],
    ];

    for (const [value, packedData] of fillTestCases) {
        it(`packs ${value}s correctly`, () => {
            const table = new Table(Stage.Minimus);
            for (let j = 0; j < table.length; j += 1) {
                table.setValue(j, value);
            }

            expect(table.data).toEqual(new Uint8Array(packedData));
        });

        it(`unpacks ${value}s correctly`, () => {
            expect.assertions(24);
            const uint8 = new Uint8Array(packedData);
            const table = new Table(Stage.Minimus, uint8);

            expect(table.getValue(0)).toBe(0);
            for (let j = 1; j < table.length; j += 1) {
                expect(table.getValue(j)).toBe(value);
            }
        });
    }

    for (const rank of [-1, 24, 9999]) {
        const table = new Table(Stage.Minimus);

        it(`knows rank ${rank} is out of range getting a value`, () => {
            expect(() => {
                table.getValue(rank);
            }).toThrowError(`Rank '${rank}' out of range on stage '4'`);
        });

        it(`knows rank ${rank} is out of range setting a value`, () => {
            expect(() => {
                table.setValue(rank, 0);
            }).toThrowError(`Rank '${rank}' out of range on stage '4'`);
        });
    }
});
