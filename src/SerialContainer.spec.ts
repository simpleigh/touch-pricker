/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import AbstractBlock from './AbstractBlock';
import AbstractContainer from './AbstractContainer';
import { testAbstractContainerImplementation } from './AbstractContainer.spec';
import BlockOwnership from './BlockOwnership';
import Row from './Row';
import SerialContainer from './SerialContainer';
import Stage from './Stage';
import { createTestRow } from './testFunctions.spec';

type TestContainer = SerialContainer<AbstractBlock>;

/**
 * Tests that a container behaves as a SerialContainer
 * @param factory          creates an instance of the object under test
 * @param lengthTestCases  expected lengths and rows for each stage
 * @param lengthBounds     limits on container length
 * @param expectedLength   blocks in a new Cinques container
 * @param expectedRows     rows in a new Cinques container
 */
export const testSerialContainerImplementation = (
    factory: (initialRow: Row, _ownership?: BlockOwnership) => TestContainer,
    lengthTestCases: Array<[Stage, number, number]>,
    lengthBounds: [number, number],
    expectedLength: number,
    expectedRows: number,
) => {

    describe('is derived from SerialContainer and', () => {

        const testRow = createTestRow();

        let container: TestContainer = factory(testRow);

        const length = container.getLength();

        beforeEach(() => {
            container = factory(testRow);
        });

        it('starts out the correct length', () => {
            for (const testCase of lengthTestCases) {
                container = factory(createTestRow('231', testCase[0]));
                expect(container.getLength()).toBe(testCase[1]);
            }
        });

        it('allows the length to be increased', () => {
            container.setLength(length + 1);
            expect(container.getLength()).toBe(length + 1);
        });

        it('recalculates last row when increasing length', () => {
            container.setLength(length + 1);
            expect(container.getLast()).not.toEqual(testRow);
            expect(container.getLast())
                .toEqual(container.getBlock(length + 1).getLast());
        });

        it('allows the length to be decreased', () => {
            container.setLength(length - 1);
            expect(container.getLength()).toBe(length - 1);
        });

        it('recalculates last row when decreasing length', () => {
            container.setLength(length - 1);
            expect(container.getLast()).not.toEqual(testRow);
            expect(container.getLast())
                .toEqual(container.getBlock(length - 1).getLast());
        });

        it('returns this when setting the length', () => {
            expect(container.setLength(length + 1)).toBe(container);
        });

        it('throws an exception when setting invalid lengths', () => {
            const [minimum, maximum] = lengthBounds;
            expect(() => container.setLength(minimum - 1)).toThrow();
            expect(() => container.setLength(maximum + 1)).toThrow();
        });

        it('provides a way to set lengths without exceptions', () => {
            const [minimum, maximum] = lengthBounds;
            container.safeSetLength(minimum - 1);
            expect(container.getLength()).toBe(minimum);
            container.safeSetLength(maximum + 1);
            expect(container.getLength()).toBe(maximum);
        });

        it('notifies the parent container for length increase', () => {
            const parent: AbstractContainer<TestContainer> =
                    jasmine.createSpyObj('AbstractContainer', ['notify']);
            container.setOwnership({ 'container': parent, 'index': 999 });

            container.setLength(length + 1);
            expect(parent.notify).toHaveBeenCalled();
            expect(parent.notify).toHaveBeenCalledWith(999);
            expect(parent.notify).toHaveBeenCalledTimes(1);
        });

        it('notifies the parent container for length decrease', () => {
            const parent: AbstractContainer<TestContainer> =
                    jasmine.createSpyObj('AbstractContainer', ['notify']);
            container.setOwnership({ 'container': parent, 'index': 999 });

            container.setLength(length - 1);
            expect(parent.notify).toHaveBeenCalled();
            expect(parent.notify).toHaveBeenCalledWith(999);
            expect(parent.notify).toHaveBeenCalledTimes(1);
        });

        it('estimates the number of rows correctly', () => {
            for (const testCase of lengthTestCases) {
                container = factory(createTestRow('231', testCase[0]));
                expect(container.estimateRows()).toBe(testCase[2]);
            }
        });

        it('updates the estimate of rows on length change', () => {
            const originalRows = container.estimateRows();
            container.setLength(length + 1);
            expect(container.estimateRows()).toBeGreaterThan(originalRows);
            container.setLength(length - 1);
            expect(container.estimateRows()).toBeLessThan(originalRows);
        });

        testAbstractContainerImplementation(
            factory,
            () => factory(testRow),
            expectedLength,
            expectedRows,
        );

    });

};
