/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { Call as C } from '../../leads';
import { Stage as S } from '../../rows';
import SixType from '../SixType';
import testSixImplementation from './AbstractSix/testSixImplementation';
import Hot from './Hot';

describe('Hot six class', () => {
    testSixImplementation(
        (initialRow) => new Hot(initialRow),
        // prettier-ignore
        [
            ['2314567',         '2436175',         S.Triples,   C.Plain],
            ['231456789',       '243618597',       S.Caters,    C.Plain],
            ['2314567890E',     '243618507E9',     S.Cinques,   C.Plain],
            ['2314567890ETA',   '243618507T9AE',   S.Sextuples, C.Plain],
            ['2314567890ETABC', '243618507T9BECA', S.Septuples, C.Plain],
            ['2314567',         '2435167',         S.Triples,   C.Bob],
            ['231456789',       '243617589',       S.Caters,    C.Bob],
            ['2314567890E',     '2436185970E',     S.Cinques,   C.Bob],
            ['2314567890ETA',   '243618507E9TA',   S.Sextuples, C.Bob],
            ['2314567890ETABC', '243618507T9AEBC', S.Septuples, C.Bob],
            ['2314567',         '2435176',         S.Triples,   C.Single],
            ['231456789',       '243617598',       S.Caters,    C.Single],
            ['2314567890E',     '243618597E0',     S.Cinques,   C.Single],
            ['2314567890ETA',   '243618507E9AT',   S.Sextuples, C.Single],
            ['2314567890ETABC', '243618507T9AECB', S.Septuples, C.Single],
        ],
        [
            [
                S.Triples,
                '2143657',
                '4216375',
                '1423657',
                '2146375',
                '4213657',
                '1426375',
            ],
            [
                S.Caters,
                '214365879',
                '421638597',
                '142365879',
                '214638597',
                '421365879',
                '142638597',
            ],
            [
                S.Cinques,
                '2143658709E',
                '421638507E9',
                '1423658709E',
                '214638507E9',
                '4213658709E',
                '142638507E9',
            ],
            [
                S.Sextuples,
                '2143658709TEA',
                '421638507T9AE',
                '1423658709TEA',
                '214638507T9AE',
                '4213658709TEA',
                '142638507T9AE',
            ],
            [
                S.Septuples,
                '2143658709TEBAC',
                '421638507T9BECA',
                '1423658709TEBAC',
                '214638507T9BECA',
                '4213658709TEBAC',
                '142638507T9BECA',
            ],
        ],
        SixType.Hot,
        [
            "'312547698E0'",
            "'312547698E0'",
            "'312547698E0'",
            "'312547698E0'",
            "'312547698E0'",
        ],
        [
            "'312547698E0'",
            "'312547698E0', '312547698E0'",
            "'312547698E0', '312547698E0', '312547698E0'",
            "'312547698E0', '312547698E0', '312547698E0', '312547698E0'",
            "'312547698E0', '312547698E0', '312547698E0', '312547698E0', '312547698E0'",
        ],
    );
});
