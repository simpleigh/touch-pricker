function testAbstractBlockImplementation(Block) {

    function createTestRow(input: string = '231'): Pricker.Row {
        return Pricker.rowFromString(input, Pricker.Stage.Cinques);
    };

    describe('is derived from AbstractBlock and', function () {

        it('stores the initial row', function () {
            let initialRow: Pricker.Row = createTestRow(),
                block: Pricker.AbstractBlock = new Block(initialRow);
            expect(block.getInitialRow()).toEqual(initialRow);
        });

        it('allows the initial row to be changed', function () {
            let initialRow: Pricker.Row = createTestRow(),
                block: Pricker.AbstractBlock = new Block(initialRow),
                newRow: Pricker.Row = createTestRow('2143658709E');

            block.setInitialRow(newRow);
            expect(block.getInitialRow()).toEqual(newRow);
        });

        it('returns this when changing the initial row', function () {
            let block: Pricker.AbstractBlock = new Block(createTestRow());
            expect(block.setInitialRow(createTestRow())).toBe(block);
        });

        it('ignores changes to the original initial row', function () {
            let initialRow: Pricker.Row = createTestRow(),
                initialRowBackup: Pricker.Row = initialRow.slice(),
                block: Pricker.AbstractBlock = new Block(initialRow);

            initialRow[3] = 999;  // Mutate the initial row
            expect(initialRow).not.toEqual(initialRowBackup);

            expect(block.getInitialRow()).not.toEqual(initialRow);
            expect(block.getInitialRow()).toEqual(initialRowBackup);
        });

        it('ignores changes to the getInitialRow result', function () {
            let block: Pricker.AbstractBlock = new Block(createTestRow()),
                getInitialRow: Pricker.Row = block.getInitialRow(),
                getInitialRowBackup: Pricker.Row = 
                    block.getInitialRow().slice();

            getInitialRow[3] = 999;  // Mutate the getInitialRow result
            expect(getInitialRow).not.toEqual(getInitialRowBackup);

            expect(block.getInitialRow()).not.toEqual(getInitialRow);
            expect(block.getInitialRow()).toEqual(getInitialRowBackup);
        });

        it('ignores changes to the setInitialRow argument', function () {
            let block: Pricker.AbstractBlock = new Block(createTestRow()),
                setInitialRow = createTestRow('2143658709E'),
                setInitialRowBackup = setInitialRow.slice();

            block.setInitialRow(setInitialRow);
            setInitialRow[3] = 999;  // Mutate the setInitialRow argument
            expect(setInitialRow).not.toEqual(setInitialRowBackup);

            expect(block.getInitialRow()).not.toEqual(setInitialRow);
            expect(block.getInitialRow()).toEqual(setInitialRowBackup);
        });

        it('updates when the initial row changes', function () {
            let block: Pricker.AbstractBlock = new Block(createTestRow()),
                endRow: Pricker.Row = block.getEnd();

            block.setInitialRow(createTestRow('2143658709E'));
            expect(block.getEnd()).not.toEqual(endRow);
        });

        it('ends with a row on the same stage as it starts', function () {
            let row: Pricker.Row = createTestRow(),
                block: Pricker.AbstractBlock = new Block(row);

            expect(block.getEnd().length).toEqual(row.length);
        });

        it('ignores changes to the getEnd result', function () {
            let block: Pricker.AbstractBlock = new Block(createTestRow()),
                getEnd: Pricker.Row = block.getEnd(),
                getEndBackup: Pricker.Row = getEnd.slice();

            getEnd[3] = 999;  // Mutate the getEnd result
            expect(getEnd).not.toEqual(getEndBackup);

            expect(block.getEnd()).not.toEqual(getEnd);
            expect(block.getEnd()).toEqual(getEndBackup);
        });
    });
}
