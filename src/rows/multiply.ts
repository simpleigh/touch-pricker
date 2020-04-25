/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import { MutableRow, Row } from './types';

/**
 * Computes row1 × row 2
 */
const multiply = (row1: Row, row2: Row): Row => {
    const output: MutableRow = [];

    for (let i = 0; i < row1.length || i < row2.length; i += 1) {
        if (row2[i]) {
            if (row1[row2[i] - 1]) {
                // If there's a source bell to copy, copy it
                output.push(row1[row2[i] - 1]);
            } else {
                // ... else use the position (rounds)
                output.push(row2[i]);
            }
        } else {
            output.push(row1[i]);
        }
    }

    return output;
};

export default multiply;
