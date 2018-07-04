/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import rowFromString from './rowFromString';
import Stage from './Stage';
import stringFromRow from './stringFromRow';

describe('stringFromRow function', () => {

    it('converts rows to strings', () => {
        const row: string = 'CBATE0987654321';
        expect(stringFromRow(rowFromString(row, Stage.Septuples))).toBe(row);
    });

});
