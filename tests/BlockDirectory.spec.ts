/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="functions.ts" />

describe('BlockDirectory class', function () {

    let directory: Pricker.BlockDirectory,
        touch: Pricker.Touch;

    beforeEach(function () {
        directory = new Pricker.BlockDirectory();
        touch = new Pricker.Touch(createTestRow());
        touch.setLength(2);
    });

    it('can compute the ownership of a six', function () {
        const six = touch.getCourse(1).getSix(3);
        expect(Pricker.BlockDirectory.getIndexArray(six)).toEqual([1, 3]);
    });

    it('can compute the ownership of a course', function () {
        const course = touch.getCourse(1);
        expect(Pricker.BlockDirectory.getIndexArray(course)).toEqual([1]);
    });

    it('throws an exception for objects with no ownership', function () {
        expect(function () {
            Pricker.BlockDirectory.getIndexArray(touch);
        }).toThrow();
    });

    it('throws an exception for a container but no index', function () {
        const six = touch.getCourse(1).getSix(3);
        six.setOwnership(touch.getCourse(1), undefined);
        expect(function () {
            Pricker.BlockDirectory.getIndexArray(six);
        }).toThrow();
    });

    it('starts out without any indexed sixes', function () {
        for (let courseIndex: number = 1; courseIndex <= 2; courseIndex += 1) {
            for (let sixIndex: number = 1; sixIndex <= 22; sixIndex += 1) {
                expect(directory.contains(
                    touch.getCourse(courseIndex).getSix(sixIndex),
                )).toBe(false);
            }
        }
    });

    it('can index a six directly', function () {
        const six = touch.getCourse(1).getSix(3);
        directory.add(six);
        expect(directory.contains(six)).toBe(true);
    });

    it('can index a six using coordinates', function () {
        directory.add(1, 3);
        expect(directory.contains(1, 3)).toBe(true);
    });

    it('returns this when adding a six directly', function () {
        expect(directory.add(touch.getCourse(1).getSix(3))).toBe(directory);
    });

    it('returns this when adding a six using coordinates', function () {
        expect(directory.add(1, 3)).toBe(directory);
    });

    it('throws an exception if the six has no index', function () {
        const row = createTestRow(),
            six = new Pricker.Slow(row, touch.getCourse(1), undefined);
        expect(function () { directory.add(six); }).toThrow();
        expect(function () { directory.contains(six); }).toThrow();
    });

    it('throws an exception if the six has no container', function () {
        const six = new Pricker.Slow(createTestRow(), undefined, 1);
        expect(function () { directory.add(six); }).toThrow();
        expect(function () { directory.contains(six); }).toThrow();
    });

    it('knows when it is empty', function () {
        expect(directory.isEmpty()).toBe(true);
    });

    it('knows when it contains a six', function () {
        directory.add(touch.getCourse(1).getSix(3));
        expect(directory.isEmpty()).toBe(false);
    });

    it('find no six from a course directly', function () {
        expect(directory.contains(touch.getCourse(1))).toBe(false);
    });

    it('find no six from a course by coordinates', function () {
        expect(directory.contains(1)).toBe(false);
    });

    it('find a six from a course directly', function () {
        directory.add(touch.getCourse(1).getSix(3));
        expect(directory.contains(touch.getCourse(1))).toBe(true);
    });

    it('find a six from a course by coordinates', function () {
        directory.add(1, 3);
        expect(directory.contains(1)).toBe(true);
    });

    it('throws an exception checking a course with no index', function () {
        const course = new Pricker.Course(createTestRow(), touch, undefined);
        expect(function () { directory.contains(course); }).toThrow();
    });

});
