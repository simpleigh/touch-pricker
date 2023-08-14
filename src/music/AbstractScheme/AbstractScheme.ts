/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { rounds, Stage, stringFromRow } from '../../rows';
import AbstractMatcher from '../AbstractMatcher';
import MatcherSet from '../MatcherSet';

/**
 * Base for music matching schemes.
 *
 * A scheme is a {@link MatcherSet} that is able to populate its child matches
 * automatically based on the {@link Stage}.
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
 *   - passing test row strings to all provided matchers
 *   - aggregating match counts from matchers
 *   - printing the music report
 */
abstract class AbstractScheme extends MatcherSet {
    /**
     * Constructor.
     */
    constructor(protected _stage: Stage) {
        super([]);
        this._matchers = this.createMatchers(
            stringFromRow(rounds(_stage)),
        );
    }

    /* AbstractScheme methods *************************************************/

    /**
     * Create matchers for this scheme/stage.
     * Derived classes should implement this to set up {@link _matchers} when
     * the object is constructed.
     */
    // eslint-disable-next-line @typescript-eslint/no-shadow
    protected abstract createMatchers(rounds: string): AbstractMatcher[];
}

export default AbstractScheme;
