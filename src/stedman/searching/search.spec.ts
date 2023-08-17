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
        expect(touches[0].print('text')).toBe('1 s3 4 6 8 10 14');
        expect(touches[1].print('text')).toBe('1 4 8 9 s12 14');
        expect(touches[2].print('text')).toBe('1 s3 4 s6 8 9 s12 14');
        expect(touches[3].print('text')).toBe('1 3 4 s6 s9 s12 14');
        expect(touches[4].print('text')).toBe('1 3 4 5 6 9 10 s12 14');
        expect(touches[5].print('text')).toBe('1 s3 4 6 s8 9 10 s12 14');
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
