/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { AbstractCourse, Call } from '../../leads';
import { stringFromRow, Row } from '../../rows';
import * as Templates from '../../templates';
import Lead from '../Lead';
import Parser from '../Parser';
import html from './html.dot';
import mbd from './mbd.dot';
import siril from './siril.dot';
import text from './text.dot';

/**
 * A course, being a set of leads
 */
@Templates.makePrintable({ html, mbd, siril, text }, { Call, stringFromRow })
class Course extends AbstractCourse<Lead> implements Templates.Interface {

    /* templating *************************************************************/

    public print: Templates.Print;

    /* SerialContainer methods ************************************************/

    /**
     * Returns the default length for this container
     * N.b. this is likely to vary depending on the stage
     */
    protected get defaultLength(): number {
        return this.stage - 2;
    }

    /**
     * Creates a new block for the container
     *
     * Used by extend() when creating the container or increasing its
     * length.
     * @param initialRow  initial row for the block
     * @param index       index of block in container
     */
    protected createBlock(initialRow: Row, index: number): Lead {
        return new Lead(initialRow, { container: this, index });
    }

    /* Course methods *********************************************************/

    /**
     * Clones the course
     */
    public clone(): Course {
        const cloned = new Course(this._initialRow);
        cloned.setLength(this.length);

        // Copy across all the calls
        for (let index = 1; index <= this.length; index += 1) {
            cloned.getBlock(index).setCall(
                this.getBlock(index).call,
                false,  // Avoid multiple updates...
            );
        }

        // ... and trigger one at the end
        if (cloned.length) {
            cloned.getBlock(1).setCall(this.getBlock(1).call);
        }

        return cloned;
    }

    /**
     * Creates a new course from a string representation
     */
    public static fromString(
        initialRow: Row,
        input: string,
        parser: Parser = new Parser(),
    ): Course {
        return parser.parseCourse(initialRow, input);
    }

}

export default Course;
