describe('stringFromRow function', function () {

    it('converts rows to strings', function () {
        let row: string = 'CBATE0987654321';
        expect(
            Pricker.stringFromRow(
                Pricker.rowFromString(row, Pricker.Stage.Septuples)
            )
        ).toBe(row);
    });

});
