/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { Course } from '../../tests/blocks';
import { rounds, Stage } from '../rows';
import Call from './Call';
import parseCourse from './parseCourse';

/**
 * Test course that allows easy inspection of calling
 */
class TestCourse extends Course {
    /**
     * Dumps the calling to a string as e.g. `1 2 s3 4`
     */
    public dumpCalling = () => {
        const output = [];
        for (let i = 1; i <= this.length; i++) {
            if (this.getBlock(i).getCall() === Call.Bob) {
                output.push(i);
            } else if (this.getBlock(i).getCall() === Call.Single) {
                output.push(`s${i}`);
            }
        }
        return output.join(' ');
    }
}

describe('parseCourse function', () => {

    const testImport = (
        description: string,
        input: string,
        expectedCalling: string,
        expectedLength: number = 5,
    ) => {
        it(`can parse ${description}`, () => {
            const course = new TestCourse(rounds(Stage.Minor));
            parseCourse(course, input);
            expect(course.dumpCalling()).toBe(expectedCalling);
            expect(course.length).toBe(expectedLength);
        });
    };

    testImport(
        'a simple course with only one call',
        '1',
        '1',
    );

    testImport(
        'a simple course with multiple calls',
        '1 3 5',
        '1 3 5',
    );


    testImport(
        'a course with singles before numbers',
        '1 s3 s5',
        '1 s3 s5',
    );

    testImport(
        'a course with singles after numbers',
        '1 3s 5s',
        '1 s3 s5',
    );

    testImport(
        'a course with calls separated by "."s',
        '1.s2. 3 . s4 .5',
        '1 s2 3 s4 5',
    );

    testImport(
        'a course with calls separated by ","s',
        '1,s2, 3 , s4 ,5',
        '1 s2 3 s4 5',
    );

    testImport(
        'a short course',
        '1 2 3 (3)',
        '1 2 3',
        3,
    );

    testImport(
        'a long course',
        '1 2 3 (6)',
        '1 2 3',
        6,
    );

    testImport(
        'a course with redundant length',
        '1 2 3 (5)',
        '1 2 3',
    );

    testImport(
        'a short course with length described as leads',
        '1 2 3 (3 leads)',
        '1 2 3',
        3,
    );

    testImport(
        'a short course with length described as sixes',
        '1 2 3 (3 sixes)',
        '1 2 3',
        3,
    );

    testImport(
        'a plain course',
        'p',
        '',
    );

    testImport(
        'a short plain course',
        'p (3)',
        '',
        3,
    );

    testImport(
        'a long plain course',
        'p (6)',
        '',
        6,
    );

    testImport(
        'a course with a course end',
        '123456 1 2 3 4 5',
        '1 2 3 4 5',
    );

    testImport(
        'a course with a broken course end',
        'abcde  1 3 5',
        '1 3 5',
    );

    testImport(
        'a course with a short course end',
        '234 1 2 3 4 5',
        '1 2 3 4 5',
    );

    testImport(
        'a course that might be confused as a course end',
        's10 (12)',
        's10',
        12,
    );

    testImport(
        'another course that might be confused as a course end',
        '10s (12)',
        's10',
        12,
    );

    testImport(
        'a course with lots of extra spacing',
        '\r\n\t 3456\t\r\n  1 .,\t 3 ,.\t 5\t\r\n  (6)  \t\r\n',
        '1 3 5',
        6,
    );

    it('throws if a course cannot be parsed', () => {
        const course = new TestCourse(rounds(Stage.Minor));
        expect(() => parseCourse(course, 'garbage'))
            .toThrowError('Cannot import course');
    });

});
