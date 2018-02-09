/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../../dist/stedman-pricker.d.ts" />

/**
 * Tests that a pricker behaves as an AbstractPricker
 * @param TestPricker  pricker under test
 */
function testAbstractPrickerImplementation(
    // tslint:disable-next-line:variable-name
    TestPricker,
) {

    describe('is derived from AbstractPricker and', function () {

        it('has a template for printing CSS', function () {
            const pricker = new TestPricker(),
                templateName = pricker.templatePath + '.css';
            expect(Pricker.Templates[templateName]).toBeDefined();
        });

        it('has a template for printing HTML', function () {
            const pricker = new TestPricker(),
                templateName = pricker.templatePath + '.html';
            expect(Pricker.Templates[templateName]).toBeDefined();
        });

    });

}
