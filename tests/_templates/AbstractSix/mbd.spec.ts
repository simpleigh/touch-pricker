/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../../functions.ts" />

/**
 * Tests the template behaves like the parent version
 * @param {AbstractSix}  Six - six to test
 */
// tslint:disable-next-line:variable-name
function testAbstractTemplateImplementation(Six) {

    describe('is derived from mbd template for AbstractSix and', function () {

        it('renders a six correctly', function () {
            const six = new Six(createTestRow(), undefined, 1);
            expect(six.print('mbd')).toBe(
                Pricker.stringFromRow(six.getEnd())
                    + '&nbsp;&nbsp;<span class="oddCall" onclick="c(1)">'
                    + '&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;1<br />',
            );
        });

        it('displays bobbed sixes correctly', function () {
            const six = new Six(createTestRow(), undefined, 1);
            six.setCall(Pricker.Call.Bob);
            expect(six.print('mbd')).toBe(
                Pricker.stringFromRow(six.getEnd())
                    + '&nbsp;&nbsp;<span class="oddCall" onclick="c(1)">'
                    + '&nbsp;-&nbsp;</span>&nbsp;&nbsp;1<br />',
            );
        });

        it('displays singled sixes correctly', function () {
            const six = new Six(createTestRow(), undefined, 1);
            six.setCall(Pricker.Call.Single);
            expect(six.print('mbd')).toBe(
                Pricker.stringFromRow(six.getEnd())
                    + '&nbsp;&nbsp;<span class="oddCall" onclick="c(1)">'
                    + '&nbsp;s&nbsp;</span>&nbsp;&nbsp;1<br />',
            );
        });

        it('displays the index correctly', function () {
            const six = new Six(createTestRow(), undefined, 999);
            expect(six.print('mbd')).toBe(
                Pricker.stringFromRow(six.getEnd())
                    + '&nbsp;&nbsp;<span class="oddCall" onclick="c(999)">'
                    + '&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;999<br />',
            );
        });

        it('uses a different style for even sixes', function () {
            const six = new Six(createTestRow(), undefined, 2);
            expect(six.print('mbd')).toBe(
                Pricker.stringFromRow(six.getEnd())
                    + '&nbsp;&nbsp;<span class="evenCall" onclick="c(2)">'
                    + '&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;2<br />',
            );
        });

    });

}
