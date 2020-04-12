/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { Row } from '../../rows';
import Course from '../Course';
import { AbstractSix, Slow } from '../sixes';
import SixType from '../SixType';
import SixTypeMap from '../SixTypeMap';
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

}

export default Erin;
