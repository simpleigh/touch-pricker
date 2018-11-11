/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import SixType from './SixType';

describe('SixType enum', () => {

    const testValue = (name: string, value: SixType) =>
        it(`can represent ${name} sixes`, () => {
            expect(value).toBeDefined();
            expect(value).toBe(name);
        });

    testValue('slow', SixType.Slow);
    testValue('quick', SixType.Quick);
    testValue('jump up', SixType.JumpUp);
    testValue('jump down', SixType.JumpDown);
    testValue('invalid', SixType.Invalid);

});
