/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import Start from '.';
import { createTestRow } from '../../testFunctions.spec';
import SixType from '../SixType';

describe('text template for Start', () => {

    const initialRow = createTestRow();

    type StartPosition = [SixType, string[]];

    const startPositions: StartPosition[] = [
        [SixType.Quick, [
            '', // Aligns array indices with rowIndex
            'Start from rounds as the first row of a quick six.',
            'Start from rounds as the second row of a quick six.',
            'Start from rounds as the third row of a quick six.',
            '',
            'Start from rounds as the fifth row of a quick six.',
            'Start from rounds as the last row of a quick six.',
        ]],
        [SixType.Slow, [
            '', // Aligns array indices with rowIndex
            'Start from rounds as the first row of a slow six.',
            'Start from rounds as the second row of a slow six.',
            'Start from rounds as the third row of a slow six.',
            'Start from rounds as the fourth row of a slow six.',
            'Start from rounds as the fifth row of a slow six.',
            'Start from rounds as the last row of a slow six.',
        ]],
    ];

    for (const startPosition of startPositions) {
        for (let rowIndex = 1; rowIndex <= 6; rowIndex = rowIndex + 1) {
            const sixType = startPosition[0];
            const expected = startPosition[1][rowIndex];
            const trimmed = expected.substring(21, expected.length - 1);

            it(`prints correctly for ${trimmed}`, () => {
                const start = new Start(initialRow);
                start.rowIndex = rowIndex;
                start.sixType = sixType;
                expect(start.print('text')).toBe(expected);
            });
        }
    }

});
