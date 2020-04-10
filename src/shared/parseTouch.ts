/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { rounds, Row, Stage } from '../rows';

/**
 * Parses calling for a touch expressed on multiple lines
 * Strips out:
 *  - blank lines
 *  - MicroSIRIL's comment marker (`/` at the start of a line)
 *  - Other comments (marked using `//` anywhere in a line)
 * ... and passes each line to another function to parse
 * @param touchFactory  function to create a touch
 * @param input         input string to parse
 * @param lineParser    function to parse a particular line
 */
const parseTouch = <Touch>(
    touchFactory: (row: Row) => Touch,
    input: string,
    lineParser: (touch: Touch, line: string) => void,
): Touch => {
    const lines = input.split('\n')
        // Drop any content after comment characters "//"
        .map((line) => line.replace(/\/\/.*$/, ''))

        // Ignore a microsiril comment character "/" at the start of a line"
        // (n.b. remove the character, don't remove the line)
        .map((line) => line.replace(/^\//, ''))

        // Skip blank lines
        .filter((line) => !(/^\s*$/.test(line)));

    if (!lines.length) {
        throw new Error('No input lines');
    }

    // Create the touch with a stage based on the first line
    const first = lines.shift()!.replace(/\s/g, '');
    if (!Stage[first.length]) {
        throw new Error('Cannot recognise stage');
    }
    const touch = touchFactory(rounds(first.length));

    // Pass the remainder of the lines to the parser
    lines.forEach((line) => lineParser(touch, line));

    return touch;
};

export default parseTouch;
