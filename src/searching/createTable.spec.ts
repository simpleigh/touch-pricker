/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { rankFromRow, rounds, type Row, Stage } from '../rows';
import { Course, Methods } from '../stedman';
import createTable from './createTable';
import createTranspositions from './createTranspositions';
import type Uint4Table from './Uint4Table';

describe('createTable function', () => {
    let table: Uint4Table;
    let data: Uint8Array;

    beforeAll(async () => {
        const method = new Methods.Stedman();
        const course = new Course(rounds(Stage.Triples), method);
        const transpositions = createTranspositions(
            course,
            method.searchCallingStrings,
        );

        table = createTable(Stage.Triples, transpositions);

        const filename = path.join(__dirname, '../../data/stedman.7.dat');
        const buffer = await readFile(filename);
        data = new Uint8Array(buffer.buffer);
    });

    it('creates a table', () => {
        expect(table.stage).toBe(Stage.Triples);
        expect(table.length).toBe(5040);
    });

    it('knows rounds is rounds', () => {
        expect(table.getValue(0)).toBe(0);
    });

    it('knows the first seven possible sixends', () => {
        const rows: Row[] = [
            [2, 4, 6, 7, 1, 5, 3],
            [2, 4, 5, 6, 1, 7, 3],
            [2, 4, 5, 7, 1, 6, 3],
            [2, 4, 6, 3, 1, 7, 5],
            [2, 4, 6, 3, 1, 5, 7],
            [2, 4, 5, 3, 1, 6, 7],
            [2, 4, 5, 3, 1, 7, 6],
        ];
        for (const row of rows) {
            const rank = rankFromRow(row);
            expect(table.getValue(rank)).toBe(1);
        }
    });

    it('creates the same table as the one we have on disk', () => {
        expect(table.data).toEqual(data);
    });
});
