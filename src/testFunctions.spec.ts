/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import { Row, rowFromString, Stage } from './rows';
import { Course } from './stedman';

/**
 * Helper functions for testing
 */

/**
 * Creates a row with sensible defaults
 */
export const createTestRow = (
    input: string = '231',
    stage: Stage = Stage.Cinques,
): Row => rowFromString(input, stage);

/**
 * Creates a plain course of Stedman Cinques
 */
export const createTestCourse = (initialRow: Row = createTestRow()): Course => {
    const course = new Course(initialRow);
    course.resetLength();
    return course;
};
