/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../functions.ts" />
/// <reference path="AbstractVisitor.spec.ts" />

describe('Counter visitor', function () {

    it('has a count that starts from zero', function () {
        const visitor = new Pricker.Visitor.Counter();
        expect(visitor.getCount()).toBe(0);
    });

    it('increments the count when it visits a row', function () {
        const visitor = new Pricker.Visitor.Counter();
        for (let i: number = 1; i < 5; i += 1) {
            visitor.visit(createTestRow());
            expect(visitor.getCount()).toBe(i);
        }
    });

    testAbstractVisitorImplementation(
        () => new Pricker.Visitor.Counter(),
        (visitor: Pricker.Visitor.Counter) => visitor.getCount(),
    );

});
