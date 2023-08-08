/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

/* eslint-disable max-len */

import rowFromString from './rowFromString';
import stringFromRow from './stringFromRow';
import { Row, Stage } from './types';

const testCases: [string, Row][] = [
    ['4321',             [4, 3, 2, 1]],
    ['54321',            [5, 4, 3, 2, 1]],
    ['654321',           [6, 5, 4, 3, 2, 1]],
    ['7654321',          [7, 6, 5, 4, 3, 2, 1]],
    ['87654321',         [8, 7, 6, 5, 4, 3, 2, 1]],
    ['987654321',        [9, 8, 7, 6, 5, 4, 3, 2, 1]],
    ['0987654321',       [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]],
    ['E0987654321',      [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]],
    ['TE0987654321',     [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]],
    ['ATE0987654321',    [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]],
    ['BATE0987654321',   [14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]],
    ['CBATE0987654321',  [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]],
    ['DCBATE0987654321', [16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]],
];

describe('rowFromString function', () => {
    for (const [input, expected] of testCases) {
        it(`can convert "${input}" to a row`, () => {
            expect(rowFromString(input, input.length)).toEqual(expected);
        });
    }

    it('copes with lowercase letters', () => {
        expect(rowFromString('2143658709tebadc', Stage.Sixteen))
            .toEqual([2, 1, 4, 3, 6, 5, 8, 7, 10, 9, 12, 11, 14, 13, 16, 15]);
    });

    const invalidTestCases: [string, string, string][] = [
        ['rejects repeated bells', '1123', "Row '1123' has bell '1' repeated"],
        ['rejects unknown symbols', '123#', "Row '123#' has unknown bell '#'"],
        [
            'rejects bells that are too high',
            '1236',
            "Row '1236' bell '6' exceeds stage '4'",
        ],
        [
            'rejects rows that are too long',
            '12345',
            "Row '12345' exceeds stage '4'",
        ],
    ];

    for (const [description, input, error] of invalidTestCases) {
        it(description, () => {
            expect(() => rowFromString(input, Stage.Minimus))
                .toThrowError(error);
        });
    }

    const fillTestCases: [Stage, Row][] = [
        [Stage.Minimus,   [3, 1, 2, 4]],
        [Stage.Doubles,   [3, 1, 2, 4, 5]],
        [Stage.Minor,     [3, 1, 2, 4, 5, 6]],
        [Stage.Triples,   [3, 1, 2, 4, 5, 6, 7]],
        [Stage.Major,     [3, 1, 2, 4, 5, 6, 7, 8]],
        [Stage.Caters,    [3, 1, 2, 4, 5, 6, 7, 8, 9]],
        [Stage.Royal,     [3, 1, 2, 4, 5, 6, 7, 8, 9, 10]],
        [Stage.Cinques,   [3, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11]],
        [Stage.Maximus,   [3, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12]],
        [Stage.Sextuples, [3, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]],
        [Stage.Fourteen,  [3, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]],
        [Stage.Septuples, [3, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]],
        [Stage.Sixteen,   [3, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]],
    ];

    for (const [stage, expected] of fillTestCases) {
        it(`fills in bells that aren't specified on ${stage}`, () => {
            expect(rowFromString('3', stage)).toEqual(expected);
        });
    }
});

describe('stringFromRow function', () => {
    for (const [expected, input] of testCases) {
        it(`can produce "${expected}" from a row`, () => {
            expect(stringFromRow(input)).toEqual(expected);
        });
    }
});
