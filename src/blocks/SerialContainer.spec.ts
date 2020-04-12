/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { rounds, Row, Stage } from '../rows';
import AbstractBlock from './AbstractBlock';
import AbstractContainer from './AbstractContainer';
import { testAbstractContainerImplementation } from './AbstractContainer.spec';
import BlockOwnership from './BlockOwnership';
import SerialContainer from './SerialContainer';

type TestContainer = SerialContainer<AbstractBlock>;

/**
 * Tests that a container behaves as a SerialContainer
 * @param stage            stage to use when testing this container
 * @param factory          creates an instance of the object under test
 * @param expectedRows     number of rows expected in this container
 * @param expectedLength   number of blocks expected in this container
 * @param lengthTestCases  expected lengths and rows for each stage
 */
export const testSerialContainerImplementation = (
    stage: Stage,
    factory: (initialRow: Row, _ownership?: BlockOwnership) => TestContainer,
    expectedRows: number,
    expectedLength: number,
    lengthTestCases: [Stage, number, number][],
) => {

    describe('is derived from SerialContainer and', () => {

        /**
         * Fixture factory that extends the container to its default length
         * @param initialRow  initial row for the container
         * @param ownership   ownership of this container
         */
        const defaultLengthFactory = (
            initialRow: Row,
            _ownership?: BlockOwnership,
        ) => {
            const result = factory(initialRow, _ownership);
            result.resetLength();
            return result;
        };

        testAbstractContainerImplementation(
            stage,
            defaultLengthFactory,
            expectedRows,
            expectedLength,
        );

        let container: TestContainer;

        beforeEach(() => {
            container = defaultLengthFactory(rounds(stage));
        });

        it('starts out empty', () => {
            for (const testCase of lengthTestCases) {
                container = factory(rounds(testCase[0]));
                expect(container.length).toBe(0);
            }
        });

        it('can be reset to the default length', () => {
            for (const testCase of lengthTestCases) {
                container = factory(rounds(testCase[0]));
                container.resetLength();
                expect(container.length).toBe(testCase[2]);
            }
        });

        it('allows the length to be increased', () => {
            container.setLength(expectedLength + 1);
            expect(container.length).toBe(expectedLength + 1);
        });

        it('recalculates last row when increasing length', () => {
            container.setLength(expectedLength + 1);
            expect(container.getLast()).not.toEqual(rounds(stage));
            expect(container.getLast())
                .toEqual(container.getBlock(expectedLength + 1).getLast());
        });

        it('allows the length to be decreased', () => {
            container.setLength(expectedLength - 1);
            expect(container.length).toBe(expectedLength - 1);
        });

        it('recalculates last row when decreasing length', () => {
            container.setLength(expectedLength - 1);
            expect(container.getLast()).not.toEqual(rounds(stage));
            expect(container.getLast())
                .toEqual(container.getBlock(expectedLength - 1).getLast());
        });

        it('returns this when setting the length', () => {
            expect(container.setLength(expectedLength + 1)).toBe(container);
        });

        it('throws an exception when setting invalid lengths', () => {
            expect(() => container.setLength(-1)).toThrow();
        });

        it('provides access to the number of rows', () => {
            for (const testCase of lengthTestCases) {
                container = factory(rounds(testCase[0]));
                container.resetLength();
                expect(container.rows).toBe(testCase[1]);
            }
        });

        it('updates the number of rows on length change', () => {
            const originalRows = container.rows;
            container.setLength(expectedLength + 1);
            expect(container.rows).toBeGreaterThan(originalRows);
            container.setLength(expectedLength - 1);
            expect(container.rows).toBeLessThan(originalRows);
        });

        it('notifies the parent container for length increase', () => {
            const parent: AbstractContainer<TestContainer> =
                jasmine.createSpyObj('AbstractContainer', ['notify']);
            // set this after creation to avoid spurious notifications
            container.ownership = { container: parent, index: 999 };

            container.setLength(expectedLength + 1);

            expect(parent.notify).toHaveBeenCalled();
            expect(parent.notify).toHaveBeenCalledWith(999);
            expect(parent.notify).toHaveBeenCalledTimes(1);
        });

        it('notifies the parent container for length decrease', () => {
            const parent: AbstractContainer<TestContainer> =
                jasmine.createSpyObj('AbstractContainer', ['notify']);
            // set this after creation to avoid spurious notifications
            container.ownership = { container: parent, index: 999 };

            container.setLength(expectedLength - 1);

            expect(parent.notify).toHaveBeenCalled();
            expect(parent.notify).toHaveBeenCalledWith(999);
            expect(parent.notify).toHaveBeenCalledTimes(1);
        });

        it('returns this when resetting the length', () => {
            expect(container.resetLength()).toBe(container);
        });

        it('notifies the parent container when resetting the length', () => {
            const parent: AbstractContainer<TestContainer> =
                jasmine.createSpyObj('AbstractContainer', ['notify']);
            // set this after creation to avoid spurious notifications
            container.ownership = { container: parent, index: 999 };

            container.resetLength();

            expect(parent.notify).toHaveBeenCalled();
            expect(parent.notify).toHaveBeenCalledWith(999);
            expect(parent.notify).toHaveBeenCalledTimes(1);
        });

    });

};
