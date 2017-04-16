/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="AbstractContainer.spec.ts" />

describe('Touch class', function () {

    function createTestRow(input: string = '231'): Pricker.Row {
        return Pricker.rowFromString(input, Pricker.Stage.Cinques);
    }

    function testImport(input, output) {
        return function () {
            const touch: Pricker.Touch = Pricker.Touch.fromString(input);
            expect(touch.print('text')).toBe(output);
        };
    }

    it('generates the correct rows when visited', function () {
        const stage: Pricker.Stage = Pricker.Stage.Cinques,
            initialRow: Pricker.Row = Pricker.rowFromString('231', stage),
            touch: Pricker.Touch = new Pricker.Touch(initialRow);

        let visitor: Pricker.Visitor.StringArray,
            strings: string[] = [
                '213547698E0',
                '2314567890E',
            ];

        visitor = new Pricker.Visitor.StringArray();
        touch.setLength(1);
        touch.getCourse(1).accept(visitor);
        strings = strings.concat(visitor.getStrings());

        visitor = new Pricker.Visitor.StringArray();
        touch.accept(visitor);

        expect(visitor.getStrings()).toEqual(strings);
    });

    const COURSES_FOR_INSERT: string[] = [
        '',  // Blank entry for [0] so course indices will line up
        '32145678E90  1 s7\n',
        '23145687E90  s7 s13 s15 s22\n',
        '2314567890E  12 14 s16 17 18 19  (20 sixes)\n',
    ];

    it('starts out empty', function () {
        const touch: Pricker.Touch = new Pricker.Touch(createTestRow());
        expect(touch.getLength()).toBe(0);
    });

    it('can insert a new course', function () {
        const course: Pricker.Course = Pricker.Course.fromString(
                createTestRow(),
                COURSES_FOR_INSERT[1],
            ),
            touch: Pricker.Touch = Pricker.Touch.fromString('2314567890E');

        touch.insertCourse(1, course);
        expect(touch.getLength()).toBe(1);
        expect(touch.getEnd()).toEqual(touch.getCourse(1).getEnd());
        expect(touch.getCourse(1).print('text')).toBe(COURSES_FOR_INSERT[1]);
    });

    it('ignores the initial row when inserting a new course', function () {
        const course: Pricker.Course = Pricker.Course.fromString(
                createTestRow('13579E24680'),
                COURSES_FOR_INSERT[1],
            ),
            touch: Pricker.Touch = Pricker.Touch.fromString('2314567890E');

        touch.insertCourse(1, course);
        expect(touch.getEnd()).toEqual(touch.getCourse(1).getEnd());
        expect(touch.getCourse(1).print('text')).toBe(COURSES_FOR_INSERT[1]);
    });

    it('can insert a second course', function () {
        const course1: Pricker.Course = Pricker.Course.fromString(
                createTestRow(),
                COURSES_FOR_INSERT[1],
            ),
            course2: Pricker.Course = Pricker.Course.fromString(
                createTestRow(),
                COURSES_FOR_INSERT[2],
            ),
            touch: Pricker.Touch = Pricker.Touch.fromString('2314567890E');

        touch.insertCourse(1, course1);
        touch.insertCourse(2, course2);

        expect(touch.getLength()).toBe(2);
        expect(touch.getEnd()).toEqual(touch.getCourse(2).getEnd());
        expect(touch.getCourse(1).print('text')).toBe(COURSES_FOR_INSERT[1]);
        expect(touch.getCourse(2).print('text')).toBe(COURSES_FOR_INSERT[2]);
    });

    it('can insert a course at the beginning', function () {
        const course1: Pricker.Course = Pricker.Course.fromString(
                createTestRow(),
                COURSES_FOR_INSERT[1],
            ),
            course2: Pricker.Course = Pricker.Course.fromString(
                createTestRow(),
                COURSES_FOR_INSERT[2],
            ),
            touch: Pricker.Touch = Pricker.Touch.fromString('2314567890E');

        touch.insertCourse(1, course2);
        touch.insertCourse(1, course1);

        expect(touch.getEnd()).toEqual(touch.getCourse(2).getEnd());
        expect(touch.getCourse(1).print('text')).toBe(COURSES_FOR_INSERT[1]);
        expect(touch.getCourse(2).print('text')).toBe(COURSES_FOR_INSERT[2]);
    });

    it('can insert a course in the middle', function () {
        const course1: Pricker.Course = Pricker.Course.fromString(
                createTestRow(),
                COURSES_FOR_INSERT[1],
            ),
            course2: Pricker.Course = Pricker.Course.fromString(
                createTestRow(),
                COURSES_FOR_INSERT[2],
            ),
            course3: Pricker.Course = Pricker.Course.fromString(
                createTestRow(),
                COURSES_FOR_INSERT[3],
            ),
            touch: Pricker.Touch = Pricker.Touch.fromString('2314567890E');

        touch.insertCourse(1, course1);
        touch.insertCourse(2, course3);
        touch.insertCourse(2, course2);

        expect(touch.getEnd()).toEqual(touch.getCourse(3).getEnd());
        expect(touch.getCourse(1).print('text')).toBe(COURSES_FOR_INSERT[1]);
        expect(touch.getCourse(2).print('text')).toBe(COURSES_FOR_INSERT[2]);
        expect(touch.getCourse(3).print('text')).toBe(COURSES_FOR_INSERT[3]);
    });

    it('sets ownership correctly when inserting new courses', function () {
        const course1: Pricker.Course = Pricker.Course.fromString(
                createTestRow(),
                COURSES_FOR_INSERT[1],
            ),
            course2: Pricker.Course = Pricker.Course.fromString(
                createTestRow(),
                COURSES_FOR_INSERT[2],
            ),
            touch: Pricker.Touch = Pricker.Touch.fromString('2314567890E');

        touch.insertCourse(1, course1);
        touch.insertCourse(2, course2);

        expect(touch.getCourse(1).getOwnership()[0]).toBe(touch);
        expect(touch.getCourse(2).getOwnership()[0]).toBe(touch);

        expect(touch.getCourse(1).getOwnership()[1]).toBe(1);
        expect(touch.getCourse(2).getOwnership()[1]).toBe(2);
    });

    it('clears flags when inserting new courses', function () {
        const course: Pricker.Course = Pricker.Course.fromString(
                createTestRow(),
                COURSES_FOR_INSERT[1],
            ),
            touch: Pricker.Touch = Pricker.Touch.fromString('2314567890E');

        course.setFlag('test', true);
        touch.setFlag('test', true);

        touch.insertCourse(1, course);

        expect(course.dumpFlags()).toEqual({ });
        expect(touch.dumpFlags()).toEqual({ });
    });

    it('can delete a course from the end', function () {
        const course1: Pricker.Course = Pricker.Course.fromString(
                createTestRow(),
                COURSES_FOR_INSERT[1],
            ),
            course2: Pricker.Course = Pricker.Course.fromString(
                createTestRow(),
                COURSES_FOR_INSERT[2],
            ),
            touch: Pricker.Touch = Pricker.Touch.fromString('2314567890E');

        touch.insertCourse(1, course1);
        touch.insertCourse(2, course2);
        touch.deleteCourse(2);

        expect(touch.getLength()).toBe(1);
        expect(touch.getEnd()).toEqual(touch.getCourse(1).getEnd());
    });

    it('can delete a course from the middle', function () {
        const course1: Pricker.Course = Pricker.Course.fromString(
                createTestRow(),
                COURSES_FOR_INSERT[1],
            ),
            course2: Pricker.Course = Pricker.Course.fromString(
                createTestRow(),
                COURSES_FOR_INSERT[2],
            ),
            touch: Pricker.Touch = Pricker.Touch.fromString('2314567890E');

        touch.insertCourse(1, course2);  // This course will be removed,
        touch.insertCourse(2, course1);  // leaving only course1
        touch.deleteCourse(1);

        expect(touch.getEnd()).toEqual(touch.getCourse(1).getEnd());
        expect(touch.getCourse(1).print('text')).toBe(COURSES_FOR_INSERT[1]);
    });

    it('sets ownership correctly when deleting courses', function () {
        const course1: Pricker.Course = Pricker.Course.fromString(
                createTestRow(),
                COURSES_FOR_INSERT[1],
            ),
            course2: Pricker.Course = Pricker.Course.fromString(
                createTestRow(),
                COURSES_FOR_INSERT[2],
            ),
            touch: Pricker.Touch = Pricker.Touch.fromString('2314567890E');

        touch.insertCourse(1, course2);  // This course will be removed,
        touch.insertCourse(2, course1);  // leaving only course1
        touch.deleteCourse(1);

        expect(course1.getOwnership()[0]).toBe(touch);
        expect(course2.getOwnership()[0]).toBe(undefined);

        expect(course1.getOwnership()[1]).toBe(1);
        expect(course2.getOwnership()[1]).toBe(undefined);
    });

    it('clears flags when deleting courses', function () {
        const course: Pricker.Course = Pricker.Course.fromString(
                createTestRow(),
                COURSES_FOR_INSERT[1],
            ),
            touch: Pricker.Touch = Pricker.Touch.fromString('2314567890E');

        touch.insertCourse(1, course);

        touch.setFlag('test', true);

        touch.deleteCourse(1);

        expect(touch.dumpFlags()).toEqual({ });
    });

    describe('can create touches from strings:', function () {

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

        it('a touch with no lines', function () {
            expect(function () {
                Pricker.Touch.fromString('');
            }).toThrowError('No input lines');
        });

        it('a touch with a broken initial row', function () {
            expect(function () {
                Pricker.Touch.fromString('not');
            }).toThrowError('Cannot recognise stage');
        });

        it('a touch with a broken course', function () {
            expect(function () {
                Pricker.Touch.fromString(
                    '2314567890E\n'
                        + 'garbage\n',
                );
            }).toThrowError('Cannot import course');
        });

    });

    testAbstractContainerImplementation(
        Pricker.Touch,
        'getCourse',
        [
            [Pricker.Stage.Triples, 0],
            [Pricker.Stage.Caters, 0],
            [Pricker.Stage.Cinques, 0],
            [Pricker.Stage.Sextuples, 0],
            [Pricker.Stage.Septuples, 0],
        ],
        [0, 100],
    );
});
