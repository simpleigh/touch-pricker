/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import testAbstractCourseImplementation from '../../leads/AbstractCourse/testAbstractCourseImplementation';
import { rounds, Stage, stringFromRow } from '../../rows';
import { StringArray } from '../../visitors';
import Parser from '../Parser';
import Course from '.';

describe('Grandsire Course class', () => {
    testAbstractCourseImplementation(
        Stage.Doubles,
        (initialRow) => new Course(initialRow),
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
        [
            Stage.Doubles,
            [
                '12534',
                '12453',
                '12345',
            ],
        ],
        [
            Stage.Triples,
            [
                '1253746',
                '1275634',
                '1267453',
                '1246375',
                '1234567',
            ],
        ],
        [
            Stage.Caters,
            [
                '125374968',
                '127593846',
                '129785634',
                '128967453',
                '126849375',
                '124638597',
                '123456789',
            ],
        ],
        [
            Stage.Cinques,
            [
                '12537496E80',
                '127593E4068',
                '1297E503846',
                '12E90785634',
                '120E8967453',
                '12806E49375',
                '1268403E597',
                '124638507E9',
                '1234567890E',
            ],
        ],
        [
            Stage.Sextuples,
            [
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
            ],
        ],
        [
            Stage.Septuples,
            [
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
            ],
        ],
    ];

    for (const [stage, expectedLeadHeads] of leadEndTestCases) {
        it(`calculates lead heads correctly for a course on ${stage}`, () => {
            course = new Course(rounds(stage));
            for (let index = 1; index <= course.length; index += 1) {
                expect(stringFromRow(course.getBlock(index).getLast())).toBe(
                    expectedLeadHeads[index],
                );
            }
        });
    }

    it('generates the correct rows when visited', () => {
        let strings: string[] = [];

        for (let index = 1; index <= course.length; index += 1) {
            const blockVisitor = new StringArray();
            course.getBlock(index).accept(blockVisitor);
            strings = strings.concat(blockVisitor.strings);
        }

        const courseVisitor = new StringArray();
        course.accept(courseVisitor);

        expect(courseVisitor.strings).toEqual(strings);
    });

    it('passes strings to a parser for loading', () => {
        const parser = new Parser();
        jest.spyOn(parser, 'parseCourse').mockReturnValue(course);
        const testRow = rounds(Stage.Doubles);

        Course.fromString(testRow, 'test', parser);

        expect(parser.parseCourse).toHaveBeenCalled();
        expect(parser.parseCourse).toHaveBeenCalledWith(testRow, 'test');
    });

    it('returns the parsed result', () => {
        const parser = new Parser();
        jest.spyOn(parser, 'parseCourse').mockReturnValue(course);
        const testRow = rounds(Stage.Doubles);

        const result = Course.fromString(testRow, 'test', parser);

        expect(result).toBe(course);
    });
});
