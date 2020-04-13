/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { SerialContainer } from '../../blocks';
import * as Templates from '../../templates';
import AbstractLead from '../AbstractLead';
import Call from '../Call';
import html from './html.dot';
import text from './text.dot';

/**
 * Course class
 *
 * A [[SerialContainer]] for [[AbstractLead]]s.
 */
@Templates.makePrintable({ html, text }, { Call })
abstract class AbstractCourse<Lead extends AbstractLead>
    extends SerialContainer<Lead>
{

    /* templating *************************************************************/

    public print: Templates.Print;

    /* AbstractCourse methods *************************************************/

    /**
     * Makes the course into a plain course
     */
    public resetCalls(): this {
        for (const lead of this._blocks) {
            lead.setCall(Call.Plain, false);  // Avoid multiple updates...
        }

        // ... and trigger one at the end
        if (this.length) {
            this.getBlock(1).setCall(Call.Plain);
        }

        return this;
    }

    /**
     * Checks whether this is a plain course
     */
    public isPlain(): boolean {
        for (const lead of this._blocks) {
            if (lead.call) {
                return false;
            }
        }
        return true;
    }

    /**
     * Clones the course
     */
    public clone(): this {
        const cloned: this = new (this.constructor as any)(this._initialRow);
        AbstractCourse.copyCalls(this, cloned);
        return cloned;
    }

    /**
     * Helper function for use when cloning courses
     * Sets a target course to the correct length and then copies all calls from
     * the source.
     */
    protected static copyCalls<Course extends AbstractCourse<AbstractLead>>(
        source: Course,
        target: Course,
    ): void {
        target.setLength(source.length);

        // Copy across all the calls
        for (let index = 1; index <= source.length; index += 1) {
            target.getBlock(index).setCall(
                source.getBlock(index).call,
                false,  // Avoid multiple updates...
            );
        }

        // ... and trigger one at the end
        if (target.length) {
            target.getBlock(1).setCall(source.getBlock(1).call);
        }
    }

}

export default AbstractCourse
