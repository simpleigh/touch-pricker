/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

/// <reference path="functions.ts" />
/// <reference path="SerialContainer.spec.ts" />

describe('Course class', () => {

    const testRow = createTestRow();

    let course;

    beforeEach(() => {
        course = new Pricker.Course(testRow);
    });

    it('exposes getLast as getEnd', () => {
        expect(course.getEnd).toBe(course.getLast);
    });

    it('exposes getBlocks as getSixes', () => {
        expect(course.getSixes).toBe(course.getBlocks);
    });

    it('exposes getBlock as getSix', () => {
        expect(course.getSix).toBe(course.getBlock);
    });

    it('starts out with a slow six by default', () => {
        expect(course.getFirstSixType()).toBe(Pricker.SixType.Slow);
        expect(course.getBlock(1).type).toBe(Pricker.SixType.Slow);
    });

    it('alternates six types throughout', () => {
        for (let index = 1; index <= 22; index += 1) {
            if (index % 2) {
                expect(course.getBlock(index).type).toBe(Pricker.SixType.Slow);
            } else {
                expect(course.getBlock(index).type).toBe(Pricker.SixType.Quick);
            }
        }
    });

    it('can change the parity of its sixes', () => {
        course.setFirstSixType(Pricker.SixType.Quick);
        expect(course.getFirstSixType()).toBe(Pricker.SixType.Quick);
        for (let index = 1; index <= 22; index += 1) {
            if (index % 2) {
                expect(course.getBlock(index).type).toBe(Pricker.SixType.Quick);
            } else {
                expect(course.getBlock(index).type).toBe(Pricker.SixType.Slow);
            }
        }
    });

    it('calculates sixes correctly', () => {
        course = Pricker.Course.fromString(testRow, '2314567890E 1 s10 s13 22');
        const expectedSixEnds: string[] = [
            '',  // blank entry so indices line up
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

        for (let index = 1; index <= 22; index += 1) {
            expect(Pricker.stringFromRow(course.getBlock(index).getEnd()))
                .toBe(expectedSixEnds[index]);
        }
    });

    it('recalculates when the parity is changed', () => {
        course.setLength(2);
        course.setFirstSixType(Pricker.SixType.Quick);
        expect(course.getSix(1).getEnd()).toEqual(createTestRow('234618507E9'));
        expect(course.getSix(2).getEnd()).toEqual(createTestRow('3628401E597'));
    });

    it('maintains the parity when adding sixes to the course', () => {
        course.setLength(2);
        course.setFirstSixType(Pricker.SixType.Quick);

        course.setLength(4);
        expect(course.getSix(3).getEnd()).toEqual(createTestRow('36802E49175'));
        expect(course.getSix(4).getEnd()).toEqual(createTestRow('603E8927451'));
    });

    it('maintains calls correctly when the parity is changed', () => {
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
        course.setLength(20);
        course.resetLength();
        expect(course.getLength()).toBe(22);
    });

    it('returns this when resetting the length', () => {
        expect(course.resetLength()).toBe(course);
    });

    it('can be reset to a plain course', () => {
        course.getSix(5).toggleCall();
        course.resetCalls();
        expect(course.getSix(5).getCall()).toBe(Pricker.Call.Plain);
    });

    it('returns this when resetting the calls', () => {
        expect(course.resetCalls()).toBe(course);
    });

    it('only calls notify once when resetting the calls', () => {
        const container = jasmine.createSpyObj('Notifiable', ['notify']);
        course.setOwnership({ 'container': container, 'index': 1 });
        course.resetCalls();
        expect(container.notify).toHaveBeenCalledTimes(1);
    });

    it('starts out as a plain course', () => {
        expect(course.isPlain()).toBe(true);
    });

    it('knows when it is not a plain course', () => {
        course.getSix(5).toggleCall();
        expect(course.isPlain()).toBe(false);
    });

    it('can be cloned', () => {
        course.setLength(20);
        course.setFirstSixType(Pricker.SixType.Quick);
        course.getSix(5).toggleCall();

        const cloned = course.clone();
        expect(cloned.getLength()).toBe(course.getLength());
        expect(cloned.getFirstSixType()).toBe(course.getFirstSixType());
        expect(cloned.getLast()).toEqual(course.getLast());
    });

    it('ignores changes to the cloned course', () => {
        const getLengthBackup = course.getLength();
        const getLastBackup = course.getLast();
        const cloned = course.clone();

        cloned.setLength(20);
        cloned.getSix(5).toggleCall();

        expect(cloned.getLength()).not.toBe(course.getLength());
        expect(cloned.getLast()).not.toEqual(course.getLast());

        expect(course.getLength()).toBe(getLengthBackup);
        expect(course.getLast()).toEqual(getLastBackup);
    });

    it('generates the correct rows when visited', () => {
        let visitor: Pricker.Visitor.StringArray;
        let strings: string[] = [ ];

        for (let index = 1; index <= course.getLength(); index += 1) {
            visitor = new Pricker.Visitor.StringArray();
            course.getSix(index).accept(visitor);
            strings = strings.concat(visitor.getStrings());
        }

        visitor = new Pricker.Visitor.StringArray();
        course.accept(visitor);

        expect(visitor.getStrings()).toEqual(strings);
    });

    describe('can create courses from strings:', () => {

        const testImport = (input: string, output: string) => () => {
            const imported = Pricker.Course.fromString(testRow, input);
            expect(imported.print('text')).toBe(output);
        };

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

    testSerialContainerImplementation(
        Pricker.Course,
        [
            [Pricker.Stage.Triples, 14, 84],
            [Pricker.Stage.Caters, 18, 108],
            [Pricker.Stage.Cinques, 22, 132],
            [Pricker.Stage.Sextuples, 26, 156],
            [Pricker.Stage.Septuples, 30, 180],
        ],
        [2, 60],
        22,
        132,
    );
});
