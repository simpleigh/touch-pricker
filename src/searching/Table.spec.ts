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

    const fillTestCases1: [number, number][] = [
        [12, 15],
        [18, 63],
        [24, 255],
    ];

    for (let i = 0; i < fillTestCases1.length; i += 1) {
        const [packedLength, maximum] = fillTestCases1[i];

        it(`unpacks zeros correctly #${i}`, () => {
            expect.assertions(24);
            const uint8 = new Uint8Array(packedLength);

            const table = new Table(Stage.Minimus, uint8);

            for (let j = 0; j < table.length; j += 1) {
                expect(table.getValue(j)).toBe(0);
            }
        });

        it(`unpacks ones correctly #${i}`, () => {
            expect.assertions(24);
            const uint8 = new Uint8Array(packedLength);
            uint8.fill(0xff);

            const table = new Table(Stage.Minimus, uint8);

            for (let j = 0; j < table.length; j += 1) {
                expect(table.getValue(j)).toBe(maximum);
            }
        });

        it(`packs ones correctly #${i}`, () => {
            expect.assertions(packedLength + 1);
            const table = new Table(Stage.Minimus);
            for (let j = 0; j < table.length; j += 1) {
                table.setValue(j, maximum);
            }

            const result = table.data;
            expect(result.length).toBe(packedLength);
            for (const byte of result) {
                expect(byte).toBe(0xff);
            }
        });
    }

    // prettier-ignore
    const fillTestCases2: [number, number[]][] = [
        [0, [
            0x0, 0x0, 0x0, 0x0,
            0x0, 0x0, 0x0, 0x0,
            0x0, 0x0, 0x0, 0x0,
        ]],
        [1, [
            0x11, 0x11, 0x11, 0x11,
            0x11, 0x11, 0x11, 0x11,
            0x11, 0x11, 0x11, 0x11,
        ]],
        [15, [
            0xff, 0xff, 0xff, 0xff,
            0xff, 0xff, 0xff, 0xff,
            0xff, 0xff, 0xff, 0xff,
        ]],
        [16, [
            0x50, 0x10, 0x10, 0x50, 0x10, 0x10,
            0x50, 0x10, 0x10, 0x50, 0x10, 0x10,
            0x50, 0x10, 0x10, 0x50, 0x10, 0x10,
        ]],
        [63, [
            0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
            0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
            0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
        ]],
        [64, [
            0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40,
            0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40,
            0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40,
        ]],
        [255, [
            0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
            0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
            0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
        ]],
    ];

    for (const [value, packedData] of fillTestCases2) {
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

            for (let j = 0; j < table.length; j += 1) {
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
