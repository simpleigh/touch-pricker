/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import AbstractBlock from './AbstractBlock';
import { testAbstractBlockImplementation } from './AbstractBlock.spec';
import AbstractContainer from './AbstractContainer';
import BlockOwnership from './BlockOwnership';
import Row from './Row';
import { createTestRow } from './testFunctions.spec';

type TestContainer = AbstractContainer<AbstractBlock>;

/**
 * Tests that a container behaves as an AbstractContainer
 * @param factory         creates an instance of the object under test
 * @param fixtureFactory  function to create a test fixture of >= three blocks
 * @param expectedLength  blocks in the test fixture
 * @param expectedRows    rows in a new Cinques container
 */
export const testAbstractContainerImplementation = (
    factory: (initialRow: Row, _ownership?: BlockOwnership) => TestContainer,
    fixtureFactory: () => TestContainer,
    expectedLength: number,
    expectedRows: number,
) => {

    describe('is derived from AbstractContainer and', () => {

        let container: TestContainer;

        beforeEach(() => {
            container = fixtureFactory();
        });

        it('starts as a round block (last row equal to initial row)', () => {
            const initialRow = createTestRow();
            container = factory(initialRow);
            expect(container.getLast()).toEqual(initialRow);
        });

        it('keeps the last row in sync with the initial row', () => {
            const initialRow = createTestRow();
            const newRow = createTestRow('123');
            container = factory(initialRow);

            container.setInitialRow(newRow);
            expect(container.getLast()).not.toEqual(initialRow);
            expect(container.getLast()).toEqual(newRow);
        });

        it('contains the expected number of blocks', () => {
            expect(container.getLength()).toBe(expectedLength);
        });

        it('grants access to all the blocks', () => {
            expect(container.getBlocks().length).toBe(container.getLength());
        });

        it('ignores changes to the returned blocks array', () => {
            const blocks = container.getBlocks();
            blocks.pop();
            expect(container.getLength()).toBe(expectedLength);
        });

        it('grants access to a contained block', () => {
            expect(container.getBlock(1)).toBe(container.getBlocks()[0]);
            expect(container.getBlock(expectedLength))
                .toBe(container.getBlocks()[expectedLength - 1]);
        });

        it('throws an exception for out-of-bounds blocks', () => {
            expect(() => container.getBlock(0)).toThrow();
            expect(() => container.getBlock(expectedLength + 1)).toThrow();
        });

        it('uses the last row of the last block as its last row', () => {
            expect(container.getLast())
                .toEqual(container.getBlock(expectedLength).getLast());
        });

        it('recalculates blocks when the initial row changes', () => {
            const newRow = createTestRow('123');
            spyOn(container.getBlock(1), 'setInitialRow');
            spyOn(container.getBlock(2), 'setInitialRow');
            spyOn(container.getBlock(3), 'setInitialRow');

            container.setInitialRow(newRow);
            expect(container.getBlock(1).setInitialRow).toHaveBeenCalled();
            expect(container.getBlock(2).setInitialRow).toHaveBeenCalled();
            expect(container.getBlock(3).setInitialRow).toHaveBeenCalled();
        });

        it('recalculates blocks when notified of changes', () => {
            spyOn(container.getBlock(1), 'setInitialRow');
            spyOn(container.getBlock(2), 'setInitialRow');
            spyOn(container.getBlock(3), 'setInitialRow');

            container.notify(2);

            // Block before the notification is ignored
            expect(container.getBlock(1).setInitialRow).not.toHaveBeenCalled();

            // Notifying block also ignored (it knows anyway)
            expect(container.getBlock(2).setInitialRow).not.toHaveBeenCalled();

            // Block after the notification is updated
            expect(container.getBlock(3).setInitialRow).toHaveBeenCalled();
        });

        it('notifies the parent container on notify', () => {
            const parent: TestContainer =
                jasmine.createSpyObj('AbstractContainer', ['notify']);
            container.setOwnership({ 'container': parent, 'index': 999 });

            container.notify(2);
            expect(parent.notify).toHaveBeenCalled();
            expect(parent.notify).toHaveBeenCalledWith(999);
            expect(parent.notify).toHaveBeenCalledTimes(1);
        });

        testAbstractBlockImplementation(
            factory,
            (block) => {
                (block as TestContainer).notify(0);
            },
            expectedRows,
        );

    });

};
