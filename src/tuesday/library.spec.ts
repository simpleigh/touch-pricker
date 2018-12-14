/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import library from './library';
import Method from './Method';

describe('method library', () => {
    const testCases: Array<[Method, number]> = [
        [Method.Ariel, 48],
        [Method.Avon, 48],
        [Method.Bastow, 4],
        [Method.Bristol, 48],
        [Method.Cambridge, 48],
        [Method.Crayford, 8],
        [Method.Deimos, 36],
        [Method.Little, 8],
        [Method.Maypole, 40],
        [Method.Orion, 48],
        [Method.Phobos, 48],
        [Method.Rigel, 48],
        [Method.Strathclyde, 48],
        [Method.Zanussi, 48],
    ];

    for (const testCase of testCases) {
        const name = testCase[0];
        const length = testCase[1];

        it(`contains ${name}`, () => {
            expect(library[name]).toBeDefined();
        });

        it(`has the right number of rows for ${name}`, () => {
            expect(library[name].length).toBe(length);
        });
    }
});
