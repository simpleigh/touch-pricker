/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { Course, Touch } from '../blocks/testBlocks';
import { rowFromString, Stage } from '../rows';
import testAbstractVisitorImplementation from './testAbstractVisitorImplementation';
import Proof from './Proof';

describe('Proof visitor', () => {
    const testRow = rowFromString('2143', Stage.Minimus);

    const createTestCourse = (): Course => {
        const course = new Course(testRow);
        course.resetLength();
        return course;
    };

    let visitor: Proof;

    let touch: Touch;

    beforeAll(() => {
        touch = new Touch(testRow);
        touch.insertBlock(1, createTestCourse());
        touch.insertBlock(2, createTestCourse());
    });

    beforeEach(() => {
        visitor = new Proof();
    });

    it('has a dictionary of row counts that starts empty', () => {
        expect(visitor.getRowCounts()).toEqual({});
    });

    it('accumulates counts when it visits a row', () => {
        const row1 = rowFromString('2143', Stage.Minimus);
        const row2 = rowFromString('2413', Stage.Minimus);

        visitor.visit(row1);
        visitor.visit(row2);
        visitor.visit(row2);

        /* eslint-disable @typescript-eslint/naming-convention */
        expect(visitor.getRowCounts()).toEqual({
            '2143': 1,
            '2413': 2,
        });
        /* eslint-enable */
    });

    it('ignores changes to the result', () => {
        const getRowCounts = visitor.getRowCounts();

        getRowCounts['4321'] = 5; // Mutate the getRows result

        expect(visitor.getRowCounts()).not.toEqual(getRowCounts);
        expect(visitor.getRowCounts()).toEqual({});
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

        expect(visitor.directory.contains(touch.getBlock(1).getBlock(3))).toBe(
            true,
        );
    });

    it('adds old blocks now found to be false to the directory', () => {
        visitor.visit(testRow, touch.getBlock(1).getBlock(3));
        visitor.visit(testRow);

        expect(visitor.directory.contains(touch.getBlock(1).getBlock(3))).toBe(
            true,
        );
    });

    it('can handle multiple false blocks', () => {
        const lookupBlock = (courseIndex: number, leadIndex: number) =>
            touch.getBlock(courseIndex).getBlock(leadIndex);

        visitor.visit(testRow, lookupBlock(1, 1));
        visitor.visit(testRow, lookupBlock(1, 2));
        visitor.visit(testRow, lookupBlock(1, 3));

        const otherRow = rowFromString('4321', Stage.Minimus);
        visitor.visit(otherRow, lookupBlock(2, 1));
        visitor.visit(otherRow, lookupBlock(2, 2));
        visitor.visit(otherRow, lookupBlock(2, 3));

        expect(visitor.directory.contains(lookupBlock(1, 1))).toBe(true);
        expect(visitor.directory.contains(lookupBlock(1, 2))).toBe(true);
        expect(visitor.directory.contains(lookupBlock(1, 3))).toBe(true);
        expect(visitor.directory.contains(lookupBlock(2, 1))).toBe(true);
        expect(visitor.directory.contains(lookupBlock(2, 2))).toBe(true);
        expect(visitor.directory.contains(lookupBlock(2, 3))).toBe(true);
    });

    testAbstractVisitorImplementation(
        () => new Proof(),
        (testVisitor) => (testVisitor as Proof).getRowCounts(),
    );
});
