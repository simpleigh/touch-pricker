/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { Stage, Uint4Table } from '../../rows';
import search from './search';

describe('search function', () => {
    let table: Uint4Table;

    beforeAll(async () => {
        const filename = path.join(__dirname, '../../../data/stedman.7.dat');
        const buffer = await readFile(filename);
        const data = new Uint8Array(buffer.buffer);
        table = new Uint4Table(Stage.Triples, data);
    });

    it('can find touches', () => {
        const touches = search(table, 5039);
        expect(touches.length).toBe(6);
    });

    it('finds the expected touches', () => {
        const touches = search(table, 5039);
        expect(touches[0]).toBe('- s- - - -   -');
        expect(touches[1]).toBe('-  -   --  s -');
        expect(touches[2]).toBe('- s- s --  s -');
        expect(touches[3]).toBe('- -- s  s  s -');
        expect(touches[4]).toBe('- ----  -- s -');
        expect(touches[5]).toBe('- s- - s-- s -');
    });

    it('can find a large volume of touches', () => {
        const touches = search(table, 39);
        expect(touches.length).toBe(2639);
    });

    it('can find touches taking more sixes than the minimum', () => {
        const touches = search(table, 5039, 8);
        expect(touches.length).toBe(300);
        expect(touches).toMatchSnapshot();
    });
});
