/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import { Row } from '../rows';
import { createTestRow } from '../testFunctions.spec';
import AbstractBlock from './AbstractBlock';
import { testAbstractBlockImplementation } from './AbstractBlock.spec';
import AbstractContainer from './AbstractContainer';
import BlockOwnership from './BlockOwnership';

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

            container.initialRow = newRow;
            expect(container.getLast()).not.toEqual(initialRow);
            expect(container.getLast()).toEqual(newRow);
        });

        it('contains the expected number of blocks', () => {
            expect(container.length).toBe(expectedLength);
        });

        it('grants access to all the blocks', () => {
            expect(container.getBlocks().length).toBe(container.length);
        });

        it('ignores changes to the returned blocks array', () => {
            const blocks = container.getBlocks();
            blocks.pop();
            expect(container.length).toBe(expectedLength);
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

        const getSpy = (index: number) =>
            spyOnProperty(container.getBlock(index), 'initialRow', 'set');

        it('recalculates blocks when the initial row changes', () => {
            const newRow = createTestRow('123');
            const spy1 = getSpy(1);
            const spy2 = getSpy(2);
            const spy3 = getSpy(3);

            container.initialRow = newRow;
            expect(spy1).toHaveBeenCalled();
            expect(spy2).toHaveBeenCalled();
            expect(spy3).toHaveBeenCalled();
        });

        it('recalculates blocks when notified of changes', () => {
            const spy1 = getSpy(1);
            const spy2 = getSpy(2);
            const spy3 = getSpy(3);

            container.notify(2);

            // Block before the notification is ignored
            expect(spy1).not.toHaveBeenCalled();

            // Notifying block also ignored (it knows anyway)
            expect(spy2).not.toHaveBeenCalled();

            // Block after the notification is updated
            expect(spy3).toHaveBeenCalled();
        });

        it('notifies the parent container on notify', () => {
            const parent: TestContainer =
                jasmine.createSpyObj('AbstractContainer', ['notify']);
            container.ownership = { container: parent, index: 999 };

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
