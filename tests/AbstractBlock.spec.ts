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

        const testRow = createTestRow();

        let block: typeof Block;

        beforeEach(() => {
            block = new Block(testRow);
        });

        it('stores the initial row', () => {
            expect(block.getInitialRow()).toEqual(testRow);
        });

        it('allows the initial row to be changed', () => {
            const newRow = createTestRow('2143658709E');
            block.setInitialRow(newRow);
            expect(block.getInitialRow()).toEqual(newRow);
        });

        it('returns this when changing the initial row', () => {
            expect(block.setInitialRow(testRow)).toBe(block);
        });

        it('ignores changes to the original initial row', () => {
            const initialRow = createTestRow();
            block = new Block(initialRow);

            initialRow[3] = 999;  // Mutate the initial row
            expect(initialRow).not.toEqual(testRow);

            expect(block.getInitialRow()).not.toEqual(initialRow);
            expect(block.getInitialRow()).toEqual(testRow);
        });

        it('ignores changes to the getInitialRow result', () => {
            const getInitialRow = block.getInitialRow();
            const getInitialRowBackup = block.getInitialRow().slice();

            getInitialRow[3] = 999;  // Mutate the getInitialRow result
            expect(getInitialRow).not.toEqual(getInitialRowBackup);

            expect(block.getInitialRow()).not.toEqual(getInitialRow);
            expect(block.getInitialRow()).toEqual(getInitialRowBackup);
        });

        it('ignores changes to the setInitialRow argument', () => {
            const setInitialRow = createTestRow('2143658709E');
            const setInitialRowBackup = setInitialRow.slice();

            block.setInitialRow(setInitialRow);
            setInitialRow[3] = 999;  // Mutate the setInitialRow argument
            expect(setInitialRow).not.toEqual(setInitialRowBackup);

            expect(block.getInitialRow()).not.toEqual(setInitialRow);
            expect(block.getInitialRow()).toEqual(setInitialRowBackup);
        });

        it('updates when the initial row changes', () => {
            const lastRow = block.getLast();
            block.setInitialRow(createTestRow('2143658709E'));
            expect(block.getLast()).not.toEqual(lastRow);
        });

        it('has a last row on the same stage as it starts', () => {
            expect(block.getLast().length).toEqual(11);
        });

        it('ignores changes to the getLast result', () => {
            const getLast = block.getLast();
            const getLastBackup = getLast.slice();

            getLast[3] = 999;  // Mutate the getLast result
            expect(getLast).not.toEqual(getLastBackup);

            expect(block.getLast()).not.toEqual(getLast);
            expect(block.getLast()).toEqual(getLastBackup);
        });

        it('notifies the parent container', () => {
            const container: Pricker.AbstractContainer<typeof Block> =
                jasmine.createSpyObj('AbstractContainer', ['notify']);
            block.setOwnership({ 'container': container, 'index': 999 });
            triggerNotification(block);
            expect(container.notify).toHaveBeenCalledWith(999);
        });

        it('does not notify when the initial row changes', () => {
            const container: Pricker.AbstractContainer<typeof Block> =
                jasmine.createSpyObj('AbstractContainer', ['notify']);
            block.setOwnership({ 'container': container, 'index': 999 });
            block.setInitialRow(testRow);
            expect(container.notify).not.toHaveBeenCalled();
        });

        it('allows access to parent information', () => {
            const container: Pricker.AbstractContainer<typeof Block> =
                jasmine.createSpyObj('AbstractContainer', ['notify']);
            block.setOwnership({ 'container': container, 'index': 999 });
            expect(block.getContainer()).toBe(container);
            expect(block.getIndex()).toBe(999);
        });

        it('can be attached to a new parent', () => {
            const containerOld: Pricker.AbstractContainer<typeof Block> =
                jasmine.createSpyObj('AbstractContainer', ['notify']);
            const containerNew: Pricker.AbstractContainer<typeof Block> =
                jasmine.createSpyObj('AbstractContainer', ['notify']);
            block = new Block(
                testRow,
                {'container': containerOld, 'index': 999},
            );

            block.setOwnership({'container': containerNew, 'index': 998});
            expect(block.getContainer()).toBe(containerNew);
            expect(block.getIndex()).toBe(998);
        });

        it('can be detached from a parent', () => {
            const container: Pricker.AbstractContainer<typeof Block> =
                jasmine.createSpyObj('AbstractContainer', ['notify']);
            block.setOwnership({ 'container': container, 'index': 999 });
            block.clearOwnership();
            expect(block.getContainer()).toBeUndefined();
            expect(block.getIndex()).toBeUndefined();
        });

        it('calls a visitor in order to traverse rows', () => {
            const visitor = new Pricker.Visitor.Counter();
            spyOn(visitor, 'visit');
            block.accept(visitor);
            expect(visitor.visit).toHaveBeenCalled();
        });

        it('returns this when receiving a visitor', () => {
            const visitor = new Pricker.Visitor.Counter();
            expect(block.accept(visitor)).toBe(block);
        });

        it('can call multiple visitors', () => {
            const visitor1 = new Pricker.Visitor.Counter();
            const visitor2 = new Pricker.Visitor.Counter();
            block.accept(visitor1, visitor2);
            expect(visitor1.getCount()).toBeGreaterThan(0);
            expect(visitor2.getCount()).toBeGreaterThan(0);
            expect(visitor1.getCount()).toEqual(visitor2.getCount());
        });

        it('estimates the number of rows correctly', () => {
            expect(block.estimateRows()).toBe(expectedRows);
        });

        testPrintableMixinImplementation(() => new Block(testRow));

    });

}
