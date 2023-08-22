/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 * The algorithm in this file is adapted from the C++ implementation of StedTurn
 * written by Philip Saddleton.
 */

import { FACTORIALS } from './constants';
import { Row } from './types';

/**
 * Computes the rank of a {@link Row}.
 *
 * The numbering starts at `0` (rounds) and runs to `n! - 1` (back rounds).
 * Numbering is in "reverse colex order" (Knuth 7.2.1.2); i.e. if we reflect
 * each row from right to left they would be in reverse lexicographic order.
 *
 * ```text
 *   0: 123456
 *   1: 213456
 *   2: 132456
 *   3: 312456
 * ...
 * 717: 645321
 * 718: 564321
 * 719: 654321
 * ```
 *
 * ```
 * > rankFromRow([2, 1, 4, 3], Pricker.Stage.Minimus));
 * 7
 * > rankFromRow([6, 5, 4, 3, 2, 1], Pricker.Stage.Minor));
 * 719
 * ```
 *
 * The rank is computed by counting the number of "inversions" to the left of
 * each position (the [left inversion count], _l_).
 * The vector of counts is then interpreted as a single number using the
 * [Factorial number system].
 *
 * ```
 *             ┌───┬───┬───┬───┐
 *        row: │ 2 │ 1 │ 4 │ 3 │
 *             ├───┼───┼───┼───┤
 * inversions: │ - │ 1 │ 0 │ 1 │
 *             └───┴───┴───┴───┘
 *
 * rank = (1 × 1) + (0 × 2) + (1 × 6) = 7
 * ```
 *
 * This scheme has been chosen for compatibility with the data tables that are
 * produced by Philip Saddleton's "StedTurn" software.
 *
 * [left inversion count]: https://en.wikipedia.org/wiki/Inversion_(discrete_mathematics)#Inversion_related_vectors
 * [Factorial number system]: https://en.wikipedia.org/wiki/Factorial_number_system
 */
const rankFromRow = (row: Row): number => {
    let rank = 0;

    for (let i = 1; i < row.length; i += 1) {
        let inversions = 0;

        for (let j = 0; j < i; j += 1) {
            if (row[j] > row[i]) {
                inversions += 1;
            }
        }

        rank += inversions * FACTORIALS[i];
    }

    return rank;
};

export default rankFromRow;
