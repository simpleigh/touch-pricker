/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import bellFromSymbol from './bellFromSymbol';
import symbolFromBell from './symbolFromBell';
import { Bell, Change, MutableRow, Stage } from './types';

/**
 * Helper function that extends a change to swap two bells
 */
const swap = (change: Change, place: number): Change => (row: MutableRow) => {
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
    let change: Change = () => { /* NOOP */ };

    // Also accumulate a canonical representation of the notation
    let notation = '';

    // Handle the cross change
    if (input === '-' || input === 'X') {
        input = ''; // clear the input so we end up with all swaps
        notation = '-';
    }

    let currentPlace: Bell = 1;
    for (const inputCharacter of input.split('')) {
        let inputPlace: Bell;  // eslint-disable-line init-declarations

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
            currentPlace += 1;
        }

        // Advance to the correct place
        while (currentPlace < inputPlace - 1) {
            change = swap(change, currentPlace);
            currentPlace += 2;
        }

        if (currentPlace === inputPlace - 1) {
            throw new Error('Place missed out');
        }

        notation += inputCharacter;
        currentPlace += 1;
    }

    while (currentPlace < stage) {
        change = swap(change, currentPlace);
        currentPlace += 2;
    }

    // Add <n> at the end if necessary
    if (currentPlace === stage) {
        notation += symbolFromBell(stage);
    }

    // eslint-disable-next-line @typescript-eslint/unbound-method
    change.toString = () => notation;
    return change;
};

export default changeFromNotation;
