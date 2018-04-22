/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

describe('Call enum', () => {

    it('maps plain calls to a falsy code', () => {
        expect(Pricker.Call.Plain).toBeFalsy();
    });

    it('maps non-plain calls to a truthy code', () => {
        expect(Pricker.Call.Bob).toBeTruthy();
        expect(Pricker.Call.Single).toBeTruthy();
    });

    it('maps forwards and backwards correctly', () => {
        const C = Pricker.Call;
        expect(C[C[C.Plain]]).toBe(C.Plain);
        expect(C[C[C.Bob]]).toBe(C.Bob);
        expect(C[C[C.Single]]).toBe(C.Single);
    });

    it('maps calls to a unique code', () => {
        expect(Pricker.Call.Plain).not.toBe(Pricker.Call.Bob);
        expect(Pricker.Call.Plain).not.toBe(Pricker.Call.Single);
        expect(Pricker.Call.Bob).not.toBe(Pricker.Call.Single);
    });

});
