/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { rounds, type Row, Stage } from '../rows';
import { Course, Methods } from '../stedman';
import createTranspositions from './createTranspositions';
import search, { extendTouchList, searchAsync } from './search';
import Table from './Table';

describe('extendTouchList function', () => {
    it('can add a call pair to a touch', () => {
        const touchList = ['-  -'];
        const result = extendTouchList(touchList, '--');
        expect(result).toEqual(['-  ---']);
    });

    it('can add a call pair to multiple touches', () => {
        const touchList = ['-  -', ' -- '];
        const result = extendTouchList(touchList, '--');
        expect(result).toEqual(['-  ---', ' -- --']);
    });

    it('can cope with an empty touch', () => {
        const touchList = [''];
        const result = extendTouchList(touchList, '--');
        expect(result).toEqual(['--']);
    });

    it('can cope with an empty array', () => {
        const touchList: string[] = [];
        const result = extendTouchList(touchList, '--');
        expect(result).toEqual([]);
    });

    it('processes all call pairs if adding a calling with a plain', () => {
        const touchList = ['  ', '- ', 's ', ' -', ' s', '--', 's-'];
        const result = extendTouchList(touchList, '  ');
        expect(result).toEqual(touchList.map((touch) => `${touch}  `));
    });

    it('processes all call pairs if adding a call with a bob', () => {
        const touchList = ['  ', '- ', 's ', ' -', ' s', '--', 's-'];
        const result = extendTouchList(touchList, '- ');
        expect(result).toEqual(touchList.map((touch) => `${touch}- `));
    });

    it('prunes touches with undesirable calling', () => {
        const touchList = ['  ', '- ', 's ', ' -', ' s', '--', 's-'];
        const result = extendTouchList(touchList, 's ');
        expect(result).toEqual(['  s ', '- s ', 's s ']);
    });

    it('avoids pruning an empty touch', () => {
        const touchList = [''];
        const result = extendTouchList(touchList, 's ');
        expect(result).toEqual(['s ']);
    });
});

describe('search function', () => {
    let table: Table;

    let transpositions: Map<string, Row>;

    beforeAll(async () => {
        const filename = path.join(__dirname, '../../data/stedman.7.dat');
        const buffer = await readFile(filename);
        table = new Table(Stage.Triples, buffer);

        const method = new Methods.Stedman();
        const course = new Course(rounds(Stage.Triples), method);
        transpositions = createTranspositions(
            course,
            method.searchCallingStrings,
            true,
        );
    });

    it('can find touches', () => {
        const touches = search(table, transpositions, 5039);
        expect(touches.length).toBe(6);
    });

    const EXPECTED_TOUCHES = `
        [
          Calling {
            "calling": "- s- - - -   -",
          },
          Calling {
            "calling": "-  -   --  s -",
          },
          Calling {
            "calling": "- s- s --  s -",
          },
          Calling {
            "calling": "- -- s  s  s -",
          },
          Calling {
            "calling": "- ----  -- s -",
          },
          Calling {
            "calling": "- s- - s-- s -",
          },
        ]
    `;

    it('finds the expected touches', () => {
        const touches = search(table, transpositions, 5039);
        expect(touches).toMatchInlineSnapshot(EXPECTED_TOUCHES);
        expect(touches[0].print('text')).toBe('1 s3 4 6 8 10 14');
        expect(touches[1].print('text')).toBe('1 4 8 9 s12 14');
        expect(touches[2].print('text')).toBe('1 s3 4 s6 8 9 s12 14');
        expect(touches[3].print('text')).toBe('1 3 4 s6 s9 s12 14');
        expect(touches[4].print('text')).toBe('1 3 4 5 6 9 10 s12 14');
        expect(touches[5].print('text')).toBe('1 s3 4 6 s8 9 10 s12 14');
    });

    it('can find a large volume of touches', () => {
        const touches = search(table, transpositions, 39);
        expect(touches.length).toBe(2639);
    });

    it('can find touches taking more sixes than the minimum', () => {
        const touches = search(table, transpositions, 5039, 8);
        expect(touches.length).toBe(300);
        expect(touches).toMatchSnapshot();
    });

    it('can be called asynchronously', async () => {
        const touches = await searchAsync(table, transpositions, 5039);
        expect(touches).toMatchInlineSnapshot(EXPECTED_TOUCHES);
    });
});
