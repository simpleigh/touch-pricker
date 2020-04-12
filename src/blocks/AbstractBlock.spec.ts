/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { rounds, Row, rowFromString, Stage } from '../rows';
import { Counter } from '../visitors';
import AbstractBlock from './AbstractBlock';
import AbstractContainer from './AbstractContainer';
import BlockOwnership from './BlockOwnership';

/**
 * Tests that a block behaves as an AbstractBlock
 * @param stage                stage to use when testing this block
 * @param factory              creates a non-empty instance of the block
 * @param expectedRows         number of rows expected in this block
 * @param triggerNotification  fn that triggers the block to notify its parent
 */
export const testAbstractBlockImplementation = (
    stage: Stage,
    factory: (initialRow: Row, _ownership?: BlockOwnership) => AbstractBlock,
    expectedRows: number,
    triggerNotification: (block: AbstractBlock) => any,
) => {

    describe('is derived from AbstractBlock and', () => {

        let block: AbstractBlock;

        beforeEach(() => {
            block = factory(rounds(stage));
        });

        it('stores the initial row', () => {
            expect(block.initialRow).toEqual(rounds(stage));
        });

        it('allows the initial row to be changed', () => {
            const newRow = rowFromString('4321', stage);
            block.initialRow = newRow;
            expect(block.initialRow).toEqual(newRow);
        });

        it('ignores changes to the original initial row', () => {
            const initialRow = rounds(stage);
            const expected = rounds(stage);
            block = factory(initialRow);

            initialRow[3] = 999;  // Mutate the initial row
            expect(initialRow).not.toEqual(expected);

            expect(block.initialRow).not.toEqual(initialRow);
            expect(block.initialRow).toEqual(expected);
        });

        it('ignores changes to the initialRow result', () => {
            const initialRow = block.initialRow;
            const expected = block.initialRow.slice();

            initialRow[3] = 999;  // Mutate the initialRow result
            expect(initialRow).not.toEqual(expected);

            expect(block.initialRow).not.toEqual(initialRow);
            expect(block.initialRow).toEqual(expected);
        });

        it('ignores changes to the set initialRow', () => {
            const initialRow = rowFromString('4321', stage);
            const expected = initialRow.slice();

            block.initialRow = initialRow;
            initialRow[3] = 999;  // Mutate the initialRow argument
            expect(initialRow).not.toEqual(expected);

            expect(block.initialRow).not.toEqual(initialRow);
            expect(block.initialRow).toEqual(expected);
        });

        it('updates when the initial row changes', () => {
            const lastRow = block.getLast();
            block.initialRow = rowFromString('4321', stage);
            expect(block.getLast()).not.toEqual(lastRow);
        });

        it('has a last row on the same stage as it starts', () => {
            expect(block.getLast().length).toEqual(stage);
        });

        it('ignores changes to the getLast result', () => {
            const getLast = block.getLast();
            const expected = getLast.slice();

            getLast[3] = 999;  // Mutate the getLast result
            expect(getLast).not.toEqual(expected);

            expect(block.getLast()).not.toEqual(getLast);
            expect(block.getLast()).toEqual(expected);
        });

        it('provides access to the stage', () => {
            expect(block.stage).toBe(stage);
        });

        it('provides access to the number of rows', () => {
            expect(block.rows).toBe(expectedRows);
        });

        it('notifies the parent container', () => {
            const container: AbstractContainer<AbstractBlock> =
                jasmine.createSpyObj('AbstractContainer', ['notify']);
            // set this after creation to avoid spurious notifications
            block.ownership = { container, index: 999 };

            triggerNotification(block);

            expect(container.notify).toHaveBeenCalledWith(999);
        });

        it('does not notify when the initial row changes', () => {
            const container: AbstractContainer<AbstractBlock> =
                jasmine.createSpyObj('AbstractContainer', ['notify']);
            // set this after creation to avoid spurious notifications
            block.ownership = { container, index: 999 };

            block.initialRow = rounds(stage);

            expect(container.notify).not.toHaveBeenCalled();
        });

        it('allows access to parent information', () => {
            const container: AbstractContainer<AbstractBlock> =
                jasmine.createSpyObj('AbstractContainer', ['notify']);
            block = factory(rounds(stage), { container, index: 999 });

            expect(block.container).toBe(container);
            expect(block.index).toBe(999);
        });

        it('can be attached to a new parent', () => {
            const containerOld: AbstractContainer<AbstractBlock> =
                jasmine.createSpyObj('AbstractContainer', ['notify']);
            const containerNew: AbstractContainer<AbstractBlock> =
                jasmine.createSpyObj('AbstractContainer', ['notify']);
            block = factory(
                rounds(stage),
                { container: containerOld, index: 999 }
            );

            block.ownership = { container: containerNew, index: 998 };

            expect(block.container).toBe(containerNew);
            expect(block.index).toBe(998);
        });

        it('can be detached from a parent', () => {
            const container: AbstractContainer<AbstractBlock> =
                jasmine.createSpyObj('AbstractContainer', ['notify']);
            block = factory(rounds(stage), { container, index: 999 });

            block.clearOwnership();

            expect(block.container).toBeUndefined();
            expect(block.index).toBeUndefined();
        });

        it('calls a visitor in order to traverse rows', () => {
            const visitor = jasmine.createSpyObj('AbstractVisitor', ['visit']);
            block.accept(visitor);
            expect(visitor.visit).toHaveBeenCalled();
        });

        it('calls a visitor with each row', () => {
            const visitor = jasmine.createSpyObj('AbstractVisitor', ['visit']);
            block.accept(visitor);
            expect(visitor.visit.calls.count()).toBeGreaterThan(0);
        });

        it('returns this when receiving a visitor', () => {
            const visitor = new Counter();
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
