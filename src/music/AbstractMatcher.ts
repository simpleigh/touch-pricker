/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import type * as Templates from '../templates';

/**
 * Base for classes that match rows for music
 *
 * Matchers are given a row string using {@link match}, which should immediately
 * return whether or not the row string has matched.
 * An internal {@link matchCount} should log a meaningful count of the matches
 * that have occurred.
 * Matchers should provide a `text` template so their results can be output.
 *
 * The {@link Pattern} class is the simplest matcher implemented so far,
 * allowing simple patterns of bells to be matched at the start or end of rows.
 * A more sophisticated matcher might derive from {@link AbstractScheme} to
 * perform a full musical analysis of a touch.
 */
abstract class AbstractMatcher implements Templates.Interface {
    /* templating *************************************************************/

    public print: Templates.Print;

    /* AbstractMatcher methods ************************************************/

    /**
     * Matches a row string.
     * @param row  Row to check, provided as a string value (not a {@link Row}).
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
