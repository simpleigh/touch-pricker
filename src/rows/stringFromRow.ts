/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import Row from './Row';
import symbolFromBell from './symbolFromBell';

/**
 * Converts a [[Row]] into a string.
 */
const stringFromRow = (row: Row): string => {
    const bellSymbols: string[] = [ ];

    for (const bell of row) {
        bellSymbols.push(symbolFromBell(bell));
    }

    return bellSymbols.join('');
};

export default stringFromRow;
