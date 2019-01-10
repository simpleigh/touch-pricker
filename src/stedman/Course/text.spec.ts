/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-19 Leigh Simpson. All rights reserved.
 */

import Course from '.';
import { createTestRow } from '../../testFunctions.spec';
import { Erin } from '../methods';

describe('text template for Course', () => {

    const initialRow = createTestRow();

    it('renders a simple Stedman course correctly', () => {
        const course = Course.fromString(initialRow, '1 s10 s13 22');
        expect(course.print('text')).toBe('2314567890E  1 s10 s13 22');
    });

    it('renders a simple Erin course correctly', () => {
        const course = Course.fromString(
            createTestRow('123'),
            '1 6 7',
            new Erin(),
        );
        expect(course.print('text')).toBe('43215678E90  1 6 7');
    });

    it('displays the number of sixes if needed', () => {
        const course = Course.fromString(initialRow, 's2 3 (4)');
        expect(course.print('text')).toBe('480735692E1  s2 3  (4 sixes)');
    });

    it('displays "p" for a plain course', () => {
        const course = Course.fromString(initialRow, 'p');
        expect(course.print('text')).toBe('2314567890E  p');
    });

    it('allows the line ending to be customised', () => {
        const course = Course.fromString(initialRow, 'p');
        expect(course.print('text', { end: '#' })).toBe('2314567890E  p#');
    });

    it('can render without the course end', () => {
        const course = Course.fromString(initialRow, 's2 3 (4 sixes)');
        expect(course.print('text', { courseEnd: false }))
            .toBe('s2 3  (4 sixes)');
    });

});
