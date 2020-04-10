/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { rounds, Stage } from '../../rows';
import Course from '.';

describe('text template for Grandsire Course', () => {

    const initialRow = rounds(Stage.Doubles);

    it('renders a simple course correctly', () => {
        const course = Course.fromString(initialRow, 's1 2 s3');
        expect(course.print('text')).toBe('14523  s1 2 s3');
    });

    it('displays the number of leads if needed', () => {
        const course = Course.fromString(initialRow, 's2 3 (4)');
        expect(course.print('text')).toBe('12354  s2 3  (4 leads)');
    });

    it('displays "p" for a plain course', () => {
        const course = Course.fromString(initialRow, 'p');
        expect(course.print('text')).toBe('12345  p');
    });

    it('allows the line ending to be customised', () => {
        const course = Course.fromString(initialRow, 'p');
        expect(course.print('text', { end: '#' })).toBe('12345  p#');
    });

    it('can render without the course end', () => {
        const course = Course.fromString(initialRow, 's2 3 (4)')
        expect(course.print('text', { courseEnd: false }))
            .toBe('s2 3  (4 leads)');
    });

});
