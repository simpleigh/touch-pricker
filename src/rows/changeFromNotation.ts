/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-19 Leigh Simpson. All rights reserved.
 */

import Bell from './Bell';
import bellFromSymbol from './bellFromSymbol';
import Change from './Change';
import Row from './Row';
import Stage from './Stage';

/**
 * Helper function that extends a change to swap two bells
 */
const swap = (change: Change, place: number): Change => (row: Row) => {
    // Apply the original change
    change(row);

    // ... then swap the pair
    const bell: Bell = row[place - 1];
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
        let inputPlace: Bell;

        try {
            inputPlace = bellFromSymbol(inputCharacter);
        } catch (_) {
            // Rethrow with a more appropriate message
            throw new Error('Unknown place');
        }

        if (inputPlace > stage) {
            throw new Error('Unknown place');
        }

        if (inputPlace === currentPlace - 1) {
            throw new Error('Repeated place');
        }

        if (inputPlace < currentPlace) {
            throw new Error('Place out of order');
        }

        // Add '1' at the beginning if necessary
        if (currentPlace === 1 && inputPlace > 1 && inputPlace % 2 === 0) {
            notation = '1';
            currentPlace = currentPlace + 1;
        }

        // Advance to the correct place
        while (currentPlace < inputPlace - 1) {
            change = swap(change, currentPlace);
            currentPlace = currentPlace + 2;
        }

        if (currentPlace === inputPlace - 1) {
            throw new Error('Place missed out');
        }

        notation = notation + inputCharacter;
        currentPlace = currentPlace + 1;
    }

    while (currentPlace < stage) {
        change = swap(change, currentPlace);
        currentPlace = currentPlace + 2;
    }

    // Add <n> at the end if necessary
    if (currentPlace === stage) {
        notation = notation + ' 1234567890ETABC'.charAt(stage);
    }

    change.toString = () => notation;
    return change;
};

export default changeFromNotation;
