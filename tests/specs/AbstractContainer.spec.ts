/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="AbstractBlock.spec.ts" />

/**
 * Tests that a container behaves as an AbstractContainer
 * @param {AbstractContainer}  Container           - container under test
 * @param {string}             getBlockFnName      - name of fn to get blocks
 * @param {}                   lengthTestCases     - expected stage lengths
 * @param {}                   lengthBounds        - limits on container length
 */
function testAbstractContainerImplementation(
    // tslint:disable-next-line:variable-name
    Container,
    getBlockFnName: string,
    lengthTestCases: Array<[Pricker.Stage, number]>,
    lengthBounds: [number, number],
) {

    function createTestRow(input: string = '231'): Pricker.Row {
        return Pricker.rowFromString(input, Pricker.Stage.Cinques);
    }

    function runLengthTestCases(testFunction) {
        return function () {
            let i: number;

            for (i = 0; i < lengthTestCases.length; i += 1) {
                testFunction(
                    Pricker.rowFromString('231', lengthTestCases[i][0]),
                    lengthTestCases[i][1],
                );
            }
        };
    }

    describe('is derived from AbstractContainer and', function () {

        it('starts out with the end row equal to the initial row', function () {
            const row: Pricker.Row = createTestRow(),
                container: typeof Container = new Container(row);

            expect(container.getEnd()).toEqual(row);
        });

        it('keeps the end row in sync with the initial row', function () {
            const row: Pricker.Row = createTestRow(),
                newRow: Pricker.Row = createTestRow('123'),
                container: typeof Container = new Container(row);

            container.setInitialRow(newRow);
            expect(container.getEnd()).not.toEqual(row);
            expect(container.getEnd()).toEqual(newRow);
        });

        it('starts out the correct length', runLengthTestCases(
            function (initialRow: Pricker.Row, length: number) {
                const container: typeof Container = new Container(initialRow);
                expect(container.getLength()).toBe(length);
            },
        ));

        it('grants access to contained blocks', runLengthTestCases(
            function (initialRow: Pricker.Row, length: number) {
                const container: typeof Container = new Container(initialRow);

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
            function (initialRow: Pricker.Row, length: number) {
                const container: typeof Container = new Container(initialRow);

                expect(function () { container[getBlockFnName](0); })
                    .toThrowError('Block index out of range');
                expect(function () { container[getBlockFnName](length + 1); })
                    .toThrowError('Block index out of range');
            },
        ));

        it('allows the length to be increased', runLengthTestCases(
            function (initialRow: Pricker.Row, length: number) {
                const container: typeof Container = new Container(initialRow);

                container.setLength(length + 1);
                expect(container.getLength()).toBe(length + 1);
            },
        ));

        it('recalculates end row when increasing length', runLengthTestCases(
            function (initialRow: Pricker.Row, length: number) {
                const container: typeof Container = new Container(initialRow),
                    newLength = length ? length * 2 : 1;

                container.setLength(newLength);
                expect(container.getEnd()).toEqual(initialRow);
            },
        ));

        it('allows the length to be decreased', runLengthTestCases(
            function (initialRow: Pricker.Row, length: number) {
                const container: typeof Container = new Container(initialRow);

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
            function (initialRow: Pricker.Row, length: number) {
                const container: typeof Container = new Container(initialRow);
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
            function (initialRow: Pricker.Row, length: number) {
                const container: typeof Container = new Container(initialRow);
                expect(container.setLength(length + 1)).toBe(container);
            },
        ));

        it('throws an exception when setting invalid lengths', function () {
            const container: typeof Container = new Container(createTestRow()),
                [minimum, maximum]: [number, number] = lengthBounds;

            expect(function () { container.setLength(minimum - 1); })
                .toThrowError('Length out of range');
            expect(function () { container.setLength(maximum + 1); })
                .toThrowError('Length out of range');
        });

        it('provides a way to set lengths without exceptions', function () {
            const container: typeof Container = new Container(createTestRow()),
                [minimum, maximum]: [number, number] = lengthBounds;

            container.safeSetLength(minimum - 1);
            expect(container.getLength()).toBe(minimum);
            container.safeSetLength(maximum + 1);
            expect(container.getLength()).toBe(maximum);
        });

        it('recalculates blocks when notified of changes', function () {
            const container: typeof Container = new Container(createTestRow());

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

        it('notifies the parent container when the length decreases', function () {
            const parent: Pricker.AbstractContainer<typeof Container> =
                    jasmine.createSpyObj('AbstractContainer', ['notify']),
                container: typeof Container =
                    new Container(createTestRow(), parent, 999);

            container.setLength(10);
            container.setLength(9);
            expect(parent.notify).toHaveBeenCalledWith(999);
            expect(parent.notify).toHaveBeenCalledTimes(2);
        });

        it('notifies the parent container when the length increases', function () {
            const parent: Pricker.AbstractContainer<typeof Container> =
                    jasmine.createSpyObj('AbstractContainer', ['notify']),
                container: typeof Container =
                    new Container(createTestRow(), parent, 999);

            container.setLength(10);
            container.setLength(11);
            expect(parent.notify).toHaveBeenCalledWith(999);
            expect(parent.notify).toHaveBeenCalledTimes(2);
        });

        it('notifies the parent container on notify', function () {
            const parent: Pricker.AbstractContainer<typeof Container> =
                    jasmine.createSpyObj('AbstractContainer', ['notify']),
                container: typeof Container =
                    new Container(createTestRow(), parent, 999);

            container.setLength(5);
            container.notify(5);
            expect(parent.notify).toHaveBeenCalledWith(999);
            expect(parent.notify).toHaveBeenCalledTimes(2);
        });

        it('passes contained blocks to templates', function () {
            const container: typeof Container = new Container(createTestRow()),
                testTemplateSpy = jasmine.createSpy('test');
            let data: any;

            container.setLength(10);

            Pricker.Templates[container.templatePath + '.test'] =
                testTemplateSpy;
            container.print('test');

            data = testTemplateSpy.calls.argsFor(0)[0];
            expect(data.blocks).toBeDefined();
            expect(data.blocks.length).toBe(10);
            expect(data.blocks[0]).toEqual(container[getBlockFnName](1));

            delete Pricker.Templates[container.templatePath + '.test'];
        });

        testAbstractBlockImplementation(
            Container,
            function (container: typeof Container): void {
                container.setLength(10);
            },
        );

    });

}
