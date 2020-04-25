/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

/* eslint-disable max-len */

import rowFromString from './rowFromString';
import { Row, Stage } from './types';

describe('rowFromString function', () => {

    const conversionTestCases: [string, Stage, Row][] = [
        ['4321',             Stage.Minimus,   [4, 3, 2, 1]],
        ['54321',            Stage.Doubles,   [5, 4, 3, 2, 1]],
        ['654321',           Stage.Minor,     [6, 5, 4, 3, 2, 1]],
        ['7654321',          Stage.Triples,   [7, 6, 5, 4, 3, 2, 1]],
        ['87654321',         Stage.Major,     [8, 7, 6, 5, 4, 3, 2, 1]],
        ['987654321',        Stage.Caters,    [9, 8, 7, 6, 5, 4, 3, 2, 1]],
        ['0987654321',       Stage.Royal,     [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]],
        ['E0987654321',      Stage.Cinques,   [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]],
        ['TE0987654321',     Stage.Maximus,   [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]],
        ['ATE0987654321',    Stage.Sextuples, [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]],
        ['BATE0987654321',   Stage.Fourteen,  [14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]],
        ['CBATE0987654321',  Stage.Septuples, [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]],
        ['DCBATE0987654321', Stage.Sixteen,   [16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]],
    ];

    for (const [input, stage, expected] of conversionTestCases) {
        it(`can convert a string to a row on ${stage}`, () => {
            expect(rowFromString(input, stage)).toEqual(expected);
        });
    }

    it('copes with lowercase letters', () => {
        expect(rowFromString('2143658709TEBADC', Stage.Sixteen))
            .toEqual([2, 1, 4, 3, 6, 5, 8, 7, 10, 9, 12, 11, 14, 13, 16, 15]);
    });

    it('rejects repeated bells', () => {
        expect(() => rowFromString('1123', Stage.Minimus))
            .toThrowError("Row '1123' has bell '1' repeated");
    });

    it('rejects unknown symbols', () => {
        expect(() => rowFromString('123#', Stage.Minimus))
            .toThrowError("Row '123#' has unknown bell '#'");
    });

    it('rejects bells that are too high', () => {
        expect(() => rowFromString('1236', Stage.Minimus))
            .toThrowError("Row '1236' bell '6' exceeds stage '4'");
    });

    it('rejects rows that are too long', () => {
        expect(() => rowFromString('12345', Stage.Minimus))
            .toThrowError("Row '12345' exceeds stage '4'");
    });

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
