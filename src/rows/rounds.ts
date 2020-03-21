/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import Row from './Row';
import Stage from './Stage';

const ROUNDS = [
    1, 2, 3, 4,
    5, 6, 7, 8,
    9, 10, 11, 12,
    13, 14, 15, 16,
];

/**
 * Creates a [[Row]] representing rounds on a particular stage
 *
 * ```
 * > Pricker.rounds(Pricker.Stage.Cinques);
 * [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
 * ```
 */
const rounds = (stage: Stage): Row => ROUNDS.slice(0, stage);

export default rounds;
