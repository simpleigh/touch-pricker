/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import Start from '.';
import { createTestRow } from '../../testFunctions.spec';
import { AbstractMethod, Erin, Stedman } from '../methods';
import SixType from '../SixType';

describe('text template for Start', () => {

    const initialRow = createTestRow();

    type StartPosition = [{ new(): AbstractMethod }, SixType, string[]];

    const startPositions: StartPosition[] = [
        [Erin, SixType.Slow, [
            '', // Aligns array indices with rowIndex
            'Start from rounds as the first row of a six.',
            'Start from rounds as the second row of a six.',
            'Start from rounds as the third row of a six.',
            'Start from rounds as the fourth row of a six.',
            'Start from rounds as the fifth row of a six.',
            '', // Default start
        ]],
        [Stedman, SixType.Quick, [
            '', // Aligns array indices with rowIndex
            'Start from rounds as the first row of a quick six.',
            'Start from rounds as the second row of a quick six.',
            'Start from rounds as the third row of a quick six.',
            '', // Default start
            'Start from rounds as the fifth row of a quick six.',
            'Start from rounds as the last row of a quick six.',
        ]],
        [Stedman, SixType.Slow, [
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
        const method = new startPosition[0]();
        const sixType = startPosition[1];

        const start = new Start(initialRow, undefined, method);
        start.sixType = sixType;

        for (let rowIndex = 1; rowIndex <= 6; rowIndex = rowIndex + 1) {
            const description = ''
                + `prints a ${sixType} six start on row ${rowIndex}`
                + ` for ${method.name} correctly`;

            it(description, () => {
                const expected = startPosition[2][rowIndex];
                start.rowIndex = rowIndex;
                expect(start.print('text')).toBe(expected);
            });
        }
    }

});
