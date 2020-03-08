/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import * as Templates from '../templates';

/**
 * Base for classes that match rows for music
 *
 * Matchers are given a row string using [[match]], which should immediately
 * return whether or not the row string has matched.
 * An internal [[matchCount]] should log a meaningful count of the matches that
 * have occurred.
 * Matchers should provide a `text` template so their results can be output.
 *
 * The [[Pattern]] class is the simplest matcher implemented so far, allowing
 * simple patterns of bells to be matched at the start or end of rows.
 * A more sophisticated matcher might derive from [[AbstractScheme]] to perform
 * a full musical analysis of a touch.
 */
abstract class AbstractMatcher implements Templates.Interface {

    /* templating *************************************************************/

    public print: Templates.Print;

    /* AbstractMatcher methods ************************************************/

    /**
     * Matches a row string.
     * @param row  Row to check, provided as a string value (not a [[Row]]).
     * @returns    Whether or not a match occurred.
     */
    public abstract match(row: string): boolean;

    /**
     * Provides read access to the count of matches.
     * This should increment for each match that occurs.
     */
    abstract get matchCount(): number;

}

export default AbstractMatcher;
