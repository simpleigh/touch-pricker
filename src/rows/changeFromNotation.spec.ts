/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-19 Leigh Simpson. All rights reserved.
 */

import changeFromNotation from './changeFromNotation';
import rowFromString from './rowFromString';
import Stage from './Stage';

describe('changeFromNotation function', () => {
    const testCases: Array<[string, Stage, string, string, string]> = [
        [
            'with "-" for cross',
            Stage.Major,
            '-',
            '21436587',
            '-',
        ],
        [
            'with "x" for cross',
            Stage.Major,
            'x',
            '21436587',
            '-',
        ],
        [
            'with "X" for cross',
            Stage.Major,
            'X',
            '21436587',
            '-',
        ],
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
            'with non-consecutive places',
            Stage.Caters,
            '369',
            '213546879',
            '369',
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
                expect(change.toString()).toBe(expected);
            });
        }
    });

    it('can parse all triples notations', () => {
        const triplesNotations: Array<[string, string]> = [
            ['1325476', '1'],
            ['1235476', '123'],
            ['1234576', '12345'],
            ['1234657', '12347'],
            ['1243576', '125'],
            ['1243567', '12567'],
            ['1243657', '127'],
            ['1324576', '145'],
            ['1324567', '14567'],
            ['1324657', '147'],
            ['1325467', '167'],
            ['2135476', '3'],
            ['2134576', '345'],
            ['2134567', '34567'],
            ['2134657', '347'],
            ['2135467', '367'],
            ['2143576', '5'],
            ['2143567', '567'],
            ['2143657', '7'],
        ];

        for (const triplesNotation of triplesNotations) {
            const expected = triplesNotation[0];
            const notation = triplesNotation[1];

            const row = rowFromString('', Stage.Triples);
            const change = changeFromNotation(notation, Stage.Triples);

            expect(change.toString()).toBe(notation);

            change(row);

            expect(row).toEqual(rowFromString(expected, Stage.Triples));
        }
    });

    const errorTestCases: Array<[string, string, string]> = [
        ['invalid symbols', '#', 'Unknown place'],
        ['places that are too high', '9', 'Unknown place'],
        ['places out of order', '43', 'Place out of order'],
        ['repeated places', '33', 'Repeated place'],
        ['places missed out', '13', 'Place missed out'],
    ];

    for (const errorTestCase of errorTestCases) {
        const description = errorTestCase[0];
        const input = errorTestCase[1];
        const expected = errorTestCase[2];

        it(`rejects ${description}`, () => {
            expect(() => changeFromNotation(input, Stage.Triples))
                .toThrowError(expected);
        });
    }
});
