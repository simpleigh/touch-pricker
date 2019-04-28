/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-19 Leigh Simpson. All rights reserved.
 */

import { rowFromString, Stage, stringFromRow } from '../../rows';
import * as Templates from '../../templates';
import AbstractMatcher from '../AbstractMatcher';
import text from '../lib/text.dot';

/**
 * Base for music matching schemes.
 *
 * A scheme assembles other [[AbstractMatcher]]s (usually [[Pattern]]s and
 * [[PatternGroup]]s) together to perform a single analysis of a touch.
 * Schemes should be applicable to multiple [[Stage]]s.
 *
 * Derived classes should implement `createMatchers` in order to set up an array
 * of matchers for use when checking row strings.
 *
 * ```
 * class MyScheme extends AbstractScheme {
 *   public readonly name: string = 'My music scheme';
 *
 *   protected createMatchers(rounds: string): AbstractMatcher[] {
 *     return [
 *       new Pattern(
 *         rounds.split('').reverse().join(''), // reverses rounds
 *         'Backrounds',
 *         MatchType.Row,
 *       ),
 *       // more patterns or pattern groups
 *     ];
 *   }
 * }
 * ```
 *
 * Once constructed, the base class manages:
 *
 *   * passing test row strings to all provided matchers
 *   * aggregating match counts from matchers
 *   * printing the music report
 */
@Templates.makePrintable({ text })
abstract class AbstractScheme extends AbstractMatcher {

    /**
     * Matchers for this scheme.
     */
    protected _matchers: AbstractMatcher[];

    /**
     * Constructor.
     */
    constructor(protected _stage: Stage) {
        super();
        this._matchers = this.createMatchers(
            stringFromRow(rowFromString('', _stage)),  // rounds
        );
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

    /* AbstractScheme methods *************************************************/

    /**
     * Create matchers for this scheme/stage.
     * Derived classes should implement this to set up [[_matchers]] when the
     * object is constructed.
     */
    protected abstract createMatchers(rounds: string): AbstractMatcher[];

    /**
     * Provides read access to the matchers.
     */
    get matchers(): AbstractMatcher[] {
        return this._matchers.slice();
    }

}

export default AbstractScheme;
