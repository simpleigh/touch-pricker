/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { Bell, MutableRow, Row } from './types';

/**
 * Computes the inverse of a row.
 *
 * From Knuth 1.3.3:
 *
 * > The inverse π<sup>-</sup> of a permutation π is the rearrangement that
 * > undoes the effect of π; if _i_ goes to _j_ under π, then _j_ goes to _i_
 * > under π<sup>-</sup>. Thus the product ππ<sup>-</sup> equals the identity
 * > permutation, and so does the product π<sup>-</sup>π.
 *
 * ```
 * > inverse([5, 3, 1, 2, 4, 6])
 * [3, 4, 2, 5, 1, 6]
 * > multiply([5, 3, 1, 2, 4, 6], inverse([5, 3, 1, 2, 4, 6]))
 * [1, 2, 3, 4, 5, 6]
 * > multiply(inverse([5, 3, 1, 2, 4, 6]), [5, 3, 1, 2, 4, 6])
 * [1, 2, 3, 4, 5, 6]
 * ```
 *
 * A new row is returned; the original is left unchanged.
 */
const inverse = (row: Row): Row => {
    const output: MutableRow = [];

    for (let i = 0; i < row.length; i += 1) {
        output[row[i] - 1] = (i + 1) as Bell;
    }

    return output;
};

export default inverse;
