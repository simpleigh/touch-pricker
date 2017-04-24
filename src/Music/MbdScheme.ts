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
                let rowString: string;

                // 567890E
                rowString = roundsString.slice(4 - this._stage);
                matchers.push(new Pattern(
                    rowString,
                    rowString,
                    false,
                    MatchType.End,
                ));

                // 56789E0
                rowString = roundsString.slice(4 - this._stage, -2)
                    + roundsString.slice(-1)
                    + roundsString.slice(-2, -1);
                matchers.push(new Pattern(
                    rowString,
                    rowString,
                    false,
                    MatchType.End,
                ));

                // 657890E
                rowString = '65' + roundsString.slice(6 - this._stage);
                matchers.push(new Pattern(
                    rowString,
                    rowString,
                    false,
                    MatchType.End,
                ));

                // Near misses
                // TODO: Make this general by stage ##########################################
                matchers.push(new PatternGroup(
                    'near misses',
                    new Pattern('2134567890E', '21', true),
                    new Pattern('1324567890E', '32', true),
                    new Pattern('1243567890E', '43', true),
                    new Pattern('1235467890E', '54', true),
                    new Pattern('1234657890E', '65', true),
                    new Pattern('1234576890E', '76', true),
                    new Pattern('1234568790E', '87', true),
                    new Pattern('1234567980E', '98', true),
                    new Pattern('1234567809E', '09', true),
                    new Pattern('123456789E0', 'E0', true),
                ));

                // Queens music
                // TODO: Make this general by stage ##########################################
                matchers.push(new PatternGroup(
                    '80T',
                    new Pattern('80',          '80T',    false, MatchType.End),
                    new Pattern('680',         '680T',   false, MatchType.End),
                    new Pattern('E9780',       'E9780T', false, MatchType.End),
                    new Pattern('13579E24680', 'Queens',              true),
                    new Pattern('E9753124680', 'Reverse Queens',      true),
                    new Pattern('531246E9780', 'Double Whittingtons', true),
                ));

                matchers.push(new PatternGroup(
                    'front LB5',
                    new Pattern('12345', '12345', false, MatchType.Start),
                    new Pattern('54321', '54321', false, MatchType.Start),
                    new Pattern('23456', '23456', false, MatchType.Start),
                    new Pattern('65432', '65432', false, MatchType.Start),
                ));

                matchers.push(new PatternGroup(
                    'back LB5',
                    new Pattern('12345', '12345', false, MatchType.End),
                    new Pattern('54321', '54321', false, MatchType.End),
                    new Pattern('23456', '23456', false, MatchType.End),
                    new Pattern('65432', '65432', false, MatchType.End),
                ));

                matchers.push(new PatternGroup(
                    'front LB4',
                    new Pattern('1234', '1234', false, MatchType.Start),
                    new Pattern('4321', '4321', false, MatchType.Start),
                    new Pattern('2345', '2345', false, MatchType.Start),
                    new Pattern('5432', '5432', false, MatchType.Start),
                    new Pattern('3456', '3456', false, MatchType.Start),
                    new Pattern('6543', '6543', false, MatchType.Start),
                ));

                matchers.push(new PatternGroup(
                    'back LB4',
                    new Pattern('1234', '1234', false, MatchType.End),
                    new Pattern('4321', '4321', false, MatchType.End),
                    new Pattern('2345', '2345', false, MatchType.End),
                    new Pattern('5432', '5432', false, MatchType.End),
                    new Pattern('3456', '3456', false, MatchType.End),
                    new Pattern('6543', '6543', false, MatchType.End),
                ));

            }

        }

    }

}
