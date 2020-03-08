/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import AbstractMatcher from './AbstractMatcher';
import AbstractScheme from './AbstractScheme';

/**
 * Custom music matching scheme with matchers defined at runtime.
 *
 * Music schemes usually assemble their [[AbstractMatcher]]s when constructed.
 * This scheme allows matchers to be provided dynamically before matching.
 *
 * ```
 * const scheme = new CustomScheme(Stage.Major);
 * scheme.addMatcher(new Pattern('87654321', 'Backrounds'));
 * scheme.addMatcher(new Pattern('5678'));
 * scheme.match('43125678'); // true (matches)
 * scheme.match('13245678'); // true
 * scheme.match('87654321'); // true
 * scheme.matchCount;        // 3
 *
 * scheme.print('text');
 * // Backrounds
 * // 2 5678s
 * ```
 */
class CustomScheme extends AbstractScheme {

    /* AbstractScheme methods *************************************************/

    /**
     * Create matchers for this scheme/stage.
     */
    protected createMatchers(rounds: string): AbstractMatcher[] {
        return [ ];
    }

    /* CustomScheme methods ***************************************************/

    /**
     * Add a matcher for use when analysing music.
     */
    public addMatcher(matcher: AbstractMatcher): void {
        this._matchers.push(matcher);
    }

}

export default CustomScheme;
