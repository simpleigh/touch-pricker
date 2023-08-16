/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 * The function in this file is adapted from the C++ implementation of StedTurn
 * written by Philip Saddleton.
 */

import { Change, inverse, MutableRow, rounds, Row, Stage } from '../../rows';
import {
    permute1,
    permute3,
    permuteBob,
    permuteN,
    permuteSingle,
} from '../changes';
import type CallPair from './CallPair';

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
 * Creates transpositions representing pairs of sixes.
 *
 * Searches for touches work in steps of a "pair" of sixes, being a call, a slow
 * six, another call, and a quick six. We need to know the transposition row
 * associated with the different types of pair so that we can enumerate all
 * possible touches.
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
 * The callings `ss` and `-s` are excluded because they are equivalent to `--`
 * and `s-` respectively (they produce the same result).
 *
 * This function computes a transposition row for each of the above callings and
 * returns these in a dictionary mapping from the calling to the transposition
 * row. By default transposition rows represent forward progress through the
 * touch; the {@link computeInverse} parameter can be used to retrieve rows
 * representing reverse progress.
 *
 * ```
 * > createTranspositions(Stage.Triples);
 * {
 *     '  ': [2, 4, 6, 7, 1, 5, 3],
 *     '- ': [2, 4, 5, 6, 1, 7, 3],
 *     's ': [2, 4, 5, 7, 1, 6, 3],
 *     ' -': [2, 4, 6, 3, 1, 7, 5],
 *     ' s': [2, 4, 6, 3, 1, 5, 7],
 *     '--': [2, 4, 5, 3, 1, 6, 7],
 *     's-': [2, 4, 5, 3, 1, 7, 6],
 * }
 * ```
 */
const createTranspositions = (
    stage: Stage,
    computeInverse?: boolean,
): Record<CallPair, Row> => {
    /* eslint-disable sort-keys, @typescript-eslint/naming-convention */
    // prettier-ignore
    const result: Record<CallPair, Row> = {
        '  ': reduce(stage, [permuteN,      permute1, permuteN,      permute3]),
        '- ': reduce(stage, [permuteBob,    permute1, permuteN,      permute3]),
        's ': reduce(stage, [permuteSingle, permute1, permuteN,      permute3]),
        ' -': reduce(stage, [permuteN,      permute1, permuteBob,    permute3]),
        ' s': reduce(stage, [permuteN,      permute1, permuteSingle, permute3]),
        '--': reduce(stage, [permuteBob,    permute1, permuteBob,    permute3]),
        's-': reduce(stage, [permuteSingle, permute1, permuteBob,    permute3]),
    };
    /* eslint-enable */

    if (computeInverse) {
        for (const call of Object.getOwnPropertyNames(result)) {
            result[call as CallPair] = inverse(result[call as CallPair]);
        }
    }

    return result;
};

export default createTranspositions;
