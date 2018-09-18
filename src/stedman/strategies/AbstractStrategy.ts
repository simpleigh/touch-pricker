/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import { Row } from '../../rows';
import AbstractSix from '../AbstractSix';
import Course from '../Course';
import SixType from '../SixType';

/**
 * Strategies for assembling Stedman-style compositions
 */
abstract class AbstractStrategy {

    /**
     * Returns the default length of new courses
     */
    public abstract getCourseLength(initialRow: Row): number;

    /**
     * Creates a new six for use in a course
     * @param initialRow  initial row for the six
     * @param course      course that will own the six
     * @param index       index of six in the course
     */
    public abstract createSix(
        initialRow: Row,
        course: Course,
        index: number,
    ): AbstractSix;

    /**
     * Computes the type of the next six in a touch
     */
    public abstract getNextSixType(sixType: SixType): SixType;

}

export default AbstractStrategy;
