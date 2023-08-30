/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { type AbstractCourse, type AbstractLead, Call } from '../../leads';
import * as Templates from '../../templates';
import text from './text.dot';

/**
 * Calling of a touch
 *
 * When searching for large volumes of touches we don't want to construct a
 * {@link Stedman.Course} object for each one. Instead we store a simple calling
 * string representing each touch. This class provides methods to convert such a
 * calling into more useful formats.
 *
 * ```
 * > const calling = new Calling('- s- - - -   -');
 * > calling.print('text');
 * '1 s3 4 6 8 10 14'
 * > const course = new Course(rounds(Stage.Triples), new Stedman());
 * > calling.updateCourse(course);
 * > course.print('text');
 * '7654321  1 s3 4 6 8 10 14'
 */
@Templates.makePrintable({ text })
class Calling implements Templates.Interface {
    constructor(public readonly calling: string) {
        // NOOP
    }

    /**
     * Updates a {@link Stedman.Course} based on the calling.
     *
     * ```
     * > const calling = new Calling('- s- - - -   -');
     * > const course = new Course(rounds(Stage.Triples), new Stedman());
     * > calling.updateCourse(course);
     * > course.print('text');
     * '7654321  1 s3 4 6 8 10 14'
     * ```
     */
    public updateCourse(course: AbstractCourse<AbstractLead>): void {
        course.setLength(this.calling.length);

        for (let i = 1; i <= this.calling.length; i += 1) {
            if (this.calling[i - 1] === ' ') {
                course.getBlock(i).call = Call.Plain;
            } else if (this.calling[i - 1] === '-') {
                course.getBlock(i).call = Call.Bob;
            } else if (this.calling[i - 1] === 's') {
                course.getBlock(i).call = Call.Single;
            }
        }
    }

    /* templating *************************************************************/

    public print: Templates.Print;
}

export default Calling;
