/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="functions.ts" />
/// <reference path="AbstractBlock.spec.ts" />

/**
 * Tests that a container behaves as an AbstractContainer
 * @param Container        container under test
 * @param getBlocksFnName  name of fn to get all blocks from the container
 * @param getBlockFnName   name of fn to get a block from the container
 * @param lengthTestCases  expected lengths for each stage
 * @param lengthBounds     limits on container length
 * @param expectedRows     default rows of the container
 */
function testAbstractContainerImplementation(
    // tslint:disable-next-line:variable-name
    Container,
    getBlocksFnName: string,
    getBlockFnName: string,
    lengthTestCases: Array<[Pricker.Stage, number]>,
    lengthBounds: [number, number],
    expectedRows: number,
) {

    function runLengthTestCases(testFunction) {
        return () => {
            for (const testCase of lengthTestCases) {
                if (!testCase) { continue; }  // IE8 trailing comma
                testFunction(createTestRow('231', testCase[0]), testCase[1]);
            }
        };
    }

    describe('is derived from AbstractContainer and', () => {

        it('starts out with the end row equal to the initial row', () => {
            const row = createTestRow(),
                container = new Container(row);

            expect(container.getEnd()).toEqual(row);
        });

        it('keeps the end row in sync with the initial row', () => {
            const row = createTestRow(),
                newRow = createTestRow('123'),
                container = new Container(row);

            container.setInitialRow(newRow);
            expect(container.getEnd()).not.toEqual(row);
            expect(container.getEnd()).toEqual(newRow);
        });

        it('starts out the correct length', runLengthTestCases(
            (initialRow: Pricker.Row, length: number) => {
                const container = new Container(initialRow);
                expect(container.getLength()).toBe(length);
            },
        ));

        it('grants access to all the blocks', runLengthTestCases(
            (initialRow: Pricker.Row, length: number) => {
                const container = new Container(initialRow);

                // Handle case with zero blocks
                if (container.getLength() === 0) {
                    container.setLength(1);
                    length = 1;
                }

                expect(container[getBlocksFnName]().length)
                    .toBe(container.getLength());

                // First block
                expect(container[getBlocksFnName]()[0])
                    .toBe(container[getBlockFnName](1));
                // Last block
                expect(container[getBlocksFnName]()[length - 1])
                    .toBe(container[getBlockFnName](length));
            },
        ));

        it('ignores changes to the returned blocks array', runLengthTestCases(
            (initialRow: Pricker.Row, length: number) => {
                const container = new Container(initialRow);
                let blocks: any[];

                // Handle case with zero blocks
                if (container.getLength() === 0) {
                    container.setLength(1);
                    length = 1;
                }

                blocks = container[getBlocksFnName]();
                blocks.pop();
                expect(container.getLength()).toBe(length);
            },
        ));

        it('grants access to a contained block', runLengthTestCases(
            (initialRow: Pricker.Row, length: number) => {
                const container = new Container(initialRow);

                // Handle case with zero blocks
                if (container.getLength() === 0) {
                    container.setLength(1);
                    length = 1;
                }

                // First block, initial row
                expect(container[getBlockFnName](1).getInitialRow())
                    .toEqual(initialRow);

                // Last block, final row
                expect(container[getBlockFnName](length).getEnd())
                    .toEqual(container.getEnd());
            },
        ));

        it('throws an exception for out-of-bounds blocks', runLengthTestCases(
            (initialRow: Pricker.Row, length: number) => {
                const container = new Container(initialRow);

                expect(() => { container[getBlockFnName](0); })
                    .toThrowError('Block index out of range');
                expect(() => { container[getBlockFnName](length + 1); })
                    .toThrowError('Block index out of range');
            },
        ));

        it('allows the length to be increased', runLengthTestCases(
            (initialRow: Pricker.Row, length: number) => {
                const container = new Container(initialRow);
                container.setLength(length + 1);
                expect(container.getLength()).toBe(length + 1);
            },
        ));

        it('recalculates end row when increasing length', runLengthTestCases(
            (initialRow: Pricker.Row, length: number) => {
                const container = new Container(initialRow),
                    newLength = length ? length * 2 : 1;

                container.setLength(newLength);
                expect(container.getEnd()).toEqual(initialRow);
            },
        ));

        it('allows the length to be decreased', runLengthTestCases(
            (initialRow: Pricker.Row, length: number) => {
                const container = new Container(initialRow);

                // Handle case with zero blocks
                if (container.getLength() === 0) {
                    container.setLength(2);
                    length = 2;
                }

                container.setLength(length - 1);
                expect(container.getLength()).toBe(length - 1);
            },
        ));

        it('recalculates end row when decreasing length', runLengthTestCases(
            (initialRow: Pricker.Row, length: number) => {
                const container = new Container(initialRow);
                let newLength: number = Math.floor(length / 2);

                // Handle case with zero blocks
                if (container.getLength() === 0) {
                    container.setLength(2);
                    newLength = 1;
                }

                container.setLength(newLength);
                expect(container.getEnd())
                    .toEqual(container[getBlockFnName](newLength).getEnd());
            },
        ));

        it('returns this when setting the length', runLengthTestCases(
            (initialRow: Pricker.Row, length: number) => {
                const container = new Container(initialRow);
                expect(container.setLength(length + 1)).toBe(container);
            },
        ));

        it('throws an exception when setting invalid lengths', () => {
            const container = new Container(createTestRow()),
                [minimum, maximum]: [number, number] = lengthBounds;

            expect(() => { container.setLength(minimum - 1); })
                .toThrowError('Length out of range');
            expect(() => { container.setLength(maximum + 1); })
                .toThrowError('Length out of range');
        });

        it('provides a way to set lengths without exceptions', () => {
            const container = new Container(createTestRow()),
                [minimum, maximum]: [number, number] = lengthBounds;

            container.safeSetLength(minimum - 1);
            expect(container.getLength()).toBe(minimum);
            container.safeSetLength(maximum + 1);
            expect(container.getLength()).toBe(maximum);
        });

        it('recalculates blocks when notified of changes', () => {
            const container = new Container(createTestRow());

            function getBlock(index: number): Pricker.AbstractBlock {
                return container[getBlockFnName](index);
            }

            container.setLength(5);
            spyOn(getBlock(1), 'setInitialRow');
            spyOn(getBlock(2), 'setInitialRow');
            spyOn(getBlock(3), 'setInitialRow');
            spyOn(getBlock(4), 'setInitialRow');
            spyOn(getBlock(5), 'setInitialRow');

            container.notify(3);

            // Blocks before the notification are ignored
            expect(getBlock(1).setInitialRow).not.toHaveBeenCalled();
            expect(getBlock(2).setInitialRow).not.toHaveBeenCalled();

            // Notifying block also ignored (it knows anyway)
            expect(getBlock(3).setInitialRow).not.toHaveBeenCalled();

            // Blocks after the notification are updated
            expect(getBlock(4).setInitialRow).toHaveBeenCalled();
            expect(getBlock(5).setInitialRow).toHaveBeenCalled();
        });

        it('notifies the parent container for length decrease', () => {
            const parent: Pricker.AbstractContainer<typeof Container> =
                    jasmine.createSpyObj('AbstractContainer', ['notify']),
                container = new Container(
                    createTestRow(),
                    {'container': parent, 'index': 999},
                );

            container.setLength(10);
            container.setLength(9);
            expect(parent.notify).toHaveBeenCalledWith(999);
            expect(parent.notify).toHaveBeenCalledTimes(2);
        });

        it('notifies the parent container for length increase', () => {
            const parent: Pricker.AbstractContainer<typeof Container> =
                    jasmine.createSpyObj('AbstractContainer', ['notify']),
                container = new Container(
                    createTestRow(),
                    {'container': parent, 'index': 999},
                );

            container.setLength(10);
            container.setLength(11);
            expect(parent.notify).toHaveBeenCalledWith(999);
            expect(parent.notify).toHaveBeenCalledTimes(2);
        });

        it('notifies the parent container on notify', () => {
            const parent: Pricker.AbstractContainer<typeof Container> =
                    jasmine.createSpyObj('AbstractContainer', ['notify']),
                container = new Container(
                    createTestRow(),
                    {'container': parent, 'index': 999},
                );

            container.setLength(5);
            container.notify(5);
            expect(parent.notify).toHaveBeenCalledWith(999);
            expect(parent.notify).toHaveBeenCalledTimes(2);
        });

        it('updates the estimate of rows when the length changes', () => {
            const container = new Container(createTestRow()),
                length = container.getLength(),
                rows = container.estimateRows();

            container.setLength(length + 1);
            expect(container.estimateRows()).toBe(
                rows + container[getBlockFnName](length + 1).estimateRows(),
            );
        });

        testAbstractBlockImplementation(
            Container,
            (container: typeof Container) => { container.setLength(10); },
            expectedRows,
        );

    });

}
