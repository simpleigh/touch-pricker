/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="Row.ts" />

namespace Pricker {

    /**
     * Converts a [[Row]] into a string.
     */
    export function stringFromRow(row: Row): string {
        const bellSymbols = ' 1234567890ETABC',
            bellCharacters: string[] = [ ];

        for (const bell of row) {
            bellCharacters.push(bellSymbols.charAt(bell));
        }

        return bellCharacters.join('');
    }

}
