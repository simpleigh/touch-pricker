/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { Bell } from './types';

/* eslint-disable
@typescript-eslint/naming-convention,
sort-keys,
*/
// prettier-ignore
const BELL_SYMBOLS_MAP: Partial<Record<string, Bell>> = {
    '1': 1, '2': 2, '3': 3, '4': 4,
    '5': 5, '6': 6, '7': 7, '8': 8,
    '9': 9, '0': 10, 'E': 11, 'T': 12,
    'A': 13, 'B': 14, 'C': 15, 'D': 16,
};
/* eslint-enable */

/**
 * Converts a character into a {@link Bell}.
 *
 * Tries to convert an individual bell character into a bell number.
 * An exception is thrown if the character cannot be recognised.
 *
 * ```
 * > Pricker.bellFromSymbol('E');
 * 11
 * ```
 */
const bellFromSymbol = (input: string): Bell => {
    const upper = input.toUpperCase();

    if (!BELL_SYMBOLS_MAP[upper]) {
        throw new Error(`Unknown bell '${input}'`);
    }

    return BELL_SYMBOLS_MAP[upper]!;
};

export default bellFromSymbol;
