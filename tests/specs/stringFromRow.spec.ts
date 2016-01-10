describe('stringFromRow function', function () {

    it('converts rows to strings', function () {
        var row = 'CBATE0987654321';
        expect(
            Pricker.stringFromRow(
                Pricker.rowFromString(row, Pricker.Stage.Septuples)
            )
        ).toBe(row);
    });

});
