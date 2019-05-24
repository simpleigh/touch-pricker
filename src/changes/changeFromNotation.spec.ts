/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-19 Leigh Simpson. All rights reserved.
 */

import { rowFromString, Stage } from '../rows';
import changeFromNotation from './changeFromNotation';

describe('changeFromNotation function', () => {
    const testCases: Array<[string, Stage, string, string, string]> = [
        [
            'with a place made at the start',
            Stage.Triples,
            '1',
            '1325476',
            '1',
        ],
        [
            'with a place made at the end',
            Stage.Triples,
            '7',
            '2143657',
            '7',
        ],
        [
            'with a place made in the middle',
            Stage.Triples,
            '3',
            '2135476',
            '3',
        ],
        [
            'with consecutive places',
            Stage.Triples,
            '145',
            '1324576',
            '145',
        ],
        [
            'with an implicit place at the start',
            Stage.Triples,
            '47',
            '1324657',
            '147',
        ],
        [
            'with an implicit place at the end',
            Stage.Triples,
            '14',
            '1324657',
            '147',
        ],
        [
            'with implicit places at the start and end',
            Stage.Triples,
            '4',
            '1324657',
            '147',
        ],
        [
            'with alphabetic characters',
            Stage.Cinques,
            'E',
            '2143658709E',
            'E',
        ],
        [
            'with lowercase alphabetic characters',
            Stage.Cinques,
            'e',
            '2143658709E',
            'E',
        ],
    ];

    describe('can parse notation', () => {
        for (const testCase of testCases) {
            const description = testCase[0];
            const stage = testCase[1];
            const input = testCase[2];
            const expected = testCase[3];

            it(description, () => {
                const row = rowFromString('', stage);
                const change = changeFromNotation(input, stage);

                change(row);

                expect(row).toEqual(rowFromString(expected, stage));
            });
        }
    });

    describe('can convert notation to a canonical form', () => {
        for (const testCase of testCases) {
            const description = testCase[0];
            const stage = testCase[1];
            const input = testCase[2];
            const expected = testCase[4];

            it(description, () => {
                const change = changeFromNotation(input, stage);
                expect(change.print('text')).toBe(expected);
            });
        }
    });
});
