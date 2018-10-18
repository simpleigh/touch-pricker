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
import SixTypeMap from '../SixTypeMap';
import Slow from '../Slow';
import AbstractStrategy from './AbstractStrategy';

/**
 * Strategy for Erin
 */
class Erin extends AbstractStrategy {

    /**
     * Returns the default length of new courses
     */
    public getCourseLength(initialRow: Row): number {
        return initialRow.length;
    }

    /**
     * Creates a new six for use in a course
     * @param initialRow  initial row for the six
     * @param course      course that will own the six
     * @param index       index of six in the course
     */
    public createSix(
        initialRow: Row,
        course: Course,
        index: number,
    ): AbstractSix {
        return new Slow(initialRow, { container: course, index });
    }

    /**
     * Mapping from each valid six type to its successor
     */
    protected readonly sixTypeProgression: SixTypeMap<SixType> = {
        [SixType.Slow]: SixType.Slow,
    };

}

export default Erin;
