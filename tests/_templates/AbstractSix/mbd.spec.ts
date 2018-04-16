/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../../functions.ts" />

/**
 * Tests the template behaves like the parent version
 * @param Six   six to test
 * @param type  six type
 */
// tslint:disable-next-line:variable-name
function testMbdAbstractSixTemplate(Six, type: string) {

    describe('is derived from mbd template for AbstractSix and', () => {

        function createTestSix(index: number): typeof Six {
            const container: Pricker.AbstractContainer<typeof Six> =
                    jasmine.createSpyObj('AbstractContainer', ['notify']);

            return new Six(
                createTestRow(),
                {'container': container, 'index': index},
            );
        }

        it('renders a six correctly', () => {
            const six = createTestSix(1);
            expect(six.print('mbd')).toBe(
                '<span class="">'
                    + Pricker.stringFromRow(six.getEnd())
                    + '</span>'
                    + '&nbsp;&nbsp;<span class="' + type
                    + 'Six" onclick="pricker.c(1)">'
                    + '&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;1<br />',
            );
        });

        it('displays bobbed sixes correctly', () => {
            const six = createTestSix(1);
            six.setCall(Pricker.Call.Bob);
            expect(six.print('mbd')).toBe(
                '<span class="">'
                    + Pricker.stringFromRow(six.getEnd())
                    + '</span>'
                    + '&nbsp;&nbsp;<span class="' + type
                    + 'Six" onclick="pricker.c(1)">'
                    + '&nbsp;-&nbsp;</span>&nbsp;&nbsp;1<br />',
            );
        });

        it('displays singled sixes correctly', () => {
            const six = createTestSix(1);
            six.setCall(Pricker.Call.Single);
            expect(six.print('mbd')).toBe(
                '<span class="">'
                    + Pricker.stringFromRow(six.getEnd())
                    + '</span>'
                    + '&nbsp;&nbsp;<span class="' + type
                    + 'Six" onclick="pricker.c(1)">'
                    + '&nbsp;s&nbsp;</span>&nbsp;&nbsp;1<br />',
            );
        });

        it('displays the index correctly', () => {
            const six = createTestSix(999);
            expect(six.print('mbd')).toBe(
                '<span class="">'
                    + Pricker.stringFromRow(six.getEnd())
                    + '</span>'
                    + '&nbsp;&nbsp;<span class="' + type
                    + 'Six" onclick="pricker.c(999)">'
                    + '&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;999<br />',
            );
        });

        it('highlights sixes based on a music directory', () => {
            const six = createTestSix(1),
                music = new Pricker.BlockDirectory();

            music.add(2, 1);

            expect(six.print('mbd', {'music': music, 'courseIndex': 2})).toBe(
                '<span class="musicalBlock">'
                    + Pricker.stringFromRow(six.getEnd())
                    + '</span>'
                    + '&nbsp;&nbsp;<span class="' + type
                    + 'Six" onclick="pricker.c(1)">'
                    + '&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;1<br />',
            );
        });

        it('highlights sixes based on a falseness directory', () => {
            const six = createTestSix(1),
                falseness = new Pricker.BlockDirectory();

            falseness.add(2, 1);

            expect(
                six.print('mbd', {'falseness': falseness, 'courseIndex': 2}),
            ).toBe(
                '<span class="falseBlock">'
                    + Pricker.stringFromRow(six.getEnd())
                    + '</span>'
                    + '&nbsp;&nbsp;<span class="' + type
                    + 'Six" onclick="pricker.c(1)">'
                    + '&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;1<br />',
            );
        });

        it('gives priority to falseness over music', () => {
            const six = createTestSix(1),
                falseness = new Pricker.BlockDirectory(),
                music = new Pricker.BlockDirectory();

            falseness.add(2, 1);
            music.add(2, 1);

            expect(six.print('mbd', {
                'falseness': falseness,
                'music': music,
                'courseIndex': 2,
            })).toBe(
                '<span class="falseBlock">'
                    + Pricker.stringFromRow(six.getEnd())
                    + '</span>'
                    + '&nbsp;&nbsp;<span class="' + type
                    + 'Six" onclick="pricker.c(1)">'
                    + '&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;1<br />',
            );
        });

        it('can underline a sixend', () => {
            const six = createTestSix(1);
            expect(six.print('mbd', {'underline': true})).toBe(
                '<span class=""><u>'
                    + Pricker.stringFromRow(six.getEnd())
                    + '</u></span>'
                    + '&nbsp;&nbsp;<span class="' + type
                    + 'Six" onclick="pricker.c(1)">'
                    + '&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;1<br />',
            );
        });

        it('can display a six head as well as a six end', () => {
            const six = createTestSix(1);
            expect(six.print('mbd', {'showSixHeads': true})).toBe(
                '<span class="">'
                    + Pricker.stringFromRow(six.getStartRow())
                    + '</span>'
                    + '&nbsp;&nbsp;<span class="' + type
                    + 'Six" onclick="pricker.c(1)">'
                    + '&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;1<br />'
                    + '<span class=""><u>'
                    + Pricker.stringFromRow(six.getEnd())
                    + '</u></span><br />',
            );
        });

    });

}
