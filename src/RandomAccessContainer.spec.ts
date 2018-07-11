
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import AbstractBlock from './AbstractBlock';
import { testAbstractContainerImplementation } from './AbstractContainer.spec';
import BlockOwnership from './BlockOwnership';
import { permuteN } from './Changes';
import RandomAccessContainer from './RandomAccessContainer';
import Row from './Row';
import { createTestRow } from './testFunctions.spec';

type TestContainer = RandomAccessContainer<AbstractBlock>;

/**
 * Tests that a container behaves as a RandomAccessContainer
 * @param factory       creates an instance of the object under test
 * @param testBlocks    array containing three potential child blocks
 * @param firstBlockInitialRowFn
 * @param expectedRows  rows in a new Cinques container
 */
export const testRandomAccessContainerImplementation = (
    factory: (initialRow: Row, _ownership?: BlockOwnership) => TestContainer,
    testBlocks: AbstractBlock[],
    firstBlockInitialRowFn: (container: TestContainer) => Row,
    expectedRows: number,
) => {

    describe('is derived from RandomAccessContainer and', () => {

        const testRow = createTestRow();

        let container: TestContainer;

        beforeEach(() => {
            container = factory(testRow);
        });

        const checkPropagation = () => {
            // First block initial row OK
            expect(container.getBlock(1).getInitialRow())
                .toEqual(firstBlockInitialRowFn(container));

            // All blocks connected to the previous one
            for (let index = 2; index <= container.getLength(); index += 1) {
                expect(container.getBlock(index).getInitialRow())
                    .toEqual(container.getBlock(index - 1).getLast());
            }

            // Container last row matches last block last row
            expect(container.getLast())
                .toEqual(container.getBlock(container.getLength()).getLast());
        };

        const checkBlock = (index: number, testBlock: AbstractBlock) =>
            expect(container.getBlock(index).print('text'))
                .toBe(testBlock.print('text'));

        const checkOwnership = () => {
            for (let index = 1; index <= container.getLength(); index += 1) {
                expect(container.getBlock(index).getContainer())
                    .toBe(container);
                expect(container.getBlock(index).getIndex()).toBe(index);
            }
        };

        it('starts out empty', () => {
            expect(container.getLength()).toBe(0);
        });

        it('can insert a new block', () => {
            container.insertBlock(1, testBlocks[0]);
            expect(container.getLength()).toBe(1);
            checkPropagation();
            checkBlock(1, testBlocks[0]);
        });

        it('ignores the initial row when inserting a new block', () => {
            // Set container initial row different from block initial row
            const initialRow = testBlocks[0].getInitialRow();
            permuteN(initialRow);
            container.setInitialRow(initialRow);

            // Container initial row should be unaffected when inserting
            container.insertBlock(1, testBlocks[0]);
            expect(container.getInitialRow()).toEqual(initialRow);
            checkPropagation();
        });

        it('can insert a second block', () => {
            container.insertBlock(1, testBlocks[0]);  // [0]
            container.insertBlock(2, testBlocks[1]);  // [0, 1]
            expect(container.getLength()).toBe(2);
            checkPropagation();
            checkBlock(1, testBlocks[0]);
            checkBlock(2, testBlocks[1]);
        });

        it('can insert a block at the beginning', () => {
            container.insertBlock(1, testBlocks[1]);  // [1]
            container.insertBlock(1, testBlocks[0]);  // [0, 1]
            expect(container.getLength()).toBe(2);
            checkPropagation();
            checkBlock(1, testBlocks[0]);
            checkBlock(2, testBlocks[1]);
        });

        it('can insert a block in the middle', () => {
            container.insertBlock(1, testBlocks[0]);  // [0]
            container.insertBlock(2, testBlocks[2]);  // [0, 2]
            container.insertBlock(2, testBlocks[1]);  // [0, 1, 2]
            checkPropagation();
            checkBlock(1, testBlocks[0]);
            checkBlock(2, testBlocks[1]);
            checkBlock(3, testBlocks[2]);
        });

        it('sets ownership correctly when inserting new blocks', () => {
            container.insertBlock(1, testBlocks[0]);  // [0]
            container.insertBlock(2, testBlocks[1]);  // [0, 1]
            checkOwnership();
        });

        it('can delete a block from the end', () => {
            container.insertBlock(1, testBlocks[0]);  // [0]
            container.insertBlock(2, testBlocks[1]);  // [0, 1]
            container.deleteBlock(2);                 // [0]
            expect(container.getLength()).toBe(1);
            checkPropagation();
            checkBlock(1, testBlocks[0]);
        });

        it('can delete a block from the middle', () => {
            container.insertBlock(1, testBlocks[0]);  // [0]
            container.insertBlock(2, testBlocks[1]);  // [0, 1]
            container.insertBlock(3, testBlocks[2]);  // [0, 1, 2]
            container.deleteBlock(2);                 // [0, 2]
            expect(container.getLength()).toBe(2);
            checkPropagation();
            checkBlock(1, testBlocks[0]);
            checkBlock(2, testBlocks[2]);
        });

        it('sets ownership correctly when deleting blocks', () => {
            container.insertBlock(1, testBlocks[0]);  // [0]
            container.insertBlock(2, testBlocks[1]);  // [0, 1]
            container.deleteBlock(2);                 // [0]
            checkOwnership();
            expect(testBlocks[1].getContainer()).toBeUndefined();
            expect(testBlocks[1].getIndex()).toBeUndefined();
        });

        const fixtureFactory: () => TestContainer = () => {
            const testContainer = factory(createTestRow());
            testContainer.insertBlock(1, testBlocks[0]);  // [0]
            testContainer.insertBlock(2, testBlocks[1]);  // [0, 1]
            testContainer.insertBlock(3, testBlocks[2]);  // [0, 1, 2]
            return testContainer;
        };

        testAbstractContainerImplementation(
            factory,
            fixtureFactory,
            3,
            expectedRows,
        );

    });

};
