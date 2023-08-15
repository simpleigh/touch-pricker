/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import rankFromRow from './rankFromRow';
import rowFromRank from './rowFromRank';
import rowFromString from './rowFromString';
import stringFromRow from './stringFromRow';
import { Stage } from './types';

const testCases: [string, number][] = [
    ['1234', 0],
    ['2134', 1],
    ['1324', 2],
    ['3124', 3],
    ['2314', 4],
    ['3214', 5],
    ['1243', 6],
    ['2143', 7],
    ['1423', 8],
    ['4123', 9],
    ['2413', 10],
    ['4213', 11],
    ['1342', 12],
    ['3142', 13],
    ['1432', 14],
    ['4132', 15],
    ['3412', 16],
    ['4312', 17],
    ['2341', 18],
    ['3241', 19],
    ['2431', 20],
    ['4231', 21],
    ['3421', 22],
    ['4321', 23],
    ['12345', 0],
    ['21345', 1],
    ['13245', 2],
    ['45321', 118],
    ['54321', 119],
    ['1234567890E', 0],
    ['2134567890E', 1],
    ['1324567890E', 2],
    ['0E987654321', 39916798],
    ['E0987654321', 39916799],
    ['1234567890ETABCD', 0],
    ['2134567890ETABCD', 1],
    ['1324567890ETABCD', 2],
    ['CDBATE0987654321', 20922789887998],
    ['DCBATE0987654321', 20922789887999],
];

describe('rankFromRow function', () => {
    for (const [input, expected] of testCases) {
        it(`computes the correct rank for "${input}"`, () => {
            const row = rowFromString(input, input.length);
            expect(rankFromRow(row)).toBe(expected);
        });
    }
});

describe('rowFromRank function', () => {
    for (const [expected, input] of testCases) {
        it(`assembles row "${expected}" correctly from its rank`, () => {
            const row = rowFromRank(input, expected.length);
            expect(stringFromRow(row)).toBe(expected);
        });
    }

    for (const rank of [-1, 5040, 9999]) {
        it(`knows ${rank} is out of range`, () => {
            expect(() => {
                rowFromRank(rank, Stage.Triples);
            }).toThrowError(`Rank '${rank}' out of range on stage '7'`);
        });
    }
});
