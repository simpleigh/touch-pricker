/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import {
    testSerialContainerImplementation,
} from '../../blocks/SerialContainer.spec';
import { rounds, Stage, stringFromRow } from '../../rows';
import { Call } from '../../shared';
import { StringArray } from '../../visitors';
import Touch from '../Touch';
import Course from '.';

describe('Grandsire Course class', () => {

    testSerialContainerImplementation(
        Stage.Doubles,
        (initialRow, _ownership) => new Course(initialRow, _ownership),
        30,
        3,
        [
            [Stage.Doubles,    30,  3],
            [Stage.Triples,    70,  5],
            [Stage.Caters,    126,  7],
            [Stage.Cinques,   198,  9],
            [Stage.Sextuples, 286, 11],
            [Stage.Septuples, 390, 13],
        ],
    );

    let course: Course;

    beforeEach(() => {
        course = new Course(rounds(Stage.Doubles));
        course.resetLength();
    });

    const leadEndTestCases: [Stage, string[]][] = [
        [Stage.Doubles, [
            '12534',
            '12453',
            '12345',
        ]],
        [Stage.Triples, [
            '1253746',
            '1275634',
            '1267453',
            '1246375',
            '1234567',
        ]],
        [Stage.Caters, [
            '125374968',
            '127593846',
            '129785634',
            '128967453',
            '126849375',
            '124638597',
            '123456789',
        ]],
        [Stage.Cinques, [
            '12537496E80',
            '127593E4068',
            '1297E503846',
            '12E90785634',
            '120E8967453',
            '12806E49375',
            '1268403E597',
            '124638507E9',
            '1234567890E',
        ]],
        [Stage.Sextuples, [
            '12537496E8A0T',
            '127593E4A6T80',
            '1297E5A3T4068',
            '12E9A7T503846',
            '12AET90785634',
            '12TA0E8967453',
            '120T8A6E49375',
            '12806T4A3E597',
            '1268403T5A7E9',
            '124638507T9AE',
            '1234567890ETA',
        ]],
        [Stage.Septuples, [
            '12537496E8A0CTB',
            '127593E4A6C8B0T',
            '1297E5A3C4B6T80',
            '12E9A7C5B3T4068',
            '12AEC9B7T503846',
            '12CABET90785634',
            '12BCTA0E8967453',
            '12TB0C8A6E49375',
            '120T8B6C4A3E597',
            '12806T4B3C5A7E9',
            '1268403T5B7C9AE',
            '124638507T9BECA',
            '1234567890ETABC',
        ]],
    ];

    for (const testCase of leadEndTestCases) {
        const stage = testCase[0];
        const expectedLeadHeads = testCase[1];

        it(`calculates lead heads correctly for a course on ${stage}`, () => {
            course = new Course(rounds(stage));
            for (let index = 1; index <= course.length; index += 1) {
                expect(stringFromRow(course.getBlock(index).getLast()))
                    .toBe(expectedLeadHeads[index]);
            }
        });
    }

    it('can be reset to a plain course', () => {
        course.getBlock(2).toggleCall();
        course.resetCalls();
        expect(course.getBlock(2).call).toBe(Call.Plain);
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
        course.getBlock(2).toggleCall();
        expect(course.isPlain()).toBe(false);
    });

    it('can be cloned', () => {
        course.setLength(4);
        course.getBlock(3).toggleCall();

        const cloned = course.clone();
        expect(cloned.length).toBe(course.length);
        expect(cloned.getLast()).toEqual(course.getLast());
    });

    it('creates the cloned course without any owner', () => {
        const container = new Touch(rounds(Stage.Doubles));
        course.ownership = { container, index: 10 };
        expect(course.clone().ownership).toBeUndefined();
    });

    it('ignores changes to the cloned course', () => {
        const lengthBackup = course.length;
        const getLastBackup = course.getLast();
        const cloned = course.clone();

        cloned.setLength(4);
        cloned.getBlock(3).toggleCall();

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

        const testImport = (
            input: string,
            output: string,
        ) => () => {
            const imported = Course.fromString(rounds(Stage.Caters), input);
            expect(imported.print('text')).toBe(output);
        };

        it('a plain course', testImport(
            '123456789  p',
            '123456789  p',
        ));

        it('a bob course', testImport(
            '123456789  1 2 3 4  (4 leads)',
            '123456789  1 2 3 4  (4 leads)',
        ));

        it('a singled course', testImport(
            '123456789  s1 s2 s3 s4 s5 s6 s7 s8  (8 leads)',
            '123456789  s1 s2 s3 s4 s5 s6 s7 s8  (8 leads)',
        ));

        it('a more complex course ending in rounds', testImport(
            '123456789  2 s4 5 7 s9 10  (10 leads)',
            '123456789  2 s4 5 7 s9 10  (10 leads)',
        ));

        it('a course with singles marked after the six number', testImport(
            '123456789  2 4s 5 7 9s 10  (10 leads)',
            '123456789  2 s4 5 7 s9 10  (10 leads)',
        ));

        it('a course with calls separated with "."s', testImport(
            '123456789  2.s4. 5 .7 . s9 10  (10 leads)',
            '123456789  2 s4 5 7 s9 10  (10 leads)',
        ));

        it('a course with calls separated with ","s', testImport(
            '123456789  2,s4, 5 ,7 , s9 10  (10 leads)',
            '123456789  2 s4 5 7 s9 10  (10 leads)',
        ));

        it('a short course', testImport(
            '135624789  2 3 s5  (5 leads)',
            '135624789  2 3 s5  (5 leads)',
        ));

        it('a short course with concise length description', testImport(
            '135624789  2 3 s5  (5)',
            '135624789  2 3 s5  (5 leads)',
        ));

        it('a short course with odd length description', testImport(
            '135624789  2 3 s5  (5-em ù leaden)',
            '135624789  2 3 s5  (5 leads)',
        ));

        it('a short plain course', testImport(
            'p (3)',
            '129785634  p  (3 leads)',
        ));

        it('a string with extra spacing', testImport(
            ' \t\r123456789  \t\r\n2 s4  \t\r\n5 7 s9 10 \t\r\n (10 leads)  \n',
            '123456789  2 s4 5 7 s9 10  (10 leads)',
        ));

        it('a string with a broken course end', testImport(
            'abcde  2 s4 5 7 s9 10 (10 leads)',
            '123456789  2 s4 5 7 s9 10  (10 leads)',
        ));

        it('a string with a short course end', testImport(
            '123  2 s4 5 7 s9 10 (10 leads)',
            '123456789  2 s4 5 7 s9 10  (10 leads)',
        ));

        it('a string without a course end', testImport(
            '2 s4 5 7 s9 10 (10 leads)',
            '123456789  2 s4 5 7 s9 10  (10 leads)',
        ));

        it('another string without a course end', testImport(
            's10  (10 leads)',
            '198267453  s10  (10 leads)',
        ));

        it('yet another string without a course end', testImport(
            '10s  (10 leads)',
            '198267453  s10  (10 leads)',
        ));

        it('a broken course (that raises an error)', () => {
            expect(() => {
                Course.fromString(rounds(Stage.Caters), 'garbage');
            }).toThrowError('Cannot import course');
        });
    });

});