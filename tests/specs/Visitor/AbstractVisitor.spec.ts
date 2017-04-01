/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

function testAbstractVisitorImplementation(
    // tslint:disable-next-line:variable-name
    Visitor,
    getState: (visitor: Pricker.Visitor.AbstractVisitor) => any,
    // tslint:disable-next-line:no-empty
    setupTest: () => void = function () { }
) {

    function createTestRow(input: string = '231'): Pricker.Row {
        return Pricker.rowFromString(input, Pricker.Stage.Cinques);
    }

    describe('is derived from AbstractVisitor and', function () {

        it('returns this when processing a row', function () {
            const row: Pricker.Row = createTestRow('231'),
                visitor: Pricker.Visitor.AbstractVisitor = new Visitor();

            expect(visitor.visit(row)).toBe(visitor);
        });

        it('stops processing rows after rounds', function () {
            const row: Pricker.Row = createTestRow('231'),
                rounds: Pricker.Row = createTestRow(''),
                visitor: Pricker.Visitor.AbstractVisitor = new Visitor();

            let result: any;

            setupTest();
            visitor.visit(row);
            visitor.visit(rounds);
            result = getState(visitor);

            visitor.visit(row);
            expect(getState(visitor)).toEqual(result);
        });

    });

}