/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import bellFromSymbol from './bellFromSymbol';
import symbolFromBell from './symbolFromBell';
import { Bell } from './types';

const testCases: [string, Bell][] = [
    ['1', 1],
    ['2', 2],
    ['3', 3],
    ['4', 4],
    ['5', 5],
    ['6', 6],
    ['7', 7],
    ['8', 8],
    ['9', 9],
    ['0', 10],
    ['E', 11],
    ['T', 12],
    ['A', 13],
    ['B', 14],
    ['C', 15],
    ['D', 16],
];

describe('bellFromSymbol function', () => {
    const lowercaseTestCases: [string, Bell][] = [
        ['a', 13],
        ['b', 14],
        ['c', 15],
        ['d', 16],
    ];

    for (const [input, expected] of [...testCases, ...lowercaseTestCases]) {
        it(`can parse "${input}" as a bell`, () => {
            expect(bellFromSymbol(input)).toBe(expected);
        });
    }

    it('rejects unknown symbols', () => {
        expect(() => bellFromSymbol('x')).toThrowError("Unknown bell 'x'");
    });
});

describe('symbolFromBell function', () => {
    for (const [expected, input] of testCases) {
        it(`can convert "${input}" to a string`, () => {
            expect(symbolFromBell(input)).toBe(expected);
        });
    }
});
