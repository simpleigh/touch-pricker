/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-19 Leigh Simpson. All rights reserved.
 */

import { Stage as S } from '../../rows';
import C from '../Call';
import SixType from '../SixType';
import { testSixImplementation } from './AbstractSix/AbstractSix.spec';
import Slow from './Slow';

describe('Slow six class', () => {

    testSixImplementation(
        (initialRow, _ownership) => new Slow(initialRow, _ownership),
        [
            ['2314567',         '3426175',         S.Triples,   C.Plain],
            ['231456789',       '342618597',       S.Caters,    C.Plain],
            ['2314567890E',     '342618507E9',     S.Cinques,   C.Plain],
            ['2314567890ETA',   '342618507T9AE',   S.Sextuples, C.Plain],
            ['2314567890ETABC', '342618507T9BECA', S.Septuples, C.Plain],
            ['2314567',         '3425167',         S.Triples,   C.Bob],
            ['231456789',       '342617589',       S.Caters,    C.Bob],
            ['2314567890E',     '3426185970E',     S.Cinques,   C.Bob],
            ['2314567890ETA',   '342618507E9TA',   S.Sextuples, C.Bob],
            ['2314567890ETABC', '342618507T9AEBC', S.Septuples, C.Bob],
            ['2314567',         '3425176',         S.Triples,   C.Single],
            ['231456789',       '342617598',       S.Caters,    C.Single],
            ['2314567890E',     '342618597E0',     S.Cinques,   C.Single],
            ['2314567890ETA',   '342618507E9AT',   S.Sextuples, C.Single],
            ['2314567890ETABC', '342618507T9AECB', S.Septuples, C.Single],
        ],
        [
            [
                '2143657',
                '1246375',
                '1423657',
                '4126375',
                '4213657',
                '2416375',
                S.Triples,
            ],
            [
                '214365879',
                '124638597',
                '142365879',
                '412638597',
                '421365879',
                '241638597',
                S.Caters,
            ],
            [
                '2143658709E',
                '124638507E9',
                '1423658709E',
                '412638507E9',
                '4213658709E',
                '241638507E9',
                S.Cinques,
            ],
            [
                '2143658709TEA',
                '124638507T9AE',
                '1423658709TEA',
                '412638507T9AE',
                '4213658709TEA',
                '241638507T9AE',
                S.Sextuples,
            ],
            [
                '2143658709TEBAC',
                '124638507T9BECA',
                '1423658709TEBAC',
                '412638507T9BECA',
                '4213658709TEBAC',
                '241638507T9BECA',
                S.Septuples,
            ],
        ],
        SixType.Slow,
        ['3', '1', '3', '1', '3'],
        [
            '+3',
            '+3.1',
            '+3.1.3',
            '+3.1.3.1',
            '+3.1.3.1.3',
        ],
    );

});
