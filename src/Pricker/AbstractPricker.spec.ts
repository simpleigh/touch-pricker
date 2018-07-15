/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import AbstractPricker from './AbstractPricker';

/**
 * Tests that a pricker behaves as an AbstractPricker
 * @param TestPricker  pricker under test
 */
export const testAbstractPrickerImplementation = (
    // tslint:disable-next-line:variable-name
    TestPricker: { new (): AbstractPricker },
) => {

    describe('is derived from AbstractPricker and', () => {

        it('is printable', () => {
            const pricker = new TestPricker();
            expect(pricker.print).toBeDefined();
            expect(typeof pricker.print).toBe('function');
        });

        it('has a template for printing CSS', () => {
            const pricker = new TestPricker();
            // Should succeed
            pricker.print('css');
        });

        it('has a template for printing HTML', () => {
            const pricker = new TestPricker();
            // Should succeed
            pricker.print('html');
        });

    });

};
