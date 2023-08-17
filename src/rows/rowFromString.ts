/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */

import bellFromSymbol from './bellFromSymbol';
import { Bell, MutableRow, Row, Stage } from './types';

/**
 * Converts a string into a {@link Row}.
 *
 * Tries to convert a string representation of a row into a row on a
 * particular stage.
 * If any bells are missing from the input string then these will be added
 * in order at the end of the row.
 * An exception is thrown if:
 * - The input string is too long for the stage
 * - A character is repeated in the input string
 * - A character doesn't represent a bell on the current stage
 *
 * ```
 * > Pricker.rowFromString('2143', Pricker.Stage.Minimus);
 * [2, 1, 4, 3]
 * ```
 */
const rowFromString = (input: string, stage: Stage): Row => {
    input = input.toUpperCase();

    if (input.length > stage) {
        throw new Error(`Row '${input}' exceeds stage '${stage}'`);
    }

    // Build a table to record when we've seen each bell
    const bellsSeen: boolean[] = [];
    for (let bellNumber = 1; bellNumber <= stage; bellNumber += 1) {
        bellsSeen[bellNumber] = false;
    }

    const output: MutableRow = [];

    // Assemble the row based on the input string
    for (
        let inputIndex = 0;
        inputIndex < input.length && inputIndex < stage;
        inputIndex += 1
    ) {
        let bellNumber: Bell; // eslint-disable-line init-declarations

        // Catch errors parsing the bell number and add the input to the message
        try {
            bellNumber = bellFromSymbol(input.charAt(inputIndex));
        } catch (err) {
            const message = `Row '${input}' has unknown bell '${input.charAt(
                inputIndex,
            )}'`;
            (err as Error).message = message;
            throw err;
        }

        if (bellNumber > stage) {
            throw new Error(
                `Row '${input}' bell '${bellNumber}' exceeds stage '${stage}'`,
            );
        }

        if (bellsSeen[bellNumber]) {
            throw new Error(`Row '${input}' has bell '${bellNumber}' repeated`);
        }

        output.push(bellNumber);
        bellsSeen[bellNumber] = true;
    }

    // Fill in additional bells not yet seen
    if (input.length < stage) {
        for (let bellNumber = 1; bellNumber <= stage; bellNumber += 1) {
            if (!bellsSeen[bellNumber]) {
                output.push(bellNumber as Bell);
            }
        }
    }

    return output;
};

export default rowFromString;
