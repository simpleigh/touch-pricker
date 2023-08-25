/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import type { AbstractCourse, AbstractLead } from '../leads';
import { inverse, rounds, type Row } from '../rows';
import Calling from './Calling';

/**
 * Creates transpositions for touch searches.
 *
 * Searches for touches work in steps identified by a {@link Calling}. A step
 * must include the complete cycle of {@link SixType}s for the method in order
 * to avoid having to handle different types of six when searching for touches.
 * We need to know the transposition row associated with each calling so that we
 * can enumerate all possible touches.
 *
 * This function returns a transposition row for each provided calling string in
 * a `Map` from the calling string to the transposition row. By default
 * transposition rows represent forward progress through the touch; the
 * {@link computeInverse} parameter can be used to retrieve rows representing
 * reverse progress.
 *
 * ```
 * > const course = new Course(rounds(Stage.Triples), new Stedman());
 * > createTranspositions(course, ['  ', '--']);
 * Map(2) {
 *   '  ' => [2, 4, 6, 7, 1, 5, 3],
 *   '--' => [2, 4, 5, 3, 1, 6, 7]
 * }
 * ```
 *
 * Note that the provided {@link course} will be mutated.
 */
const createTranspositions = (
    course: AbstractCourse<AbstractLead>,
    callingStrings: string[],
    computeInverse?: boolean,
): Map<string, Row> => {
    const result = new Map<string, Row>();
    course.initialRow = rounds(course.initialRow.length);

    for (const callingString of callingStrings) {
        const calling = new Calling(callingString);
        calling.updateCourse(course);

        if (computeInverse) {
            result.set(callingString, inverse(course.getLast()));
        } else {
            result.set(callingString, course.getLast());
        }
    }

    return result;
};

export default createTranspositions;
