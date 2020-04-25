/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import multiply from './multiply';
import Row from './Row';
import rowFromString from './rowFromString';
import Stage from './Stage';
import stringFromRow from './stringFromRow';

describe('multiply function', () => {

    const test = (
        description: string,
        input1: string,
        input2: string,
        expected: string,
    ) => it(description, () => {
        const result = multiply(
            rowFromString(input1, input1.length),
            rowFromString(input2, input2.length),
        );
        expect(stringFromRow(result)).toBe(expected);
    });

    test('can multiply two rows', '654321', '214365', '563412');
    test('copes with a short first row', '4321', '214365', '341265');
    test('copes with a short second row', '654321', '2143', '563421');
    test('knows R × I = R', '531246', '123456', '531246');
    test('knows I × R = R', '123456', '531246', '531246');
    test('knows R^-1 × R = I', '342516', '531246', '123456');
    test('knows R × R^-1 = I', '531246', '342516', '123456');

    describe('passes tests from the Ringing Class Library', () => {
        test('first (minimus)', '4312', '2341', '3124');
        test('second (triples)', '7631425', '2347165', '6315724');
        test('third (long-short)', '12387654', '631245', '63128754');
        test('fourth (short-long)', '24531', '57863124', '17865243');
    });

    describe('leaves its inputs unchanged:', () => {
        let row1: Row;
        let row2: Row;

        beforeEach(() => {
            row1 = rowFromString('654321', Stage.Minor);
            row2 = rowFromString('563412', Stage.Minor);
        });

        it('the first row', () => {
            const rowBackup = row1.slice();
            multiply(row1, row2);
            expect(row1).toEqual(rowBackup);
        });

        it('the second row', () => {
            const rowBackup = row2.slice();
            multiply(row1, row2);
            expect(row2).toEqual(rowBackup);
        });
    });

});
