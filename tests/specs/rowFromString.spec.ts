describe('rowFromString function', function () {

    it('converts strings to rows', function () {
        expect(
            Pricker.rowFromString('2315476', Pricker.Stage.Triples)
        ).toEqual([2, 3, 1, 5, 4, 7, 6]);
        expect(
            Pricker.rowFromString('231547698', Pricker.Stage.Caters)
        ).toEqual([2, 3, 1, 5, 4, 7, 6, 9, 8]);
        expect(
            Pricker.rowFromString('231547698E0', Pricker.Stage.Cinques)
        ).toEqual([2, 3, 1, 5, 4, 7, 6, 9, 8, 11, 10]);
        expect(
            Pricker.rowFromString('231547698E0AT', Pricker.Stage.Sextuples)
        ).toEqual([2, 3, 1, 5, 4, 7, 6, 9, 8, 11, 10, 13, 12]);
        expect(
            Pricker.rowFromString('231547698E0ATCB', Pricker.Stage.Septuples)
        ).toEqual([2, 3, 1, 5, 4, 7, 6, 9, 8, 11, 10, 13, 12, 15, 14]);
    });

    it('copes with lowercase letters', function () {
        expect(
            Pricker.rowFromString('231547698e0atcb', Pricker.Stage.Septuples)
        ).toEqual([2, 3, 1, 5, 4, 7, 6, 9, 8, 11, 10, 13, 12, 15, 14]);
    });

    it('rejects repeated bells', function () {
        expect(function () {
            Pricker.rowFromString('1123456', Pricker.Stage.Triples);
        }).toThrowError('Bell repeated');
    });

    it('rejects unknown symbols', function () {
        expect(function () {
            Pricker.rowFromString('123#567', Pricker.Stage.Triples);
        }).toThrowError('Unknown bell');
    });

    it('rejects bells that are too high', function () {
        expect(function () {
            Pricker.rowFromString('1238567', Pricker.Stage.Triples);
        }).toThrowError('Unknown bell');
    });

    it('rejects rows that are too long', function () {
        expect(function () {
            Pricker.rowFromString('12345678', Pricker.Stage.Triples);
        }).toThrowError('Row too long');
    });

    it("fills in bells that aren't specified", function () {
        expect(
            Pricker.rowFromString('231', Pricker.Stage.Triples)
        ).toEqual([2, 3, 1, 4, 5, 6, 7]);
        expect(
            Pricker.rowFromString('231', Pricker.Stage.Caters)
        ).toEqual([2, 3, 1, 4, 5, 6, 7, 8, 9]);
        expect(
            Pricker.rowFromString('231', Pricker.Stage.Cinques)
        ).toEqual([2, 3, 1, 4, 5, 6, 7, 8, 9, 10, 11]);
        expect(
            Pricker.rowFromString('231', Pricker.Stage.Sextuples)
        ).toEqual([2, 3, 1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
        expect(
            Pricker.rowFromString('231', Pricker.Stage.Septuples)
        ).toEqual([2, 3, 1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    });

});
