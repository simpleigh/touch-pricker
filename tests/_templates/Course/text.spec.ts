/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

describe('text template for Course', function () {

    function testRendering(input) {
        return function () {
            const stage: Pricker.Stage = Pricker.Stage.Cinques,
                initialRow: Pricker.Row = Pricker.rowFromString('231', stage),
                course: Pricker.Course = Pricker.Course.fromString(
                    initialRow,
                    input,
                );

            expect(course.print('text')).toBe(input + '\n');
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

});
