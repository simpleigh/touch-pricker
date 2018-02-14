/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../functions.ts" />
/// <reference path="AbstractVisitor.spec.ts" />

describe('Proof visitor', () => {

    let visitor: Pricker.Visitor.Proof;

    beforeEach(() => { visitor = new Pricker.Visitor.Proof(); });

    it('has a dictionary of row counts that starts empty', () => {
        expect(visitor.getRowCounts()).toEqual({ });
    });

    it('accumulates counts when it visits a row', () => {
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

    it('ignores changes to the result', () => {
        const getRowCounts: { [index: string]: number } =
                visitor.getRowCounts();

        getRowCounts['2314567890E'] = 5;  // Mutate the getRows result

        expect(visitor.getRowCounts()).not.toEqual(getRowCounts);
        expect(visitor.getRowCounts()).toEqual({ });
    });

    it('starts out true', () => {
        expect(visitor.isTrue()).toBe(true);
    });

    it('remains true when rows are visited', () => {
        visitor.visit(createTestRow());
        expect(visitor.isTrue()).toBe(true);
    });

    it('becomes false when a row is repeated', () => {
        visitor.visit(createTestRow());
        visitor.visit(createTestRow());
        expect(visitor.isTrue()).toBe(false);
    });

    it('builds up a directory that starts out empty', () => {
        expect(visitor.getDirectory().isEmpty()).toBe(true);
    });

    it('adds new blocks found to be false to the directory', () => {
        const touch = new Pricker.Touch(createTestRow());
        touch.setLength(2);

        visitor.visit(createTestRow());
        visitor.visit(createTestRow(), touch.getCourse(1).getSix(3));

        expect(
            visitor.getDirectory().contains(touch.getCourse(1).getSix(3)),
        ).toBe(true);
    });

    it('adds old blocks now found to be false to the directory', () => {
        const touch = new Pricker.Touch(createTestRow());
        touch.setLength(2);

        visitor.visit(createTestRow(), touch.getCourse(1).getSix(3));
        visitor.visit(createTestRow());

        expect(
            visitor.getDirectory().contains(touch.getCourse(1).getSix(3)),
        ).toBe(true);
    });

    testAbstractVisitorImplementation(
        () => new Pricker.Visitor.Proof(),
        (testVisitor: Pricker.Visitor.Proof) => testVisitor.getRowCounts(),
    );

});
