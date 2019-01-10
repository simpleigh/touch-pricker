/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-19 Leigh Simpson. All rights reserved.
 */

import Stage from './Stage';

describe('Stage enum', () => {

    it('maps stage names to numbers of bells', () => {
        expect(Stage.Triples).toBe(7);
        expect(Stage.Caters).toBe(9);
        expect(Stage.Cinques).toBe(11);
        expect(Stage.Sextuples).toBe(13);
        expect(Stage.Septuples).toBe(15);
    });

    it('maps numbers of bells to stage names', () => {
        expect(Stage[7]).toBe('Triples');
        expect(Stage[9]).toBe('Caters');
        expect(Stage[11]).toBe('Cinques');
        expect(Stage[13]).toBe('Sextuples');
        expect(Stage[15]).toBe('Septuples');
    });

});
