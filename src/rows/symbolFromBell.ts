/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { Bell } from './types';

/**
 * Converts a [[Bell]] into a character.
 *
 * Converts a bell into the character representing that bell.
 *
 * ```
 * > Pricker.symbolFromBell(11);
 * 'E'
 * ```
 */
const symbolFromBell = (bell: Bell): string => ' 1234567890ETABCD'.charAt(bell);

export default symbolFromBell;
