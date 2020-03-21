/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import bellFromSymbol from './bellFromSymbol';
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
 * > Pricker.rowFromString('2143', Pricker.Stage.Minimus);
 * [2, 1, 4, 3]
 * ```
 */
const rowFromString = (input: string, stage: Stage): Row => {
    input = input.toUpperCase();

    if (input.length > stage) {
        throw new Error('Row too long');
    }

    // Build a table to record when we've seen each bell
    const bellsSeen: boolean[] = [ ];
    for (let bellNumber = 1; bellNumber <= stage; bellNumber += 1) {
        bellsSeen[bellNumber] = false;
    }

    const output: Row = [ ];

    // Assemble the row based on the input string
    for (
        let inputIndex = 0;
        inputIndex < input.length && inputIndex < stage;
        inputIndex += 1
    ) {
        const bellNumber = bellFromSymbol(input.charAt(inputIndex));

        if (bellNumber > stage) {
            throw new Error('Unknown bell');
        }

        if (bellsSeen[bellNumber]) {
            throw new Error('Bell repeated');
        }

        output.push(bellNumber);
        bellsSeen[bellNumber] = true;
    }

    // Fill in additional bells not yet seen
    if (input.length < stage) {
        for (let bellNumber = 1; bellNumber <= stage; bellNumber += 1) {
            if (!bellsSeen[bellNumber]) {
                output.push(bellNumber);
            }
        }
    }

    return output;
};

export default rowFromString;
