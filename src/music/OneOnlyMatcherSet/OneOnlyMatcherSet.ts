/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import MatcherSet from '../MatcherSet';

/**
 * A {@link MatcherSet} that only reports a single match.
 *
 * Forwards rows to child matchers, but stops processing when a match occurs.
 * This is useful to avoid reporting multiple similar matches for the same row:
 *
 * ```
 * const set = new OneOnlyMatcherSet([
 *   new Pattern('987654321'),
 *   new Pattern('87654321'),
 *   new Pattern('7654321'),
 *   new Pattern('654321'),
 *   new Pattern('54321'),
 *   new Pattern('4321'),
 * ]);
 * ```
 *
 * The example above will report only one match for '987654321' rather than six.
 */
class OneOnlyMatcherSet extends MatcherSet {

    /* AbstractMatcher methods ************************************************/

    /**
     * Matches a row string.
     * Override to abort processing when a match occurs.
     */
    public override match(row: string): boolean {
        let result = false;

        for (const matcher of this._matchers) {
            // Call matcher.match explicitly...
            const rowResult = matcher.match(row);
            // ... not in here, or || will short-circuit it
            result ||= rowResult;

            if (rowResult) {
                break;
            }
        }

        return result;
    }

}

export default OneOnlyMatcherSet;
