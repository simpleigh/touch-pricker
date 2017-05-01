/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../../functions.ts" />

describe('gsiril template for Course', function () {

    it('renders a course correctly', function () {
        const course = Pricker.Course.fromString(createTestRow(), 's2 3 (4)');
        expect(course.print('gsiril')).toBe(
            'plain,slow,single,quick,bob,slow,plain,quick,"@  '
                + course.print('text')
                + '"\n',
        );
    });

});
