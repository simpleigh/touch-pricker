/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

/* eslint-disable max-len */

import { Stage } from '../rows';
import AbstractMatcher from './AbstractMatcher';
import AbstractScheme from './AbstractScheme';
import MatchType from './MatchType';
import Pattern from './Pattern';
import PatternGroup from './PatternGroup';

/**
 * MBD-style music matching scheme.
 */
class MbdScheme extends AbstractScheme {
    /* AbstractScheme methods *************************************************/

    /**
     * Create matchers for this scheme/stage.
     */
    protected createMatchers(rounds: string): AbstractMatcher[] {
        const matchers: AbstractMatcher[] = [];

        // 567890E
        matchers.push(new Pattern(rounds.slice(4 - this._stage)));

        // 56789E0
        matchers.push(new Pattern(
            rounds.slice(4 - this._stage, -2) +
                rounds.slice(-1) +
                rounds.slice(-2, -1)
        ));

        // 657890E
        matchers.push(new Pattern(`65${rounds.slice(6 - this._stage)}`));

        // Near misses
        const nearMisses = [];
        for (let i = 0; i < this._stage - 1; i += 1) {
            const pattern =
                rounds.slice(0, i) + // 123
                rounds.charAt(i + 1) + // 5
                rounds.charAt(i) + // 4
                rounds.slice(i + 2); // 67890E
            nearMisses.push(new Pattern(
                pattern,
                rounds.charAt(i + 1) + rounds.charAt(i),
                MatchType.Row,
            ));
        }
        matchers.push(new PatternGroup('near misses', nearMisses));

        // Queens music
        // eslint-disable-next-line default-case, @typescript-eslint/switch-exhaustiveness-check
        switch (this._stage) {
            case Stage.Triples:
                matchers.push(new PatternGroup(
                    '468',
                    [
                        new Pattern('246', '2468'),
                        new Pattern('75346', '753468'),
                        new Pattern('1357246', 'Queens', MatchType.Row),
                        new Pattern('7531246', 'Reverse Queens', MatchType.Row),
                        new Pattern('1275346', 'Whittingtons', MatchType.Row),
                    ],
                    new Pattern('46'),
                ));
                break;

            case Stage.Caters:
                matchers.push(new PatternGroup(
                    '680',
                    [
                        new Pattern('468', '4680'),
                        new Pattern('97568', '975680'),
                        new Pattern('135792468', 'Queens', MatchType.Row),
                        new Pattern('975312468', 'Reverse Queens', MatchType.Row),
                        new Pattern('123497568', 'Whittingtons', MatchType.Row),
                    ],
                    new Pattern('68'),
                ));
                break;

            case Stage.Cinques:
                matchers.push(new PatternGroup(
                    '80T',
                    [
                        new Pattern('680', '680T'),
                        new Pattern('E9780', 'E9780T'),
                        new Pattern('13579E24680', 'Queens', MatchType.Row),
                        new Pattern('E9753124680', 'Reverse Queens', MatchType.Row),
                        new Pattern('531246E9780', 'Double Whittingtons', MatchType.Row),
                    ],
                    new Pattern('80'),
                ));
                break;

            case Stage.Sextuples:
                matchers.push(new PatternGroup(
                    '0TB',
                    [
                        new Pattern('80T', '80TB'),
                        new Pattern('AE90T', 'AE90TB'),
                        new Pattern('13579EA24680T', 'Queens', MatchType.Row),
                        new Pattern('AE9753124680T', 'Reverse Queens', MatchType.Row),
                    ],
                    new Pattern('0T'),
                ));
                break;

            case Stage.Septuples:
                matchers.push(new PatternGroup(
                    'TB',
                    [
                        new Pattern('0TB'),
                        new Pattern('CAETB'),
                        new Pattern('13579EAC24680TB', 'Queens', MatchType.Row),
                        new Pattern('CAE9753124680TB', 'Reverse Queens', MatchType.Row),
                    ],
                    new Pattern('TB'),
                ));
                break;
        }

        matchers.push(new PatternGroup(
            'front LB5',
            [
                new Pattern('12345', '12345', MatchType.Front),
                new Pattern('54321', '54321', MatchType.Front),
                new Pattern('23456', '23456', MatchType.Front),
                new Pattern('65432', '65432', MatchType.Front),
            ],
        ));

        matchers.push(new PatternGroup(
            'back LB5',
            [
                new Pattern('12345', '12345', MatchType.Back),
                new Pattern('54321', '54321', MatchType.Back),
                new Pattern('23456', '23456', MatchType.Back),
                new Pattern('65432', '65432', MatchType.Back),
            ],
        ));

        matchers.push(new PatternGroup(
            'front LB4',
            [
                new Pattern('1234', '1234', MatchType.Front),
                new Pattern('4321', '4321', MatchType.Front),
                new Pattern('2345', '2345', MatchType.Front),
                new Pattern('5432', '5432', MatchType.Front),
                new Pattern('3456', '3456', MatchType.Front),
                new Pattern('6543', '6543', MatchType.Front),
            ],
        ));

        matchers.push(new PatternGroup(
            'back LB4',
            [
                new Pattern('1234', '1234', MatchType.Back),
                new Pattern('4321', '4321', MatchType.Back),
                new Pattern('2345', '2345', MatchType.Back),
                new Pattern('5432', '5432', MatchType.Back),
                new Pattern('3456', '3456', MatchType.Back),
                new Pattern('6543', '6543', MatchType.Back),
            ],
        ));

        // Reverse rollups
        if (this._stage === Stage.Triples) {
            matchers.push(new PatternGroup('reverse rollups', [new Pattern('7654')]));
        } else {
            const reverseRollups = [];
            for (let i: number = this._stage - 8; i >= 0; i -= 1) {
                // reverse rounds
                let pattern = rounds.split('').reverse().join('');
                pattern = pattern.slice(i, i + 4);
                reverseRollups.push(new Pattern(pattern));
            }
            matchers.push(new PatternGroup('reverse rollups', reverseRollups));
        }

        return matchers;
    }
}

export default MbdScheme;
