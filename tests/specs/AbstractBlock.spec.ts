/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

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

    function createTestRow(input: string = ''): Pricker.Row {
        return Pricker.rowFromString(input, Pricker.Stage.Cinques);
    }

    describe('is derived from AbstractBlock and', function () {

        it('stores the initial row', function () {
            const initialRow: Pricker.Row = createTestRow(),
                block: typeof Block = new Block(initialRow);
            expect(block.getInitialRow()).toEqual(initialRow);
        });

        it('allows the initial row to be changed', function () {
            const initialRow: Pricker.Row = createTestRow(),
                block: typeof Block = new Block(initialRow),
                newRow: Pricker.Row = createTestRow('2143658709E');

            block.setInitialRow(newRow);
            expect(block.getInitialRow()).toEqual(newRow);
        });

        it('returns this when changing the initial row', function () {
            const block: typeof Block = new Block(createTestRow());
            expect(block.setInitialRow(createTestRow())).toBe(block);
        });

        it('ignores changes to the original initial row', function () {
            const initialRow: Pricker.Row = createTestRow(),
                initialRowBackup: Pricker.Row = initialRow.slice(),
                block: typeof Block = new Block(initialRow);

            initialRow[3] = 999;  // Mutate the initial row
            expect(initialRow).not.toEqual(initialRowBackup);

            expect(block.getInitialRow()).not.toEqual(initialRow);
            expect(block.getInitialRow()).toEqual(initialRowBackup);
        });

        it('ignores changes to the getInitialRow result', function () {
            const block: typeof Block = new Block(createTestRow()),
                getInitialRow: Pricker.Row = block.getInitialRow(),
                getInitialRowBackup: Pricker.Row =
                    block.getInitialRow().slice();

            getInitialRow[3] = 999;  // Mutate the getInitialRow result
            expect(getInitialRow).not.toEqual(getInitialRowBackup);

            expect(block.getInitialRow()).not.toEqual(getInitialRow);
            expect(block.getInitialRow()).toEqual(getInitialRowBackup);
        });

        it('ignores changes to the setInitialRow argument', function () {
            const block: typeof Block = new Block(createTestRow()),
                setInitialRow = createTestRow('2143658709E'),
                setInitialRowBackup = setInitialRow.slice();

            block.setInitialRow(setInitialRow);
            setInitialRow[3] = 999;  // Mutate the setInitialRow argument
            expect(setInitialRow).not.toEqual(setInitialRowBackup);

            expect(block.getInitialRow()).not.toEqual(setInitialRow);
            expect(block.getInitialRow()).toEqual(setInitialRowBackup);
        });

        it('updates when the initial row changes', function () {
            const block: typeof Block = new Block(createTestRow()),
                endRow: Pricker.Row = block.getEnd();

            block.setInitialRow(createTestRow('2143658709E'));
            expect(block.getEnd()).not.toEqual(endRow);
        });

        it('ends with a row on the same stage as it starts', function () {
            const row: Pricker.Row = createTestRow(),
                block: typeof Block = new Block(row);

            expect(block.getEnd().length).toEqual(row.length);
        });

        it('ignores changes to the getEnd result', function () {
            const block: typeof Block = new Block(createTestRow()),
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
                block: typeof Block = new Block(
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
                block: typeof Block = new Block(
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
                block: typeof Block = new Block(
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
                block: typeof Block = new Block(
                    createTestRow(),
                    container,
                    999,
                );

            block.clearOwnership();
            expect(block.getOwnership()[0]).toBeUndefined();
            expect(block.getOwnership()[1]).toBeUndefined();
        });

        it('allows flags to be set and retrieved', function () {
            const block: typeof Block = new Block(createTestRow());

            block.setFlag('test', true);
            expect(block.getFlag('test')).toBe(true);

            block.setFlag('test', false);
            expect(block.getFlag('test')).toBe(false);
        });

        it('returns undefined for unknown flags', function () {
            const block: typeof Block = new Block(createTestRow());
            expect(block.getFlag('test')).toBeUndefined();
        });

        it('returns this when setting flags', function () {
            const block: typeof Block = new Block(createTestRow());
            expect(block.setFlag('test', true)).toBe(block);
        });

        it('bubbles flags to the parent container', function () {
            const container: Pricker.AbstractContainer<typeof Block> =
                    jasmine.createSpyObj('AbstractContainer', ['setFlag']),
                block: typeof Block = new Block(
                    createTestRow(),
                    container,
                    999,
                );

            block.setFlag('test', true);
            expect(container.setFlag).toHaveBeenCalledWith('test', true, true);
        });

        it('allows bubbling to be disabled', function () {
            const container: Pricker.AbstractContainer<typeof Block> =
                    jasmine.createSpyObj('AbstractContainer', ['setFlag']),
                block: typeof Block = new Block(
                    createTestRow(),
                    container,
                    999,
                );

            block.setFlag('test', true, false);
            expect(container.setFlag).not.toHaveBeenCalled();
        });

        it('allows all flags to be dumped out', function () {
            const block: typeof Block = new Block(createTestRow());

            block.setFlag('test1', true);
            block.setFlag('test2', false);

            expect(block.dumpFlags()).toEqual({'test1': true, 'test2': false});
        });

        it('starts out with no flags set', function () {
            const block: typeof Block = new Block(createTestRow());
            expect(block.dumpFlags()).toEqual({ });
        });

        it('ignores changes to the dumped flags', function () {
            const block: typeof Block = new Block(createTestRow()),
                flags: {[flagName: string]: boolean} = block.dumpFlags(),
                flagsBackup: {[flagName: string]: boolean} = block.dumpFlags();

            flags.newFlag = true;
            expect(block.dumpFlags()).not.toEqual(flags);
            expect(block.dumpFlags()).toEqual(flagsBackup);
        });

        it('calls a visitor in order to traverse rows', function () {
            const block: typeof Block = new Block(createTestRow()),
                visitor: Pricker.Visitor.Counter =
                        new Pricker.Visitor.Counter();

            spyOn(visitor, 'visit').and.callThrough();
            block.accept(visitor);

            expect(visitor.visit).toHaveBeenCalledTimes(visitor.getCount());
        });

        it('returns this when receiving a visitor', function () {
            const block: typeof Block = new Block(createTestRow()),
                visitor: Pricker.Visitor.Counter =
                        new Pricker.Visitor.Counter();

            expect(block.accept(visitor)).toBe(block);
        });

        it('passes standard data fields to templates', function () {
            const block: typeof Block = new Block(
                    createTestRow(),
                    undefined,
                    999,
                ),
                testTemplateSpy = jasmine.createSpy('test');
            let data: any;

            Pricker.Templates[block.templatePath + '.test'] = testTemplateSpy;
            block.print('test');

            data = testTemplateSpy.calls.argsFor(0)[0];
            expect(data.block).toBe(block);
            expect(data.index).toBe(999);
            expect(data.initialRow).toEqual(
                Pricker.stringFromRow(block.getInitialRow()),
            );
            expect(data.endRow).toEqual(Pricker.stringFromRow(block.getEnd()));

            delete Pricker.Templates[block.templatePath + '.test'];
        });

    });

}
