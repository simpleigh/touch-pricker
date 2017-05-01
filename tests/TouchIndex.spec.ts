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

    it('starts out empty', function () {
        for (let courseIndex: number = 1; courseIndex <= 2; courseIndex += 1) {
            for (let sixIndex: number = 1; sixIndex <= 22; sixIndex += 1) {
                expect(index.contains(
                    touch.getCourse(courseIndex).getSix(sixIndex),
                )).toBe(false);
            }
        }
    });

    it('knows when sixes have been added', function () {
        const six = touch.getCourse(1).getSix(3);
        index.add(six);
        expect(index.contains(six)).toBe(true);
    });

    it('returns this when adding sixes to the index', function () {
        expect(index.add(touch.getCourse(1).getSix(3))).toBe(index);
    });

    it('throws an exception if the six has no container', function () {
        const six = new Pricker.Slow(createTestRow());
        expect(function () { index.add(six); }).toThrow();
    });

    it('throws an exception if the course has no container', function () {
        const course = new Pricker.Course(createTestRow());
        expect(function () { index.add(course.getSix(3)); }).toThrow();
    });

});
