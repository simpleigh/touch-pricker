/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

type TestCase = [string, Pricker.Stage];

function createChangeTests(testFn, testCases: TestCase[]) {

    return function () {

        it('applies the permutation correctly', function () {
            let index: number,
                row: Pricker.Row;

            for (index = 0; index < testCases.length; index += 1) {
                row = Pricker.rowFromString('', testCases[index][1]);
                testFn(row);
                expect(Pricker.stringFromRow(row)).toEqual(testCases[index][0]);
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

});
