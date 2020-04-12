/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { Call as C } from '../../leads';
import { Stage as S } from '../../rows';
import SixType from '../SixType';
import { testSixImplementation } from './AbstractSix/AbstractSix.spec';
import Cold from './Cold';

describe('Cold six class', () => {

    testSixImplementation(
        (initialRow, _ownership) => new Cold(initialRow, _ownership),
        [
            ['2314567',         '4326175',         S.Triples,   C.Plain],
            ['231456789',       '432618597',       S.Caters,    C.Plain],
            ['2314567890E',     '432618507E9',     S.Cinques,   C.Plain],
            ['2314567890ETA',   '432618507T9AE',   S.Sextuples, C.Plain],
            ['2314567890ETABC', '432618507T9BECA', S.Septuples, C.Plain],
            ['2314567',         '4325167',         S.Triples,   C.Bob],
            ['231456789',       '432617589',       S.Caters,    C.Bob],
            ['2314567890E',     '4326185970E',     S.Cinques,   C.Bob],
            ['2314567890ETA',   '432618507E9TA',   S.Sextuples, C.Bob],
            ['2314567890ETABC', '432618507T9AEBC', S.Septuples, C.Bob],
            ['2314567',         '4325176',         S.Triples,   C.Single],
            ['231456789',       '432617598',       S.Caters,    C.Single],
            ['2314567890E',     '432618597E0',     S.Cinques,   C.Single],
            ['2314567890ETA',   '432618507E9AT',   S.Sextuples, C.Single],
            ['2314567890ETABC', '432618507T9AECB', S.Septuples, C.Single],
        ],
        [
            [
                S.Triples,
                '2143657',
                '1426375',
                '4213657',
                '2146375',
                '1423657',
                '4216375',
            ],
            [
                S.Caters,
                '214365879',
                '142638597',
                '421365879',
                '214638597',
                '142365879',
                '421638597',
            ],
            [
                S.Cinques,
                '2143658709E',
                '142638507E9',
                '4213658709E',
                '214638507E9',
                '1423658709E',
                '421638507E9',
            ],
            [
                S.Sextuples,
                '2143658709TEA',
                '142638507T9AE',
                '4213658709TEA',
                '214638507T9AE',
                '1423658709TEA',
                '421638507T9AE',
            ],
            [
                S.Septuples,
                '2143658709TEBAC',
                '142638507T9BECA',
                '4213658709TEBAC',
                '214638507T9BECA',
                '1423658709TEBAC',
                '421638507T9BECA',
            ],
        ],
        SixType.Cold,
        [
            "'231547698E0'",
            "'231547698E0'",
            "'231547698E0'",
            "'231547698E0'",
            "'231547698E0'",
        ],
        [
            "'231547698E0'",
            "'231547698E0', '231547698E0'",
            "'231547698E0', '231547698E0', '231547698E0'",
            "'231547698E0', '231547698E0', '231547698E0', '231547698E0'",
            "'231547698E0', '231547698E0', '231547698E0', '231547698E0', '231547698E0'", // tslint:disable-line:max-line-length
        ],
    );

});
