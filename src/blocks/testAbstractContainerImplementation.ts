/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { rounds, Row, rowFromString, Stage } from '../rows';
import { Proof, StringArray } from '../visitors';
import AbstractBlock from './AbstractBlock';
import testAbstractBlockImplementation from './testAbstractBlockImplementation';
import AbstractContainer from './AbstractContainer';

type TestContainer = AbstractContainer<AbstractBlock>;

class ParentContainer extends AbstractContainer<TestContainer> {}

/**
 * Tests that a container behaves as an AbstractContainer
 * @param testStage       stage to use when testing this container
 * @param factory         creates a true round block instance of length >= 3
 * @param expectedRows    number of rows expected in this container
 * @param expectedLength  number of blocks expected in this container
 */
const testAbstractContainerImplementation = (
    testStage: Stage,
    factory: (initialRow: Row) => TestContainer,
    expectedRows: number,
    expectedLength: number,
): void => {
    describe('is derived from AbstractContainer and', () => {
        testAbstractBlockImplementation(
            testStage,
            factory,
            [[testStage, expectedRows]],
            (block) => {
                (block as TestContainer).notify(0);
            },
        );

        let container: TestContainer;

        beforeEach(() => {
            container = factory(rounds(testStage));
        });

        /* Prerequisites: factory creates a true round block of length >= 3 ***/

        it('is true when created for testing', () => {
            const visitor = new Proof();
            container.accept(visitor);
            expect(visitor.isTrue).toBe(true);
        });

        it('is a round block when created for testing', () => {
            expect(container.getLast()).toEqual(rounds(testStage));
        });

        it('is of length >= 3 when created for testing', () => {
            expect(container.length).toBeGreaterThanOrEqual(3);
        });

        /* Functionality ******************************************************/

        it('keeps the last row in sync with the initial row', () => {
            const newRow = rowFromString('4321', testStage);

            container.initialRow = newRow;

            expect(container.getLast()).not.toEqual(rounds(testStage));
            expect(container.getLast()).toEqual(newRow);
        });

        it('propagates rows between blocks correctly', () => {
            // First block initial row propagated from container initial row
            expect(container.getBlock(1).initialRow).toEqual(rounds(testStage));

            // All blocks connected to the previous one
            for (let index = 2; index <= container.length; index += 1) {
                expect(container.getBlock(index).initialRow).toEqual(
                    container.getBlock(index - 1).getLast(),
                );
            }

            // Container last row propagated from last block last row
            const lastBlock = container.getBlock(container.length);
            expect(container.getLast()).toEqual(lastBlock.getLast());
        });

        it('contains the expected number of blocks', () => {
            expect(container.length).toBe(expectedLength);
        });

        it('grants access to all the blocks', () => {
            expect(container.blocks.length).toBe(container.length);
        });

        it('ignores changes to the returned blocks array', () => {
            const blocks = container.blocks as AbstractBlock[];
            blocks.pop();
            expect(container.length).toBe(expectedLength);
        });

        it('grants access to a contained block', () => {
            expect(container.getBlock(1)).toBe(container.blocks[0]);
            expect(container.getBlock(expectedLength)).toBe(
                container.blocks[expectedLength - 1],
            );
        });

        it('throws an exception for out-of-bounds blocks', () => {
            const longLength = expectedLength + 1;
            expect(() => {
                container.getBlock(0);
            }).toThrowError("Block index '0' out of range");
            expect(() => {
                container.getBlock(longLength);
            }).toThrowError(`Block index '${longLength}' out of range`);
        });

        it('contains all the rows from its contained blocks', () => {
            let visitor = new StringArray();
            container.accept(visitor);
            const containerRows = visitor.strings;

            visitor = new StringArray();
            for (let index = 1; index <= container.length; index += 1) {
                container.getBlock(index).accept(visitor);
            }
            const blockRows = visitor.strings;

            blockRows.forEach((row) => {
                expect(containerRows.indexOf(row)).not.toBe(-1);
            });
        });

        const getSpy = (index: number) =>
            jest.spyOn(container.getBlock(index), 'initialRow', 'set');

        it('recalculates blocks when the initial row changes', () => {
            const newRow = rowFromString('4321', testStage);
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
            const parent = new ParentContainer(container.initialRow);
            jest.spyOn(parent, 'notify');
            // set this after creation to avoid spurious notifications
            container.ownership = { container: parent, index: 999 };

            container.notify(2);
            expect(parent.notify).toHaveBeenCalled();
            expect(parent.notify).toHaveBeenCalledWith(999);
            expect(parent.notify).toHaveBeenCalledTimes(1);
        });
    });
};

export default testAbstractContainerImplementation;
