/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-19 Leigh Simpson. All rights reserved.
 */

import { Row } from '../rows';
import * as Templates from '../templates';

/**
 * A change
 *
 * Changes permute a row in order to generate the next row.
 * They should be constructed using `changeFromNotation()`.
 */
export type BaseChange = ((row: Row) => void);

/**
 * A printable change
 *
 * Extension of [[BaseChange]] that can be printed to retrieve the notation.
 *
 * ```
 * > const change = Pricker.changeFromNotation('1', Pricker.Stage.Triples);
 * TODO #######################################################################
 * > change.print('text');
 * '1'
 * ```
 */
export type PrintableChange = BaseChange & Templates.Interface;
