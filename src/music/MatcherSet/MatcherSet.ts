/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-19 Leigh Simpson. All rights reserved.
 */

import * as Templates from '../../templates';
import AbstractMatcher from '../AbstractMatcher';
import text from './text.dot';

/**
 * An [[AbstractMatcher]] that combines other matchers.
 *
 * Forwards rows to a group of child matchers.
 * Allows matchers to be grouped together, e.g. into an [[AbstractScheme]].
 * This is also useful when using the [[OneOnlyMatcherSet]]:
 *
 * ```
 * const set = new OneOnlyMatcherSet([
 *   new MatcherSet([
 *     // named musical rows
 *   ]),
 *   new MatcherSet([
 *     // runs off the front
 *     // runs off the back
 *   ]),
 * ]);
 * ```
 *
 * The [[MatcherSet]] allows a row to match runs off both the front and the back
 * despite use of the [[OneOnlyMatcherSet]].
 */
@Templates.makePrintable({ text })
class MatcherSet extends AbstractMatcher {

    /**
     * Constructor.
     * @param _matchers  Matchers in the set.
     */
    constructor(protected _matchers: AbstractMatcher[]) {
        super();
    }

    /* AbstractMatcher methods ************************************************/

    /**
     * Matches a row string.
     */
    public match(row: string): boolean {
        let result = false;

        for (const matcher of this._matchers) {
            // Call matcher.match explicitly...
            const rowResult = matcher.match(row);
            // ... not in here, or || will short-circuit it
            result = result || rowResult;
        }

        return result;
    }

    /**
     * Provides read access to the count of matches.
     */
    get matchCount(): number {
        let matches = 0;

        for (const matcher of this._matchers) {
            matches += matcher.matchCount;
        }

        return matches;
    }

    /* MatcherSet methods *****************************************************/

    /**
     * Provides read access to matchers
     */
    get matchers(): AbstractMatcher[] {
        return this._matchers.slice();
    }

}

export default MatcherSet;
