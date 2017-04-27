/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="AbstractVisitor.spec.ts" />

describe('Counter visitor', function () {

    it('has a count that starts from zero', function () {
        const visitor: Pricker.Visitor.Counter =
                new Pricker.Visitor.Counter();

        expect(visitor.getCount()).toBe(0);
    });

    it('increments the count when it visits a row', function () {
        const visitor: Pricker.Visitor.Counter =
                new Pricker.Visitor.Counter(),
            row: Pricker.Row =
                Pricker.rowFromString('231', Pricker.Stage.Cinques);

        let i: number;

        for (i = 1; i < 5; i++) {
            visitor.visit(row);
            expect(visitor.getCount()).toBe(i);
        }
    });

    testAbstractVisitorImplementation(
        function (): Pricker.Visitor.Counter {
            return new Pricker.Visitor.Counter();
        },
        function (visitor: Pricker.Visitor.Counter): number {
            return visitor.getCount();
        },
    );

});
