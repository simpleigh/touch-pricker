/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import type AbstractPricker from './AbstractPricker';

/**
 * Tests that a pricker behaves as an AbstractPricker
 * @param TestPricker  pricker under test
 */
const testAbstractPrickerImplementation = (
    TestPricker: new () => AbstractPricker,
): void => {
    describe('is derived from AbstractPricker and', () => {
        const pricker = new TestPricker();

        it('is printable', () => {
            expect(pricker).toBePrintable();
        });

        it('has a template for printing CSS', () => {
            expect(pricker).toHaveTemplate('css');
        });

        it('prints as CSS without error', () => {
            expect(pricker.print('css').length).toBeGreaterThanOrEqual(1);
        });

        it('has a template for printing HTML', () => {
            expect(pricker).toHaveTemplate('html');
        });

        it('prints as HTML without error', () => {
            expect(pricker.print('html').length).toBeGreaterThanOrEqual(1);
        });
    });
};

export default testAbstractPrickerImplementation;
