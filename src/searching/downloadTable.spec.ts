/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { Stage } from '../rows';
import downloadTable from './downloadTable';

describe('downloadTable function', () => {
    const testData = [16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const mockResponse = (data: number[]): void => {
        const uint8 = new Uint8Array(data);
        const response = new Response(uint8);
        jest.spyOn(global, 'fetch').mockReturnValue(Promise.resolve(response));
    };

    it('can retrieve a table from the web', async () => {
        mockResponse(testData);

        const table = await downloadTable(Stage.Minimus, 'http://example.com/');

        expect(fetch).toHaveBeenCalledWith('http://example.com/');
        expect(table.stage).toBe(Stage.Minimus);
        expect(table.getValue(0)).toBe(0);
        expect(table.getValue(1)).toBe(1);
    });

    it('throws if the retrieved data are invalid', async () => {
        mockResponse(testData.slice(1));

        await expect(async () => {
            await downloadTable(Stage.Minimus, 'http://example.com/');
        }).rejects.toThrow();
    });

    it('throws if an HTTP error occurs', async () => {
        const response = new Response(undefined, { status: 404 });
        jest.spyOn(global, 'fetch').mockReturnValue(Promise.resolve(response));

        await expect(async () => {
            await downloadTable(Stage.Minimus, 'http://example.com/');
        }).rejects.toThrow();
    });
});
