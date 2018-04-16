/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

/// <reference path="../../dist/touch-pricker.d.ts" />

/**
 * Tests that a pricker behaves as an AbstractPricker
 * @param TestPricker  pricker under test
 */
function testAbstractPrickerImplementation(
    // tslint:disable-next-line:variable-name
    TestPricker,
) {

    describe('is derived from AbstractPricker and', () => {

        it('has a template for printing CSS', () => {
            const pricker = new TestPricker(),
                templateName = pricker.templatePath + '.css';
            expect(Pricker.Templates[templateName]).toBeDefined();
        });

        it('has a template for printing HTML', () => {
            const pricker = new TestPricker(),
                templateName = pricker.templatePath + '.html';
            expect(Pricker.Templates[templateName]).toBeDefined();
        });

    });

}
