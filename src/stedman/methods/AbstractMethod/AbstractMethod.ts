/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import { Row } from '../../../rows';
import * as Templates from '../../../templates';
import AbstractSix from '../../AbstractSix';
import Course from '../../Course';
import SixType from '../../SixType';
import SixTypeMap from '../../SixTypeMap';
import select from './select.dot';

/**
 * Method-specific functionality for Stedman-style compositions
 */
@Templates.makePrintable({ select })
abstract class AbstractMethod implements Templates.Interface {

    /* templating *************************************************************/

    public print: Templates.Print;

    /**
     * Method name
     */
    public abstract readonly name: string;

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
    protected abstract readonly sixTypeProgression: SixTypeMap<SixType>;

    /**
     * Returns an array of valid six types
     */
    public getSixTypes(): SixType[] {
        return Object.getOwnPropertyNames(this.sixTypeProgression) as SixType[];
    }

    /**
     * Checks whether a six type is valid for this method
     */
    public checkSixType(sixType: SixType): void {
        if (!this.sixTypeProgression[sixType]) {
            throw new Error(`"${sixType}" sixes not allowed for this method`);
        }
    }

    /**
     * Computes the type of the next six in a touch
     */
    public getNextSixType(sixType: SixType): SixType {
        this.checkSixType(sixType);
        return this.sixTypeProgression[sixType]!;
    }

    /**
     * First six in a standard course
     */
    public abstract readonly defaultFirstSix: SixType;

    /**
     * Index of rounds within six for standard start
     */
    public abstract readonly defaultStartRowIndex: number;

    /**
     * Type of six for standard start
     */
    public abstract readonly defaultStartSixType: SixType;

}

export default AbstractMethod;
