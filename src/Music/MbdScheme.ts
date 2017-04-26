/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../rowFromString.ts" />
/// <reference path="../Stage.ts" />
/// <reference path="AbstractScheme.ts" />
/// <reference path="MatchType.ts" />
/// <reference path="Pattern.ts" />
/// <reference path="PatternGroup.ts" />

namespace Pricker {
    'use strict';

    /**
     * Music classes to analyse rows
     */
    export namespace Music {

        /**
         * MBD-style music matching scheme
         */
        export class MbdScheme extends AbstractScheme {

            /**
             * Get matchers for this scheme/stage
             */
            public getMatchers(): MatcherInterface[] {
                const matchers: MatcherInterface[] = [ ],
                    rounds: Row = rowFromString('', this._stage),
                    roundsString: string = stringFromRow(rounds);
                let pattern: string;

                // 567890E
                pattern = roundsString.slice(4 - this._stage);
                matchers.push(new Pattern(pattern));

                // 56789E0
                pattern = roundsString.slice(4 - this._stage, -2)
                    + roundsString.slice(-1)
                    + roundsString.slice(-2, -1);
                matchers.push(new Pattern(pattern));

                // 657890E
                pattern = '65' + roundsString.slice(6 - this._stage);
                matchers.push(new Pattern(pattern));

                // Near misses
                // TODO: Make this general by stage ##########################################
                matchers.push(new PatternGroup(
                    'near misses',
                    [
                        new Pattern('2134567890E', '21', MatchType.Row),
                        new Pattern('1324567890E', '32', MatchType.Row),
                        new Pattern('1243567890E', '43', MatchType.Row),
                        new Pattern('1235467890E', '54', MatchType.Row),
                        new Pattern('1234657890E', '65', MatchType.Row),
                        new Pattern('1234576890E', '76', MatchType.Row),
                        new Pattern('1234568790E', '87', MatchType.Row),
                        new Pattern('1234567980E', '98', MatchType.Row),
                        new Pattern('1234567809E', '09', MatchType.Row),
                        new Pattern('123456789E0', 'E0', MatchType.Row),
                    ],
                ));

                // Queens music
                // TODO: Make this general by stage ##########################################
                matchers.push(new PatternGroup(
                    '80T',
                    [
                        new Pattern('680', '680T'),
                        new Pattern('E9780', 'E9780T'),
                        new Pattern('13579E24680', 'Queens', MatchType.Row),
                        new Pattern('E9753124680',
                            'Reverse Queens',
                            MatchType.Row,
                        ),
                        new Pattern(
                            '531246E9780',
                            'Double Whittingtons',
                            MatchType.Row,
                        ),
                    ],
                    new Pattern('80', '80T'),
                ));

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

                return matchers;

            }

        }

    }

}
