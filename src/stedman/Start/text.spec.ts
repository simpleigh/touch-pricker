/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { rounds, Stage } from '../../rows';
import { AbstractMethod, Erin, Stedman, StedmanJump } from '../methods';
import SixType from '../SixType';
import Start from '.';

describe('text template for Start', () => {

    type StartPosition = [new() => AbstractMethod, SixType, string[]];

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
        [StedmanJump, SixType.Cold, [
            '', // Aligns array indices with rowIndex
            'Start from rounds as the first row of a cold six.',
            'Start from rounds as the second row of a cold six.',
            'Start from rounds as the third row of a cold six.',
            'Start from rounds as the fourth row of a cold six.',
            'Start from rounds as the fifth row of a cold six.',
            'Start from rounds as the last row of a cold six.',
        ]],
        [StedmanJump, SixType.Hot, [
            '', // Aligns array indices with rowIndex
            'Start from rounds as the first row of a hot six.',
            'Start from rounds as the second row of a hot six.',
            'Start from rounds as the third row of a hot six.',
            'Start from rounds as the fourth row of a hot six.',
            'Start from rounds as the fifth row of a hot six.',
            '', // Default start
        ]],
    ];

    for (const startPosition of startPositions) {
        const method = new startPosition[0]();
        const sixType = startPosition[1];

        const start = new Start(rounds(Stage.Cinques), undefined, method);
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
