/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

describe('mbd template for Course', function () {

    it('renders a course correctly', function () {
        const stage: Pricker.Stage = Pricker.Stage.Cinques,
            initialRow: Pricker.Row = Pricker.rowFromString('231', stage),
            course: Pricker.Course = Pricker.Course.fromString(
                initialRow,
                '480735692E1  s2 3  (4 sixes)',
            );

        expect(course.print('mbd')).toBe(''
            + '<u>2314567890E</u><br />'
            + course.getSix(1).print('mbd')
            + course.getSix(2).print('mbd')
            + course.getSix(3).print('mbd')
            + course.getSix(4).print('mbd'),
        );
    });

});