/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../functions.ts" />
/// <reference path="AbstractVisitor.spec.ts" />

describe('Proof visitor', function () {

    let visitor: Pricker.Visitor.Proof;

    beforeEach(() => { visitor = new Pricker.Visitor.Proof(); });

    it('has a dictionary of row counts that starts empty', function () {
        expect(visitor.getRowCounts()).toEqual({ });
    });

    it('accumulates counts when it visits a row', function () {
        const row1 = createTestRow('2314567890E'),
            row2 = createTestRow('3241658709E');

        visitor.visit(row1);
        visitor.visit(row2);
        visitor.visit(row2);

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
        visitor.visit(createTestRow());
        expect(visitor.isTrue()).toBe(true);
    });

    it('becomes false when a row is repeated', function () {
        visitor.visit(createTestRow());
        visitor.visit(createTestRow());
        expect(visitor.isTrue()).toBe(false);
    });

    it('builds up an index that starts out empty', function () {
        expect(visitor.getIndex().isEmpty()).toBe(true);
    });

    it('indexes new blocks found to be false', function () {
        const touch = new Pricker.Touch(createTestRow());
        touch.setLength(2);

        visitor.visit(createTestRow());
        visitor.visit(createTestRow(), touch.getCourse(1).getSix(3));

        expect(
            visitor.getIndex().contains(touch.getCourse(1).getSix(3)),
        ).toBe(true);
    });

    it('indexes old blocks now found to be false', function () {
        const touch = new Pricker.Touch(createTestRow());
        touch.setLength(2);

        visitor.visit(createTestRow(), touch.getCourse(1).getSix(3));
        visitor.visit(createTestRow());

        expect(
            visitor.getIndex().contains(touch.getCourse(1).getSix(3)),
        ).toBe(true);
    });

    testAbstractVisitorImplementation(
        () => new Pricker.Visitor.Proof(),
        (testVisitor: Pricker.Visitor.Proof) => testVisitor.getRowCounts(),
    );

});
