/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import * as Templates from '../../templates';
import AbstractMatcher from '../AbstractMatcher';
import Pattern from '../Pattern';
import text from './text.dot';

/**
 * Group of patterns for concise reporting.
 *
 * It's useful to group related patterns together when analysing music.
 * For example, we could check for all so-called CRUs in one pass:
 *
 * ```
 * const group = new PatternGroup('CRUs', [
 *   new Pattern('4578'),
 *   new Pattern('4678'),
 *   // ...
 *   new Pattern('6578'),
 * ]);
 * group.match('43126578'); // true (matches)
 * group.match('43125676'); // true
 * group.match('43128765'); // false (doesn't match)
 * group.matchCount;        // 2
 * group.print('text');     // '2 CRUs (1 5678, 1 6578)'
 * ```
 *
 * It's also possible to match a single pattern while highlighting particular
 * special cases.
 * For example, we could check for reverse rollups but highlight back rounds:
 *
 * ```
 * const group = new PatternGroup(
 *   '8765s',
 *   [new Pattern('87654321', 'Backrounds', MatchType.Row)],
 *   new Pattern('8765', null, MatchType.Front),
 * );
 * group.match('87654312'); // true
 * group.match('87654321'); // true
 * group.matchCount;        // 2
 * group.submatchCount;     // 1
 * group.print('text');     // '2 8765s (Backrounds)'
 * ```
 *
 * Here the [[matchCount]] is overridden by the supplied parent pattern.
 * The [[submatchCount]] is the sum of child pattern matches.
 */
@Templates.makePrintable({ text })
class PatternGroup extends AbstractMatcher {

    /**
     * Patterns in this group.
     */
    protected _patterns: Pattern[];

    /**
     * Constructor
     * @param _name           Name to use when printing results.
     * @param patterns        Patterns to include in this group.
     * @param _parentPattern  Optional top-level pattern to override count.
     */
    constructor(
        protected _name: string,
        patterns: Pattern[],
        protected _parentPattern?: Pattern,
    ) {
        super();
        this._patterns = patterns.slice();
    }

    /* AbstractMatcher methods ************************************************/

    /**
     * Matches a row string.
     */
    public match(row: string): boolean {
        let result = false;

        for (const pattern of this._patterns) {
            // Call pattern.match explicitly...
            const rowResult = pattern.match(row);
            // ... not in here, or || will short-circuit it
            result = result || rowResult;
        }

        if (this._parentPattern) {
            this._parentPattern.match(row);
        }

        return result;
    }

    /**
     * Provides read access to the name.
     */
    get name(): string {
        return this._name;
    }

    /**
     * Provides read access to the count of matches.
     */
    get matchCount(): number {
        if (this._parentPattern) {
            return this._parentPattern.matchCount;
        }
        return this.submatchCount;
    }

    /* PatternGroup methods ***************************************************/

    /**
     * Provides read access to the patterns.
     */
    get patterns(): Pattern[] {
        return this._patterns.slice();
    }

    /**
     * Provides read access to the count of matches within child patterns.
     * This differs from the [[matchCount]] if a parent pattern is being used.
     */
    get submatchCount(): number {
        let matches = 0;

        for (const pattern of this._patterns) {
            matches += pattern.matchCount;
        }

        return matches;
    }

}

export default PatternGroup;
