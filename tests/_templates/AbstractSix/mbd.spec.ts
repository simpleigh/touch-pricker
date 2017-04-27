/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

describe('mbd template for AbstractSix', function () {

    const testCases: any[] = [
        [
            '231',                  // Starting row
            Pricker.Stage.Cinques,  // Stage
            Pricker.Slow,           // Six under test
            1,                      // Container index
            Pricker.Call.Plain,     // Call
            '342618507E9&nbsp;&nbsp;<span class="oddCall" onclick="c(1)">'
                + '&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;1<br />',
        ],
        [
            '342618507E9',
            Pricker.Stage.Cinques,
            Pricker.Quick,
            2,
            Pricker.Call.Single,
            '3468201759E&nbsp;&nbsp;<span class="evenCall" onclick="c(2)">'
                + '&nbsp;s&nbsp;</span>&nbsp;&nbsp;2<br />',
        ],
        [
            '3468201759E',
            Pricker.Stage.Cinques,
            Pricker.Slow,
            3,
            Pricker.Call.Bob,
            '4830672519E&nbsp;&nbsp;<span class="oddCall" onclick="c(3)">'
                + '&nbsp;-&nbsp;</span>&nbsp;&nbsp;3<br />',
        ],
        [
            '4830672519E',
            Pricker.Stage.Cinques,
            Pricker.Quick,
            4,
            Pricker.Call.Plain,
            '480735692E1&nbsp;&nbsp;<span class="evenCall" onclick="c(4)">'
                + '&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;4<br />',
        ],
    ];

    it('renders a six correctly', function () {
        let i: number,
            row: Pricker.Row,
            six: Pricker.AbstractSix;

        for (i = 0; i < testCases.length; i += 1) {
            row = Pricker.rowFromString(testCases[i][0], testCases[i][1]);
            six = new testCases[i][2](row, undefined, testCases[i][3]);
            six.setCall(testCases[i][4]);

            expect(six.print('mbd')).toBe(testCases[i][5]);
        }
    });

});
