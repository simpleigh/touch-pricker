/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { rounds, type Row, type Stage, stringFromRow } from '../../rows';
import type AbstractLead from '../AbstractLead';
import Call from '../Call';
import type AbstractCourse from './AbstractCourse';

/**
 * Tests the template behaves like the parent version
 * @param testStage  stage to use when testing this container
 * @param factory    creates an instance of the object under test
 * @param leadsWord  word to use when describing a count of leads
 */
const testTextAbstractCourseTemplate = (
    testStage: Stage,
    factory: (initialRow: Row) => AbstractCourse<AbstractLead>,
    leadsWord: string = 'leads',
): void => {
    describe('it has a text template that', () => {
        let course: AbstractCourse<AbstractLead>;

        beforeEach(() => {
            course = factory(rounds(testStage));
            course.resetLength();
        });

        it('renders a simple course correctly', () => {
            course.getBlock(1).call = Call.Single;
            course.getBlock(2).call = Call.Bob;
            course.getBlock(3).call = Call.Single;

            const last = stringFromRow(course.getLast());
            expect(course.print('text')).toBe(`${last}  s1 2 s3`);
        });

        it('displays the number of leads if needed', () => {
            course.setLength(4);
            course.getBlock(2).call = Call.Single;
            course.getBlock(3).call = Call.Bob;

            const last = stringFromRow(course.getLast());
            expect(course.print('text')).toBe(
                `${last}  s2 3  (4 ${leadsWord})`,
            );
        });

        it('displays "p" for a plain course', () => {
            const last = stringFromRow(rounds(testStage));
            expect(course.print('text')).toBe(`${last}  p`);
        });

        it('can render without the course end', () => {
            course.setLength(4);
            course.getBlock(2).call = Call.Single;
            course.getBlock(3).call = Call.Bob;

            expect(course.print('text', { courseEnd: false })).toBe(
                `s2 3  (4 ${leadsWord})`,
            );
        });

        it('allows the line ending to be customised', () => {
            const last = stringFromRow(rounds(testStage));
            expect(course.print('text', { end: '#' })).toBe(`${last}  p#`);
        });

        it('allows the word for a count of leads to be customised', () => {
            course.setLength(4);

            const last = stringFromRow(course.getLast());
            expect(course.print('text', { leadsWord: 'cheeses' })).toBe(
                `${last}  p  (4 cheeses)`,
            );
        });
    });
};

export default testTextAbstractCourseTemplate;
