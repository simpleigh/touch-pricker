/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

// tslint:disable-next-line:variable-name
function testAbstractVisitorImplementation(Visitor) {

    describe('is derived from AbstractVisitor and', function () {

        it('returns this when processing a row', function () {
            let row: Pricker.Row = Pricker.rowFromString(
                    '231',
                    Pricker.Stage.Cinques
                ),
                visitor: Pricker.Visitor.AbstractVisitor = new Visitor();

            expect(visitor.visit(row)).toBe(visitor);
        });

    });

}
