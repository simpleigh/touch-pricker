/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

describe('html template for Course', function () {

    it('renders a course correctly', function () {
        const stage: Pricker.Stage = Pricker.Stage.Cinques,
            initialRow: Pricker.Row = Pricker.rowFromString('231', stage),
            course: Pricker.Course = Pricker.Course.fromString(
                initialRow,
                '480735692E1  s2 3  (4 sixes)',
            );

        expect(course.print('html')).toBe(
            '<u>2314567890E</u><br />' + course.print('text'),
        );
    });

});
