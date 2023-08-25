/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { Call } from '../../../leads';
import type { Row } from '../../../rows';
import * as Templates from '../../../templates';
import Course from '../../Course';
import { Stedman } from '../../methods';
import text from './text.dot';

/**
 * Calling of a touch
 *
 * When searching for large volumes of touches we don't want to construct a
 * {@link Course} object for each one. Instead we store a simple calling string
 * representing each touch. This class provides methods to convert such a
 * calling into more useful formats.
 *
 * ```
 * > const calling = new Calling('- s- - - -   -');
 * > calling.print('text');
 * '1 s3 4 6 8 10 14'
 * > calling.createCourse(rounds(Stage.Triples))
 * Course {_initialRow: Array(7), _blocks: Array(14), _method: Stedman, _firstSixType: 'slow'}
 */

@Templates.makePrintable({ text })
class Calling implements Templates.Interface {
    constructor(public readonly calling: string) {
        // NOOP
    }

    /**
     * Creates a {@link Course} based on the calling.
     *
     * ```
     * > const calling = new Calling('- s- - - -   -');
     * > calling.createCourse(rounds(Stage.Triples))
     * Course {_initialRow: Array(7), _blocks: Array(14), _method: Stedman, _firstSixType: 'slow'}
     * ```
     */
    public createCourse(initialRow: Row): Course {
        const course = new Course(initialRow, new Stedman());
        course.setLength(this.calling.length);

        for (let i = 1; i <= this.calling.length; i += 1) {
            if (this.calling[i - 1] === '-') {
                course.getBlock(i).setCall(Call.Bob);
            } else if (this.calling[i - 1] === 's') {
                course.getBlock(i).setCall(Call.Single);
            }
        }

        return course;
    }

    /* templating *************************************************************/

    public print: Templates.Print;
}

export default Calling;
