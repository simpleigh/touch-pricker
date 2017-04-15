/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../functions.ts" />

/**
 * Tests that a visitor behaves as an AbstractVisitor
 * @param {}  createFn  - fn to create visitor under test
 * @param {}  getState  - fn that returns the visitor's state
 * @param {}  setupTest - add spies before testcase
 */
function testAbstractVisitorImplementation(
    // tslint:disable-next-line:variable-name
    createFn: () => Pricker.Visitor.AbstractVisitor,
    getState: (visitor: Pricker.Visitor.AbstractVisitor) => any,
    // tslint:disable-next-line:no-empty
    setupTest: () => void = function () { },
) {

    describe('is derived from AbstractVisitor and', function () {

        let visitor: Pricker.Visitor.AbstractVisitor,
            block: Pricker.AbstractBlock;

        beforeEach(function () {
            visitor = createFn();
            block = jasmine.createSpyObj('AbstractBlock', ['setFlag']);
        });

        it('returns this when processing a row', function () {
            expect(visitor.visit(createTestRow(), block)).toBe(visitor);
        });

        it('starts out processing rows', function () {
            expect(visitor.isVisiting()).toBe(true);
        });

        it('stops processing rows after rounds is reached', function () {
            visitor.visit(createTestRow(), block);
            visitor.visit(createTestRow('123'), block);
            expect(visitor.isVisiting()).toBe(false);
        });

        it('stops changing its state when not processing', function () {
            let result: any;

            setupTest();
            visitor.visit(createTestRow(), block);
            visitor.visit(createTestRow('123'), block);
            result = getState(visitor);

            visitor.visit(createTestRow(), block);
            expect(getState(visitor)).toEqual(result);
        });

    });

}
