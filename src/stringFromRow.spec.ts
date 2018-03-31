import rowFromString from './rowFromString';
import Stage from './Stage';
import stringFromRow from './stringFromRow';

describe('stringFromRow function', () => {

    it('converts rows to strings', () => {
        const row = 'CBATE0987654321';
        expect(stringFromRow(rowFromString(row, Stage.Septuples))).toBe(row);
    });

});
