/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import symbolFromBell from './symbolFromBell';
import type { Row } from './types';

/**
 * Converts a {@link Row} into a string.
 */
const stringFromRow = (row: Row): string => {
    const bellSymbols: string[] = [];

    for (const bell of row) {
        bellSymbols.push(symbolFromBell(bell));
    }

    return bellSymbols.join('');
};

export default stringFromRow;
