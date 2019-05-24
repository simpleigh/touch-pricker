/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-19 Leigh Simpson. All rights reserved.
 */

import { Bell, bellFromSymbol, Row, Stage } from '../rows';
import { BaseChange, PrintableChange } from './types';

/**
 * Helper function that extends a change to swap two bells
 */
const swap = (change: BaseChange, place: number): BaseChange => (row: Row) => {
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
 * > const row = Pricker.rowFromString('', Pricker.Stage.Triples);
 * [1, 2, 3, 4, 5, 6, 7]
 * > const change = Pricker.changeFromNotation('1', Pricker.Stage.Triples);
 * TODO #######################################################################
 * > change(row);
 * [1, 3, 2, 5, 4, 7, 6]
 * ```
 */
const changeFromNotation = (input: string, stage: Stage): PrintableChange => {
    input = input.toUpperCase();

    // Start out with the empty change and accumulate swaps as we go
    let change: BaseChange = (row: Row) => { /* NOOP */ };

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

    (change as PrintableChange).print = () => notation;
    return (change as PrintableChange);
};

export default changeFromNotation;
