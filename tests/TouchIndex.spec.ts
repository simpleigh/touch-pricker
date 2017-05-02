/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="functions.ts" />

describe('TouchIndex class', function () {

    let index: Pricker.TouchIndex,
        touch: Pricker.Touch;

    beforeEach(function () {
        index = new Pricker.TouchIndex();
        touch = new Pricker.Touch(createTestRow());
        touch.setLength(2);
    });

    it('starts out without any indexed sixes', function () {
        for (let courseIndex: number = 1; courseIndex <= 2; courseIndex += 1) {
            for (let sixIndex: number = 1; sixIndex <= 22; sixIndex += 1) {
                expect(index.contains(
                    touch.getCourse(courseIndex).getSix(sixIndex),
                )).toBe(false);
            }
        }
    });

    it('can index a six directly', function () {
        const six = touch.getCourse(1).getSix(3);
        index.add(six);
        expect(index.contains(six)).toBe(true);
    });

    it('can index a six using coordinates', function () {
        index.add(1, 3);
        expect(index.contains(1, 3)).toBe(true);
    });

    it('returns this when adding a six directly', function () {
        expect(index.add(touch.getCourse(1).getSix(3))).toBe(index);
    });

    it('returns this when adding a six using coordinates', function () {
        expect(index.add(1, 3)).toBe(index);
    });

    it('throws an exception if the six has no container', function () {
        const six = new Pricker.Slow(createTestRow());
        expect(function () { index.add(six); }).toThrow();
    });

    it('throws an exception if the course has no container', function () {
        const course = new Pricker.Course(createTestRow());
        expect(function () { index.add(course.getSix(3)); }).toThrow();
    });

    it('knows when it is empty', function () {
        expect(index.isEmpty()).toBe(true);
    });

    it('knows when it contains a six', function () {
        index.add(touch.getCourse(1).getSix(3));
        expect(index.isEmpty()).toBe(false);
    });

});
