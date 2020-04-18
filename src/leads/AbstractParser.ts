/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { AbstractBlock, RandomAccessContainer } from '../blocks';
import { rounds, Row, Stage } from '../rows';

/**
 * Abstract class representing a "parser" for touches
 *
 * Takes a text input describing a touch. Uses each line of that input to create
 * an appropriate block, and then assembles those blocks into a
 * [[RandomAccessContainer]].
 */
abstract class AbstractParser<
    Touch extends RandomAccessContainer<AbstractBlock>
> {

    /**
     * Parses calling for a touch expressed on multiple lines
     * Strips out:
     *  - blank lines
     *  - MicroSIRIL's comment marker (`/` at the start of a line)
     *  - Other comments (marked using `//` anywhere in a line)
     * Uses the first line to create a touch and passes each subsequent line to
     * `parseLine()` for further processing.
     * @param input         input string to parse
     * @param lineParser    function to parse a particular line
     */
    public parseTouch(input: string): Touch {
        const lines = input.split('\n')
            // Drop any content after comment characters "//"
            .map((line) => line.replace(/\/\/.*$/, ''))

            // Ignore a microsiril comment character "/" at the start of a line"
            // (n.b. remove the character, don't remove the line)
            .map((line) => line.replace(/^\//, ''))

            // Skip blank lines
            .filter((line) => !/^\s*$/.test(line));

        if (!lines.length) {
            throw new Error('No input lines');
        }

        // Create the touch with a stage based on the first line
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const first = lines.shift()!.replace(/\s/g, '');
        if (!Stage[first.length]) {
            throw new Error(`Cannot recognise stage from line '${first}'`);
        }
        const touch = this.createTouch(rounds(first.length));

        // Parse the remainder of the lines and add them to the touch
        lines.forEach((line) => {
            const block = this.parseLine(touch.getLast(), line);
            if (block) {
                touch.insertBlock(touch.length + 1, block);
            }
        });

        return touch;
    }

    /**
     * Creates an instance of the touch being parsed
     * @param initialRow  rounds for the parsed stage
     */
    protected abstract createTouch(initialRow: Row): Touch;

    /**
     * Parses a line of the input
     * @param input       input line
     * @param initialRow  first row for this course
     */
    protected abstract parseLine(
        initialRow: Row,
        input: string,
    ): AbstractBlock | undefined;

}

export default AbstractParser;
