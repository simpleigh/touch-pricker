/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import Course from './Course';
import {
    testRandomAccessContainerImplementation,
} from './RandomAccessContainer.spec';
import SixType from './SixType';
import { createTestRow } from './testFunctions.spec';
import Touch from './Touch';
import { StringArray } from './Visitor';

const START_CASES: Array<[number, SixType]> = [
    [1, SixType.Quick],
    [2, SixType.Quick],
    [3, SixType.Quick],
    [4, SixType.Quick],
    [5, SixType.Quick],
    [6, SixType.Quick],
    [1, SixType.Slow],
    [2, SixType.Slow],
    [3, SixType.Slow],
    [4, SixType.Slow],
    [5, SixType.Slow],
    [6, SixType.Slow],
];

describe('Touch class', () => {

    const testRow = createTestRow('123');

    let touch: Touch;

    beforeEach(() => {
        touch = new Touch(testRow);
    });

    it('exposes getBlocks as getCourses', () => {
        expect(touch.getCourses).toBe(touch.getBlocks);
    });

    it('exposes getBlock as getCourse', () => {
        expect(touch.getCourse).toBe(touch.getBlock);
    });

    it('exposes insertBlock as insertCourse', () => {
        expect(touch.insertCourse).toBe(touch.insertBlock);
    });

    it('exposes deleteBlock as deleteCourse', () => {
        expect(touch.deleteCourse).toBe(touch.deleteBlock);
    });

    it('generates the correct rows when visited', () => {
        let visitor: StringArray;
        let strings: string[] = ['213547698E0', '2314567890E'];
        touch.insertBlock(1, new Course(testRow));
        touch.insertBlock(2, new Course(testRow));

        visitor = new StringArray();
        touch.getBlock(1).accept(visitor);
        touch.getBlock(2).accept(visitor);
        strings = strings.concat(visitor.getStrings());

        visitor = new StringArray();
        touch.accept(visitor);

        expect(visitor.getStrings()).toEqual(strings);
    });

    it('sets the type of six when inserting a course at the end', () => {
        const course1 = new Course(testRow);
        const course2 = new Course(testRow);
        course1.setLength(11);

        touch.insertCourse(1, course1);
        touch.insertCourse(2, course2);
        expect(touch.getBlock(2).getFirstSixType()).toBe(SixType.Quick);
    });

    it('sets the type of six when inserting a course at the beginning', () => {
        const course1 = new Course(testRow);
        const course2 = new Course(testRow);
        course1.setLength(11);

        touch.insertCourse(1, course2);
        touch.insertCourse(1, course1);
        expect(touch.getBlock(2).getFirstSixType()).toBe(SixType.Quick);
    });

    it('allows access to the start', () => {
        const start = touch.getStart();
        expect(start.getRowIndex()).toBe(4);
        expect(start.getSixType()).toBe(SixType.Quick);
    });

    type TestFunction = (rowIndex: number, sixType: SixType) => void;

    const runStartCases = (testFunction: TestFunction) => () => {
        for (const testCase of START_CASES) {
            testFunction(
                testCase[0],  // row index
                testCase[1],  // six type
            );

            // Clear out any course that may have been added
            if (touch.getLength()) {
                touch.deleteCourse(1);
            }
        }
    };

    it('propagates when adding courses', runStartCases(
        (rowIndex, sixType) => {
            const course = new Course(testRow);
            touch.getStart()
                .setRowIndex(rowIndex)
                .setSixType(sixType);
            touch.insertCourse(1, course);

            expect(touch.getCourse(1).getInitialRow())
                .toEqual(touch.getStart().getLast());
        },
    ));

    it('propagates when setting the start', runStartCases(
        (rowIndex, sixType) => {
            const course = new Course(testRow);
            touch.insertCourse(1, course);
            touch.getStart()
                .setRowIndex(rowIndex)
                .setSixType(sixType);

            expect(touch.getCourse(1).getInitialRow())
                .toEqual(touch.getStart().getLast());
        },
    ));

    it('includes the start when visiting rows', runStartCases(
        (rowIndex, sixType) => {
            const startVisitor = new StringArray();
            const touchVisitor = new StringArray();

            touch.getStart()
                .setRowIndex(rowIndex)
                .setSixType(sixType)
                .accept(startVisitor);
            touch.accept(touchVisitor);

            expect(touchVisitor.getStrings())
                .toEqual(startVisitor.getStrings());
        },
    ));

    it('includes the start in the estimate of rows', runStartCases(
        (rowIndex, sixType) => {
            touch.getStart()
                .setRowIndex(rowIndex)
                .setSixType(sixType);
            expect(touch.estimateRows()).toBe(touch.getStart().estimateRows());
        },
    ));

    describe('can create touches from strings:', () => {

        const testImport = (input: string, output: string) => () => {
            const imported = Touch.fromString(input);
            expect(imported.print('text')).toBe(output);
        };

        it('a simple touch', testImport(
            '2314567890E\n'
                + '2314567890E  1 s10 s13 22\n',
            '2314567890E\n'
                + '2314567890E  1 s10 s13 22\n',
        ));

        it('a touch with more than one course', testImport(
            '2314567890E\n'
                + '2314568790E  1 s10 s13 s15 22\n'
                + '2314567890E  1 s10 s13 s15 22\n',
            '2314567890E\n'
                + '2314568790E  1 s10 s13 s15 22\n'
                + '2314567890E  1 s10 s13 s15 22\n',
        ));

        it('a touch that comes round at hand', testImport(
            '2314567890E\n'
                + '21436578E90  1 5 7 8 10 11 s13 15 16  (20 sixes)\n'
                + '2143658709E  2 s13 s15\n'
                + '2143658709E  p\n',
            '2314567890E\n'
                + '21436578E90  1 5 7 8 10 11 s13 15 16  (20 sixes)\n'
                + '2143658709E  2 s13 s15\n'
                + '2143658709E  p\n',
        ));

        it('a touch with extra spacing', testImport(
            '\t 2314567890E\t \n'
                + '2314567890E  1 s10 s13 22\n',
            '2314567890E\n'
                + '2314567890E  1 s10 s13 22\n',
        ));

        it('a touch with a blank line', testImport(
            '2314567890E\n'
                + ' \t\n'
                + '2314567890E  1 s10 s13 22\n',
            '2314567890E\n'
                + '2314567890E  1 s10 s13 22\n',
        ));

        it('a touch with microsiril comments', testImport(
            '2314567890E\n'
                + '/2314567890E  1 s10 s13 22\n',
            '2314567890E\n'
                + '2314567890E  1 s10 s13 22\n',
        ));

        it('a touch with a "//" comment line', testImport(
            '2314567890E\n'
                + '// comment\n'
                + '2314567890E  1 s10 s13 22\n',
            '2314567890E\n'
                + '2314567890E  1 s10 s13 22\n',
        ));

        it('a touch with an included "//" comment', testImport(
            '2314567890E\n'
                + '2314567890E  1 s10 s13 22  // turn 78\n',
            '2314567890E\n'
                + '2314567890E  1 s10 s13 22\n',
        ));

        it('a touch with a start', testImport(
            '321547698E0\n'
                + '3765421E098  1 s10 s13 22\n'
                + 'Start from rounds as the third row of a slow six.\n',
            '321547698E0\n'
                + '3765421E098  1 s10 s13 22\n'
                + 'Start from rounds as the third row of a slow six.\n',
        ));

        it('a touch with no lines', () => {
            expect(() => {
                Touch.fromString('');
            }).toThrowError('No input lines');
        });

        it('a touch with a broken initial row', () => {
            expect(() => {
                Touch.fromString('not');
            }).toThrowError('Cannot recognise stage');
        });

        it('a touch with a broken course', () => {
            expect(() => {
                Touch.fromString(
                    '2314567890E\n'
                        + 'garbage\n',
                );
            }).toThrowError('Cannot import course');
        });

    });

    testRandomAccessContainerImplementation(
        (initialRow, _ownership) => new Touch(initialRow, _ownership),
        [
            Course.fromString(testRow, '32145678E90  1 s7'),
            Course.fromString(testRow, '23145687E90  s7 s13 s15 s22'),
            Course.fromString(
                testRow,
                '2314567890E  12 14 s16 17 18 19  (20 sixes)',
            ),
        ],
        (container) => (container as Touch).getStart().getLast(),
        2,
    );

});
