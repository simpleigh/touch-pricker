/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import Bell from './Bell';
import Row from './Row';
import Stage from './Stage';

/**
 * Converts a string into a [[Row]].
 *
 * Tries to convert a string representation of a row into a row on a
 * particular stage.
 * If any bells are missing from the input string then these will be added
 * in order at the end of the row.
 * An exception is thrown if:
 *  - The input string is too long for the stage
 *  - A character is repeated in the input string
 *  - A character doesn't represent a bell on the current stage
 *
 * ```
 * > Pricker.rowFromString('231', Pricker.Stage.Cinques);
 * [2, 3, 1, 4, 5, 6, 7, 8, 9, 0, 11]
 * ```
 */
const rowFromString = (input: string, stage: Stage): Row => {
    // tslint:disable:object-literal-sort-keys
    const bellSymbolsMap: { [index: string]: number } = {
            '1': 1, '2': 2, '3': 3, '4': 4, '5': 5,
            '6': 6, '7': 7, '8': 8, '9': 9, '0': 10,
            'E': 11, 'T': 12, 'A': 13, 'B': 14, 'C': 15,
        };
    // tslint:enable:object-literal-sort-keys

    const bellsSeen: boolean[] = [ ],
        output: Row = [ ];

    let bellNumber: Bell,
        inputIndex: number;

    input = input.toUpperCase();

    if (input.length > stage) {
        throw new Error('Row too long');
    }

    // Build a table to record when we've seen each bell
    for (bellNumber = 1; bellNumber <= stage; bellNumber += 1) {
        bellsSeen[bellNumber] = false;
    }

    for (
        inputIndex = 0;
        inputIndex < input.length && inputIndex < stage;
        inputIndex += 1
    ) {
        bellNumber = bellSymbolsMap[input.charAt(inputIndex)];

        if (bellNumber && bellNumber <= stage) {
            if (bellsSeen[bellNumber]) {
                throw new Error('Bell repeated');
            }
            output.push(bellNumber);
            bellsSeen[bellNumber] = true;
        } else {
            throw new Error('Unknown bell');
        }
    }

    if (input.length < stage) {
        for (bellNumber = 1; bellNumber <= stage; bellNumber += 1) {
            if (!bellsSeen[bellNumber]) {
                output.push(bellNumber);
            }
        }
    }

    return output;
};

export default rowFromString;
