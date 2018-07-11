/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import { testPrintableMixinImplementation } from '../PrintableMixin.spec';
import Templates from '../Templates';
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

        it('has a template for printing CSS', () => {
            const pricker = new TestPricker();
            const templateName = pricker.templatePath + '.css';
            expect(Templates[templateName]).toBeDefined();
        });

        it('has a template for printing HTML', () => {
            const pricker = new TestPricker();
            const templateName = pricker.templatePath + '.html';
            expect(Templates[templateName]).toBeDefined();
        });

        testPrintableMixinImplementation(() => new TestPricker());

    });

};
