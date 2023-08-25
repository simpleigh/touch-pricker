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
 */
const testHtmlAbstractCourseTemplate = (
    testStage: Stage,
    factory: (initialRow: Row) => AbstractCourse<AbstractLead>,
): void => {
    describe('it has an html template that', () => {
        it('renders a course correctly', () => {
            const initialRow = rounds(testStage);
            const course = factory(initialRow);
            course.setLength(4);
            course.getBlock(2).call = Call.Single;
            course.getBlock(3).call = Call.Bob;

            expect(course.print('html')).toRenderAs(`
                <u>${stringFromRow(initialRow)}</u><br />
                ${course.print('text')}
            `);
        });
    });
};

export default testHtmlAbstractCourseTemplate;
