/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

describe('text template', function () {

    it('renders a course correctly', function () {
        const view: Pricker.View = new Pricker.View('text'),
            course: Pricker.Course = new Pricker.Course(
                Pricker.rowFromString('231', Pricker.Stage.Cinques)
            );

        course.setLength(4);
        course.getSix(2).setCall(Pricker.Call.Single);
        course.getSix(3).setCall(Pricker.Call.Bob);

        expect(view.print(course)).toBe('480735692E1  s2 3  (4 sixes)\n');
    });

    it('only displays the number of sixes when needed', function () {
        const view = new Pricker.View('text'),
            course = new Pricker.Course(
                Pricker.rowFromString('231', Pricker.Stage.Cinques)
            );

        course.getSix(1).setCall(Pricker.Call.Bob);
        expect(view.print(course)).toBe('23145678E90  1\n');
    });

    it('displays "p" when a course has no calls', function () {
        const view = new Pricker.View('text'),
            course = new Pricker.Course(
                Pricker.rowFromString('231', Pricker.Stage.Cinques)
            );

        expect(view.print(course)).toBe('2314567890E  p\n');
    });

});
