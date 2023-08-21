/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

/* eslint-disable
@typescript-eslint/naming-convention,
sort-keys,
*/

import { Row, Stage } from '../../rows';
import type { CallPair } from './types';
import createTranspositions from './createTranspositions';

describe('createTranspositions function', () => {
    const testCases: [Stage, Record<CallPair, Row>][] = [
        [
            Stage.Triples,
            {
                '  ': [2, 4, 6, 7, 1, 5, 3],
                '- ': [2, 4, 5, 6, 1, 7, 3],
                's ': [2, 4, 5, 7, 1, 6, 3],
                ' -': [2, 4, 6, 3, 1, 7, 5],
                ' s': [2, 4, 6, 3, 1, 5, 7],
                '--': [2, 4, 5, 3, 1, 6, 7],
                's-': [2, 4, 5, 3, 1, 7, 6],
            },
        ],
        [
            Stage.Caters,
            {
                '  ': [2, 4, 6, 8, 1, 9, 3, 7, 5],
                '- ': [2, 4, 6, 7, 1, 8, 3, 9, 5],
                's ': [2, 4, 6, 7, 1, 9, 3, 8, 5],
                ' -': [2, 4, 6, 8, 1, 5, 3, 9, 7],
                ' s': [2, 4, 6, 8, 1, 5, 3, 7, 9],
                '--': [2, 4, 6, 7, 1, 5, 3, 8, 9],
                's-': [2, 4, 6, 7, 1, 5, 3, 9, 8],
            },
        ],
        [
            Stage.Cinques,
            {
                '  ': [2, 4, 6, 8, 1, 10, 3, 11, 5, 9, 7],
                '- ': [2, 4, 6, 8, 1, 9, 3, 10, 5, 11, 7],
                's ': [2, 4, 6, 8, 1, 9, 3, 11, 5, 10, 7],
                ' -': [2, 4, 6, 8, 1, 10, 3, 7, 5, 11, 9],
                ' s': [2, 4, 6, 8, 1, 10, 3, 7, 5, 9, 11],
                '--': [2, 4, 6, 8, 1, 9, 3, 7, 5, 10, 11],
                's-': [2, 4, 6, 8, 1, 9, 3, 7, 5, 11, 10],
            },
        ],
    ];

    for (const [stage, expected] of testCases) {
        it(`computes the correct rows on ${stage} bells`, () => {
            expect(createTranspositions(stage)).toEqual(expected);
        });
    }

    const inverseTestCases: [Stage, Record<CallPair, Row>][] = [
        [
            Stage.Triples,
            {
                '  ': [5, 1, 7, 2, 6, 3, 4],
                '- ': [5, 1, 7, 2, 3, 4, 6],
                's ': [5, 1, 7, 2, 3, 6, 4],
                ' -': [5, 1, 4, 2, 7, 3, 6],
                ' s': [5, 1, 4, 2, 6, 3, 7],
                '--': [5, 1, 4, 2, 3, 6, 7],
                's-': [5, 1, 4, 2, 3, 7, 6],
            },
        ],
        [
            Stage.Caters,
            {
                '  ': [5, 1, 7, 2, 9, 3, 8, 4, 6],
                '- ': [5, 1, 7, 2, 9, 3, 4, 6, 8],
                's ': [5, 1, 7, 2, 9, 3, 4, 8, 6],
                ' -': [5, 1, 7, 2, 6, 3, 9, 4, 8],
                ' s': [5, 1, 7, 2, 6, 3, 8, 4, 9],
                '--': [5, 1, 7, 2, 6, 3, 4, 8, 9],
                's-': [5, 1, 7, 2, 6, 3, 4, 9, 8],
            },
        ],
        [
            Stage.Cinques,
            {
                '  ': [5, 1, 7, 2, 9, 3, 11, 4, 10, 6, 8],
                '- ': [5, 1, 7, 2, 9, 3, 11, 4, 6, 8, 10],
                's ': [5, 1, 7, 2, 9, 3, 11, 4, 6, 10, 8],
                ' -': [5, 1, 7, 2, 9, 3, 8, 4, 11, 6, 10],
                ' s': [5, 1, 7, 2, 9, 3, 8, 4, 10, 6, 11],
                '--': [5, 1, 7, 2, 9, 3, 8, 4, 6, 10, 11],
                's-': [5, 1, 7, 2, 9, 3, 8, 4, 6, 11, 10],
            },
        ],
    ];

    for (const [stage, expected] of inverseTestCases) {
        it(`computes the correct inverse rows on ${stage} bells`, () => {
            expect(createTranspositions(stage, true)).toEqual(expected);
        });
    }
});
