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
     * Mapping from each valid six type to its successor
     */
    protected abstract readonly sixTypeProgression: {
        [from in SixType]?: SixType;
    };

    /**
     * Checks whether a six type is valid for this strategy
     */
    public checkSixType(sixType: SixType): void {
        if (!this.sixTypeProgression[sixType]) {
            throw new Error(`"${sixType}" sixes not allowed for this strategy`);
        }
    }

    /**
     * Computes the type of the next six in a touch
     */
    public getNextSixType(sixType: SixType): SixType {
        this.checkSixType(sixType);
        return this.sixTypeProgression[sixType] as SixType;
    }

}

export default AbstractStrategy;
