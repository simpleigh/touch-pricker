/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-19 Leigh Simpson. All rights reserved.
 */

import * as Templates from '../../templates';
import AbstractMatcher from '../AbstractMatcher';
import text from '../lib/text.dot';

/**
 * An [[AbstractMatcher]] that only reports a single match.
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
@Templates.makePrintable({ text })
class OneOnlyMatcherSet extends AbstractMatcher {

    /**
     * Constructor.
     * @param _matchers  Matchers in the set.
     * @param _name      Name to use when printing results.
     */
    constructor(
        protected _matchers: AbstractMatcher[],
        protected _name?: string,
    ) {
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

            if (rowResult) {
                break;
            }
        }

        return result;
    }

    /**
     * Provides read access to the name.
     */
    get name(): string {
        if (this._name) {
            return this._name;
        }

        const matcherNames = [];
        for (const matcher of this._matchers) {
            matcherNames.push(matcher.name);
        }
        return `OneOnlyMatcherSet(${matcherNames.join(', ')})`;
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

    /* OneOnlyMatcherSet methods **********************************************/

    /**
     * Provides read access to matchers
     */
    get matchers(): AbstractMatcher[] {
        return this._matchers.slice();
    }

}

export default OneOnlyMatcherSet;
