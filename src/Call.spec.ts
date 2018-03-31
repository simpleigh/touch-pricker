import Call from './Call';

describe('Call enum', () => {

    it('maps calls to a truthy code', () => {
        expect(Call.Plain).toBeTruthy();
        expect(Call.Bob).toBeTruthy();
        expect(Call.Single).toBeTruthy();
    });

    it('maps calls to a unique code', () => {
        expect(Call.Plain).not.toBe(Call.Bob);
        expect(Call.Plain).not.toBe(Call.Single);
        expect(Call.Bob).not.toBe(Call.Single);
    });

});
