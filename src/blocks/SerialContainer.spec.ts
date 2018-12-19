/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-19 Leigh Simpson. All rights reserved.
 */

import { Row, Stage } from '../rows';
import { createTestRow } from '../testFunctions.spec';
import AbstractBlock from './AbstractBlock';
import AbstractContainer from './AbstractContainer';
import { testAbstractContainerImplementation } from './AbstractContainer.spec';
import BlockOwnership from './BlockOwnership';
import SerialContainer from './SerialContainer';

type TestContainer = SerialContainer<AbstractBlock>;

/**
 * Tests that a container behaves as a SerialContainer
 * @param factory          creates an instance of the object under test
 * @param testRows         two suitable test rows
 * @param lengthTestCases  expected lengths and rows for each stage
 * @param expectedLength   blocks in a new Cinques container
 * @param expectedRows     rows in a new Cinques container
 */
export const testSerialContainerImplementation = (
    factory: (initialRow: Row, _ownership?: BlockOwnership) => TestContainer,
    testRows: [Row, Row],
    lengthTestCases: Array<[Stage, number, number]>,
    expectedLength: number,
    expectedRows: number,
) => {

    describe('is derived from SerialContainer and', () => {

        let container: TestContainer = factory(testRows[0]).resetLength();

        const length = container.length;

        beforeEach(() => {
            container = factory(testRows[0]);
            container.resetLength();
        });

        it('starts out empty', () => {
            for (const testCase of lengthTestCases) {
                container = factory(createTestRow('', testCase[0]));
                expect(container.length).toBe(0);
            }
        });

        it('can be reset to the default length', () => {
            for (const testCase of lengthTestCases) {
                container = factory(createTestRow('', testCase[0]));
                container.resetLength();
                expect(container.length).toBe(testCase[1]);
            }
        });

        it('returns this when resetting the length', () => {
            expect(container.resetLength()).toBe(container);
        });

        it('notifies the parent container when resetting the length', () => {
            const parent: AbstractContainer<TestContainer> =
                    jasmine.createSpyObj('AbstractContainer', ['notify']);
            container.ownership = { container: parent, index: 999 };

            container.resetLength();
            expect(parent.notify).toHaveBeenCalled();
            expect(parent.notify).toHaveBeenCalledWith(999);
            expect(parent.notify).toHaveBeenCalledTimes(1);
        });

        it('allows the length to be increased', () => {
            container.setLength(length + 1);
            expect(container.length).toBe(length + 1);
        });

        it('recalculates last row when increasing length', () => {
            container.setLength(length + 1);
            expect(container.getLast()).not.toEqual(testRows[0]);
            expect(container.getLast())
                .toEqual(container.getBlock(length + 1).getLast());
        });

        it('allows the length to be decreased', () => {
            container.setLength(length - 1);
            expect(container.length).toBe(length - 1);
        });

        it('recalculates last row when decreasing length', () => {
            container.setLength(length - 1);
            expect(container.getLast()).not.toEqual(testRows[0]);
            expect(container.getLast())
                .toEqual(container.getBlock(length - 1).getLast());
        });

        it('returns this when setting the length', () => {
            expect(container.setLength(length + 1)).toBe(container);
        });

        it('throws an exception when setting invalid lengths', () => {
            expect(() => container.setLength(-1)).toThrow();
        });

        it('notifies the parent container for length increase', () => {
            const parent: AbstractContainer<TestContainer> =
                    jasmine.createSpyObj('AbstractContainer', ['notify']);
            container.ownership = { container: parent, index: 999 };

            container.setLength(length + 1);
            expect(parent.notify).toHaveBeenCalled();
            expect(parent.notify).toHaveBeenCalledWith(999);
            expect(parent.notify).toHaveBeenCalledTimes(1);
        });

        it('notifies the parent container for length decrease', () => {
            const parent: AbstractContainer<TestContainer> =
                    jasmine.createSpyObj('AbstractContainer', ['notify']);
            container.ownership = { container: parent, index: 999 };

            container.setLength(length - 1);
            expect(parent.notify).toHaveBeenCalled();
            expect(parent.notify).toHaveBeenCalledWith(999);
            expect(parent.notify).toHaveBeenCalledTimes(1);
        });

        it('estimates the number of rows correctly', () => {
            for (const testCase of lengthTestCases) {
                container = factory(createTestRow('', testCase[0]));
                container.resetLength();
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

        const defaultLengthFactory = (factoryRow: Row) => {
            const result = factory(factoryRow);
            result.resetLength();
            return result;
        };

        testAbstractContainerImplementation(
            defaultLengthFactory,
            testRows,
            () => defaultLengthFactory(testRows[0]),
            expectedLength,
            expectedRows,
        );

    });

};
