/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { RandomAccessContainer } from '../../blocks';
import { Call, stringFromRow } from '../../rows';
import * as Templates from '../../templates';
import Course from '../Course';
import Lead from '../Lead';
import Parser from '../Parser';
import select from './select.dot';
import siril from './siril.dot';
import text from './text.dot';

/**
 * A touch, being a set of courses
 */
@Templates.makePrintable({ select, siril, text }, { Call, stringFromRow })
class Touch
    extends RandomAccessContainer<Course>
    implements Templates.Interface {

    /* templating *************************************************************/

    public print: Templates.Print;

    /**
     * Computes place notation for each type of lead
     * Helper for use in templates
     * @return { [Call]: string[] }
     */
    get callNotations(): string[][] {
        const result = [ ];
        const lead = new Lead(this.initialRow);

        for (const call of [Call.Plain, Call.Bob, Call.Single]) {
            lead.setCall(call);
            result[call] = lead.notation;
        }

        return result;
    }

    /**
     * Creates a new touch from a string representation
     */
    public static fromString(
        input: string,
        parser: Parser = new Parser(),
    ): Touch {
        return parser.parseTouch(input);
    }
}

export default Touch;
