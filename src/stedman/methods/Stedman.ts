/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { Row } from '../../rows';
import Course from '../Course';
import { AbstractSix, Quick, Slow } from '../sixes';
import SixType from '../SixType';
import AbstractMethod from './AbstractMethod';

/**
 * Stedman-specific functionality
 */
class Stedman extends AbstractMethod {
    /**
     * Method name
     */
    public readonly name: string = 'Stedman';

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
        const offset = course.firstSixType === SixType.Slow ? 0 : 1;
        return (offset + index) % 2
            ? new Slow(initialRow)
            : new Quick(initialRow);
    }

    /**
     * Mapping from each valid six type to its successor
     */
    protected readonly sixTypeProgression: Partial<Record<SixType, SixType>> = {
        [SixType.Slow]: SixType.Quick,
        [SixType.Quick]: SixType.Slow,
    };

    /**
     * First six in a standard course
     */
    public readonly defaultFirstSix: SixType = SixType.Slow;

    /**
     * Type of six for standard start
     */
    public readonly defaultStartSixType: SixType = SixType.Quick;

    /**
     * Index of rounds within six for standard start
     */
    public readonly defaultStartRowIndex: number = 4;
}

export default Stedman;
