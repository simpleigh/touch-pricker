/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import Call from './Call';

describe('Call enum', () => {

    it('maps plain calls to a falsy code', () => {
        expect(Call.Plain).toBeFalsy();
    });

    it('maps non-plain calls to a truthy code', () => {
        expect(Call.Bob).toBeTruthy();
        expect(Call.Single).toBeTruthy();
    });

    it('maps calls to a unique code', () => {
        expect(Call.Plain).not.toBe(Call.Bob);
        expect(Call.Plain).not.toBe(Call.Single);
        expect(Call.Bob).not.toBe(Call.Single);
    });

});
