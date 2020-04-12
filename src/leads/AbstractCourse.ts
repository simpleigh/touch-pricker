/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { SerialContainer } from '../blocks';
import AbstractLead from './AbstractLead';
import Call from './Call';

/**
 * Course class
 *
 * A [[SerialContainer]] for [[AbstractLead]]s.
 */
abstract class AbstractCourse<Lead extends AbstractLead>
    extends SerialContainer<Lead>
{

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

}

export default AbstractCourse
