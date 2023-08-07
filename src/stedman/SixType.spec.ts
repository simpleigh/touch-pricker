/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import SixType from './SixType';

describe('SixType enum', () => {

    const testValue = (name: string, value: SixType) => {
        it(`can represent ${name} sixes`, () => {
            expect(value).toBeDefined();
            expect(value).toBe(name);
        });
    };

    testValue('slow', SixType.Slow);
    testValue('quick', SixType.Quick);
    testValue('cold', SixType.Cold);
    testValue('hot', SixType.Hot);
    testValue('four', SixType.Four);
    testValue('eight', SixType.Eight);
    testValue('invalid', SixType.Invalid);

});
