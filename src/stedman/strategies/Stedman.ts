/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import { Row } from '../../rows';
import AbstractSix from '../AbstractSix';
import Course from '../Course';
import Quick from '../Quick';
import SixType from '../SixType';
import Slow from '../Slow';
import AbstractStrategy from './AbstractStrategy';

/**
 * Strategy for Stedman itself
 */
class Stedman extends AbstractStrategy {

    /**
     * Returns the default length of new courses
     */
    public getCourseLength(initialRow: Row): number {
        return initialRow.length * 2;
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
        const offset = {
            [SixType.Slow]: 0,
            [SixType.Quick]: 1,
        }[course.firstSixType];

        return (offset + index) % 2
            ? new Slow(initialRow, { container: course, index })
            : new Quick(initialRow, { container: course, index });
    }

    /**
     * Computes the type of the next six in a touch
     */
    public getNextSixType(sixType: SixType): SixType {
        return sixType === SixType.Slow ? SixType.Quick : SixType.Slow;
    }

}

export default Stedman;
