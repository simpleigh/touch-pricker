/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { rounds, type Row, Stage } from '../rows';
import Call from './Call';
import LeadBasedParser from './LeadBasedParser';
import { Course, Touch } from './testBlocks';

class TestParser extends LeadBasedParser<Course, Touch> {
    public readonly createCourseSpy = jest.fn(
        (initialRow) => new Course(initialRow),
    );

    protected createTouch(initialRow: Row): Touch {
        return new Touch(initialRow);
    }

    protected createCourse(initialRow: Row): Course {
        return this.createCourseSpy(initialRow);
    }
}

describe('LeadBasedParser class', () => {
    let parser: TestParser;

    beforeEach(() => {
        parser = new TestParser();
    });

    it('calls `createCourse` to create a course from the initial row', () => {
        const initialRow = rounds(Stage.Minor);
        parser.parseCourse(initialRow, '1');

        expect(parser.createCourseSpy).toHaveBeenCalled();
        expect(parser.createCourseSpy).toHaveBeenCalledTimes(1);
        expect(parser.createCourseSpy).toHaveBeenCalledWith(initialRow);
    });

    it('returns the parsed course', () => {
        const initialRow = rounds(Stage.Minor);
        const course = new Course(initialRow);
        parser.createCourseSpy.mockReturnValue(course);

        expect(parser.parseCourse(initialRow, '1')).toBe(course);
    });

    it('uses `parseCourse` to parse lines for a touch', () => {
        jest.spyOn(parser, 'parseCourse');

        parser.parseTouch('1234\n1');

        expect(parser.parseCourse).toHaveBeenCalled();
        expect(parser.parseCourse).toHaveBeenCalledTimes(1);
        expect(parser.parseCourse).toHaveBeenCalledWith(
            rounds(Stage.Minimus),
            '1',
        );
    });

    const testParse = (
        description: string,
        input: string,
        expectedCalling: string,
        expectedLength: number = 5,
    ) => {
        it(`can parse ${description}`, () => {
            const course = parser.parseCourse(rounds(Stage.Minor), input);

            const calling = [];
            for (let i = 1; i <= course.length; i += 1) {
                if (course.getBlock(i).call === Call.Bob) {
                    calling.push(i);
                } else if (course.getBlock(i).call === Call.Single) {
                    calling.push(`s${i}`);
                }
            }
            expect(calling.join(' ')).toBe(expectedCalling);

            expect(course.length).toBe(expectedLength);
        });
    };

    // prettier-ignore
    testParse(
        'a simple course with only one call',
        '1',
        '1',
    );

    // prettier-ignore
    testParse(
        'a simple course with multiple calls',
        '1 3 5',
        '1 3 5',
    );

    // prettier-ignore
    testParse(
        'a course with singles before numbers',
        '1 s3 s5',
        '1 s3 s5',
    );

    // prettier-ignore
    testParse(
        'a course with singles after numbers',
        '1 3s 5s',
        '1 s3 s5',
    );

    testParse(
        'a course with calls separated by "."s',
        '1.s2. 3 . s4 .5',
        '1 s2 3 s4 5',
    );

    testParse(
        'a course with calls separated by ","s',
        '1,s2, 3 , s4 ,5',
        '1 s2 3 s4 5',
    );

    // prettier-ignore
    testParse(
        'a short course',
        '1 2 3 (3)',
        '1 2 3',
        3,
    );

    // prettier-ignore
    testParse(
        'a long course',
        '1 2 3 (6)',
        '1 2 3',
        6,
    );

    // prettier-ignore
    testParse(
        'a course with redundant length',
        '1 2 3 (5)',
        '1 2 3',
    );

    testParse(
        'a short course with length described as leads',
        '1 2 3 (3 leads)',
        '1 2 3',
        3,
    );

    testParse(
        'a short course with length described as sixes',
        '1 2 3 (3 sixes)',
        '1 2 3',
        3,
    );

    // prettier-ignore
    testParse(
        'a plain course',
        'p',
        '',
    );

    // prettier-ignore
    testParse(
        'a short plain course',
        'p (3)',
        '',
        3,
    );

    // prettier-ignore
    testParse(
        'a long plain course',
        'p (6)',
        '',
        6,
    );

    // prettier-ignore
    testParse(
        'a course with a course end',
        '123456 1 2 3 4 5',
        '1 2 3 4 5',
    );

    // prettier-ignore
    testParse(
        'a course with a broken course end',
        'abcde  1 3 5',
        '1 3 5',
    );

    // prettier-ignore
    testParse(
        'a course with a short course end',
        '234 1 2 3 4 5',
        '1 2 3 4 5',
    );

    testParse(
        'a course that might be confused as a course end',
        's10 (12)',
        's10',
        12,
    );

    testParse(
        'another course that might be confused as a course end',
        '10s (12)',
        's10',
        12,
    );

    testParse(
        'a course with lots of extra spacing',
        '\r\n\t 3456\t\r\n  1 .,\t 3 ,.\t 5\t\r\n  (6)  \t\r\n',
        '1 3 5',
        6,
    );

    it('throws if a course cannot be parsed', () => {
        expect(() => {
            parser.parseCourse(rounds(Stage.Minor), 'garbage');
        }).toThrowError("Cannot import course from line 'garbage'");
    });
});
