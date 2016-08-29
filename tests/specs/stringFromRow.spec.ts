/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-16 Leigh Simpson. All rights reserved.
 */

describe('stringFromRow function', function () {

    it('converts rows to strings', function () {
        let row: string = 'CBATE0987654321';
        expect(
            Pricker.stringFromRow(
                Pricker.rowFromString(row, Pricker.Stage.Septuples)
            )
        ).toBe(row);
    });

});
