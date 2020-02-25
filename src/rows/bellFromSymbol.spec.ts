/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-19 Leigh Simpson. All rights reserved.
 */

import Bell from './Bell';
import bellFromSymbol from './bellFromSymbol';

describe('bellFromSymbol function', () => {
    const testCases: [string, Bell][] = [
        ['1', 1],
        ['2', 2],
        ['3', 3],
        ['4', 4],
        ['5', 5],
        ['6', 6],
        ['7', 7],
        ['8', 8],
        ['9', 9],
        ['0', 10],
        ['E', 11],
        ['e', 11],
        ['T', 12],
        ['t', 12],
        ['A', 13],
        ['a', 13],
        ['B', 14],
        ['b', 14],
        ['C', 15],
        ['c', 15],
        ['D', 16],
        ['d', 16],
    ];

    for (const testCase of testCases) {
        const input = testCase[0];
        const expected = testCase[1];

        it(`can parse "${input}" as a bell`, () => {
            expect(bellFromSymbol(input)).toBe(expected);
        });
    }

    it('rejects unknown symbols', () => {
        expect(() => bellFromSymbol('x')).toThrowError('Unknown bell');
    });
});
