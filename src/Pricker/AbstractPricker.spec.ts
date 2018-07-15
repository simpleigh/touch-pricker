/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import matchers from '../templates/matchers';
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

        const pricker = new TestPricker();

        beforeEach(() => {
            jasmine.addMatchers(matchers);
        });

        it('is printable', () => {
            expect(pricker).toBePrintable();
        });

        it('has a template for printing CSS', () => {
            expect(pricker).toHaveTemplate('css');
        });

        it('has a template for printing HTML', () => {
            expect(pricker).toHaveTemplate('html');
        });

    });

};
