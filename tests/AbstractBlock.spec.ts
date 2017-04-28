/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="functions.ts" />
/// <reference path="PrintableMixin.spec.ts" />

/**
 * Tests that a block behaves as an AbstractBlock
 * @param {AbstractBlock}  Block               - block under test
 * @param {}               triggerNotification - make block notify parent
 */
function testAbstractBlockImplementation(
    // tslint:disable-next-line:variable-name
    Block,
    triggerNotification: (block: Pricker.AbstractBlock) => void,
) {

    describe('is derived from AbstractBlock and', function () {

        it('stores the initial row', function () {
            const initialRow = createTestRow(),
                block = new Block(initialRow);
            expect(block.getInitialRow()).toEqual(initialRow);
        });

        it('allows the initial row to be changed', function () {
            const block = new Block(createTestRow()),
                newRow = createTestRow('2143658709E');

            block.setInitialRow(newRow);
            expect(block.getInitialRow()).toEqual(newRow);
        });

        it('returns this when changing the initial row', function () {
            const block = new Block(createTestRow());
            expect(block.setInitialRow(createTestRow())).toBe(block);
        });

        it('ignores changes to the original initial row', function () {
            const initialRow = createTestRow(),
                initialRowBackup = initialRow.slice(),
                block = new Block(initialRow);

            initialRow[3] = 999;  // Mutate the initial row
            expect(initialRow).not.toEqual(initialRowBackup);

            expect(block.getInitialRow()).not.toEqual(initialRow);
            expect(block.getInitialRow()).toEqual(initialRowBackup);
        });

        it('ignores changes to the getInitialRow result', function () {
            const block = new Block(createTestRow()),
                getInitialRow = block.getInitialRow(),
                getInitialRowBackup = block.getInitialRow().slice();

            getInitialRow[3] = 999;  // Mutate the getInitialRow result
            expect(getInitialRow).not.toEqual(getInitialRowBackup);

            expect(block.getInitialRow()).not.toEqual(getInitialRow);
            expect(block.getInitialRow()).toEqual(getInitialRowBackup);
        });

        it('ignores changes to the setInitialRow argument', function () {
            const block = new Block(createTestRow()),
                setInitialRow = createTestRow('2143658709E'),
                setInitialRowBackup = setInitialRow.slice();

            block.setInitialRow(setInitialRow);
            setInitialRow[3] = 999;  // Mutate the setInitialRow argument
            expect(setInitialRow).not.toEqual(setInitialRowBackup);

            expect(block.getInitialRow()).not.toEqual(setInitialRow);
            expect(block.getInitialRow()).toEqual(setInitialRowBackup);
        });

        it('updates when the initial row changes', function () {
            const block = new Block(createTestRow()),
                endRow: Pricker.Row = block.getEnd();

            block.setInitialRow(createTestRow('2143658709E'));
            expect(block.getEnd()).not.toEqual(endRow);
        });

        it('ends with a row on the same stage as it starts', function () {
            const block = new Block(createTestRow());
            expect(block.getEnd().length).toEqual(11);
        });

        it('ignores changes to the getEnd result', function () {
            const block = new Block(createTestRow()),
                getEnd: Pricker.Row = block.getEnd(),
                getEndBackup: Pricker.Row = getEnd.slice();

            getEnd[3] = 999;  // Mutate the getEnd result
            expect(getEnd).not.toEqual(getEndBackup);

            expect(block.getEnd()).not.toEqual(getEnd);
            expect(block.getEnd()).toEqual(getEndBackup);
        });

        it('notifies the parent container', function () {
            const container: Pricker.AbstractContainer<typeof Block> =
                    jasmine.createSpyObj('AbstractContainer', ['notify']),
                block = new Block(
                    createTestRow(),
                    container,
                    999,
                );

            triggerNotification(block);
            expect(container.notify).toHaveBeenCalledWith(999);
        });

        it('allows access to parent information', function () {
            const container: Pricker.AbstractContainer<typeof Block> =
                    jasmine.createSpyObj('AbstractContainer', ['notify']),
                block = new Block(
                    createTestRow(),
                    container,
                    999,
                );

            expect(block.getOwnership()[0]).toBe(container);
            expect(block.getOwnership()[1]).toBe(999);
        });

        it('can be attached to a new parent', function () {
            const containerOld: Pricker.AbstractContainer<typeof Block> =
                    jasmine.createSpyObj('AbstractContainer', ['notify']),
                containerNew: Pricker.AbstractContainer<typeof Block> =
                    jasmine.createSpyObj('AbstractContainer', ['notify']),
                block = new Block(
                    createTestRow(),
                    containerOld,
                    999,
                );

            block.setOwnership(containerNew, 998);
            expect(block.getOwnership()[0]).toBe(containerNew);
            expect(block.getOwnership()[1]).toBe(998);
        });

        it('can be detached from a parent', function () {
            const container: Pricker.AbstractContainer<typeof Block> =
                    jasmine.createSpyObj('AbstractContainer', ['notify']),
                block = new Block(
                    createTestRow(),
                    container,
                    999,
                );

            block.clearOwnership();
            expect(block.getOwnership()[0]).toBeUndefined();
            expect(block.getOwnership()[1]).toBeUndefined();
        });

        it('calls a visitor in order to traverse rows', function () {
            const block = new Block(createTestRow('123')),
                visitor = new Pricker.Visitor.Counter();

            spyOn(visitor, 'visit').and.callThrough();
            block.accept(visitor);

            expect(visitor.visit).toHaveBeenCalledTimes(visitor.getCount());
        });

        it('returns this when receiving a visitor', function () {
            const block = new Block(createTestRow()),
                visitor = new Pricker.Visitor.Counter();

            expect(block.accept(visitor)).toBe(block);
        });

        testPrintableMixinImplementation(() => new Block(createTestRow()));

    });

}
