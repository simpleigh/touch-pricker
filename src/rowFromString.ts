import Bell from './Bell';
import Row from './Row';
import Stage from './Stage';

/**
 * Lookup table from bell characters back to numbers
 */
const BELL_SYMBOLS_REVERSE: any = {
    '1': 1, '2': 2, '3': 3, '4': 4, '5': 5,
    '6': 6, '7': 7, '8': 8, '9': 9, '0': 10,
    'E': 11, 'T': 12, 'A': 13, 'B': 14, 'C': 15,
};

/**
 * Converts a string into a row array
 */
function rowFromString(input: string, stage: Stage): Row {
    let bellNumber: Bell;
    const bellsSeen: boolean[] = [];
    let inputIndex: number;
    const output: Row = [];

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
        bellNumber = BELL_SYMBOLS_REVERSE[input[inputIndex]];

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
}

export default rowFromString;
