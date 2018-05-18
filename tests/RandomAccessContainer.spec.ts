/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

/// <reference path="functions.ts" />
/// <reference path="AbstractContainer.spec.ts" />

/**
 * Tests that a container behaves as a RandomAccessContainer
 * @param Container     container under test
 * @param testBlocks    array containing three potential child blocks
 * @param expectedRows  rows in a new Cinques container
 */
function testRandomAccessContainerImplementation(
    // tslint:disable-next-line:variable-name
    Container,
    testBlocks: Pricker.AbstractBlock[],
    expectedRows: number,
) {

    describe('is derived from RandomAccessContainer and', () => {

        const testRow = createTestRow();

        let container: typeof Container;

        beforeEach(() => {
            container = new Container(testRow);
        });

        const checkPropagation = () => {
            // First block initial row OK
            expect(container.getBlock(1).getInitialRow())
                .toEqual(container.getInitialRow());

            // All blocks connected to the previous one
            for (let index = 2; index <= container.getLength(); index += 1) {
                expect(container.getBlock(index).getInitialRow())
                    .toEqual(container.getBlock(index - 1).getLast());
            }

            // Container last row matches last block last row
            expect(container.getLast())
                .toEqual(container.getBlock(container.getLength()).getLast());
        };

        const checkBlock = (index: number, testBlock: Pricker.AbstractBlock) =>
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
            const initialRow = container.getInitialRow();
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

        const createFn: () => typeof Container = () => {
            const testContainer = new Container(createTestRow());
            testContainer.insertBlock(1, testBlocks[0]);  // [0]
            testContainer.insertBlock(2, testBlocks[1]);  // [0, 1]
            testContainer.insertBlock(3, testBlocks[2]);  // [0, 1, 2]
            return testContainer;
        };

        testAbstractContainerImplementation(
            Container,
            createFn,
            3,
            expectedRows,
        );

    });

}
