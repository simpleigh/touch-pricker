/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { RandomAccessContainer } from '../../blocks';
import { Row, stringFromRow } from '../../rows';
import { parseTouch } from '../../shared';
import * as Templates from '../../templates';
import Course from '../Course';
import select from './select.dot';
import text from './text.dot';

/**
 * A touch, being a set of courses
 */
@Templates.makePrintable({ select, text }, { stringFromRow })
class Touch
    extends RandomAccessContainer<Course>
    implements Templates.Interface {

    /* templating *************************************************************/

    public print: Templates.Print;

    /**
     * Creates a new touch from a string representation
     */
    public static fromString(input: string): Touch {
        return parseTouch(
            (row: Row) => new Touch(row),
            input,
            (touch: Touch, line: string) => {
                const course = Course.fromString(touch.getLast(), line);
                touch.insertBlock(touch.length + 1, course);
            },
        );
    }
}

export default Touch;
