/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import SixType from './SixType';

describe('SixType enum', () => {

    it('can represent quick sixes and slow sixes', () => {
        expect(SixType.Slow).toBeDefined();
        expect(SixType.Quick).toBeDefined();
    });

    it('maps quick and slow sixes to appropriate values', () => {
        expect(SixType.Slow).toBe(0);
        expect(SixType.Quick).toBe(1);
    });

});
