/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { rounds, rowFromString, Stage } from '../../rows';
import { Course, Methods } from '../../stedman';
import Calling from './Calling';

describe('Calling class', () => {
    describe('text conversion', () => {
        it('can convert a simple calling', () => {
            const calling = new Calling('-          - ------ ');
            expect(calling.print('text')).toBe('1 12 14 15 16 17 18 19');
        });

        it('can convert a calling with singles', () => {
            const calling = new Calling('-        s  s s      -');
            expect(calling.print('text')).toBe('1 s10 s13 s15 22');
        });

        it('can cope with an empty calling', () => {
            const calling = new Calling('');
            expect(calling.print('text')).toBe('');
        });
    });

    describe('Course conversion', () => {
        it('can convert a simple calling', () => {
            const calling = new Calling('-          - ------ ');
            const course = new Course(
                rounds(Stage.Cinques),
                new Methods.Stedman(),
            );

            calling.updateCourse(course);

            expect(course.length).toBe(20);
            expect(course.print('text')).toBe(
                '1234567890E  1 12 14 15 16 17 18 19  (20 sixes)',
            );
        });

        it('can convert a calling with singles', () => {
            const calling = new Calling('-        s  s s      -');
            const course = new Course(
                rounds(Stage.Cinques),
                new Methods.Stedman(),
            );

            calling.updateCourse(course);

            expect(course.length).toBe(22);
            expect(course.print('text')).toBe('1234568790E  1 s10 s13 s15 22');
        });

        it('overwrites any existing calls', () => {
            const calling1 = new Calling('   ---sss');
            const course = new Course(
                rounds(Stage.Triples),
                new Methods.Stedman(),
            );
            calling1.updateCourse(course);

            const calling2 = new Calling(' -s -s -s');
            calling2.updateCourse(course);

            expect(course.print('text')).toBe(
                '1253647  2 s3 5 s6 8 s9  (9 sixes)',
            );
        });

        it('can convert a calling starting at a different row', () => {
            const calling = new Calling('  -         -- ---- ');
            const row = rowFromString('2143657890E', Stage.Cinques);
            const course = new Course(row, new Methods.Stedman());

            calling.updateCourse(course);

            expect(course.length).toBe(20);
            expect(course.print('text')).toBe(
                '2143658709E  3 13 14 16 17 18 19  (20 sixes)',
            );
        });

        it('can cope with an empty calling', () => {
            const calling = new Calling('');
            const course = new Course(
                rounds(Stage.Cinques),
                new Methods.Stedman(),
            );

            calling.updateCourse(course);

            expect(course.length).toBe(0);
            expect(course.getLast()).toEqual(rounds(Stage.Cinques));
        });
    });
});
