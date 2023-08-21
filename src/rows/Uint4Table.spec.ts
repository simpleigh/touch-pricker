/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

/* eslint-disable no-new */

import { Stage } from './types';
import Uint4Table from './Uint4Table';

describe('Uint4Table', () => {
    /* eslint-disable array-element-newline */
    // prettier-ignore
    const testData = [
        16, 50, 84, 118, 152, 186, 220, 254,  // 0x1032547698BADCFE
        33, 67, 101, 135,                     // 0x21436587
    ];
    /* eslint-enable array-element-newline */

    it('can be constructed', () => {
        const uint8 = new Uint8Array(testData);
        new Uint4Table(Stage.Minimus, uint8);
    });

    it('throws if the data are insufficient', () => {
        const uint8 = new Uint8Array(testData.slice(1));
        expect(() => {
            new Uint4Table(Stage.Minimus, uint8);
        }).toThrowError('Have 11 bytes but expected 12');
    });

    it('throws if the data are too numerous', () => {
        const uint8 = new Uint8Array([...testData, 0]);
        expect(() => {
            new Uint4Table(Stage.Minimus, uint8);
        }).toThrowError('Have 13 bytes but expected 12');
    });

    it('provides read access to the stage', () => {
        const uint8 = new Uint8Array(testData);
        const table = new Uint4Table(Stage.Minimus, uint8);

        expect(table.stage).toBe(Stage.Minimus);
    });

    it('allows access to its data', () => {
        const uint8 = new Uint8Array(testData);
        const table = new Uint4Table(Stage.Minimus, uint8);

        for (let i = 0; i <= 15; i += 1) {
            expect(table.getValue(i)).toBe(i);
        }

        for (let i = 16; i <= 23; i += 1) {
            expect(table.getValue(i)).toBe(i - 15);
        }
    });

    for (const rank of [-1, 5040, 9999]) {
        const uint8 = new Uint8Array(testData);
        const table = new Uint4Table(Stage.Minimus, uint8);

        it(`knows ${rank} is out of range`, () => {
            expect(() => {
                table.getValue(rank);
            }).toThrowError(`Rank '${rank}' out of range on stage '4'`);
        });
    }

    const mockResponse = (data: number[]): void => {
        const uint8 = new Uint8Array(data);
        const response = new Response(uint8);
        jest.spyOn(global, 'fetch').mockReturnValue(Promise.resolve(response));
    };

    it('can retrieve a table from the web', async () => {
        mockResponse(testData);

        const table = await Uint4Table.load(
            Stage.Minimus,
            'http://example.com/',
        );

        expect(fetch).toHaveBeenCalledWith('http://example.com/');
        expect(table.stage).toBe(Stage.Minimus);
        expect(table.getValue(0)).toBe(0);
        expect(table.getValue(1)).toBe(1);
    });

    it('throws if the retrieved data are invalid', async () => {
        mockResponse(testData.slice(1));

        await expect(async () => {
            await Uint4Table.load(Stage.Minimus, 'http://example.com/');
        }).rejects.toThrowError('Have 11 bytes but expected 12');
    });

    it('throws if an HTTP error occurs', async () => {
        const response = new Response(undefined, { status: 404 });
        jest.spyOn(global, 'fetch').mockReturnValue(Promise.resolve(response));

        await expect(async () => {
            await Uint4Table.load(Stage.Minimus, 'http://example.com/');
        }).rejects.toThrowError('Have 0 bytes but expected 12');
    });
});