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
import Touch from '.';

describe('Grandsire Touch class', () => {

    const createTestCourse = () => {
        const testCourse = new Course(rounds(Stage.Doubles));
        testCourse.setLength(4);
        testCourse.getBlock(1).call = Call.Plain;
        testCourse.getBlock(2).call = Call.Single;
        testCourse.getBlock(3).call = Call.Bob;
        testCourse.getBlock(4).call = Call.Single;
        return testCourse;
    };

    testRandomAccessContainerImplementation(
        Stage.Doubles,
        (initialRow, _ownership) => {
            const testTouch = new Touch(initialRow, _ownership);
            testTouch.insertBlock(1, createTestCourse());
            testTouch.insertBlock(2, createTestCourse());
            testTouch.insertBlock(3, createTestCourse());
            return testTouch;
        },
        120,
        3,
        createTestCourse(),
    );

    it('generates the correct rows when visited', () => {
        const touch = new Touch(rounds(Stage.Doubles));
        const course1 = createTestCourse();
        const course2 = createTestCourse();
        touch.insertBlock(1, course1);
        touch.insertBlock(2, course2);

        const blockVisitor = new StringArray();
        touch.getBlock(1).accept(blockVisitor);
        touch.getBlock(2).accept(blockVisitor);

        const touchVisitor = new StringArray();
        touch.accept(touchVisitor);

        expect(touchVisitor.strings).toEqual(blockVisitor.strings);
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
