/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

describe('mbd template for Course', function () {

    it('renders a course correctly', function () {
        const course: Pricker.Course = new Pricker.Course(
                Pricker.rowFromString('231', Pricker.Stage.Cinques),
            );

        course.setLength(4);
        course.getSix(2).setCall(Pricker.Call.Single);
        course.getSix(3).setCall(Pricker.Call.Bob);

        expect(course.print('mbd')).toBe(''
            + '<u>2314567890E</u><br />'
            + course.getSix(1).print('mbd')
            + course.getSix(2).print('mbd')
            + course.getSix(3).print('mbd')
            + course.getSix(4).print('mbd'),
        );
    });

});
