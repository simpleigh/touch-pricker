/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

/// <reference path="../../functions.ts" />

/**
 * Tests the template behaves like the parent version
 * @param Six   six to test
 */
// tslint:disable-next-line:variable-name
function testMbdAbstractSixTemplate(Six) {

    describe('is derived from mbd template for AbstractSix and', () => {
        let six;

        let type: string;

        beforeEach(() => {
            six = createTestSix(1);
            type = Pricker.SixType[six.type].toLowerCase();
        });

        function createTestSix(index: number): typeof Six {
            const container: Pricker.AbstractContainer<typeof Six> =
                    jasmine.createSpyObj('AbstractContainer', ['notify']);

            return new Six(
                createTestRow(),
                {'container': container, 'index': index},
            );
        }

        it('renders a six correctly', () => {
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
            six = createTestSix(999);
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
            const music = new Pricker.BlockDirectory();

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
            const falseness = new Pricker.BlockDirectory();

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
            const falseness = new Pricker.BlockDirectory(),
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
            expect(six.print('mbd', {'showSixHeads': true})).toBe(
                '<span class="">'
                    + Pricker.stringFromRow(six.getHead())
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

describe('mbd template for Quick six', () => {
    testMbdAbstractSixTemplate(Pricker.Quick);
});

describe('mbd template for Slow six', () => {
    testMbdAbstractSixTemplate(Pricker.Slow);
});
