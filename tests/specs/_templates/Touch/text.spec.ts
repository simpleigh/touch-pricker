/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

describe('text template for Touch', function () {

    it('renders a touch correctly', function () {
        const stage: Pricker.Stage = Pricker.Stage.Cinques,
            initialRow: Pricker.Row = Pricker.rowFromString('231', stage),
            course: Pricker.Course = Pricker.Course.fromString(
                initialRow,
                '2314568790E  1 s10 s13 s15 22',
            ),
            touch: Pricker.Touch = new Pricker.Touch(initialRow);

        touch.insertCourse(1, course);
        touch.insertCourse(2, course);

        expect(touch.print('text')).toBe(''
            + Pricker.stringFromRow(touch.getInitialRow()) + '\n'
            + course.print('text')
            + course.print('text'),
        );
    });

});
