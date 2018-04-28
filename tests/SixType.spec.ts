/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

describe('SixType enum', () => {

    it('can represent quick sixes and slow sixes', () => {
        expect(Pricker.SixType.Slow).toBeDefined();
        expect(Pricker.SixType.Quick).toBeDefined();
    });

    it('maps quick and slow sixes to appropriate values', () => {
        expect(Pricker.SixType.Slow).toBe(0);
        expect(Pricker.SixType.Quick).toBe(1);
    });

});
