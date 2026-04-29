/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import type { Row, Stage } from '../../../rows';
import * as Templates from '../../../templates';
import type Course from '../../Course';
import type { AbstractSix } from '../../sixes';
import type SixType from '../../SixType';
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
    public getCourseLength(stage: Stage): number {
        return stage * 2;
    }

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
    protected abstract readonly sixTypeProgression: Map<SixType, SixType>;

    /**
     * Returns an array of valid six types
     */
    public getSixTypes(): SixType[] {
        return Array.from(this.sixTypeProgression.keys());
    }

    /**
     * Checks whether a six type is valid for this method
     * @throws Error if the six type is not valid.
     */
    public checkSixType(sixType: SixType): void {
        if (!this.sixTypeProgression.has(sixType)) {
            throw new Error(`'${sixType}' blocks not allowed for this method`);
        }
    }

    /**
     * Computes the type of the next six in a touch
     * @throws Error if the six type is not valid.
     */
    public getNextSixType(sixType: SixType): SixType {
        this.checkSixType(sixType);
        return this.sixTypeProgression.get(sixType)!;
    }

    /**
     * First six in a standard course
     */
    public abstract readonly defaultFirstSix: SixType;

    /**
     * Type of six for standard start
     */
    public abstract readonly defaultStartSixType: SixType;

    /**
     * Index of rounds within six for standard start
     */
    public abstract readonly defaultStartRowIndex: number;

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
     *
     * There are seven possible callings for a pair of sixes:
     *
     * - two plain sixes
     * - `'- '`
     * - `'s '`
     * - `' -'`
     * - `' s'`
     * - `'--'`
     * - `'s-'`
     *
     * The callings `ss` and `-s` are excluded because they are equivalent to
     * `--` and `s-` respectively (they produce the same result).
     */
    public readonly searchCallingStrings: string[] = [
        '  ',
        '- ',
        's ',
        ' -',
        ' s',
        '--',
        's-',
    ];
}

export default AbstractMethod;
