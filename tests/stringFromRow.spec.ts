/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-17 Leigh Simpson. All rights reserved.
 */

describe('stringFromRow function', () => {

    it('converts rows to strings', () => {
        const row: string = 'CBATE0987654321';
        expect(
            Pricker.stringFromRow(
                Pricker.rowFromString(row, Pricker.Stage.Septuples),
            ),
        ).toBe(row);
    });

});
