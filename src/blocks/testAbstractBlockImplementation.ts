/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import {
    type MutableRow,
    rounds,
    type Row,
    rowFromString,
    type Stage,
} from '../rows';
import { AbstractVisitor, Counter } from '../visitors';
import type AbstractBlock from './AbstractBlock';
import AbstractContainer from './AbstractContainer';

class Container extends AbstractContainer<AbstractBlock> {}

class Visitor extends AbstractVisitor {
    protected override visitImplementation(
        row: Row,
        block?: AbstractBlock,
    ): void {
        // NOOP
    }
}

/**
 * Tests that a block behaves as an AbstractBlock
 * @param testStage            stage to use when testing this block
 * @param factory              creates a non-empty instance of the block
 * @param lengthTestCases      testcases for the length of the block
 * @param triggerNotification  fn that triggers the block to notify its parent
 */
const testAbstractBlockImplementation = (
    testStage: Stage,
    factory: (initialRow: Row) => AbstractBlock,
    lengthTestCases: [Stage, number][],
    triggerNotification: (block: AbstractBlock) => unknown,
): void => {
    describe('is derived from AbstractBlock and', () => {
        let block: AbstractBlock;

        beforeEach(() => {
            block = factory(rounds(testStage));
        });

        it('stores the initial row', () => {
            expect(block.initialRow).toEqual(rounds(testStage));
        });

        it('allows the initial row to be changed', () => {
            const newRow = rowFromString('4321', testStage);
            block.initialRow = newRow;
            expect(block.initialRow).toEqual(newRow);
        });

        it('ignores changes to the original initial row', () => {
            const initialRow = rounds(testStage) as MutableRow;
            const expected = rounds(testStage);
            block = factory(initialRow);

            initialRow[3] = 16; // Mutate the initial row
            expect(initialRow).not.toEqual(expected);

            expect(block.initialRow).not.toEqual(initialRow);
            expect(block.initialRow).toEqual(expected);
        });

        it('ignores changes to the initialRow result', () => {
            const initialRow = block.initialRow as MutableRow;
            const expected = block.initialRow.slice();

            initialRow[3] = 16; // Mutate the initialRow result
            expect(initialRow).not.toEqual(expected);

            expect(block.initialRow).not.toEqual(initialRow);
            expect(block.initialRow).toEqual(expected);
        });

        it('ignores changes to the set initialRow', () => {
            const initialRow = rowFromString('4321', testStage) as MutableRow;
            const expected = initialRow.slice();

            block.initialRow = initialRow;
            initialRow[3] = 16; // Mutate the initialRow argument
            expect(initialRow).not.toEqual(expected);

            expect(block.initialRow).not.toEqual(initialRow);
            expect(block.initialRow).toEqual(expected);
        });

        it('updates when the initial row changes', () => {
            const lastRow = block.getLast();
            block.initialRow = rowFromString('4321', testStage);
            expect(block.getLast()).not.toEqual(lastRow);
        });

        it('has a last row on the same stage as it starts', () => {
            expect(block.getLast().length).toEqual(testStage);
        });

        it('ignores changes to the getLast result', () => {
            const getLast = block.getLast() as MutableRow;
            const expected = getLast.slice();

            getLast[3] = 16; // Mutate the getLast result
            expect(getLast).not.toEqual(expected);

            expect(block.getLast()).not.toEqual(getLast);
            expect(block.getLast()).toEqual(expected);
        });

        it('provides access to the stage', () => {
            expect(block.stage).toBe(testStage);
        });

        it('provides access to the number of rows', () => {
            for (const [stage, rows] of lengthTestCases) {
                block = factory(rounds(stage));
                expect(block.rows).toBe(rows);
            }
        });

        it('starts out without a parent', () => {
            block = factory(rounds(testStage));
            expect(block.container).toBeUndefined();
            expect(block.index).toBeUndefined();
        });

        it('can be attached to a parent', () => {
            const container = new Container(block.initialRow);
            block = factory(rounds(testStage));

            block.ownership = { container, index: 999 };

            expect(block.container).toBe(container);
            expect(block.index).toBe(999);
        });

        it('can be attached to a new parent', () => {
            const containerOld = new Container(block.initialRow);
            const containerNew = new Container(block.initialRow);
            block.ownership = { container: containerOld, index: 999 };

            block.ownership = { container: containerNew, index: 998 };

            expect(block.container).toBe(containerNew);
            expect(block.index).toBe(998);
        });

        it('can be detached from a parent', () => {
            const container = new Container(block.initialRow);
            block = factory(rounds(testStage));
            block.ownership = { container, index: 999 };

            block.clearOwnership();

            expect(block.container).toBeUndefined();
            expect(block.index).toBeUndefined();
        });

        it('notifies the parent container', () => {
            const container = new Container(block.initialRow);
            jest.spyOn(container, 'notify');
            block.ownership = { container, index: 999 };

            triggerNotification(block);

            expect(container.notify).toHaveBeenCalledWith(999);
        });

        it('does not notify when the initial row changes', () => {
            const container = new Container(block.initialRow);
            jest.spyOn(container, 'notify');
            block.ownership = { container, index: 999 };

            block.initialRow = rounds(testStage);

            expect(container.notify).not.toHaveBeenCalled();
        });

        it('calls a visitor in order to traverse rows', () => {
            const visitor = new Visitor();
            jest.spyOn(visitor, 'visit');
            block.accept(visitor);
            expect(visitor.visit).toHaveBeenCalled();
        });

        it('calls a visitor with each row', () => {
            const visitor = new Visitor();
            jest.spyOn(visitor, 'visit');
            block.accept(visitor);
            expect(
                (visitor.visit as jest.Mock).mock.calls.length,
            ).toBeGreaterThan(0);
        });

        it('returns this when receiving a visitor', () => {
            const visitor = new Visitor();
            expect(block.accept(visitor)).toBe(block);
        });

        it('can call multiple visitors', () => {
            const visitor1 = new Counter();
            const visitor2 = new Counter();
            block.accept(visitor1, visitor2);
            expect(visitor1.count).toBeGreaterThan(0);
            expect(visitor2.count).toBeGreaterThan(0);
            expect(visitor1.count).toEqual(visitor2.count);
        });
    });
};

export default testAbstractBlockImplementation;
