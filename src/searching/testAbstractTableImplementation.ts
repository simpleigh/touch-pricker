/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 * The algorithm in this file is adapted from the C++ implementation of StedTurn
 * written by Philip Saddleton.
 */

import { Stage } from '../rows';
import type AbstractTable from './AbstractTable';

const testAbstractTableImplementation = (
    factory: (data?: Uint8Array) => AbstractTable,
    valueRange: [number, number],
    testData: number[],
    expectedValues: number[],
): void => {
    it('can be constructed without any data', () => {
        factory();
    });

    it('can be constructed with source data', () => {
        const uint8 = new Uint8Array(testData);
        factory(uint8);
    });

    it('throws if the source data are insufficient', () => {
        const uint8 = new Uint8Array(testData.slice(1));
        expect(() => {
            factory(uint8);
        }).toThrow();
    });

    it('throws if the source data are too numerous', () => {
        const uint8 = new Uint8Array([...testData, 0]);
        expect(() => {
            factory(uint8);
        }).toThrow();
    });

    it('provides read access to the stage', () => {
        const uint8 = new Uint8Array(testData);
        const table = factory(uint8);

        expect(table.stage).toBe(Stage.Minimus);
    });

    it('provides read access to the number of entries', () => {
        const table = factory();
        expect(table.length).toBe(24);
    });

    it('contains the expected values', () => {
        expect.assertions(24);
        const uint8 = new Uint8Array(testData);
        const table = factory(uint8);

        for (let i = 0; i < table.length; i += 1) {
            expect(table.getValue(i)).toBe(expectedValues[i]);
        }
    });

    it('allows values to be written and read back', () => {
        expect.assertions(48);
        const table = factory();
        const [minValue, maxValue] = valueRange;

        for (let i = 0; i < table.length; i += 1) {
            table.setValue(i, maxValue);
            expect(table.getValue(i)).toBe(maxValue);

            table.setValue(i, minValue);
            expect(table.getValue(i)).toBe(minValue);
        }
    });

    it('provides read access to the raw data', () => {
        const uint8 = new Uint8Array(testData);
        const table = factory(uint8);
        expect(table.data).toEqual(uint8);
    });

    it('matches the original data when created from scratch', () => {
        const table = factory();
        const expected = new Uint8Array(testData);

        for (let i = 0; i < table.length; i += 1) {
            table.setValue(i, expectedValues[i]);
        }

        expect(table.data).toEqual(expected);
    });

    for (const rank of [-1, 24, 9999]) {
        const table = factory();

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

    for (const value of [valueRange[0] - 1, valueRange[1] + 1]) {
        const table = factory();

        it(`knows value ${value} is out of range when setting a value`, () => {
            expect(() => {
                table.setValue(0, value);
            }).toThrow();
        });
    }
};

export default testAbstractTableImplementation;
