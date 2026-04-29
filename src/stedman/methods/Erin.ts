/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import type { Row, Stage } from '../../rows';
import type Course from '../Course';
import { type AbstractSix, Slow } from '../sixes';
import SixType from '../SixType';
import AbstractMethod from './AbstractMethod';

/**
 * Erin-specific functionality
 */
class Erin extends AbstractMethod {
    /**
     * Method name
     */
    public readonly name: string = 'Erin';

    /**
     * Returns the default length of new courses
     */
    public override getCourseLength(stage: Stage): number {
        return stage;
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
        return new Slow(initialRow);
    }

    /**
     * Mapping from each valid six type to its successor
     */
    protected readonly sixTypeProgression = new Map<SixType, SixType>([
        [SixType.Slow, SixType.Slow],
    ]);

    /**
     * First six in a standard course
     */
    public readonly defaultFirstSix: SixType = SixType.Slow;

    /**
     * Type of six for standard start
     */
    public readonly defaultStartSixType: SixType = SixType.Slow;

    /**
     * Index of rounds within six for standard start
     */
    public readonly defaultStartRowIndex: number = 6;

    /**
     * Calling strings for touch searches.
     *
     * Searches for touches work in steps identified by a
     * {@link Searching.Calling}. A step must include the complete cycle of
     * {@link SixType}s for the method in order to avoid having to handle
     * different types of six when searching for touches.
     *
     * Erin only has one type of six so its step is only one six long. There are
     * three possible callings: a plain slow six, a bob, or a single. Our other
     * methods are more complex and searches work in steps of a pair of sixes,
     * being a call, a six, another call, and another six.
     */
    public override readonly searchCallingStrings: string[] = [' ', '-', 's'];
}

export default Erin;
