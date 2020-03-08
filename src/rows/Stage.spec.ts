/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import Stage from './Stage';

describe('Stage enum', () => {

    it('maps stage names to numbers of bells', () => {
        expect(Stage.Minimus).toBe(4);
        expect(Stage.Doubles).toBe(5);
        expect(Stage.Minor).toBe(6);
        expect(Stage.Triples).toBe(7);
        expect(Stage.Major).toBe(8);
        expect(Stage.Caters).toBe(9);
        expect(Stage.Royal).toBe(10);
        expect(Stage.Cinques).toBe(11);
        expect(Stage.Maximus).toBe(12);
        expect(Stage.Sextuples).toBe(13);
        expect(Stage.Fourteen).toBe(14);
        expect(Stage.Septuples).toBe(15);
        expect(Stage.Sixteen).toBe(16);
    });

    it('maps numbers of bells to stage names', () => {
        expect(Stage[4]).toBe('Minimus');
        expect(Stage[5]).toBe('Doubles');
        expect(Stage[6]).toBe('Minor');
        expect(Stage[7]).toBe('Triples');
        expect(Stage[8]).toBe('Major');
        expect(Stage[9]).toBe('Caters');
        expect(Stage[10]).toBe('Royal');
        expect(Stage[11]).toBe('Cinques');
        expect(Stage[12]).toBe('Maximus');
        expect(Stage[13]).toBe('Sextuples');
        expect(Stage[14]).toBe('Fourteen');
        expect(Stage[15]).toBe('Septuples');
        expect(Stage[16]).toBe('Sixteen');
    });

});
