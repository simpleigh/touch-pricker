/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

/// <reference path="functions.ts" />
/// <reference path="PrintableMixin.spec.ts" />

/**
 * Tests that a block behaves as an AbstractBlock
 * @param Block                block under test
 * @param triggerNotification  make block notify parent
 * @param expectedRows         number of rows expected in this block
 */
function testAbstractBlockImplementation(
    // tslint:disable-next-line:variable-name
    Block,
    triggerNotification: (block: Pricker.AbstractBlock) => void,
    expectedRows: number,
) {

    describe('is derived from AbstractBlock and', () => {

        it('stores the initial row', () => {
            const initialRow = createTestRow(),
                block = new Block(initialRow);
            expect(block.getInitialRow()).toEqual(initialRow);
        });

        it('allows the initial row to be changed', () => {
            const block = new Block(createTestRow()),
                newRow = createTestRow('2143658709E');

            block.setInitialRow(newRow);
            expect(block.getInitialRow()).toEqual(newRow);
        });

        it('returns this when changing the initial row', () => {
            const block = new Block(createTestRow());
            expect(block.setInitialRow(createTestRow())).toBe(block);
        });

        it('ignores changes to the original initial row', () => {
            const initialRow = createTestRow(),
                initialRowBackup = initialRow.slice(),
                block = new Block(initialRow);

            initialRow[3] = 999;  // Mutate the initial row
            expect(initialRow).not.toEqual(initialRowBackup);

            expect(block.getInitialRow()).not.toEqual(initialRow);
            expect(block.getInitialRow()).toEqual(initialRowBackup);
        });

        it('ignores changes to the getInitialRow result', () => {
            const block = new Block(createTestRow()),
                getInitialRow = block.getInitialRow(),
                getInitialRowBackup = block.getInitialRow().slice();

            getInitialRow[3] = 999;  // Mutate the getInitialRow result
            expect(getInitialRow).not.toEqual(getInitialRowBackup);

            expect(block.getInitialRow()).not.toEqual(getInitialRow);
            expect(block.getInitialRow()).toEqual(getInitialRowBackup);
        });

        it('ignores changes to the setInitialRow argument', () => {
            const block = new Block(createTestRow()),
                setInitialRow = createTestRow('2143658709E'),
                setInitialRowBackup = setInitialRow.slice();

            block.setInitialRow(setInitialRow);
            setInitialRow[3] = 999;  // Mutate the setInitialRow argument
            expect(setInitialRow).not.toEqual(setInitialRowBackup);

            expect(block.getInitialRow()).not.toEqual(setInitialRow);
            expect(block.getInitialRow()).toEqual(setInitialRowBackup);
        });

        it('updates when the initial row changes', () => {
            const block = new Block(createTestRow()),
                endRow: Pricker.Row = block.getEnd();

            block.setInitialRow(createTestRow('2143658709E'));
            expect(block.getEnd()).not.toEqual(endRow);
        });

        it('ends with a row on the same stage as it starts', () => {
            const block = new Block(createTestRow());
            expect(block.getEnd().length).toEqual(11);
        });

        it('ignores changes to the getEnd result', () => {
            const block = new Block(createTestRow()),
                getEnd: Pricker.Row = block.getEnd(),
                getEndBackup: Pricker.Row = getEnd.slice();

            getEnd[3] = 999;  // Mutate the getEnd result
            expect(getEnd).not.toEqual(getEndBackup);

            expect(block.getEnd()).not.toEqual(getEnd);
            expect(block.getEnd()).toEqual(getEndBackup);
        });

        it('notifies the parent container', () => {
            const container: Pricker.AbstractContainer<typeof Block> =
                    jasmine.createSpyObj('AbstractContainer', ['notify']),
                block = new Block(
                    createTestRow(),
                    {'container': container, 'index': 999},
                );

            triggerNotification(block);
            expect(container.notify).toHaveBeenCalledWith(999);
        });

        it('does not notify when the initial row changes', () => {
            const container: Pricker.AbstractContainer<typeof Block> =
                    jasmine.createSpyObj('AbstractContainer', ['notify']),
                block = new Block(
                    createTestRow(),
                    {'container': container, 'index': 999},
                );

            block.setInitialRow(createTestRow());
            expect(container.notify).not.toHaveBeenCalled();
        });

        it('allows access to parent information', () => {
            const container: Pricker.AbstractContainer<typeof Block> =
                    jasmine.createSpyObj('AbstractContainer', ['notify']),
                block = new Block(
                    createTestRow(),
                    {'container': container, 'index': 999},
                );

            expect(block.getContainer()).toBe(container);
            expect(block.getIndex()).toBe(999);
        });

        it('can be attached to a new parent', () => {
            const containerOld: Pricker.AbstractContainer<typeof Block> =
                    jasmine.createSpyObj('AbstractContainer', ['notify']),
                containerNew: Pricker.AbstractContainer<typeof Block> =
                    jasmine.createSpyObj('AbstractContainer', ['notify']),
                block = new Block(
                    createTestRow(),
                    {'container': containerOld, 'index': 999},
                );

            block.setOwnership({'container': containerNew, 'index': 998});
            expect(block.getContainer()).toBe(containerNew);
            expect(block.getIndex()).toBe(998);
        });

        it('can be detached from a parent', () => {
            const container: Pricker.AbstractContainer<typeof Block> =
                    jasmine.createSpyObj('AbstractContainer', ['notify']),
                block = new Block(
                    createTestRow(),
                    {'container': container, 'index': 999},
                );

            block.clearOwnership();
            expect(block.getContainer()).toBeUndefined();
            expect(block.getIndex()).toBeUndefined();
        });

        it('calls a visitor in order to traverse rows', () => {
            const block = new Block(createTestRow('123')),
                visitor = new Pricker.Visitor.Counter();

            spyOn(visitor, 'visit').and.callThrough();
            block.accept(visitor);

            expect(visitor.visit).toHaveBeenCalledTimes(visitor.getCount());
        });

        it('returns this when receiving a visitor', () => {
            const block = new Block(createTestRow()),
                visitor = new Pricker.Visitor.Counter();

            expect(block.accept(visitor)).toBe(block);
        });

        it('can call multiple visitors', () => {
            const block = new Block(createTestRow()),
                visitor1 = new Pricker.Visitor.Counter(),
                visitor2 = new Pricker.Visitor.Counter();

            block.accept(visitor1, visitor2);
            expect(visitor1.getCount()).toBeGreaterThan(0);
            expect(visitor2.getCount()).toBeGreaterThan(0);
            expect(visitor1.getCount()).toEqual(visitor2.getCount());
        });

        it('estimates the number of rows correctly', () => {
            const block = new Block(createTestRow());
            expect(block.estimateRows()).toBe(expectedRows);
        });

        testPrintableMixinImplementation(() => new Block(createTestRow()));

    });

}
