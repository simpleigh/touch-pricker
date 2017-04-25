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
                let testRow: string;

                // 567890E
                testRow = roundsString.slice(4 - this._stage);
                matchers.push(new Pattern(testRow, testRow, MatchType.End));

                // 56789E0
                testRow = roundsString.slice(4 - this._stage, -2)
                    + roundsString.slice(-1)
                    + roundsString.slice(-2, -1);
                matchers.push(new Pattern(testRow, testRow, MatchType.End));

                // 657890E
                testRow = '65' + roundsString.slice(6 - this._stage);
                matchers.push(new Pattern(testRow, testRow, MatchType.End));

                // Near misses
                // TODO: Make this general by stage ##########################################
                matchers.push(new PatternGroup(
                    'near misses',
                    new Pattern('2134567890E', '21'),
                    new Pattern('1324567890E', '32'),
                    new Pattern('1243567890E', '43'),
                    new Pattern('1235467890E', '54'),
                    new Pattern('1234657890E', '65'),
                    new Pattern('1234576890E', '76'),
                    new Pattern('1234568790E', '87'),
                    new Pattern('1234567980E', '98'),
                    new Pattern('1234567809E', '09'),
                    new Pattern('123456789E0', 'E0'),
                ));

                // Queens music
                // TODO: Make this general by stage ##########################################
                matchers.push(new PatternGroup(
                    '80T',
                    new Pattern('80',          '80T',    MatchType.End),
                    new Pattern('680',         '680T',   MatchType.End),
                    new Pattern('E9780',       'E9780T', MatchType.End),
                    new Pattern('13579E24680', 'Queens'),
                    new Pattern('E9753124680', 'Reverse Queens'),
                    new Pattern('531246E9780', 'Double Whittingtons'),
                ));

                matchers.push(new PatternGroup(
                    'front LB5',
                    new Pattern('12345', '12345', MatchType.Start),
                    new Pattern('54321', '54321', MatchType.Start),
                    new Pattern('23456', '23456', MatchType.Start),
                    new Pattern('65432', '65432', MatchType.Start),
                ));

                matchers.push(new PatternGroup(
                    'back LB5',
                    new Pattern('12345', '12345', MatchType.End),
                    new Pattern('54321', '54321', MatchType.End),
                    new Pattern('23456', '23456', MatchType.End),
                    new Pattern('65432', '65432', MatchType.End),
                ));

                matchers.push(new PatternGroup(
                    'front LB4',
                    new Pattern('1234', '1234', MatchType.Start),
                    new Pattern('4321', '4321', MatchType.Start),
                    new Pattern('2345', '2345', MatchType.Start),
                    new Pattern('5432', '5432', MatchType.Start),
                    new Pattern('3456', '3456', MatchType.Start),
                    new Pattern('6543', '6543', MatchType.Start),
                ));

                matchers.push(new PatternGroup(
                    'back LB4',
                    new Pattern('1234', '1234', MatchType.End),
                    new Pattern('4321', '4321', MatchType.End),
                    new Pattern('2345', '2345', MatchType.End),
                    new Pattern('5432', '5432', MatchType.End),
                    new Pattern('3456', '3456', MatchType.End),
                    new Pattern('6543', '6543', MatchType.End),
                ));

                return matchers;

            }

        }

    }

}
