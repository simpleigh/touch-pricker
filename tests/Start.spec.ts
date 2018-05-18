/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

/* tslint:disable:max-line-length */

/// <reference path="functions.ts" />
/// <reference path="AbstractBlock.spec.ts" />

const START_CASES: Array<[number, Pricker.SixType]> = [
    [1, Pricker.SixType.Quick],
    [2, Pricker.SixType.Quick],
    [3, Pricker.SixType.Quick],
    [4, Pricker.SixType.Quick],
    [5, Pricker.SixType.Quick],
    [6, Pricker.SixType.Quick],
    [1, Pricker.SixType.Slow],
    [2, Pricker.SixType.Slow],
    [3, Pricker.SixType.Slow],
    [4, Pricker.SixType.Slow],
    [5, Pricker.SixType.Slow],
    [6, Pricker.SixType.Slow],
];

describe('Start class', () => {

    const testRow = createTestRow();

    let start;

    beforeEach(() => {
        start = new Pricker.Start(testRow);
    });

    it('defaults to a standard start', () => {
        expect(start.getRowIndex()).toBe(4);
        expect(start.getSixType()).toBe(Pricker.SixType.Quick);
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
        start.setSixType(Pricker.SixType.Slow);
        expect(start.getSixType()).toBe(Pricker.SixType.Slow);
    });

    it('allows the six type to be reset', () => {
        start.setSixType(Pricker.SixType.Slow);
        start.setSixType();
        expect(start.getSixType()).toBe(Pricker.SixType.Quick);
    });

    it('returns this when setting the six type', () => {
        expect(start.setSixType(Pricker.SixType.Slow)).toBe(start);
    });

    type TestCase = [Pricker.Stage, string[]];

    type StartPosition = [number, Pricker.SixType, TestCase[]];

    const S = Pricker.Stage;

    const startPositions: StartPosition[] = [
        [1, Pricker.SixType.Quick, [
            [S.Triples,   ['1325476',         '3124567',         '3215476',         '2314567',         '2135476']],
            [S.Caters,    ['132547698',       '312456789',       '321547698',       '231456789',       '213547698']],
            [S.Cinques,   ['132547698E0',     '3124567890E',     '321547698E0',     '2314567890E',     '213547698E0']],
            [S.Sextuples, ['132547698E0AT',   '3124567890ETA',   '321547698E0AT',   '2314567890ETA',   '213547698E0AT']],
            [S.Septuples, ['132547698E0ATCB', '3124567890ETABC', '321547698E0ATCB', '2314567890ETABC', '213547698E0ATCB']],
        ]],
        [2, Pricker.SixType.Quick, [
            [S.Triples,   ['2135476',         '2314567',         '3215476',         '3124567']],
            [S.Caters,    ['213547698',       '231456789',       '321547698',       '312456789']],
            [S.Cinques,   ['213547698E0',     '2314567890E',     '321547698E0',     '3124567890E']],
            [S.Sextuples, ['213547698E0AT',   '2314567890ETA',   '321547698E0AT',   '3124567890ETA']],
            [S.Septuples, ['213547698E0ATCB', '2314567890ETABC', '321547698E0ATCB', '3124567890ETABC']],
        ]],
        [3, Pricker.SixType.Quick, [
            [S.Triples,   ['1325476',         '3124567',         '3215476']],
            [S.Caters,    ['132547698',       '312456789',       '321547698']],
            [S.Cinques,   ['132547698E0',     '3124567890E',     '321547698E0']],
            [S.Sextuples, ['132547698E0AT',   '3124567890ETA',   '321547698E0AT']],
            [S.Septuples, ['132547698E0ATCB', '3124567890ETABC', '321547698E0ATCB']],
        ]],
        [4, Pricker.SixType.Quick, [
            [S.Triples,   ['2135476',         '2314567']],
            [S.Caters,    ['213547698',       '231456789']],
            [S.Cinques,   ['213547698E0',     '2314567890E']],
            [S.Sextuples, ['213547698E0AT',   '2314567890ETA']],
            [S.Septuples, ['213547698E0ATCB', '2314567890ETABC']],
        ]],
        [5, Pricker.SixType.Quick, [
            [S.Triples,   ['1325476']],
            [S.Caters,    ['132547698']],
            [S.Cinques,   ['132547698E0']],
            [S.Sextuples, ['132547698E0AT']],
            [S.Septuples, ['132547698E0ATCB']],
        ]],
        [6, Pricker.SixType.Quick, [
            [S.Triples,   []],
            [S.Caters,    []],
            [S.Cinques,   []],
            [S.Sextuples, []],
            [S.Septuples, []],
        ]],
        [1, Pricker.SixType.Slow, [
            [S.Triples,   ['2135476',         '2314567',         '3215476',         '3124567',         '1325476']],
            [S.Caters,    ['213547698',       '231456789',       '321547698',       '312456789',       '132547698']],
            [S.Cinques,   ['213547698E0',     '2314567890E',     '321547698E0',     '3124567890E',     '132547698E0']],
            [S.Sextuples, ['213547698E0AT',   '2314567890ETA',   '321547698E0AT',   '3124567890ETA',   '132547698E0AT']],
            [S.Septuples, ['213547698E0ATCB', '2314567890ETABC', '321547698E0ATCB', '3124567890ETABC', '132547698E0ATCB']],
        ]],
        [2, Pricker.SixType.Slow, [
            [S.Triples,   ['1325476',         '3124567',         '3215476',         '2314567']],
            [S.Caters,    ['132547698',       '312456789',       '321547698',       '231456789']],
            [S.Cinques,   ['132547698E0',     '3124567890E',     '321547698E0',     '2314567890E']],
            [S.Sextuples, ['132547698E0AT',   '3124567890ETA',   '321547698E0AT',   '2314567890ETA']],
            [S.Septuples, ['132547698E0ATCB', '3124567890ETABC', '321547698E0ATCB', '2314567890ETABC']],
        ]],
        [3, Pricker.SixType.Slow, [
            [S.Triples,   ['2135476',         '2314567',         '3215476']],
            [S.Caters,    ['213547698',       '231456789',       '321547698']],
            [S.Cinques,   ['213547698E0',     '2314567890E',     '321547698E0']],
            [S.Sextuples, ['213547698E0AT',   '2314567890ETA',   '321547698E0AT']],
            [S.Septuples, ['213547698E0ATCB', '2314567890ETABC', '321547698E0ATCB']],
        ]],
        [4, Pricker.SixType.Slow, [
            [S.Triples,   ['1325476',         '3124567']],
            [S.Caters,    ['132547698',       '312456789']],
            [S.Cinques,   ['132547698E0',     '3124567890E']],
            [S.Sextuples, ['132547698E0AT',   '3124567890ETA']],
            [S.Septuples, ['132547698E0ATCB', '3124567890ETABC']],
        ]],
        [5, Pricker.SixType.Slow, [
            [S.Triples,   ['2135476']],
            [S.Caters,    ['213547698']],
            [S.Cinques,   ['213547698E0']],
            [S.Sextuples, ['213547698E0AT']],
            [S.Septuples, ['213547698E0ATCB']],
        ]],
        [6, Pricker.SixType.Slow, [
            [S.Triples,   []],
            [S.Caters,    []],
            [S.Cinques,   []],
            [S.Sextuples, []],
            [S.Septuples, []],
        ]],
    ];

    const runTestCases = (testFn) => () => {
        for (const startPosition of startPositions) {
            const rowIndex = startPosition[0];
            const sixType = startPosition[1];
            const testCases = startPosition[2];

            for (const testCase of testCases) {
                const stage = testCase[0];
                const rows = testCase[1];
                const fixture = new Pricker.Start(createTestRow('123', stage));

                fixture.setRowIndex(rowIndex);
                fixture.setSixType(sixType);
                testFn(fixture, rows);
            }
        }
    };

    it('computes the last row correctly', runTestCases(
        (fixture: Pricker.Start, rows: string[]) => {
            const last = fixture.getLast();
            const stage = last.length;

            if (rows.length) {
                const expected = rows[rows.length - 1];
                expect(last).toEqual(Pricker.rowFromString(expected, stage));
            } else {
                expect(last).toEqual(Pricker.rowFromString('123', stage));
            }
        },
    ));

    it('computes the rows correctly', runTestCases(
        (fixture: Pricker.Start, rows: string[]) => {
            const visitor = new Pricker.Visitor.StringArray();
            fixture.accept(visitor);
            expect(visitor.getStrings()).toEqual(rows);
        },
    ));

    it('computes the length correctly', runTestCases(
        (fixture: Pricker.Start, rows: string[]) => {
            expect(fixture.estimateRows()).toBe(rows.length);
        },
    ));

    testAbstractBlockImplementation(
        Pricker.Start,
        (fixture: Pricker.Start) => { fixture.setRowIndex(2); },
        2,
    );

});
