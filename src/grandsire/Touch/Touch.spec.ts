/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import {
    testRandomAccessContainerImplementation,
} from '../../blocks/RandomAccessContainer.spec';
import { rounds, Stage } from '../../rows';
import { Call } from '../../shared';
import { StringArray } from '../../visitors';
import Course from '../Course';
import Lead from '../Lead';
import Touch from '.';

describe('Grandsire Touch class', () => {

    testRandomAccessContainerImplementation(
        Stage.Doubles,
        (initialRow, _ownership) => {
            const testTouch = Touch.fromString(
                ''
                    + '12345\n'
                    + '13425  s2 3 s4  (4 leads)\n'
                    + '14235  s2 3 s4  (4 leads)\n'
                    + '12345  s2 3 s4  (4 leads)\n'
            )

            testTouch.initialRow = initialRow;
            if (_ownership) {
                testTouch.ownership = _ownership;
            }

            return testTouch;
        },
        120,
        3,
        Course.fromString(
            rounds(Stage.Doubles),
            '13425  s2 3 s4  (4 leads)',
        ),
    );

    it('generates the correct rows when visited', () => {
        const testRow = rounds(Stage.Doubles);
        const touch = new Touch(testRow);
        const course1 = new Course(testRow);
        const course2 = new Course(testRow);
        course1.setLength(2);
        course2.setLength(1);
        touch.insertBlock(1, course1);
        touch.insertBlock(2, course2);

        const blockVisitor = new StringArray();
        touch.getBlock(1).accept(blockVisitor);
        touch.getBlock(2).accept(blockVisitor);

        const touchVisitor = new StringArray();
        touch.accept(touchVisitor);

        expect(touchVisitor.strings).toEqual(blockVisitor.strings);
    });

    it('provides access to place notations by call', () => {
        for (let stage = 5; stage <= 15; stage += 2) {
            const lead = new Lead(rounds(stage));
            const touch = new Touch(rounds(stage));

            expect(touch.callNotations[Call.Plain]).toEqual(lead.notation);

            lead.setCall(Call.Bob);
            expect(touch.callNotations[Call.Bob]).toEqual(lead.notation);

            lead.setCall(Call.Single);
            expect(touch.callNotations[Call.Single]).toEqual(lead.notation);
        }
    });

    describe('can create touches from strings:', () => {

        const testImport = (
            input: string,
            output: string,
        ) => () => {
            const imported = Touch.fromString(input);
            expect(imported.print('text')).toBe(output);
        };

        it('a simple touch', testImport(
            '123456789\n'
                + '123456789  1 2 3 4  (4 leads)\n',
            '123456789\n'
                + '123456789  1 2 3 4  (4 leads)\n',
        ));

        it('a touch with more than one course', testImport(
            '123456789\n'
                + '132654789  1 2 s3 s4  (4 leads)\n'
                + '126458379  s2 3 4  (4 leads)\n'
                + '123456789  s1 s2 3 s5  (5 leads)\n',
            '123456789\n'
                + '132654789  1 2 s3 s4  (4 leads)\n'
                + '126458379  s2 3 4  (4 leads)\n'
                + '123456789  s1 s2 3 s5  (5 leads)\n',
        ));

        it('a touch that comes round at hand', testImport(
            '123456789\n'
                + '143926587  1 s2 s4  (4 leads)\n'
                + '145329876  s1 s2 4 s5  (5 leads)\n'
                + '132547698  s2 s3 s4  (5 leads)\n',
            '123456789\n'
                + '143926587  1 s2 s4  (4 leads)\n'
                + '145329876  s1 s2 4 s5  (5 leads)\n'
                + '132547698  s2 s3 s4  (5 leads)\n',
        ));

        it('a touch with extra spacing', testImport(
            '\t 123456789\t \n'
                + '123456789  1 2 3 4  (4 leads)\n',
            '123456789\n'
                + '123456789  1 2 3 4  (4 leads)\n',
        ));

        it('a touch with a blank line', testImport(
            '123456789\n'
                + ' \t\n'
                + '123456789  1 2 3 4  (4 leads)\n',
            '123456789\n'
                + '123456789  1 2 3 4  (4 leads)\n',
        ));

        it('a touch with microsiril comments', testImport(
            '123456789\n'
                + '/123456789  1 2 3 4  (4 leads)\n',
            '123456789\n'
                + '123456789  1 2 3 4  (4 leads)\n',
        ));

        it('a touch with a "//" comment line', testImport(
            '123456789\n'
                + '// comment \n'
                + '123456789  1 2 3 4  (4 leads)\n',
            '123456789\n'
                + '123456789  1 2 3 4  (4 leads)\n',
        ));

        it('a touch with an included "//" comment', testImport(
            '123456789\n'
                + '123456789  1 2 3 4  (4 leads)  // bob course\n',
            '123456789\n'
                + '123456789  1 2 3 4  (4 leads)\n',
        ));

        it('a touch with no lines', () => {
            expect(() => Touch.fromString('')).toThrowError('No input lines');
        });

        it('a touch with a broken initial row', () => {
            expect(() => Touch.fromString('not'))
                .toThrowError('Cannot recognise stage');
        });

        it('a touch with a broken course', () => {
            expect(() => Touch.fromString('123456789\n' + 'garbage\n'))
                .toThrowError('Cannot import course');
        });

    });

});
