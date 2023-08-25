/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import {
    type Change,
    inverse,
    type MutableRow,
    rounds,
    type Row,
    type Stage,
} from '../../rows';
import {
    permute1,
    permute3,
    permuteBob,
    permuteN,
    permuteSingle,
} from '../changes';
import type Course from '../Course';
import { type AbstractSix, Quick, Slow } from '../sixes';
import SixType from '../SixType';
import AbstractMethod from './AbstractMethod';

/**
 * Computes the result of applying a series of changes to rounds.
 */
const reduce = (stage: Stage, changes: Change[]): Row => {
    const row = rounds(stage) as MutableRow;
    for (const change of changes) {
        change(row);
    }
    return row;
};

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
    protected readonly sixTypeProgression = new Map<SixType, SixType>([
        [SixType.Slow, SixType.Quick],
        [SixType.Quick, SixType.Slow],
    ]);

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

    /**
     * Creates transpositions for touch searches.
     *
     * Searches for touches work in steps of a "pair" of sixes, being a call, a
     * slow six, another call, and a quick six. We need to know the
     * transposition row associated with the different types of pair so that we
     * can enumerate all possible touches.
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
     *
     * This function computes a transposition row for each of the above callings
     * and returns these in a `Map` from the calling to the transposition row.
     * By default transposition rows represent forward progress through the
     * touch; the {@link computeInverse} parameter can be used to retrieve rows
     * representing reverse progress.
     *
     * ```
     * > method.createTranspositions(Stage.Triples);
     * Map(7) {
     *   '  ' => [2, 4, 6, 7, 1, 5, 3],
     *   '- ' => [2, 4, 5, 6, 1, 7, 3],
     *   's ' => [2, 4, 5, 7, 1, 6, 3],
     *   ' -' => [2, 4, 6, 3, 1, 7, 5],
     *   ' s' => [2, 4, 6, 3, 1, 5, 7],
     *   '--' => [2, 4, 5, 3, 1, 6, 7],
     *   's-' => [2, 4, 5, 3, 1, 7, 6]
     * }
     * ```
     */
    public createTranspositions(
        stage: Stage,
        computeInverse?: boolean,
    ): Map<string, Row> {
        // prettier-ignore
        const result = new Map<string, Row>([
            ['  ', reduce(stage, [permuteN,      permute1, permuteN,      permute3])],
            ['- ', reduce(stage, [permuteBob,    permute1, permuteN,      permute3])],
            ['s ', reduce(stage, [permuteSingle, permute1, permuteN,      permute3])],
            [' -', reduce(stage, [permuteN,      permute1, permuteBob,    permute3])],
            [' s', reduce(stage, [permuteN,      permute1, permuteSingle, permute3])],
            ['--', reduce(stage, [permuteBob,    permute1, permuteBob,    permute3])],
            ['s-', reduce(stage, [permuteSingle, permute1, permuteBob,    permute3])],
        ]);

        if (computeInverse) {
            for (const [call, row] of result.entries()) {
                result.set(call, inverse(row));
            }
        }

        return result;
    }
}

export default Stedman;
