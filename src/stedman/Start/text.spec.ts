/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { rounds, Stage } from '../../rows';
import { AbstractMethod, Carter, Erin, Stedman, StedmanJump } from '../methods';
import SixType from '../SixType';
import Start from '.';

describe('text template for Start', () => {
    type StartPosition = [new () => AbstractMethod, SixType, string[]];

    const startPositions: StartPosition[] = [
        [
            Carter,
            SixType.Four,
            [
                '', // Aligns array indices with rowIndex
                'Start from rounds as the first row of a four.',
                'Start from rounds as the second row of a four.',
                'Start from rounds as the third row of a four.',
                'Start from rounds as the last row of a four.',
            ],
        ],
        [
            Carter,
            SixType.Eight,
            [
                '', // Aligns array indices with rowIndex
                'Start from rounds as the first row of an eight.',
                'Start from rounds as the second row of an eight.',
                'Start from rounds as the third row of an eight.',
                'Start from rounds as the fourth row of an eight.',
                'Start from rounds as the fifth row of an eight.',
                'Start from rounds as the sixth row of an eight.',
                'Start from rounds as the seventh row of an eight.',
                '', // Default start
            ],
        ],
        [
            Erin,
            SixType.Slow,
            [
                '', // Aligns array indices with rowIndex
                'Start from rounds as the first row of a six.',
                'Start from rounds as the second row of a six.',
                'Start from rounds as the third row of a six.',
                'Start from rounds as the fourth row of a six.',
                'Start from rounds as the fifth row of a six.',
                '', // Default start
            ],
        ],
        [
            Stedman,
            SixType.Quick,
            [
                '', // Aligns array indices with rowIndex
                'Start from rounds as the first row of a quick six.',
                'Start from rounds as the second row of a quick six.',
                'Start from rounds as the third row of a quick six.',
                '', // Default start
                'Start from rounds as the fifth row of a quick six.',
                'Start from rounds as the last row of a quick six.',
            ],
        ],
        [
            Stedman,
            SixType.Slow,
            [
                '', // Aligns array indices with rowIndex
                'Start from rounds as the first row of a slow six.',
                'Start from rounds as the second row of a slow six.',
                'Start from rounds as the third row of a slow six.',
                'Start from rounds as the fourth row of a slow six.',
                'Start from rounds as the fifth row of a slow six.',
                'Start from rounds as the last row of a slow six.',
            ],
        ],
        [
            StedmanJump,
            SixType.Cold,
            [
                '', // Aligns array indices with rowIndex
                'Start from rounds as the first row of a cold six.',
                'Start from rounds as the second row of a cold six.',
                'Start from rounds as the third row of a cold six.',
                'Start from rounds as the fourth row of a cold six.',
                'Start from rounds as the fifth row of a cold six.',
                'Start from rounds as the last row of a cold six.',
            ],
        ],
        [
            StedmanJump,
            SixType.Hot,
            [
                '', // Aligns array indices with rowIndex
                'Start from rounds as the first row of a hot six.',
                'Start from rounds as the second row of a hot six.',
                'Start from rounds as the third row of a hot six.',
                'Start from rounds as the fourth row of a hot six.',
                'Start from rounds as the fifth row of a hot six.',
                '', // Default start
            ],
        ],
    ];

    for (const [Method, sixType, starts] of startPositions) {
        const method = new Method();
        const start = new Start(rounds(Stage.Cinques), method);
        start.sixType = sixType;

        for (let rowIndex = 1; rowIndex < starts.length; rowIndex += 1) {
            const description =
                `prints a ${sixType} six start on row ${rowIndex}` +
                ` for ${method.name} correctly`;

            it(description, () => {
                const expected = starts[rowIndex];
                start.rowIndex = rowIndex;
                expect(start.print('text')).toBe(expected);
            });
        }
    }
});
