/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-19 Leigh Simpson. All rights reserved.
 */

import { Row } from '../rows';

/**
 * A change
 *
 * Changes permute a row in order to generate the next row.
 * They should be constructed using `changeFromNotation()`.
 *
 * ```
 * > const row = Pricker.rowFromString('', Pricker.Stage.Triples);
 * [1, 2, 3, 4, 5, 6, 7]
 * > const change = Pricker.changeFromNotation('1', Pricker.Stage.Triples);
 * 1
 * > change(row);
 * [1, 3, 2, 5, 4, 7, 6]
 * ```
 */
type Change = ((row: Row) => void);

export default Change;
