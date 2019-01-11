/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-19 Leigh Simpson. All rights reserved.
 */

import Start from '.';
import { createTestRow } from '../../testFunctions.spec';
import { AbstractMethod, Stedman, StedmanJump } from '../methods';
import SixType from '../SixType';
import SixTypeMap from '../SixTypeMap';

describe('siril template for Start', () => {

    const initialRow = createTestRow();

    type StartPosition = [SixType, string[]];

    const startPositions: StartPosition[] = [
        [SixType.Slow, [
            '', // Aligns array indices with rowIndex
            '+3.1.3.1.3',
            '+1.3.1.3',
            '+3.1.3',
            '+1.3',
            '+3',
            '+',
        ]],
        [SixType.Quick, [
            '', // Aligns array indices with rowIndex
            '+1.3.1.3.1',
            '+3.1.3.1',
            '+1.3.1',
            '+3.1',
            '+1',
            '+',
        ]],
        [SixType.Cold, [
            '', // Aligns array indices with rowIndex
            "'231547698E0', '231547698E0', '231547698E0', '231547698E0', '231547698E0'", // tslint:disable-line:max-line-length
            "'231547698E0', '231547698E0', '231547698E0', '231547698E0'",
            "'231547698E0', '231547698E0', '231547698E0'",
            "'231547698E0', '231547698E0'",
            "'231547698E0'",
            '',
        ]],
        [SixType.Hot, [
            '', // Aligns array indices with rowIndex
            "'312547698E0', '312547698E0', '312547698E0', '312547698E0', '312547698E0'", // tslint:disable-line:max-line-length
            "'312547698E0', '312547698E0', '312547698E0', '312547698E0'",
            "'312547698E0', '312547698E0', '312547698E0'",
            "'312547698E0', '312547698E0'",
            "'312547698E0'",
            '',
        ]],
    ];

    const methodMap: SixTypeMap<new() => AbstractMethod> = {
        [SixType.Slow]: Stedman,
        [SixType.Quick]: Stedman,
        [SixType.Cold]: StedmanJump,
        [SixType.Hot]: StedmanJump,
    };

    for (const startPosition of startPositions) {
        for (let rowIndex = 1; rowIndex <= 6; rowIndex = rowIndex + 1) {
            const sixType = startPosition[0];
            const expected = startPosition[1][rowIndex];
            const method = methodMap[sixType]!;

            it(`prints correctly "${expected}"`, () => {
                const start = new Start(initialRow, undefined, new method());
                start.rowIndex = rowIndex;
                start.sixType = sixType;
                expect(start.print('siril')).toBe(expected);
            });
        }
    }

});
