/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

describe('mbd template', function () {

    it('renders a course correctly', function () {
        const view = new Pricker.View('mbd'),
            course = new Pricker.Course(
                Pricker.rowFromString('231', Pricker.Stage.Cinques)
            );

        course.setLength(4);
        course.getSix(2).setCall(Pricker.Call.Single);
        course.getSix(3).setCall(Pricker.Call.Bob);

        expect(view.print(course)).toBe(''
            + '342618507E9&nbsp;&nbsp;<span class="oddCall" onclick="c(1)">'
            + '&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;1<br />'
            + '3468201759E&nbsp;&nbsp;<span class="evenCall" onclick="c(2)">'
            + '&nbsp;s&nbsp;</span>&nbsp;&nbsp;2<br />'
            + '4830672519E&nbsp;&nbsp;<span class="oddCall" onclick="c(3)">'
            + '&nbsp;-&nbsp;</span>&nbsp;&nbsp;3<br />'
            + '480735692E1&nbsp;&nbsp;<span class="evenCall" onclick="c(4)">'
            + '&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;4<br />'
        );
    });

});
