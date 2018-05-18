/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

/// <reference path="functions.ts" />
/// <reference path="RandomAccessContainer.spec.ts" />
/// <reference path="Start.spec.ts" />

describe('Touch class', () => {

    const testRow = createTestRow();

    let touch;

    beforeEach(() => {
        touch = new Pricker.Touch(testRow);
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
        let visitor: Pricker.Visitor.StringArray;
        let strings: string[] = ['213547698E0', '2314567890E'];
        touch.insertBlock(1, new Pricker.Course(testRow));
        touch.insertBlock(2, new Pricker.Course(testRow));

        visitor = new Pricker.Visitor.StringArray();
        touch.getBlock(1).accept(visitor);
        touch.getBlock(2).accept(visitor);
        strings = strings.concat(visitor.getStrings());

        visitor = new Pricker.Visitor.StringArray();
        touch.accept(visitor);

        expect(visitor.getStrings()).toEqual(strings);
    });

    it('sets the type of six when inserting a course at the end', () => {
        const course1 = new Pricker.Course(testRow);
        const course2 = new Pricker.Course(testRow);
        course1.setLength(11);

        touch.insertCourse(1, course1);
        touch.insertCourse(2, course2);
        expect(touch.getBlock(2).getFirstSixType()).toBe(Pricker.SixType.Quick);
    });

    it('sets the type of six when inserting a course at the beginning', () => {
        const course1 = new Pricker.Course(testRow);
        const course2 = new Pricker.Course(testRow);
        course1.setLength(11);

        touch.insertCourse(1, course2);
        touch.insertCourse(1, course1);
        expect(touch.getBlock(2).getFirstSixType()).toBe(Pricker.SixType.Quick);
    });

    it('allows the start to be configured', () => {
        const start = new Pricker.Start(3, Pricker.SixType.Slow);
        touch.setStart(start);
        expect(touch.getStart().getRowIndex()).toBe(3);
        expect(touch.getStart().getSixType()).toBe(Pricker.SixType.Slow);
    });

    it('returns this when setting the start', () => {
        const start = new Pricker.Start(3, Pricker.SixType.Slow);
        expect(touch.setStart(start)).toBe(touch);
    });

    it('defaults to a standard start', () => {
        const start = touch.getStart();
        expect(start.getRowIndex()).toBe(4);
        expect(start.getSixType()).toBe(Pricker.SixType.Quick);
    });

    const runStartCases = (testFn: (start: Pricker.Start) => void) => () => {
        for (const startCase of START_CASES) {
            const start = new Pricker.Start(startCase[0], startCase[1]);
            start.setStage(testRow.length);
            testFn(start);

            // Clear out any course that may have been added
            if (touch.getLength()) {
                touch.deleteCourse(1);
            }
        }
    };

    it('propagates when adding courses', runStartCases((start) => {
        const course = new Pricker.Course(testRow);
        touch.setStart(start);
        touch.insertCourse(1, course);
        expect(touch.getCourse(1).getInitialRow()).toEqual(start.getLast());
    }));

    it('propagates when setting the start', runStartCases((start) => {
        const course = new Pricker.Course(testRow);
        touch.insertCourse(1, course);
        touch.setStart(start);
        expect(touch.getCourse(1).getInitialRow()).toEqual(start.getLast());
    }));

    it('includes the start when visiting rows', runStartCases((start) => {
        const startVisitor = new Pricker.Visitor.StringArray();
        const touchVisitor = new Pricker.Visitor.StringArray();

        touch.setStart(start);
        start.accept(startVisitor);
        touch.accept(touchVisitor);

        expect(touchVisitor.getStrings()).toEqual(startVisitor.getStrings());
    }));

    it('includes the start in the estimate of rows', runStartCases((start) => {
        touch.setStart(start);
        expect(touch.estimateRows()).toBe(start.estimateRows());
    }));

    describe('can create touches from strings:', () => {

        const testImport = (input: string, output: string) => () => {
            const imported = Pricker.Touch.fromString(input);
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

        it('a touch with no lines', () => {
            expect(() => {
                Pricker.Touch.fromString('');
            }).toThrowError('No input lines');
        });

        it('a touch with a broken initial row', () => {
            expect(() => {
                Pricker.Touch.fromString('not');
            }).toThrowError('Cannot recognise stage');
        });

        it('a touch with a broken course', () => {
            expect(() => {
                Pricker.Touch.fromString(
                    '2314567890E\n'
                        + 'garbage\n',
                );
            }).toThrowError('Cannot import course');
        });

    });

    testRandomAccessContainerImplementation(
        Pricker.Touch,
        [
            Pricker.Course.fromString(testRow, '32145678E90  1 s7'),
            Pricker.Course.fromString(testRow, '23145687E90  s7 s13 s15 s22'),
            Pricker.Course.fromString(
                testRow,
                '2314567890E  12 14 s16 17 18 19  (20 sixes)',
            ),
        ],
        2,
    );

});
