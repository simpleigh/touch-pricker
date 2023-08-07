/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { LeadBasedParser } from '../leads';
import { Row } from '../rows';
import Course from './Course';
import { AbstractMethod, Stedman } from './methods';
import Touch from './Touch';

/**
 * Parser for touches of Grandsire
 */
class Parser extends LeadBasedParser<Course, Touch> {

    /**
     * The method being parsed
     */
    private _method: AbstractMethod = new Stedman();

    /**
     * During parsing text describing the start (if found)
     */
    private _start?: string;

    /* AbstractParser methods *************************************************/

    /**
     * Parses calling for a touch expressed on multiple lines
     * Strips out:
     * - blank lines
     * - MicroSIRIL's comment marker (`/` at the start of a line)
     * - Other comments (marked using `//` anywhere in a line)
     * Uses the first line to create a touch and passes each subsequent line to
     * `parseLine()` for further processing.
     * @param input       input string to parse
     */
    public parseTouch(input: string): Touch {
        this._start = undefined;

        const touch = super.parseTouch(input);

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (this._start) {
            touch.start.setFromString(this._start);
        }

        return touch;
    }

    /**
     * Creates an instance of the touch being parsed
     * @param initialRow  rounds for the parsed stage
     */
    protected createTouch(initialRow: Row): Touch {
        return new Touch(initialRow, this._method);
    }

    /* LeadBasedParser methods ************************************************/

    /**
     * Parses a line of the input
     */
    protected parseLine(initialRow: Row, input: string): Course | undefined {
        // Store start definitions for later processing
        if (/start/iu.test(input)) {
            this._start = input;
            return undefined;
        }

        return this.parseCourse(initialRow, input);
    }

    /**
     * Creates an instance of the course being parsed
     * @param initialRow  rounds for the parsed stage
     */
    protected createCourse(initialRow: Row): Course {
        return new Course(initialRow, this._method);
    }

    /* Parser methods *********************************************************/

    /**
     * Read access to the method
     */
    get method(): AbstractMethod {
        return this._method;
    }

    /**
     * Write access to the method
     */
    set method(method: AbstractMethod) {
        this._method = method;
    }

}

export default Parser;
