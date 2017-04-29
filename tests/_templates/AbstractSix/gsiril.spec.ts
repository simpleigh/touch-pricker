/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../../functions.ts" />

/**
 * Tests the template behaves like the parent version
 * @param {AbstractSix}  Six - six to test
 * @param {string}       type - six type
 */
// tslint:disable-next-line:variable-name
function testGsirilAbstractSixTemplate(Six, type: string) {

    describe('is a gsiril template', function () {

        it('renders a six correctly', function () {
            const six = new Six(createTestRow());
            expect(six.print('gsiril')).toBe(type);
        });

    });

}
