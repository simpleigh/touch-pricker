/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 * The algorithm in this file is adapted from the C++ implementation of StedTurn
 * written by Philip Saddleton.
 */

import { FACTORIALS } from '../constants';
import type { Bell, MutableRow, Row, Stage } from './types';

/**
 * Creates a {@link Row} given its rank.
 *
 * See {@link rankFromRow} for a full description of the numbering scheme; in
 * brief it starts at `0` (rounds) and runs to `n! - 1` (back rounds).
 *
 * ```
 * > rowFromRank(7, Pricker.Stage.Minimus);
 * [2, 1, 4, 3]
 * > rowFromRank(719, Pricker.Stage.Minor);
 * [6, 5, 4, 3, 2, 1]
 * ```
 */
const rowFromRank = (rank: number, stage: Stage): Row => {
    if (rank < 0 || rank >= FACTORIALS[stage]) {
        throw new Error(`Rank '${rank}' out of range on stage '${stage}'`);
    }

    const row: MutableRow = [];

    // Initial case: 1-bell row
    row[0] = 1;

    // Build up the rest of the row one bell at a time
    for (let i = 2; i <= (stage as number); i += 1) {
        // Extract the inversion count from the rank
        const inversions = rank % i;
        rank = Math.floor(rank / i);

        // The more inversions we have, the smaller this bell must be
        row[i - 1] = (i - inversions) as Bell;

        // Increase any "inverting" bells to make room for this one
        for (let j = 0; j < i - 1; j += 1) {
            if (row[j] >= row[i - 1]) {
                row[j] += 1;
            }
        }
    }

    return row;
};

export default rowFromRank;
