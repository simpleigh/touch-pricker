/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../../functions.ts" />

describe('html template for Course', function () {

    it('renders a course correctly', function () {
        const course = Pricker.Course.fromString(
                    createTestRow(),
                    '480735692E1  s2 3  (4 sixes)',
                );

        expect(course.print('html')).toBe(
            '<u>2314567890E</u><br />' + course.print('text'),
        );
    });

});
