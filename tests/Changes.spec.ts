/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="functions.ts" />

function createChangeTests(
    testFn: (row: Pricker.Row) => void,
    testCases: Array<[string, Pricker.Stage]>,
) {

    return function () {

        it('applies the permutation correctly', function () {
            let expected: string,
                stage: Pricker.Stage,
                row: Pricker.Row;

            for (const testCase of testCases) {
                if (!testCase) { continue; }  // IE8 trailing comma
                expected = testCase[0];
                stage = testCase[1];

                row = createTestRow('', stage);
                testFn(row);
                expect(Pricker.stringFromRow(row)).toEqual(expected);
            }
        });

    };

}

describe('Changes:', function () {

    describe('permute1 function', createChangeTests(
        Pricker.Changes.permute1,
        [
            ['1325476', Pricker.Stage.Triples],
            ['132547698', Pricker.Stage.Caters],
            ['132547698E0', Pricker.Stage.Cinques],
            ['132547698E0AT', Pricker.Stage.Sextuples],
            ['132547698E0ATCB', Pricker.Stage.Septuples],
        ],
    ));

    describe('permute3 function', createChangeTests(
        Pricker.Changes.permute3,
        [
            ['2135476', Pricker.Stage.Triples],
            ['213547698', Pricker.Stage.Caters],
            ['213547698E0', Pricker.Stage.Cinques],
            ['213547698E0AT', Pricker.Stage.Sextuples],
            ['213547698E0ATCB', Pricker.Stage.Septuples],
        ],
    ));

    describe('permuteN function', createChangeTests(
        Pricker.Changes.permuteN,
        [
            ['2143657', Pricker.Stage.Triples],
            ['214365879', Pricker.Stage.Caters],
            ['2143658709E', Pricker.Stage.Cinques],
            ['2143658709TEA', Pricker.Stage.Sextuples],
            ['2143658709TEBAC', Pricker.Stage.Septuples],
        ],
    ));

    describe('permuteBob function', createChangeTests(
        Pricker.Changes.permuteBob,
        [
            ['2143576', Pricker.Stage.Triples],
            ['214365798', Pricker.Stage.Caters],
            ['214365879E0', Pricker.Stage.Cinques],
            ['2143658709EAT', Pricker.Stage.Sextuples],
            ['2143658709TEACB', Pricker.Stage.Septuples],
        ],
    ));

    describe('permuteSingle function', createChangeTests(
        Pricker.Changes.permuteSingle,
        [
            ['2143567', Pricker.Stage.Triples],
            ['214365789', Pricker.Stage.Caters],
            ['2143658790E', Pricker.Stage.Cinques],
            ['2143658709ETA', Pricker.Stage.Sextuples],
            ['2143658709TEABC', Pricker.Stage.Septuples],
        ],
    ));

    describe('permuteCall function', function () {

        it('can apply plain transpositions', function () {
            const row = createTestRow();
            spyOn(Pricker.Changes, 'permuteN');
            Pricker.Changes.permuteCall(row, Pricker.Call.Plain);
            expect(Pricker.Changes.permuteN).toHaveBeenCalledWith(row);
        });

        it('can apply bob transpositions', function () {
            const row = createTestRow();
            spyOn(Pricker.Changes, 'permuteBob');
            Pricker.Changes.permuteCall(row, Pricker.Call.Bob);
            expect(Pricker.Changes.permuteBob).toHaveBeenCalledWith(row);
        });

        it('can apply single transpositions', function () {
            const row = createTestRow();
            spyOn(Pricker.Changes, 'permuteSingle');
            Pricker.Changes.permuteCall(row, Pricker.Call.Single);
            expect(Pricker.Changes.permuteSingle).toHaveBeenCalledWith(row);
        });

    });

});
