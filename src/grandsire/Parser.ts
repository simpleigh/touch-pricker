/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { LeadBasedParser } from '../blocks';
import { Row } from '../rows';
import Course from './Course';
import Touch from './Touch';

/**
 * Parser for touches of Grandsire
 */
class Parser extends LeadBasedParser<Course, Touch> {

    /* AbstractParser methods *************************************************/

    /**
     * Creates an instance of the touch being parsed
     * @param initialRow  rounds for the parsed stage
     */
    protected createTouch(initialRow: Row): Touch {
        return new Touch(initialRow);
    }

    /* LeadBasedParser methods ************************************************/

    /**
     * Creates an instance of the course being parsed
     * @param initialRow  rounds for the parsed stage
     */
    protected createCourse(initialRow: Row): Course {
        return new Course(initialRow);
    }

}

export default Parser;
