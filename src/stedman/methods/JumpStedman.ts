/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import { Row } from '../../rows';
import AbstractSix from '../AbstractSix';
import Course from '../Course';
import JumpDown from '../JumpDown';
import JumpUp from '../JumpUp';
import Quick from '../Quick';
import SixType from '../SixType';
import SixTypeMap from '../SixTypeMap';
import Slow from '../Slow';
import AbstractMethod from './AbstractMethod';

/**
 * Jump Stedman-specific functionality
 */
class JumpStedman extends AbstractMethod {

    /**
     * Method name
     */
    public readonly name: string = 'Jump Stedman';

    /**
     * Returns the default length of new courses
     */
    public getCourseLength(initialRow: Row): number {
        return initialRow.length * 4;
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
        const offsets: SixTypeMap<number> = {
            [SixType.JumpDown]: 0,
            [SixType.Slow]: 1,
            [SixType.JumpUp]: 2,
            [SixType.Quick]: 3,
        };
        const offset = offsets[course.firstSixType]!;

        switch ((offset + index) % 4) {
            case 0:
                return new Quick(initialRow, { container: course, index });
            case 1:
                return new JumpDown(initialRow, { container: course, index });
            case 2:
                return new Slow(initialRow, { container: course, index });
            default:
                return new JumpUp(initialRow, { container: course, index });
        }
    }

    /**
     * Mapping from each valid six type to its successor
     */
    protected readonly sixTypeProgression: SixTypeMap<SixType> = {
        [SixType.JumpDown]: SixType.Slow,
        [SixType.Slow]: SixType.JumpUp,
        [SixType.JumpUp]: SixType.Quick,
        [SixType.Quick]: SixType.JumpDown,
    };

    /**
     * Index of rounds within six for standard start
     */
    public readonly defaultStartRowIndex: number = 4;

    /**
     * Type of six for standard start
     */
    public readonly defaultStartSixType: SixType = SixType.Quick;

}

export default JumpStedman;
