/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import inverse from './inverse';
import rowFromString from './rowFromString';
import stringFromRow from './stringFromRow';
import { Stage } from './types';

describe('inverse function', () => {
    for (const [row, expected] of [
        ['531246', '342516'], // used in multiply.spec.ts
        ['346251', '641253'], // Knuth 1.3.3
        ['621543', '326541'], // Knuth 1.3.3
        ['591826473', '359716842'], // Knuth 5.1.1
    ]) {
        it(`can invert ${row}`, () => {
            const result = inverse(rowFromString(row, row.length));
            expect(stringFromRow(result)).toBe(expected);
        });
    }

    it('leaves its input unchanged', () => {
        const row = rowFromString('531246', Stage.Minor);
        const rowBackup = row.slice();
        inverse(row);
        expect(row).toEqual(rowBackup);
    });
});
