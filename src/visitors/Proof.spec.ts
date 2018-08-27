/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import { Course, Touch } from '../stedman';
import { createTestRow } from '../testFunctions.spec';
import { testAbstractVisitorImplementation } from './AbstractVisitor.spec';
import Proof from './Proof';

describe('Proof visitor', () => {

    const testRow = createTestRow();

    let visitor: Proof;

    let touch: Touch;

    beforeAll(() => {
        touch = new Touch(testRow);
        touch.insertBlock(1, new Course(testRow));
        touch.insertBlock(2, new Course(testRow));
    });

    beforeEach(() => {
        visitor = new Proof();
    });

    it('has a dictionary of row counts that starts empty', () => {
        expect(visitor.getRowCounts()).toEqual({ });
    });

    it('accumulates counts when it visits a row', () => {
        const row1 = createTestRow('2314567890E');
        const row2 = createTestRow('3241658709E');

        visitor.visit(row1);
        visitor.visit(row2);
        visitor.visit(row2);

        expect(visitor.getRowCounts()).toEqual({
            '2314567890E': 1,
            '3241658709E': 2,
        });
    });

    it('ignores changes to the result', () => {
        const getRowCounts: { [index: string]: number } =
            visitor.getRowCounts();

        getRowCounts['2314567890E'] = 5;  // Mutate the getRows result

        expect(visitor.getRowCounts()).not.toEqual(getRowCounts);
        expect(visitor.getRowCounts()).toEqual({ });
    });

    it('starts out true', () => {
        expect(visitor.isTrue).toBe(true);
    });

    it('remains true when rows are visited', () => {
        visitor.visit(testRow);
        expect(visitor.isTrue).toBe(true);
    });

    it('becomes false when a row is repeated', () => {
        visitor.visit(testRow);
        visitor.visit(testRow);
        expect(visitor.isTrue).toBe(false);
    });

    it('builds up a directory that starts out empty', () => {
        expect(visitor.directory.empty).toBe(true);
    });

    it('adds new blocks found to be false to the directory', () => {
        visitor.visit(testRow);
        visitor.visit(testRow, touch.getBlock(1).getBlock(3));

        expect(visitor.directory.contains(touch.getBlock(1).getBlock(3)))
            .toBe(true);
    });

    it('adds old blocks now found to be false to the directory', () => {
        visitor.visit(testRow, touch.getBlock(1).getBlock(3));
        visitor.visit(testRow);

        expect(visitor.directory.contains(touch.getBlock(1).getBlock(3)))
            .toBe(true);
    });

    testAbstractVisitorImplementation(
        () => new Proof(),
        (testVisitor) => (testVisitor as Proof).getRowCounts(),
    );

});
