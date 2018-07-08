/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import AbstractContainer from '../../AbstractContainer';
import AbstractSix from '../../AbstractSix';
import BlockDirectory from '../../BlockDirectory';
import BlockOwnership from '../../BlockOwnership';
import Call from '../../Call';
import Quick from '../../Quick';
import Row from '../../Row';
import SixType from '../../SixType';
import Slow from '../../Slow';
import stringFromRow from '../../stringFromRow';
import { createTestRow } from '../../testFunctions.spec';

/**
 * Tests the template behaves like the parent version
 * @param factory  creates an instance of the object under test
 */
const testMbdAbstractSixTemplate = (
    factory: (initialRow: Row, _ownership?: BlockOwnership) => AbstractSix,
) => () => {

    describe('is derived from mbd template for AbstractSix and', () => {
        let six: AbstractSix;

        let type: string;

        beforeEach(() => {
            six = createTestSix(1);
            type = SixType[six.type].toLowerCase();
        });

        function createTestSix(index: number): AbstractSix {
            const container: AbstractContainer<AbstractSix> =
                jasmine.createSpyObj('AbstractContainer', ['notify']);

            return factory(
                createTestRow(),
                {'container': container, 'index': index},
            );
        }

        it('renders a six correctly', () => {
            expect(six.print('mbd')).toBe(
                '<span class="">'
                    + stringFromRow(six.getEnd())
                    + '</span>'
                    + '&nbsp;&nbsp;<span class="' + type
                    + 'Six" onclick="pricker.c(1)">'
                    + '&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;1<br />',
            );
        });

        it('displays bobbed sixes correctly', () => {
            six.setCall(Call.Bob);
            expect(six.print('mbd')).toBe(
                '<span class="">'
                    + stringFromRow(six.getEnd())
                    + '</span>'
                    + '&nbsp;&nbsp;<span class="' + type
                    + 'Six" onclick="pricker.c(1)">'
                    + '&nbsp;-&nbsp;</span>&nbsp;&nbsp;1<br />',
            );
        });

        it('displays singled sixes correctly', () => {
            six.setCall(Call.Single);
            expect(six.print('mbd')).toBe(
                '<span class="">'
                    + stringFromRow(six.getEnd())
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
                    + stringFromRow(six.getEnd())
                    + '</span>'
                    + '&nbsp;&nbsp;<span class="' + type
                    + 'Six" onclick="pricker.c(999)">'
                    + '&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;999<br />',
            );
        });

        it('highlights sixes based on a music directory', () => {
            const music = new BlockDirectory();

            music.add(2, 1);

            expect(six.print('mbd', {'music': music, 'courseIndex': 2})).toBe(
                '<span class="musicalBlock">'
                    + stringFromRow(six.getEnd())
                    + '</span>'
                    + '&nbsp;&nbsp;<span class="' + type
                    + 'Six" onclick="pricker.c(1)">'
                    + '&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;1<br />',
            );
        });

        it('highlights sixes based on a falseness directory', () => {
            const falseness = new BlockDirectory();

            falseness.add(2, 1);

            expect(
                six.print('mbd', {'falseness': falseness, 'courseIndex': 2}),
            ).toBe(
                '<span class="falseBlock">'
                    + stringFromRow(six.getEnd())
                    + '</span>'
                    + '&nbsp;&nbsp;<span class="' + type
                    + 'Six" onclick="pricker.c(1)">'
                    + '&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;1<br />',
            );
        });

        it('gives priority to falseness over music', () => {
            const falseness = new BlockDirectory(),
                music = new BlockDirectory();

            falseness.add(2, 1);
            music.add(2, 1);

            expect(six.print('mbd', {
                'falseness': falseness,
                'music': music,
                'courseIndex': 2,
            })).toBe(
                '<span class="falseBlock">'
                    + stringFromRow(six.getEnd())
                    + '</span>'
                    + '&nbsp;&nbsp;<span class="' + type
                    + 'Six" onclick="pricker.c(1)">'
                    + '&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;1<br />',
            );
        });

        it('can underline a sixend', () => {
            expect(six.print('mbd', {'underline': true})).toBe(
                '<span class=""><u>'
                    + stringFromRow(six.getEnd())
                    + '</u></span>'
                    + '&nbsp;&nbsp;<span class="' + type
                    + 'Six" onclick="pricker.c(1)">'
                    + '&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;1<br />',
            );
        });

        it('can display a six head as well as a six end', () => {
            expect(six.print('mbd', {'showSixHeads': true})).toBe(
                '<span class="">'
                    + stringFromRow(six.getHead())
                    + '</span>'
                    + '&nbsp;&nbsp;<span class="' + type
                    + 'Six" onclick="pricker.c(1)">'
                    + '&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;1<br />'
                    + '<span class=""><u>'
                    + stringFromRow(six.getEnd())
                    + '</u></span><br />',
            );
        });

    });

};

describe('mbd template for Quick six', testMbdAbstractSixTemplate(
    (initialRow, _ownership) => new Quick(initialRow, _ownership),
));

describe('mbd template for Slow six', testMbdAbstractSixTemplate(
    (initialRow, _ownership) => new Slow(initialRow, _ownership),
));
