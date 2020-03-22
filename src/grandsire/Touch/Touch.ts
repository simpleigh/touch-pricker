/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { RandomAccessContainer } from '../../blocks';
import { stringFromRow } from '../../rows';
import * as Templates from '../../templates';
import Course from '../Course';
import select from './select.dot';

/**
 * A touch, being a set of courses
 */
@Templates.makePrintable({ select }, { stringFromRow })
class Touch
    extends RandomAccessContainer<Course>
    implements Templates.Interface {

    /* templating *************************************************************/

    public print: Templates.Print;

}

export default Touch;
