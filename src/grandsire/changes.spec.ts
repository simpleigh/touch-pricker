/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { rounds, Row, Stage, stringFromRow } from '../rows';
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

    describe('permute123 function', createChangeTests(
        Changes.permute123,
        [
            ['1235476', Stage.Triples],
            ['123547698', Stage.Caters],
            ['123547698E0', Stage.Cinques],
            ['123547698E0AT', Stage.Sextuples],
            ['123547698E0ATCB', Stage.Septuples],
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

});
