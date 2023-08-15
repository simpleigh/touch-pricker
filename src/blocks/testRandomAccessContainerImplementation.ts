/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { rounds, Row, Stage } from '../rows';
import AbstractBlock from './AbstractBlock';
import testAbstractContainerImplementation from './testAbstractContainerImplementation';
import RandomAccessContainer from './RandomAccessContainer';

type TestContainer = RandomAccessContainer<AbstractBlock>;

/**
 * Tests that a container behaves as a RandomAccessContainer
 * @param testStage       stage to use when testing this container
 * @param factory         creates a true round block instance of length >= 3
 * @param expectedRows    number of rows expected in this container
 * @param expectedLength  number of blocks expected in this container
 * @param testBlock       a valid child block
 */
const testRandomAccessContainerImplementation = (
    testStage: Stage,
    factory: (initialRow: Row) => TestContainer,
    expectedRows: number,
    expectedLength: number,
    testBlock: AbstractBlock,
): void => {
    describe('is derived from RandomAccessContainer and', () => {
        testAbstractContainerImplementation(
            testStage,
            factory,
            expectedRows,
            expectedLength,
        );

        let container: TestContainer;

        beforeEach(() => {
            container = factory(rounds(testStage));
        });

        /**
         * Validate that rows are propagated correctly between blocks
         */
        const checkPropagation = () => {
            // First block initial row propagated from container initial row
            expect(container.getBlock(1).initialRow).toEqual(
                container.initialRow,
            );

            // All blocks connected to the previous one
            for (let index = 2; index <= container.length; index += 1) {
                expect(container.getBlock(index).initialRow).toEqual(
                    container.getBlock(index - 1).getLast(),
                );
            }

            // Container last row propagated from last block last row
            expect(container.getLast()).toEqual(
                container.getBlock(container.length).getLast(),
            );
        };

        /**
         * Validate that all contained blocks have the correct ownership
         */
        const checkOwnership = () => {
            for (let index = 1; index <= container.length; index += 1) {
                expect(container.getBlock(index).container).toBe(container);
                expect(container.getBlock(index).index).toBe(index);
            }
        };

        it('can insert a block at the beginning', () => {
            container.insertBlock(1, testBlock);
            expect(container.getBlock(1)).toBe(testBlock);
        });

        it('increases the length when inserting at the beginning', () => {
            const originalLength = container.length;
            container.insertBlock(1, testBlock);
            expect(container.length).toBe(originalLength + 1);
        });

        it('moves blocks correctly when inserting at the beginning', () => {
            const originalBlocks = container.blocks;
            container.insertBlock(1, testBlock);
            originalBlocks.forEach((block, index) => {
                // 2 = 1-based index offset + inserted block
                expect(container.getBlock(index + 2)).toBe(block);
            });
        });

        it('propagates rows correctly when inserting at the beginning', () => {
            container.insertBlock(1, testBlock);
            checkPropagation();
        });

        it('sets ownership correctly when inserting at the beginning', () => {
            container.insertBlock(1, testBlock);
            checkOwnership();
        });

        it('ignores the initial row when inserting a new block', () => {
            // Set container initial row different from block initial row
            let initialRow = testBlock.initialRow;
            const [i, j, ...rest] = initialRow;
            initialRow = [j, i, ...rest];
            container.initialRow = initialRow;

            // Container initial row should be unaffected when inserting
            container.insertBlock(1, testBlock);
            expect(container.initialRow).toEqual(initialRow);
            checkPropagation();
        });

        it('can insert a block in the middle', () => {
            container.insertBlock(2, testBlock);
            expect(container.getBlock(2)).toBe(testBlock);
        });

        it('increases the length when inserting in the middle', () => {
            const originalLength = container.length;
            container.insertBlock(2, testBlock);
            expect(container.length).toBe(originalLength + 1);
        });

        it('moves blocks correctly when inserting in the middle', () => {
            const originalBlocks = container.blocks;
            container.insertBlock(2, testBlock);

            expect(container.getBlock(1)).toBe(originalBlocks[0]);
            originalBlocks.forEach((block, index) => {
                if (index > 0) {
                    // 2 = 1-based index offset + inserted block
                    expect(container.getBlock(index + 2)).toBe(block);
                }
            });
        });

        it('propagates rows correctly when inserting in the middle', () => {
            container.insertBlock(2, testBlock);
            checkPropagation();
        });

        it('sets ownership correctly when inserting in the middle', () => {
            container.insertBlock(2, testBlock);
            checkOwnership();
        });

        it('can insert a block at the end', () => {
            const lastIndex = container.length + 1;
            container.insertBlock(lastIndex, testBlock);
            expect(container.getBlock(lastIndex)).toBe(testBlock);
        });

        it('increases the length when inserting at the end', () => {
            const lastIndex = container.length + 1;
            const originalLength = container.length;
            container.insertBlock(lastIndex, testBlock);
            expect(container.length).toBe(originalLength + 1);
        });

        it('moves blocks correctly when inserting at the end', () => {
            const lastIndex = container.length + 1;
            const originalBlocks = container.blocks;

            container.insertBlock(lastIndex, testBlock);

            originalBlocks.forEach((block, index) => {
                expect(container.getBlock(index + 1)).toBe(block);
            });
        });

        it('propagates rows correctly when inserting at the end', () => {
            const lastIndex = container.length + 1;
            container.insertBlock(lastIndex, testBlock);
            checkPropagation();
        });

        it('sets ownership correctly when inserting at the end', () => {
            const lastIndex = container.length + 1;
            container.insertBlock(lastIndex, testBlock);
            checkOwnership();
        });

        it('can delete a block from the beginning', () => {
            const deletedBlock = container.getBlock(1);
            container.deleteBlock(1);
            expect(container.getBlock(1)).not.toBe(deletedBlock);
        });

        it('decreases the length when deleting from the beginning', () => {
            const originalLength = container.length;
            container.deleteBlock(1);
            expect(container.length).toBe(originalLength - 1);
        });

        it('moves blocks correctly when deleting from the beginning', () => {
            const originalBlocks = container.blocks;
            container.deleteBlock(1);
            for (let index = 1; index <= container.length; index += 1) {
                // 0 = 1-based index offset - deleted block
                expect(container.getBlock(index)).toBe(originalBlocks[index]);
            }
        });

        it('propagates rows correctly when deleting from the beginning', () => {
            container.deleteBlock(1);
            checkPropagation();
        });

        it('sets ownership correctly when deleting from the beginning', () => {
            const deletedBlock = container.getBlock(1);

            container.deleteBlock(1);

            checkOwnership();
            expect(deletedBlock.container).toBeUndefined();
            expect(deletedBlock.index).toBeUndefined();
        });

        it('can delete a block from the middle', () => {
            const deletedBlock = container.getBlock(2);
            container.deleteBlock(2);
            expect(container.getBlock(2)).not.toBe(deletedBlock);
        });

        it('decreases the length when deleting from the middle', () => {
            const originalLength = container.length;
            container.deleteBlock(2);
            expect(container.length).toBe(originalLength - 1);
        });

        it('moves blocks correctly when deleting from the middle', () => {
            const originalBlocks = container.blocks;
            container.deleteBlock(2);

            expect(container.getBlock(1)).toBe(originalBlocks[0]);
            for (let index = 2; index <= container.length; index += 1) {
                // 0 = 1-based index offset - deleted block
                expect(container.getBlock(index)).toBe(originalBlocks[index]);
            }
        });

        it('propagates rows correctly when deleting from the middle', () => {
            container.deleteBlock(2);
            checkPropagation();
        });

        it('sets ownership correctly when deleting from the middle', () => {
            const deletedBlock = container.getBlock(2);

            container.deleteBlock(2);

            checkOwnership();
            expect(deletedBlock.container).toBeUndefined();
            expect(deletedBlock.index).toBeUndefined();
        });

        // This test can't follow the regular pattern: there's no more nth block
        // it('can delete a block from the end');

        it('decreases the length when deleting from the end', () => {
            const originalLength = container.length;
            container.deleteBlock(container.length);
            expect(container.length).toBe(originalLength - 1);
        });

        it('moves blocks correctly when deleting from the end', () => {
            const originalBlocks = container.blocks;
            container.deleteBlock(container.length);
            for (let index = 1; index <= container.length; index += 1) {
                expect(container.getBlock(index)).toBe(
                    originalBlocks[index - 1],
                );
            }
        });

        it('propagates rows correctly when deleting from the end', () => {
            container.deleteBlock(container.length);
            checkPropagation();
        });

        it('sets ownership correctly when deleting from the end', () => {
            const deletedBlock = container.getBlock(container.length);

            container.deleteBlock(container.length);

            checkOwnership();
            expect(deletedBlock.container).toBeUndefined();
            expect(deletedBlock.index).toBeUndefined();
        });
    });
};

export default testRandomAccessContainerImplementation;
