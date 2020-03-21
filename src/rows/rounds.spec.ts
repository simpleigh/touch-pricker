/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import rounds from './rounds';
import Row from './Row';
import Stage from './Stage';

describe('rounds function', () => {
    // tslint:disable:max-line-length
    const testCases: [Stage, Row][] = [
        [Stage.Minimus,   [1, 2, 3, 4]],
        [Stage.Doubles,   [1, 2, 3, 4, 5]],
        [Stage.Minor,     [1, 2, 3, 4, 5, 6]],
        [Stage.Triples,   [1, 2, 3, 4, 5, 6, 7]],
        [Stage.Major,     [1, 2, 3, 4, 5, 6, 7, 8]],
        [Stage.Caters,    [1, 2, 3, 4, 5, 6, 7, 8, 9]],
        [Stage.Royal,     [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
        [Stage.Cinques,   [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]],
        [Stage.Maximus,   [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]],
        [Stage.Sextuples, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]],
        [Stage.Fourteen,  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]],
        [Stage.Septuples, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]],
        [Stage.Sixteen,   [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]],
    ];
    // tslint:enable:max-line-length

    for (const testCase of testCases) {
        const stage = testCase[0];
        const expected = testCase[1];

        it(`can compute rounds on ${stage}`, () => {
            expect(rounds(stage)).toEqual(expected);
        });
    }
});
