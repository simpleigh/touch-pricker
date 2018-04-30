/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

/* tslint:disable:max-line-length */

/// <reference path="functions.ts" />

describe('Start class', () => {

    it('provides read access to the row index', () => {
        const start = new Pricker.Start(3);
        expect(start.getRowIndex()).toBe(3);
    });

    it('provides read access to the six type', () => {
        let start: Pricker.Start;
        start = new Pricker.Start(undefined, Pricker.SixType.Quick);
        expect(start.getSixType()).toBe(Pricker.SixType.Quick);
        start = new Pricker.Start(undefined, Pricker.SixType.Slow);
        expect(start.getSixType()).toBe(Pricker.SixType.Slow);
    });

    it('defaults to a standard start', () => {
        const start = new Pricker.Start();
        expect(start.getRowIndex()).toBe(4);
        expect(start.getSixType()).toBe(Pricker.SixType.Quick);
    });

    it('ignores changes to the getLast result', () => {
        const start = new Pricker.Start();
        start.setStage(Pricker.Stage.Cinques);
        const getLast = start.getLast();
        const getLastBackup = getLast.slice();

        getLast[3] = 999;  // Mutate the getLast result
        expect(getLast).not.toEqual(getLastBackup);

        expect(start.getLast()).not.toEqual(getLast);
        expect(start.getLast()).toEqual(getLastBackup);
    });

    it('throws an exception if the row index is out of range', () => {
        expect(() => new Pricker.Start(0)).toThrow();
        expect(() => new Pricker.Start(7)).toThrow();
    });

    it('throws an exception if getting the last row with no stage set', () => {
        const start = new Pricker.Start();
        expect(() => start.getLast()).toThrow();
    });

    it('throws an exception if visiting with no stage set', () => {
        const start = new Pricker.Start();
        const visitor = new Pricker.Visitor.StringArray();
        expect(() => start.accept(visitor)).toThrow();
    });

    it('returns this when setting the stage', () => {
        const start = new Pricker.Start();
        expect(start.setStage(Pricker.Stage.Cinques)).toBe(start);
    });

    it('returns this when visiting', () => {
        const start = new Pricker.Start();
        start.setStage(Pricker.Stage.Cinques);
        const visitor = new Pricker.Visitor.StringArray();
        expect(start.accept(visitor)).toBe(start);
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

            const start = new Pricker.Start(rowIndex, sixType);
            for (const testCase of testCases) {
                const stage = testCase[0];
                const rows = testCase[1];

                start.setStage(stage);
                testFn(start, stage, rows);
            }
        }
    };

    it('computes the last row correctly', runTestCases(
        (start: Pricker.Start, stage: Pricker.Stage, rows: string[]) => {
            const last = start.getLast();
            if (rows.length) {
                const expected = rows[rows.length - 1];
                expect(last).toEqual(Pricker.rowFromString(expected, stage));
            } else {
                expect(last).toEqual(Pricker.rowFromString('123', stage));
            }
        },
    ));

    it('computes the rows correctly', runTestCases(
        (start: Pricker.Start, stage: Pricker.Stage, rows: string[]) => {
            const visitor = new Pricker.Visitor.StringArray();
            start.accept(visitor);
            expect(visitor.getStrings()).toEqual(rows);
        },
    ));

    it('computes the length correctly', runTestCases(
        (start: Pricker.Start, stage: Pricker.Stage, rows: string[]) => {
            expect(start.estimateRows()).toBe(rows.length);
        },
    ));

});
