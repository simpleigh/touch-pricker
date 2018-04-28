/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

/// <reference path="functions.ts" />
/// <reference path="AbstractContainer.spec.ts" />

describe('Course class', () => {

    function testImport(input, output) {
        return () => {
            expect(
                Pricker.Course.fromString(createTestRow(), input).print('text'),
            ).toBe(output);
        };
    }

    it('provides a getEnd method for convenience', () => {
        const course = new Pricker.Course(createTestRow());
        expect(course.getEnd()).toEqual(course.getLast());
    });

    it('calculates sixes correctly', () => {
        const course = Pricker.Course.fromString(
                    createTestRow(),
                    '2314567890E  1 s10 s13 22',
                ),
            expectedSixEnds: string[] = [
                '3426185970E',
                '346829105E7',
                '4839602E175',
                '48903E67251',
                '804E9735612',
                '80E74591326',
                '0785E142963',
                '075182E6439',
                '71025683E94',
                '7126035E849',
                '16732E04598',
                '163E7429085',
                '6E143970258',
                '6E491035782',
                'E9604518327',
                'E9056842173',
                '95E80267431',
                '9582E703614',
                '529783E1046',
                '52739184E60',
                '2351749680E',
                '2314567890E',
            ];

        let index: number;

        for (index = 0; index < 22; index += 1) {
            expect(Pricker.stringFromRow(course.getSix(index + 1).getEnd()))
                .toBe(expectedSixEnds[index]);
        }
    });

    it('starts out with a slow six by default', () => {
        const course = new Pricker.Course(createTestRow());
        expect(course.getFirstSixType()).toBe(Pricker.SixType.Slow);
    });

    it('can change the parity of its sixes', () => {
        const course = new Pricker.Course(createTestRow());
        course.setFirstSixType(Pricker.SixType.Quick);
        expect(course.getFirstSixType()).toBe(Pricker.SixType.Quick);
    });

    it('recalculates when the parity is changed', () => {
        const course = new Pricker.Course(createTestRow());
        course.setLength(2);

        course.setFirstSixType(Pricker.SixType.Quick);
        expect(course.getSix(1).getEnd()).toEqual(createTestRow('234618507E9'));
        expect(course.getSix(2).getEnd()).toEqual(createTestRow('3628401E597'));
    });

    it('maintains the parity when adding sixes to the course', () => {
        const course = new Pricker.Course(createTestRow());
        course.setLength(2);
        course.setFirstSixType(Pricker.SixType.Quick);

        course.setLength(4);
        expect(course.getSix(3).getEnd()).toEqual(createTestRow('36802E49175'));
        expect(course.getSix(4).getEnd()).toEqual(createTestRow('603E8927451'));
    });

    it('maintains calls correctly when the parity is changed', () => {
        const course = new Pricker.Course(createTestRow());
        course.setLength(4);
        course.getSix(2).setCall(Pricker.Call.Single);
        course.getSix(3).setCall(Pricker.Call.Bob);

        course.setFirstSixType(Pricker.SixType.Quick);
        expect(course.getSix(2).getCall()).toBe(Pricker.Call.Single);
        expect(course.getSix(3).getCall()).toBe(Pricker.Call.Bob);

        expect(course.getSix(1).getEnd()).toEqual(createTestRow('234618507E9'));
        expect(course.getSix(2).getEnd()).toEqual(createTestRow('3628401759E'));
        expect(course.getSix(3).getEnd()).toEqual(createTestRow('3680274519E'));
        expect(course.getSix(4).getEnd()).toEqual(createTestRow('603785294E1'));
    });

    it('can be reset to the default length', () => {
        const course = new Pricker.Course(createTestRow());
        course.setLength(20);
        course.resetLength();
        expect(course.getLength()).toBe(22);
    });

    it('returns this when resetting the length', () => {
        const course = new Pricker.Course(createTestRow());
        expect(course.resetLength()).toBe(course);
    });

    it('can be reset to a plain course', () => {
        const course = new Pricker.Course(createTestRow());
        course.getSix(5).toggleCall();
        course.resetCalls();
        expect(course.getSix(5).getCall()).toBe(Pricker.Call.Plain);
    });

    it('returns this when resetting the calls', () => {
        const course = new Pricker.Course(createTestRow());
        expect(course.resetCalls()).toBe(course);
    });

    it('only calls notify once when resetting the calls', () => {
        const container = jasmine.createSpyObj('Notifiable', ['notify']),
            course = new Pricker.Course(
                createTestRow(),
                {'container': container, 'index': 1},
            );

        course.resetCalls();
        expect(container.notify).toHaveBeenCalledTimes(1);
    });

    it('starts out as a plain course', () => {
        const course = new Pricker.Course(createTestRow());
        expect(course.isPlain()).toBe(true);
    });

    it('knows when it is not a plain course', () => {
        const course = new Pricker.Course(createTestRow());
        course.getSix(5).toggleCall();
        expect(course.isPlain()).toBe(false);
    });

    it('can be cloned', () => {
        const course = new Pricker.Course(createTestRow());
        let cloned: Pricker.Course;

        course.setLength(20);
        course.getSix(5).toggleCall();
        cloned = course.clone();

        expect(cloned.getLength()).toBe(course.getLength());
        expect(cloned.getLast()).toEqual(course.getLast());
    });

    it('ignores changes to the cloned course', () => {
        const course = new Pricker.Course(createTestRow()),
            getLengthBackup = course.getLength(),
            getLastBackup = course.getLast(),
            cloned = course.clone();

        cloned.setLength(20);
        cloned.getSix(5).toggleCall();

        expect(cloned.getLength()).not.toBe(course.getLength());
        expect(cloned.getLast()).not.toEqual(course.getLast());

        expect(course.getLength()).toBe(getLengthBackup);
        expect(course.getLast()).toEqual(getLastBackup);
    });

    it('generates the correct rows when visited', () => {
        const course = new Pricker.Course(createTestRow());

        let visitor: Pricker.Visitor.StringArray,
            index: number,
            strings: string[] = [ ];

        for (index = 1; index <= course.getLength(); index += 1) {
            visitor = new Pricker.Visitor.StringArray();
            course.getSix(index).accept(visitor);
            strings = strings.concat(visitor.getStrings());
        }

        visitor = new Pricker.Visitor.StringArray();
        course.accept(visitor);

        expect(visitor.getStrings()).toEqual(strings);
    });

    describe('can create courses from strings:', () => {

        it('a simple course ending in rounds', testImport(
            '2314567890E  1 s10 s13 22',
            '2314567890E  1 s10 s13 22',
        ));

        it('a course with singles marked after the six number', testImport(
            '2314567890E  1 10s 13s 22',
            '2314567890E  1 s10 s13 22',
        ));

        it('a course with calls separated with "."s', testImport(
            '2314567890E  1.s10. s13 .22',
            '2314567890E  1 s10 s13 22',
        ));

        it('a course with calls separated with ","s', testImport(
            '2314567890E  1,s10, s13 ,22',
            '2314567890E  1 s10 s13 22',
        ));

        it('a more complex course', testImport(
            '23145768E90  1 s6 s17 s19',
            '23145768E90  1 s6 s17 s19',
        ));

        it('a short course', testImport(
            '21436578E90  1 5 7 8 10 11 s13 15 16  (20 sixes)',
            '21436578E90  1 5 7 8 10 11 s13 15 16  (20 sixes)',
        ));

        it('a short course with concise length description', testImport(
            '21436578E90  1 5 7 8 10 11 s13 15 16  (20)',
            '21436578E90  1 5 7 8 10 11 s13 15 16  (20 sixes)',
        ));

        it('a short course with odd length description', testImport(
            '21436578E90  1 5 7 8 10 11 s13 15 16  (20-em ù sixen)',
            '21436578E90  1 5 7 8 10 11 s13 15 16  (20 sixes)',
        ));

        it('a plain course', testImport(
            'p (8)',
            'E7518296430  p  (8 sixes)',
        ));

        it('a string with extra spacing', testImport(
            ' \t\r\n2314567890E  \t\r\n1 s10  \t\r\ns13 22 \t\r\n',
            '2314567890E  1 s10 s13 22',
        ));

        it('a string with a broken course end', testImport(
            'abcdefgh  1 s10 s13 22',
            '2314567890E  1 s10 s13 22',
        ));

        it('a string with a short course end', testImport(
            '231  1 s10 s13 22',
            '2314567890E  1 s10 s13 22',
        ));

        it('a string without a course end', testImport(
            '1 s10 s13 22',
            '2314567890E  1 s10 s13 22',
        ));

        it('a broken course (that raises an error)', () => {
            expect(() => {
                Pricker.Course.fromString(createTestRow(), 'garbage');
            }).toThrowError('Cannot import course');
        });
    });

    testAbstractContainerImplementation(
        Pricker.Course,
        'getSixes',
        'getSix',
        [
            [Pricker.Stage.Triples, 14],
            [Pricker.Stage.Caters, 18],
            [Pricker.Stage.Cinques, 22],
            [Pricker.Stage.Sextuples, 26],
            [Pricker.Stage.Septuples, 30],
        ],
        [2, 60],
        132,
    );
});
