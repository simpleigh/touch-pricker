/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { rounds, Stage } from '../../rows';
import Call from '../Call';
import Course from '.';

describe('text template for Course', () => {

    let plainCourse: Course;

    let testCourse: Course;

    beforeEach(() => {
        plainCourse = new Course(rounds(Stage.Doubles));
        plainCourse.resetLength();

        testCourse = new Course(rounds(Stage.Doubles));
        testCourse.setLength(3);
        testCourse.getBlock(1).call = Call.Single;
        testCourse.getBlock(2).call = Call.Bob;
        testCourse.getBlock(3).call = Call.Single;
    });

    it('renders a simple course correctly', () => {
        expect(testCourse.print('text')).toBe('14523  s1 2 s3');
    });

    it('displays the number of leads if needed', () => {
        testCourse.setLength(4);
        expect(testCourse.print('text')).toBe('14352  s1 2 s3  (4 leads)');
    });

    it('displays "p" for a plain course', () => {
        expect(plainCourse.print('text')).toBe('12345  p');
    });

    it('allows the line ending to be customised', () => {
        expect(plainCourse.print('text', { end: '#' })).toBe('12345  p#');
    });

    it('can render without the course end', () => {
        expect(testCourse.print('text', { courseEnd: false }))
            .toBe('s1 2 s3');
    });

});
