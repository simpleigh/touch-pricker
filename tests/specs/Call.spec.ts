/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

describe('Call enum', function () {

    it('maps calls to a truthy code', function () {
        expect(Pricker.Call.Plain).toBeTruthy();
        expect(Pricker.Call.Bob).toBeTruthy();
        expect(Pricker.Call.Single).toBeTruthy();
    });

    it('maps forwards and backwards correctly', function () {
        let C = Pricker.Call;
        expect(C[C[C.Plain]]).toBe(C.Plain);
        expect(C[C[C.Bob]]).toBe(C.Bob);
        expect(C[C[C.Single]]).toBe(C.Single);
    });

    it('maps calls to a unique code', function () {
        expect(Pricker.Call.Plain).not.toBe(Pricker.Call.Bob);
        expect(Pricker.Call.Plain).not.toBe(Pricker.Call.Single);
        expect(Pricker.Call.Bob).not.toBe(Pricker.Call.Single);
    });

});
