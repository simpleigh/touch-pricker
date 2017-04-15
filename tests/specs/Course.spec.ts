/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="AbstractContainer.spec.ts" />

describe('Course class', function () {

    function testImport(input, output) {
        return function () {
            const stage: Pricker.Stage = Pricker.Stage.Cinques,
                initialRow: Pricker.Row = Pricker.rowFromString('231', stage),
                course: Pricker.Course = Pricker.Course.fromString(
                    initialRow,
                    input,
                );

            // Slice off '\n' when comparing
            expect(course.print('text').slice(0, -1)).toBe(output);
        };
    }

    it('calculates sixes correctly', function () {
        const stage: Pricker.Stage = Pricker.Stage.Cinques,
            initialRow: Pricker.Row = Pricker.rowFromString('231', stage),
            course: Pricker.Course = Pricker.Course.fromString(
                initialRow,
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

    it('starts out as a plain course', function () {
        const stage: Pricker.Stage = Pricker.Stage.Cinques,
            initialRow: Pricker.Row = Pricker.rowFromString('231', stage),
            course: Pricker.Course = new Pricker.Course(initialRow);

        expect(course.isPlain()).toBe(true);
    });

    it('can return when it is not a plain course', function () {
        const stage: Pricker.Stage = Pricker.Stage.Cinques,
            initialRow: Pricker.Row = Pricker.rowFromString('231', stage),
            course: Pricker.Course = new Pricker.Course(initialRow);

        course.getSix(10).setCall(Pricker.Call.Bob);

        expect(course.isPlain()).toBe(false);
    });

    it('can be cloned', function () {
        const stage: Pricker.Stage = Pricker.Stage.Cinques,
            initialRow: Pricker.Row = Pricker.rowFromString('231', stage),
            input: string = '217395E4068  5  (20 sixes)\n',
            course: Pricker.Course = Pricker.Course.fromString(
                initialRow,
                input,
            ),
            cloned: Pricker.Course = course.clone();

        expect(cloned.print('text')).toBe(input);
    });

    it('copies course flags across while being cloned', function () {
        const stage: Pricker.Stage = Pricker.Stage.Cinques,
            initialRow: Pricker.Row = Pricker.rowFromString('231', stage),
            course: Pricker.Course = new Pricker.Course(initialRow);

        let cloned: Pricker.Course;

        course.setFlag('test', true, false);
        cloned = course.clone();

        expect(cloned.getFlag('test')).toBe(true);
    });

    it('copies six flags across while being cloned', function () {
        const stage: Pricker.Stage = Pricker.Stage.Cinques,
            initialRow: Pricker.Row = Pricker.rowFromString('231', stage),
            course: Pricker.Course = new Pricker.Course(initialRow);

        let cloned: Pricker.Course;

        course.getSix(3).setFlag('test', true, false);
        cloned = course.clone();

        expect(cloned.getSix(3).getFlag('test')).toBe(true);
    });

    it('ignores changes to the cloned course', function () {
        const stage: Pricker.Stage = Pricker.Stage.Cinques,
            initialRow: Pricker.Row = Pricker.rowFromString('231', stage),
            course: Pricker.Course = new Pricker.Course(initialRow),
            getLengthBackup: number = course.getLength(),
            getEndBackup: Pricker.Row = course.getEnd(),
            cloned: Pricker.Course = course.clone();

        cloned.setLength(20);
        cloned.getSix(5).toggleCall();

        expect(cloned.getLength()).not.toBe(course.getLength());
        expect(cloned.getEnd()).not.toEqual(course.getEnd());

        expect(course.getLength()).toBe(getLengthBackup);
        expect(course.getEnd()).toEqual(getEndBackup);
    });

    it('generates the correct rows when visited', function () {
        const stage: Pricker.Stage = Pricker.Stage.Cinques,
            initialRow: Pricker.Row = Pricker.rowFromString('231', stage),
            course: Pricker.Course = new Pricker.Course(initialRow);

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

    it('passes whether it is a plain course to templates', function () {
        const stage: Pricker.Stage = Pricker.Stage.Cinques,
            initialRow: Pricker.Row = Pricker.rowFromString('231', stage),
            course: Pricker.Course = new Pricker.Course(initialRow),
            testTemplateSpy = jasmine.createSpy('test');
        let data: any;

        course.getSix(10).setCall(Pricker.Call.Bob);

        Pricker.Templates['Course.test'] = testTemplateSpy;
        course.print('test');

        data = testTemplateSpy.calls.argsFor(0)[0];
        expect(data.isPlain).toBe(false);

        delete Pricker.Templates['Course.test'];
    });

    describe('can create courses from strings:', function () {

        it('a simple course ending in rounds', testImport(
            '2314567890E  1 s10 s13 22',
            '2314567890E  1 s10 s13 22',
        ));

        it('a course with singles marked after the six number', testImport(
            '2314567890E  1 10s 13s 22',
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

        it('a string without a course end', testImport(
            '1 s10 s13 22',
            '2314567890E  1 s10 s13 22',
        ));

        it('a broken course (that raises an error)', function () {
            const stage: Pricker.Stage = Pricker.Stage.Cinques,
                initialRow: Pricker.Row = Pricker.rowFromString('231', stage);

            expect(function () {
                Pricker.Course.fromString(initialRow, 'garbage');
            }).toThrowError('Cannot import course');
        });
    });

    testAbstractContainerImplementation(
        Pricker.Course,
        'getSix',
        [
            [Pricker.Stage.Triples, 14],
            [Pricker.Stage.Caters, 18],
            [Pricker.Stage.Cinques, 22],
            [Pricker.Stage.Sextuples, 26],
            [Pricker.Stage.Septuples, 30],
        ],
        [2, 60],
    );
});
