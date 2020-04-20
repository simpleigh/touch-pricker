/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { Row } from '../../rows';
import Course from '../Course';
import { AbstractSix, Cold, Hot } from '../sixes';
import SixType from '../SixType';
import AbstractMethod from './AbstractMethod';

/**
 * Stedman Jump-specific functionality
 */
class StedmanJump extends AbstractMethod {

    /**
     * Method name
     */
    public readonly name: string = 'Stedman Jump';

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
        const offset = course.firstSixType === SixType.Cold ? 0 : 1;
        return (offset + index) % 2
            ? new Cold(initialRow, { container: course, index })
            : new Hot(initialRow, { container: course, index });
    }

    /**
     * Mapping from each valid six type to its successor
     */
    protected readonly sixTypeProgression: Partial<Record<SixType, SixType>> = {
        [SixType.Cold]: SixType.Hot,
        [SixType.Hot]: SixType.Cold,
    };

    /**
     * First six in a standard course
     */
    public readonly defaultFirstSix: SixType = SixType.Cold;

    /**
     * Type of six for standard start
     */
    public readonly defaultStartSixType: SixType = SixType.Hot;

    /**
     * Index of rounds within six for standard start
     */
    public readonly defaultStartRowIndex: number = 6;

}

export default StedmanJump;
