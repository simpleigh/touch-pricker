/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { Call, rounds, Row, Stage, stringFromRow } from '../rows';
import * as Changes from './changes';

const createChangeTests = (
    testFn: (row: Row) => void,
    testCases: [string, Stage][],
) => () => it('applies the permutation correctly', () => {
    for (const testCase of testCases) {
        const expected = testCase[0];
        const stage = testCase[1];
        const row = rounds(stage);

        testFn(row);
        expect(stringFromRow(row)).toBe(expected);
    }
});

describe('Changes:', () => {

    describe('permute1 function', createChangeTests(Changes.permute1,
        [
            ['1325476', Stage.Triples],
            ['132547698', Stage.Caters],
            ['132547698E0', Stage.Cinques],
            ['132547698E0AT', Stage.Sextuples],
            ['132547698E0ATCB', Stage.Septuples],
        ],
    ));

    describe('permute3 function', createChangeTests(
        Changes.permute3,
        [
            ['2135476', Stage.Triples],
            ['213547698', Stage.Caters],
            ['213547698E0', Stage.Cinques],
            ['213547698E0AT', Stage.Sextuples],
            ['213547698E0ATCB', Stage.Septuples],
        ],
    ));

    describe('permuteUp function', createChangeTests(
        Changes.permuteUp,
        [
            ['2315476', Stage.Triples],
            ['231547698', Stage.Caters],
            ['231547698E0', Stage.Cinques],
            ['231547698E0AT', Stage.Sextuples],
            ['231547698E0ATCB', Stage.Septuples],
        ],
    ));

    describe('permuteDown function', createChangeTests(
        Changes.permuteDown,
        [
            ['3125476', Stage.Triples],
            ['312547698', Stage.Caters],
            ['312547698E0', Stage.Cinques],
            ['312547698E0AT', Stage.Sextuples],
            ['312547698E0ATCB', Stage.Septuples],
        ],
    ));

    describe('permuteN function', createChangeTests(
        Changes.permuteN,
        [
            ['2143657', Stage.Triples],
            ['214365879', Stage.Caters],
            ['2143658709E', Stage.Cinques],
            ['2143658709TEA', Stage.Sextuples],
            ['2143658709TEBAC', Stage.Septuples],
        ],
    ));

    describe('permuteBob function', createChangeTests(
        Changes.permuteBob,
        [
            ['2143576', Stage.Triples],
            ['214365798', Stage.Caters],
            ['214365879E0', Stage.Cinques],
            ['2143658709EAT', Stage.Sextuples],
            ['2143658709TEACB', Stage.Septuples],
        ],
    ));

    describe('permuteSingle function', createChangeTests(
        Changes.permuteSingle,
        [
            ['2143567', Stage.Triples],
            ['214365789', Stage.Caters],
            ['2143658790E', Stage.Cinques],
            ['2143658709ETA', Stage.Sextuples],
            ['2143658709TEABC', Stage.Septuples],
        ],
    ));

    describe('permuteCall function', () => {

        it('can apply plain transpositions', () => {
            const calledRow = rounds(Stage.Cinques);
            const expectedRow = rounds(Stage.Cinques);

            Changes.permuteCall(calledRow, Call.Plain);
            Changes.permuteN(expectedRow);

            expect(calledRow).toEqual(expectedRow);
        });

        it('can apply bob transpositions', () => {
            const calledRow = rounds(Stage.Cinques);
            const expectedRow = rounds(Stage.Cinques);

            Changes.permuteCall(calledRow, Call.Bob);
            Changes.permuteBob(expectedRow);

            expect(calledRow).toEqual(expectedRow);
        });

        it('can apply single transpositions', () => {
            const calledRow = rounds(Stage.Cinques);
            const expectedRow = rounds(Stage.Cinques);

            Changes.permuteCall(calledRow, Call.Single);
            Changes.permuteSingle(expectedRow);

            expect(calledRow).toEqual(expectedRow);
        });

    });

});
