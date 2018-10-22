/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import Course from '.';
import {
    testSerialContainerImplementation,
} from '../../blocks/SerialContainer.spec';
import { Stage, stringFromRow } from '../../rows';
import { createTestCourse, createTestRow } from '../../testFunctions.spec';
import { StringArray } from '../../visitors';
import Call from '../Call';
import SixType from '../SixType';
import Touch from '../Touch';

describe('Course class', () => {

    const testRow = createTestRow();

    let course: Course;

    beforeEach(() => {
        course = createTestCourse(testRow);
    });

    it('starts out with a slow six by default', () => {
        expect(course.firstSixType).toBe(SixType.Slow);
        expect(course.getBlock(1).type).toBe(SixType.Slow);
    });

    it('alternates six types throughout', () => {
        for (let index = 1; index <= 22; index += 1) {
            if (index % 2) {
                expect(course.getBlock(index).type).toBe(SixType.Slow);
            } else {
                expect(course.getBlock(index).type).toBe(SixType.Quick);
            }
        }
    });

    it('can change the parity of its sixes', () => {
        course.setFirstSixType(SixType.Quick);
        expect(course.firstSixType).toBe(SixType.Quick);
        for (let index = 1; index <= 22; index += 1) {
            if (index % 2) {
                expect(course.getBlock(index).type).toBe(SixType.Quick);
            } else {
                expect(course.getBlock(index).type).toBe(SixType.Slow);
            }
        }
    });

    it('copes when changing the parity if its length is zero', () => {
        course.setLength(0);
        expect(() => course.setFirstSixType(SixType.Quick)).not.toThrow();
    });

    it('calculates sixes correctly', () => {
        course = Course.fromString(testRow, '2314567890E 1 s10 s13 22');
        const expectedSixEnds = [
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
            expect(stringFromRow(course.getBlock(index).getLast()))
                .toBe(expectedSixEnds[index]);
        }
    });

    it('recalculates when the parity is changed', () => {
        course.setLength(2);
        course.setFirstSixType(SixType.Quick);
        expect(course.getBlock(1).getLast())
            .toEqual(createTestRow('234618507E9'));
        expect(course.getBlock(2).getLast())
            .toEqual(createTestRow('3628401E597'));
    });

    it('maintains the parity when adding sixes to the course', () => {
        course.setLength(2);
        course.setFirstSixType(SixType.Quick);

        course.setLength(4);
        expect(course.getBlock(3).getLast())
            .toEqual(createTestRow('36802E49175'));
        expect(course.getBlock(4).getLast())
            .toEqual(createTestRow('603E8927451'));
    });

    it('maintains calls correctly when the parity is changed', () => {
        course.setLength(4);
        course.getBlock(2).setCall(Call.Single);
        course.getBlock(3).setCall(Call.Bob);

        course.setFirstSixType(SixType.Quick);
        expect(course.getBlock(2).call).toBe(Call.Single);
        expect(course.getBlock(3).call).toBe(Call.Bob);

        expect(course.getBlock(1).getLast())
            .toEqual(createTestRow('234618507E9'));
        expect(course.getBlock(2).getLast())
            .toEqual(createTestRow('3628401759E'));
        expect(course.getBlock(3).getLast())
            .toEqual(createTestRow('3680274519E'));
        expect(course.getBlock(4).getLast())
            .toEqual(createTestRow('603785294E1'));
    });

    it('can be reset to a plain course', () => {
        course.getBlock(5).toggleCall();
        course.resetCalls();
        expect(course.getBlock(5).call).toBe(Call.Plain);
    });

    it('returns this when resetting the calls', () => {
        expect(course.resetCalls()).toBe(course);
    });

    it('copes when resetting a course if the length is zero', () => {
        course.setLength(0);
        expect(() => course.resetCalls()).not.toThrow();
    });

    it('only calls notify once when resetting the calls', () => {
        const container = jasmine.createSpyObj('Notifiable', ['notify']);
        course.ownership = { container, index: 1 };
        course.resetCalls();
        expect(container.notify).toHaveBeenCalledTimes(1);
    });

    it('starts out as a plain course', () => {
        expect(course.isPlain()).toBe(true);
    });

    it('knows when it is not a plain course', () => {
        course.getBlock(5).toggleCall();
        expect(course.isPlain()).toBe(false);
    });

    it('can be cloned', () => {
        course.setLength(20);
        course.setFirstSixType(SixType.Quick);
        course.getBlock(5).toggleCall();

        const cloned = course.clone();
        expect(cloned.length).toBe(course.length);
        expect(cloned.firstSixType).toBe(course.firstSixType);
        expect(cloned.getLast()).toEqual(course.getLast());
    });

    it('creates the cloned course without any owner', () => {
        course.ownership = { container: new Touch(testRow), index: 10 };
        expect(course.clone().ownership).toBeUndefined();
    });

    it('ignores changes to the cloned course', () => {
        const lengthBackup = course.length;
        const getLastBackup = course.getLast();
        const cloned = course.clone();

        cloned.setLength(20);
        cloned.getBlock(5).toggleCall();

        expect(cloned.length).not.toBe(course.length);
        expect(cloned.getLast()).not.toEqual(course.getLast());

        expect(course.length).toBe(lengthBackup);
        expect(course.getLast()).toEqual(getLastBackup);
    });

    it('copes when cloning a course if the length is zero', () => {
        course.setLength(0);
        expect(() => course.clone()).not.toThrow();
    });

    it('generates the correct rows when visited', () => {
        let strings: string[] = [ ];

        for (let index = 1; index <= course.length; index += 1) {
            const blockVisitor = new StringArray();
            course.getBlock(index).accept(blockVisitor);
            strings = strings.concat(blockVisitor.strings);
        }

        const courseVisitor = new StringArray();
        course.accept(courseVisitor);

        expect(courseVisitor.strings).toEqual(strings);
    });

    describe('can create courses from strings:', () => {

        const testImport = (input: string, output: string) => () => {
            const imported = Course.fromString(testRow, input);
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
                Course.fromString(createTestRow(), 'garbage');
            }).toThrowError('Cannot import course');
        });
    });

    testSerialContainerImplementation(
        (initialRow, _ownership) => new Course(initialRow, _ownership),
        [
            [Stage.Triples, 14, 84],
            [Stage.Caters, 18, 108],
            [Stage.Cinques, 22, 132],
            [Stage.Sextuples, 26, 156],
            [Stage.Septuples, 30, 180],
        ],
        22,
        132,
    );
});
