/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import rounds from './rounds';
import { type Row, Stage as S } from './types';

describe('rounds function', () => {
    // prettier-ignore
    const testCases: [S, Row][] = [
        [S.Minimus,   [1, 2, 3, 4]],
        [S.Doubles,   [1, 2, 3, 4, 5]],
        [S.Minor,     [1, 2, 3, 4, 5, 6]],
        [S.Triples,   [1, 2, 3, 4, 5, 6, 7]],
        [S.Major,     [1, 2, 3, 4, 5, 6, 7, 8]],
        [S.Caters,    [1, 2, 3, 4, 5, 6, 7, 8, 9]],
        [S.Royal,     [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
        [S.Cinques,   [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]],
        [S.Maximus,   [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]],
        [S.Sextuples, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]],
        [S.Fourteen,  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]],
        [S.Septuples, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]],
        [S.Sixteen,   [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]],
    ];

    for (const [stage, expected] of testCases) {
        it(`can compute rounds on ${stage}`, () => {
            expect(rounds(stage)).toEqual(expected);
        });
    }
});
