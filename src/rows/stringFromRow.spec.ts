/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import rowFromString from './rowFromString';
import stringFromRow from './stringFromRow';
import { Stage } from './types';

describe('stringFromRow function', () => {

    it('converts rows to strings', () => {
        const row = 'DCBATE0987654321';
        expect(stringFromRow(rowFromString(row, Stage.Sixteen))).toBe(row);
    });

});
