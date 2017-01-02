/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

describe('Counter visitor', function () {

    it('has a count that starts from zero', function () {
        let visitor: Pricker.Visitor.Counter =
                new Pricker.Visitor.Counter();

        expect(visitor.getCount()).toBe(0);
    });

    it('increments the count when it visits a row', function () {
        let visitor: Pricker.Visitor.Counter =
                new Pricker.Visitor.Counter(),
            row: Pricker.Row =
                Pricker.rowFromString('231', Pricker.Stage.Cinques),
            i: number;

        for (i = 1; i < 5; i++) {
            visitor.visit(row);
            expect(visitor.getCount()).toBe(i);
        }
    });

    testAbstractVisitorImplementation(Pricker.Visitor.Counter);

});
