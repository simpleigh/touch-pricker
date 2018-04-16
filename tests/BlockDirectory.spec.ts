/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="functions.ts" />

describe('BlockDirectory class', () => {

    let directory: Pricker.BlockDirectory,
        touch: Pricker.Touch;

    beforeEach(() => {
        directory = new Pricker.BlockDirectory();
        touch = new Pricker.Touch(createTestRow());
        touch.setLength(2);
    });

    it('can compute the ownership of a six', () => {
        const six = touch.getCourse(1).getSix(3);
        expect(Pricker.BlockDirectory.getIndices(six)).toEqual([1, 3]);
    });

    it('can compute the ownership of a course', () => {
        const course = touch.getCourse(1);
        expect(Pricker.BlockDirectory.getIndices(course)).toEqual([1]);
    });

    it('starts out with no sixes in the index', () => {
        for (let courseIndex: number = 1; courseIndex <= 2; courseIndex += 1) {
            for (let sixIndex: number = 1; sixIndex <= 22; sixIndex += 1) {
                expect(directory.contains(
                    touch.getCourse(courseIndex).getSix(sixIndex),
                )).toBe(false);
            }
        }
    });

    it('starts out with no courses in the index', () => {
        for (let courseIndex: number = 1; courseIndex <= 2; courseIndex += 1) {
            expect(directory.contains(touch.getCourse(courseIndex)))
                .toBe(false);
        }
    });

    it('can store a six', () => {
        const six = touch.getCourse(1).getSix(3);
        directory.add(six);
        expect(directory.contains(six)).toBe(true);
    });

    it('can store with indices', () => {
        directory.add(1, 3);
        expect(directory.contains(1, 3)).toBe(true);
    });

    it('returns this when storing a six', () => {
        expect(directory.add(touch.getCourse(1).getSix(3))).toBe(directory);
    });

    it('returns this when storing with indices', () => {
        expect(directory.add(1, 3)).toBe(directory);
    });

    it('stores a course as well as a six', () => {
        directory.add(touch.getCourse(1).getSix(3));
        expect(directory.contains(touch.getCourse(1))).toBe(true);
    });

    it('stores a course as well as a six by coordinates', () => {
        directory.add(1, 3);
        expect(directory.contains(1)).toBe(true);
    });

    it('knows when it is empty', () => {
        expect(directory.isEmpty()).toBe(true);
    });

    it('knows when it is not empty', () => {
        directory.add(touch.getCourse(1).getSix(3));
        expect(directory.isEmpty()).toBe(false);
    });

    it('throws an exception for an unowned block', () => {
        expect(() => { Pricker.BlockDirectory.getIndices(touch); }).toThrow();
        expect(() => { directory.add(touch); }).toThrow();
        expect(() => { directory.contains(touch); }).toThrow();
    });

});
