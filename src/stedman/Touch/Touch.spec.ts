/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import Touch from '.';
import {
    testRandomAccessContainerImplementation,
} from '../../blocks/RandomAccessContainer.spec';
import { createTestRow } from '../../testFunctions.spec';
import { StringArray } from '../../visitors';
import Course from '../Course';
import SixType from '../SixType';

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

    it('generates the correct rows when visited', () => {
        let strings: string[] = ['213547698E0', '2314567890E'];
        touch.insertBlock(1, new Course(testRow));
        touch.insertBlock(2, new Course(testRow));

        const blockVisitor = new StringArray();
        touch.getBlock(1).accept(blockVisitor);
        touch.getBlock(2).accept(blockVisitor);
        strings = strings.concat(blockVisitor.strings);

        const touchVisitor = new StringArray();
        touch.accept(touchVisitor);

        expect(touchVisitor.strings).toEqual(strings);
    });

    it('sets the type of six when inserting a course at the end', () => {
        const course1 = new Course(testRow);
        const course2 = new Course(testRow);
        course1.setLength(11);

        touch.insertBlock(1, course1);
        touch.insertBlock(2, course2);
        expect(touch.getBlock(2).firstSixType).toBe(SixType.Quick);
    });

    it('sets the type of six when inserting a course at the beginning', () => {
        const course1 = new Course(testRow);
        const course2 = new Course(testRow);
        course1.setLength(11);

        touch.insertBlock(1, course2);
        touch.insertBlock(1, course1);
        expect(touch.getBlock(2).firstSixType).toBe(SixType.Quick);
    });

    it('allows access to the start', () => {
        const start = touch.getStart();
        expect(start.rowIndex).toBe(4);
        expect(start.sixType).toBe(SixType.Quick);
    });

    type TestFunction = (rowIndex: number, sixType: SixType) => void;

    const runStartCases = (testFunction: TestFunction) => () => {
        for (const testCase of START_CASES) {
            testFunction(
                testCase[0],  // row index
                testCase[1],  // six type
            );

            // Clear out any course that may have been added
            if (touch.length) {
                touch.deleteBlock(1);
            }
        }
    };

    it('propagates when adding courses', runStartCases(
        (rowIndex, sixType) => {
            const course = new Course(testRow);
            touch.getStart().rowIndex = rowIndex;
            touch.getStart().sixType = sixType;
            touch.insertBlock(1, course);

            expect(touch.getBlock(1).initialRow)
                .toEqual(touch.getStart().getLast());
        },
    ));

    it('propagates when setting the start', runStartCases(
        (rowIndex, sixType) => {
            const course = new Course(testRow);
            touch.insertBlock(1, course);
            touch.getStart().rowIndex = rowIndex;
            touch.getStart().sixType = sixType;

            expect(touch.getBlock(1).initialRow)
                .toEqual(touch.getStart().getLast());
        },
    ));

    it('includes the start when visiting rows', runStartCases(
        (rowIndex, sixType) => {
            const startVisitor = new StringArray();
            const touchVisitor = new StringArray();

            touch.getStart().rowIndex = rowIndex;
            touch.getStart().sixType = sixType;
            touch.getStart().accept(startVisitor);
            touch.accept(touchVisitor);

            expect(touchVisitor.strings).toEqual(startVisitor.strings);
        },
    ));

    it('includes the start in the estimate of rows', runStartCases(
        (rowIndex, sixType) => {
            touch.getStart().rowIndex = rowIndex;
            touch.getStart().sixType = sixType;
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
