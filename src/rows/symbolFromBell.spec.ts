/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import symbolFromBell from './symbolFromBell';
import { Bell } from './types';

describe('symbolFromBell function', () => {

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
        ['T', 12],
        ['A', 13],
        ['B', 14],
        ['C', 15],
        ['D', 16],
    ];

    for (const [expected, input] of testCases) {
        it(`can convert "${input}" to a string`, () => {
            expect(symbolFromBell(input)).toBe(expected);
        });
    }

});
