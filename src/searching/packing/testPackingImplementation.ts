/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import type AbstractPacking from './AbstractPacking';

const testPackingImplementation = (
    factory: () => AbstractPacking,
    maximum: number,
    packedData: number[],
    unpackedData: number[],
): void => {
    it('exposes the maximum value it can pack', () => {
        const packing = factory();
        expect(packing.maximum).toBe(maximum);
    });

    it('packs data correctly', () => {
        const packing = factory();
        const from = new Uint8Array(unpackedData);
        const to = new Uint8Array(from.length * packing.compression);

        packing.pack(from, to);

        expect(to).toEqual(new Uint8Array(packedData));
    });

    it('unpacks data correctly', () => {
        const packing = factory();
        const from = new Uint8Array(packedData);
        const to = new Uint8Array(from.length / packing.compression);

        packing.unpack(from, to);

        expect(to).toEqual(new Uint8Array(unpackedData));
    });

    it('throws if the packing target is too small', () => {
        const packing = factory();
        const from = new Uint8Array(unpackedData);
        const to = new Uint8Array(from.length * packing.compression - 1);

        expect(() => {
            packing.pack(from, to);
        }).toThrow();
    });

    it('throws if the packing target is too big', () => {
        const packing = factory();
        const from = new Uint8Array(unpackedData);
        const to = new Uint8Array(from.length * packing.compression + 1);

        expect(() => {
            packing.pack(from, to);
        }).toThrow();
    });

    it('throws if the unpacking target is too small', () => {
        const packing = factory();
        const from = new Uint8Array(unpackedData);
        const to = new Uint8Array(from.length / packing.compression - 1);

        expect(() => {
            packing.unpack(from, to);
        }).toThrow();
    });

    it('throws if the unpacking target is too big', () => {
        const packing = factory();
        const from = new Uint8Array(unpackedData);
        const to = new Uint8Array(from.length / packing.compression + 1);

        expect(() => {
            packing.unpack(from, to);
        }).toThrow();
    });
};

export default testPackingImplementation;
