/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../functions.ts" />
/// <reference path="AbstractVisitor.spec.ts" />

describe('Proof visitor', function () {

    let visitor: Pricker.Visitor.Proof,
        block: Pricker.AbstractBlock;

    beforeEach(function () {
        visitor = new Pricker.Visitor.Proof();
        block = jasmine.createSpyObj('AbstractBlock', ['setFlag']);
    });

    it('has a dictionary of row counts that starts empty', function () {
        expect(visitor.getRowCounts()).toEqual({ });
    });

    it('accumulates counts when it visits a row', function () {
        const row1 = createTestRow('2314567890E'),
            row2 = createTestRow('3241658709E');

        visitor.visit(row1, block);
        visitor.visit(row2, block);
        visitor.visit(row2, block);

        expect(visitor.getRowCounts()).toEqual(
            {
                '2314567890E': 1,
                '3241658709E': 2,
            },
        );
    });

    it('ignores changes to the result', function () {
        const getRowCounts: { [index: string]: number } =
                visitor.getRowCounts();

        getRowCounts['2314567890E'] = 5;  // Mutate the getRows result

        expect(visitor.getRowCounts()).not.toEqual(getRowCounts);
        expect(visitor.getRowCounts()).toEqual({ });
    });

    it('starts out true', function () {
        expect(visitor.isTrue()).toBe(true);
    });

    it('remains true when rows are visited', function () {
        visitor.visit(createTestRow(), block);
        expect(visitor.isTrue()).toBe(true);
    });

    it('becomes false when a row is repeated', function () {
        visitor.visit(createTestRow(), block);
        visitor.visit(createTestRow(), block);
        expect(visitor.isTrue()).toBe(false);
    });

    testAbstractVisitorImplementation(
        () => new Pricker.Visitor.Proof(),
        (testVisitor: Pricker.Visitor.Proof) => testVisitor.getRowCounts(),
    );

});
