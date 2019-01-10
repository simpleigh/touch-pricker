/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-19 Leigh Simpson. All rights reserved.
 */

import * as Templates from '../../templates';
import AbstractMatcher from '../AbstractMatcher';
import MatchType from '../MatchType';
import text from './text.dot';

/**
 * Simple [[AbstractMatcher]] that uses a pattern to match rows.
 *
 * A string pattern is compared directly against provided rows.
 * By default the pattern is compared against the bells at the back of the
 * change, e.g.:
 *
 * ```
 * const pat = new Pattern('5678');
 * pat.match('43125678'); // true (matches)
 * pat.match('43126578'); // false (doesn't match)
 * pat.isWildcardMatch;   // true
 * pat.matchCount;        // 1
 * pat.print('text');     // '1 5678'
 * ```
 *
 * It's also possible to check the bells at the front of the change:
 *
 * ```
 * const pat = new Pattern('8765', '8765 off the front', MatchType.Front);
 * pat.match('87654321'); // true
 * pat.isWildcardMatch;   // true
 * pat.print('text');     // '1 8765 off the front'
 * ```
 *
 * ... or check an entire row:
 *
 * ```
 * const pat = new Pattern('13572468', 'Queens', MatchType.Row);
 * pat.match('13572468'); // true
 * pat.isWildcardMatch;   // false
 * pat.print('text');     // 'Queens'
 * ```
 *
 * If no pattern name is provided then the pattern itself will be used when
 * printing results.
 */
@Templates.makePrintable({ text })
class Pattern extends AbstractMatcher {

    /**
     * Count of matches.
     */
    protected _matchCount: number = 0;

    /**
     * Constructor.
     * @param _pattern  String to match.
     * @param _name     Name to use when printing results.
     * @param _type     Type of match.
     */
    constructor(
        protected _pattern: string,
        protected _name?: string,
        protected _type: MatchType = MatchType.Back,
    ) {
        super();
    }

    /* AbstractMatcher methods ************************************************/

    /**
     * Matches a row string.
     */
    public match(row: string): boolean {
        if (this._type === MatchType.Back) {
            row = row.slice(-this._pattern.length);
        } else if (this._type === MatchType.Front) {
            row = row.slice(0, this._pattern.length);
        }

        if (row === this._pattern) {
            this._matchCount += 1;
            return true;
        }

        return false;
    }

    /**
     * Provides read access to the name.
     */
    get name(): string {
        return this._name || this._pattern;
    }

    /**
     * Provides read access to the count of matches.
     */
    get matchCount(): number {
        return this._matchCount;
    }

    /* Pattern methods ********************************************************/

    /**
     * Whether this is a wildcard match.
     */
    get isWildcardMatch(): boolean {
        return this._type !== MatchType.Row;
    }

}

export default Pattern;
