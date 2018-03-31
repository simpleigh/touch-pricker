import rowFromString from './rowFromString';
import Stage from './Stage';

describe('rowFromString function', () => {

    it('converts strings to rows', () => {
        expect(rowFromString('2315476', Stage.Triples))
            .toEqual([2, 3, 1, 5, 4, 7, 6]);
        expect(rowFromString('231547698', Stage.Caters))
            .toEqual([2, 3, 1, 5, 4, 7, 6, 9, 8]);
        expect(rowFromString('231547698E0', Stage.Cinques))
            .toEqual([2, 3, 1, 5, 4, 7, 6, 9, 8, 11, 10]);
        expect(rowFromString('231547698E0AT', Stage.Sextuples))
            .toEqual([2, 3, 1, 5, 4, 7, 6, 9, 8, 11, 10, 13, 12]);
        expect(rowFromString('231547698E0ATCB', Stage.Septuples))
            .toEqual([2, 3, 1, 5, 4, 7, 6, 9, 8, 11, 10, 13, 12, 15, 14]);
    });

    it('copes with lowercase letters', () => {
        expect(rowFromString('231547698e0atcb', Stage.Septuples))
            .toEqual([2, 3, 1, 5, 4, 7, 6, 9, 8, 11, 10, 13, 12, 15, 14]);
    });

    it('rejects repeated bells', () => {
        expect(() => rowFromString('1123456', Stage.Triples))
            .toThrowError('Bell repeated');
    });

    it('rejects unknown symbols', () => {
        expect(() => rowFromString('123#567', Stage.Triples))
            .toThrowError('Unknown bell');
    });

    it('rejects bells that are too high', () => {
        expect(() => rowFromString('1238567', Stage.Triples))
            .toThrowError('Unknown bell');
    });

    it('rejects rows that are too long', () => {
        expect(() => rowFromString('12345678', Stage.Triples))
            .toThrowError('Row too long');
    });

    it("fills in bells that aren't specified", () => {
        expect(rowFromString('231', Stage.Triples))
            .toEqual([2, 3, 1, 4, 5, 6, 7]);
        expect(rowFromString('231', Stage.Caters))
            .toEqual([2, 3, 1, 4, 5, 6, 7, 8, 9]);
        expect(rowFromString('231', Stage.Cinques))
            .toEqual([2, 3, 1, 4, 5, 6, 7, 8, 9, 10, 11]);
        expect(rowFromString('231', Stage.Sextuples))
            .toEqual([2, 3, 1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
        expect(rowFromString('231', Stage.Septuples))
            .toEqual([2, 3, 1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    });

});
