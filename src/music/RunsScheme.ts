/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import AbstractMatcher from './AbstractMatcher';
import AbstractScheme from './AbstractScheme';
import MatcherSet from './MatcherSet';
import MatchType from './MatchType';
import OneOnlyMatcherSet from './OneOnlyMatcherSet';
import Pattern from './Pattern';
import PatternGroup from './PatternGroup';

/**
 * Reverses a string
 * @param str  String to reverse.
 * @returns reversed version of `str`.
 */
const reverse = (str: string) => str.split('').reverse().join('');

/**
 * Runs-based music matching scheme.
 */
class RunsScheme extends AbstractScheme {
    /* AbstractScheme methods *************************************************/

    /**
     * Create matchers for this scheme/stage.
     */
    protected createMatchers(rounds: string): AbstractMatcher[] {
        const frontMatchers: AbstractMatcher[] = [];
        const backMatchers: AbstractMatcher[] = [];

        // Loop over possible run lengths
        // Start with longer runs as they're more interesting.
        // Ignore rounds and the `n - 1` bell run (also rounds).
        // Ignore runs involving fewer than four bells.
        for (let run = this._stage - 2; run >= 4; run -= 1) {
            const front: Pattern[] = [];
            const back: Pattern[] = [];

            // Slice rounds at different points to generate all possible runs
            for (let index = 0; index <= this._stage - run; index += 1) {
                const pattern = rounds.slice(index, index + run);
                const revPattern = reverse(pattern);

                front.push(
                    new Pattern(pattern, pattern, MatchType.Front),
                    new Pattern(revPattern, revPattern, MatchType.Front),
                );
                back.push(
                    new Pattern(pattern, pattern, MatchType.Back),
                    new Pattern(revPattern, revPattern, MatchType.Back),
                );
            }

            frontMatchers.push(new PatternGroup(`front ${run}-runs`, front));
            backMatchers.push(new PatternGroup(`back ${run}-runs`, back));
        }

        return [
            new OneOnlyMatcherSet([
                new Pattern(reverse(rounds), 'Reverse rounds', MatchType.Row),
                new MatcherSet([
                    new OneOnlyMatcherSet(frontMatchers),
                    new OneOnlyMatcherSet(backMatchers),
                ]),
            ]),
        ];
    }
}

export default RunsScheme;
