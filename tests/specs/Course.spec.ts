/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="AbstractContainer.spec.ts" />

describe('Course class', function () {

    it('calculates sixes correctly', function () {
        const stage: Pricker.Stage = Pricker.Stage.Cinques,
            initialRow: Pricker.Row = Pricker.rowFromString('231', stage),
            course: Pricker.Course = new Pricker.Course(initialRow),
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

        course.getSix(1).setCall(Pricker.Call.Bob);
        course.getSix(10).setCall(Pricker.Call.Single);
        course.getSix(13).setCall(Pricker.Call.Single);
        course.getSix(22).setCall(Pricker.Call.Bob);

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
            course: Pricker.Course = new Pricker.Course(initialRow);

        let cloned: Pricker.Course;

        course.setLength(20);
        course.getSix(5).toggleCall();
        cloned = course.clone();

        expect(cloned.getLength()).toBe(course.getLength());
        expect(cloned.getEnd()).toEqual(course.getEnd());
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
