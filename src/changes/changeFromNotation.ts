/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-19 Leigh Simpson. All rights reserved.
 */

import { Bell, bellFromSymbol, Row, Stage } from '../rows';
import Change from './Change';

/**
 * Helper function that extends a change to swap two bells
 */
const swap = (change: Change, place: number): Change => (row: Row) => {
    // Apply the original change
    change(row);

    // ... then swap the pair
    let bell: Bell;
    bell = row[place - 1];
    row[place - 1] = row[place];
    row[place] = bell;

    return row;
};

/**
 * Converts a string notation into a [[Change]]
 *
 * Tries to convert a string representation of a change into a change on a
 * particular stage.
 *
 * ```
 * > const change = Pricker.changeFromNotation('1', Pricker.Stage.Triples);
 * 1
 * ```
 */
const changeFromNotation = (input: string, stage: Stage): Change => {
    input = input.toUpperCase();

    // Start out with the empty change and accumulate swaps as we go
    let change: Change = (row: Row) => { /* NOOP */ };

    // Also accumulate a canonical representation of the notation
    let notation = '';

    let currentPlace: Bell = 1;
    for (const inputCharacter of input.split('')) {
        const bellNumber = bellFromSymbol(inputCharacter);

        if (bellNumber > stage) {
            throw new Error('Unknown bell');
        }

        if (bellNumber < currentPlace) {
            throw new Error('Bell out of order');
        }

        // Add '1' at the beginning if necessary
        if (currentPlace === 1 && bellNumber > 1 && bellNumber % 2 === 0) {
            notation = '1';
            currentPlace = currentPlace + 1;
        }

        // Advance to the correct place
        while (currentPlace < bellNumber - 1) {
            change = swap(change, currentPlace);
            currentPlace = currentPlace + 2;
        }

        // TODO: what if a bell is missed out?

        notation = notation + inputCharacter;
        currentPlace = currentPlace + 1;
    }

    while (currentPlace < stage) {
        change = swap(change, currentPlace);
        currentPlace = currentPlace + 2;
    }

    // Add <n> at the end if necessary
    if (currentPlace === stage) {
        const bellSymbols = ' 1234567890ETABC';
        notation = notation + bellSymbols.charAt(stage);
    }

    change.toString = () => notation;
    return change;
};

export default changeFromNotation;
