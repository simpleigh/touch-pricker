/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

/// <reference path="../../functions.ts" />

describe('text template for Course', () => {

    function testRendering(input) {
        return () => {
            expect(
                Pricker.Course.fromString(createTestRow(), input).print('text'),
            ).toBe(input);
        };
    }

    it('renders a course correctly', testRendering(
        '480735692E1  s2 3  (4 sixes)',
    ));

    it('only displays the number of sixes when needed', testRendering(
        '23145678E90  1',
    ));

    it('displays "p" when a course has no calls', testRendering(
        '2314567890E  p',
    ));

    it('allows the line ending to be customised', () => {
        const course = new Pricker.Course(createTestRow());
        expect(course.print('text', {'end': '#'})).toBe('2314567890E  p#');
    });

    it('can render without the course end', () => {
        const course = Pricker.Course.fromString(createTestRow(), 's2 3 (4)');
        expect(course.print('text', {'courseEnd': false}))
            .toBe('s2 3  (4 sixes)');
    });

});
