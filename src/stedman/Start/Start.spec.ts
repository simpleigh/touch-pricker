/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

/* tslint:disable:max-line-length */

import Start from '.';
import { BlockOwnership } from '../../blocks';
import {
    testAbstractBlockImplementation,
} from '../../blocks/AbstractBlock.spec';
import { Row, rowFromString, Stage as S } from '../../rows';
import { createTestRow } from '../../testFunctions.spec';
import { StringArray } from '../../visitors';
import SixType from '../SixType';

describe('Start class', () => {

    const testRow = createTestRow();

    let start: Start;

    beforeEach(() => {
        start = new Start(testRow);
    });

    it('defaults to a standard start', () => {
        expect(start.getRowIndex()).toBe(4);
        expect(start.getSixType()).toBe(SixType.Quick);
    });

    it('allows the row index to be set', () => {
        start.setRowIndex(3);
        expect(start.getRowIndex()).toBe(3);
    });

    it('allows the row index to be reset', () => {
        start.setRowIndex(3);
        start.setRowIndex();
        expect(start.getRowIndex()).toBe(4);
    });

    it('returns this when setting the row index', () => {
        expect(start.setRowIndex(3)).toBe(start);
    });

    it('throws an exception if the row index is out of range', () => {
        expect(() => start.setRowIndex(0)).toThrow();
        expect(() => start.setRowIndex(7)).toThrow();
    });

    it('allows the six type to be set', () => {
        start.setSixType(SixType.Slow);
        expect(start.getSixType()).toBe(SixType.Slow);
    });

    it('allows the six type to be reset', () => {
        start.setSixType(SixType.Slow);
        start.setSixType();
        expect(start.getSixType()).toBe(SixType.Quick);
    });

    it('returns this when setting the six type', () => {
        expect(start.setSixType(SixType.Slow)).toBe(start);
    });

    type Notation = string[];

    type TestCase = [S, string[]];

    type StartPosition = [number, SixType, Notation, TestCase[]];

    const startPositions: StartPosition[] = [
        [1, SixType.Quick, ['1', '3', '1', '3', '1'], [
            [S.Triples,   ['1325476',         '3124567',         '3215476',         '2314567',         '2135476']],
            [S.Caters,    ['132547698',       '312456789',       '321547698',       '231456789',       '213547698']],
            [S.Cinques,   ['132547698E0',     '3124567890E',     '321547698E0',     '2314567890E',     '213547698E0']],
            [S.Sextuples, ['132547698E0AT',   '3124567890ETA',   '321547698E0AT',   '2314567890ETA',   '213547698E0AT']],
            [S.Septuples, ['132547698E0ATCB', '3124567890ETABC', '321547698E0ATCB', '2314567890ETABC', '213547698E0ATCB']],
        ]],
        [2, SixType.Quick, ['3', '1', '3', '1'], [
            [S.Triples,   ['2135476',         '2314567',         '3215476',         '3124567']],
            [S.Caters,    ['213547698',       '231456789',       '321547698',       '312456789']],
            [S.Cinques,   ['213547698E0',     '2314567890E',     '321547698E0',     '3124567890E']],
            [S.Sextuples, ['213547698E0AT',   '2314567890ETA',   '321547698E0AT',   '3124567890ETA']],
            [S.Septuples, ['213547698E0ATCB', '2314567890ETABC', '321547698E0ATCB', '3124567890ETABC']],
        ]],
        [3, SixType.Quick, ['1', '3', '1'], [
            [S.Triples,   ['1325476',         '3124567',         '3215476']],
            [S.Caters,    ['132547698',       '312456789',       '321547698']],
            [S.Cinques,   ['132547698E0',     '3124567890E',     '321547698E0']],
            [S.Sextuples, ['132547698E0AT',   '3124567890ETA',   '321547698E0AT']],
            [S.Septuples, ['132547698E0ATCB', '3124567890ETABC', '321547698E0ATCB']],
        ]],
        [4, SixType.Quick, ['3', '1'], [
            [S.Triples,   ['2135476',         '2314567']],
            [S.Caters,    ['213547698',       '231456789']],
            [S.Cinques,   ['213547698E0',     '2314567890E']],
            [S.Sextuples, ['213547698E0AT',   '2314567890ETA']],
            [S.Septuples, ['213547698E0ATCB', '2314567890ETABC']],
        ]],
        [5, SixType.Quick, ['1'], [
            [S.Triples,   ['1325476']],
            [S.Caters,    ['132547698']],
            [S.Cinques,   ['132547698E0']],
            [S.Sextuples, ['132547698E0AT']],
            [S.Septuples, ['132547698E0ATCB']],
        ]],
        [6, SixType.Quick, [], [
            [S.Triples,   []],
            [S.Caters,    []],
            [S.Cinques,   []],
            [S.Sextuples, []],
            [S.Septuples, []],
        ]],
        [1, SixType.Slow, ['3', '1', '3', '1', '3'], [
            [S.Triples,   ['2135476',         '2314567',         '3215476',         '3124567',         '1325476']],
            [S.Caters,    ['213547698',       '231456789',       '321547698',       '312456789',       '132547698']],
            [S.Cinques,   ['213547698E0',     '2314567890E',     '321547698E0',     '3124567890E',     '132547698E0']],
            [S.Sextuples, ['213547698E0AT',   '2314567890ETA',   '321547698E0AT',   '3124567890ETA',   '132547698E0AT']],
            [S.Septuples, ['213547698E0ATCB', '2314567890ETABC', '321547698E0ATCB', '3124567890ETABC', '132547698E0ATCB']],
        ]],
        [2, SixType.Slow, ['1', '3', '1', '3'], [
            [S.Triples,   ['1325476',         '3124567',         '3215476',         '2314567']],
            [S.Caters,    ['132547698',       '312456789',       '321547698',       '231456789']],
            [S.Cinques,   ['132547698E0',     '3124567890E',     '321547698E0',     '2314567890E']],
            [S.Sextuples, ['132547698E0AT',   '3124567890ETA',   '321547698E0AT',   '2314567890ETA']],
            [S.Septuples, ['132547698E0ATCB', '3124567890ETABC', '321547698E0ATCB', '2314567890ETABC']],
        ]],
        [3, SixType.Slow, ['3', '1', '3'], [
            [S.Triples,   ['2135476',         '2314567',         '3215476']],
            [S.Caters,    ['213547698',       '231456789',       '321547698']],
            [S.Cinques,   ['213547698E0',     '2314567890E',     '321547698E0']],
            [S.Sextuples, ['213547698E0AT',   '2314567890ETA',   '321547698E0AT']],
            [S.Septuples, ['213547698E0ATCB', '2314567890ETABC', '321547698E0ATCB']],
        ]],
        [4, SixType.Slow, ['1', '3'], [
            [S.Triples,   ['1325476',         '3124567']],
            [S.Caters,    ['132547698',       '312456789']],
            [S.Cinques,   ['132547698E0',     '3124567890E']],
            [S.Sextuples, ['132547698E0AT',   '3124567890ETA']],
            [S.Septuples, ['132547698E0ATCB', '3124567890ETABC']],
        ]],
        [5, SixType.Slow, ['3'], [
            [S.Triples,   ['2135476']],
            [S.Caters,    ['213547698']],
            [S.Cinques,   ['213547698E0']],
            [S.Sextuples, ['213547698E0AT']],
            [S.Septuples, ['213547698E0ATCB']],
        ]],
        [6, SixType.Slow, [], [
            [S.Triples,   []],
            [S.Caters,    []],
            [S.Cinques,   []],
            [S.Sextuples, []],
            [S.Septuples, []],
        ]],
    ];

    const runTestCases = (testFn: (fixture: Start, rows: string[]) => void) => () => {
        for (const startPosition of startPositions) {
            const rowIndex = startPosition[0];
            const sixType = startPosition[1];
            const testCases = startPosition[3];

            for (const testCase of testCases) {
                const stage = testCase[0];
                const rows = testCase[1];
                const fixture = new Start(createTestRow('123', stage));

                fixture.setRowIndex(rowIndex);
                fixture.setSixType(sixType);
                testFn(fixture, rows);
            }
        }
    };

    it('computes the notation correctly', () => {
        for (const startPosition of startPositions) {
            const rowIndex = startPosition[0];
            const sixType = startPosition[1];
            const notation = startPosition[2];

            const fixture = new Start(createTestRow());
            fixture.setRowIndex(rowIndex);
            fixture.setSixType(sixType);
            expect(fixture.getNotation()).toEqual(notation);
        }
    });

    it('computes the last row correctly', runTestCases(
        (fixture: Start, rows: string[]) => {
            const last = fixture.getLast();
            const stage = last.length;

            if (rows.length) {
                const expected = rows[rows.length - 1];
                expect(last).toEqual(rowFromString(expected, stage));
            } else {
                expect(last).toEqual(rowFromString('123', stage));
            }
        },
    ));

    it('computes the rows correctly', runTestCases(
        (fixture: Start, rows: string[]) => {
            const visitor = new StringArray();
            fixture.accept(visitor);
            expect(visitor.getStrings()).toEqual(rows);
        },
    ));

    it('computes the length correctly', runTestCases(
        (fixture: Start, rows: string[]) => {
            expect(fixture.estimateRows()).toBe(rows.length);
        },
    ));

    describe('can set the row index and six type from strings:', () => {

        const testLoad = (
            description: string,
            input: string,
        ) => it(description, () => {
            start.setFromString(input);
            expect(start.getRowIndex()).toBe(3);
            expect(start.getSixType()).toBe(SixType.Slow);
        });

        testLoad(
            'an ordinary string',
            'Start with rounds as the third row of a slow six',
        );

        testLoad(
            'a string with a numeric ordinal',
            'Start with rounds as the 3rd row of a slow six',
        );

        testLoad(
            'a string with a bare number',
            'Start with rounds as row 3 of a slow six',
        );

        testLoad(
            'a string with extra content',
            'Start at backstroke with rounds as the third row of a slow six',
        );

        testLoad(
            'a string with much less content',
            'Start 3 slow',
        );

        testLoad(
            'a string with the number and six type reversed',
            'Start in a slow six at the third row',
        );

        it('a string with the row index missing', () => {
            expect(() => start.setFromString('Start slow')).toThrow();
        });

        it('a string with the six type missing', () => {
            expect(() => start.setFromString('Start third')).toThrow();
        });

        it('returns this when setting the start', () => {
            expect(start.setFromString('Start slow third')).toBe(start);
        });

    });

    testAbstractBlockImplementation(
        (initialRow: Row, _ownership?: BlockOwnership) =>
            new Start(initialRow, _ownership),
        (fixture) => { (fixture as Start).setRowIndex(2); },
        2,
    );

});
