/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import { Stage as S } from '../rows';
import { testSixImplementation } from './AbstractSix/AbstractSix.spec';
import C from './Call';
import Quick from './Quick';
import SixType from './SixType';

describe('Quick six class', () => {

    testSixImplementation(
        (initialRow, _ownership) => new Quick(initialRow, _ownership),
        [
            ['3426175',         '3467251',         S.Triples,   C.Plain],
            ['342618597',       '346829175',       S.Caters,    C.Plain],
            ['342618507E9',     '3468201E597',     S.Cinques,   C.Plain],
            ['342618507T9AE',   '3468201T5A7E9',   S.Sextuples, C.Plain],
            ['342618507T9BECA', '3468201T5B7C9AE', S.Septuples, C.Plain],
            ['3426175',         '3461275',         S.Triples,   C.Bob],
            ['342618597',       '346825197',       S.Caters,    C.Bob],
            ['342618507E9',     '346820175E9',     S.Cinques,   C.Bob],
            ['342618507T9AE',   '3468201T597AE',   S.Sextuples, C.Bob],
            ['342618507T9BECA', '3468201T5B7E9CA', S.Septuples, C.Bob],
            ['3426175',         '3461257',         S.Triples,   C.Single],
            ['342618597',       '346825179',       S.Caters,    C.Single],
            ['342618507E9',     '3468201759E',     S.Cinques,   C.Single],
            ['342618507T9AE',   '3468201T597EA',   S.Sextuples, C.Single],
            ['342618507T9BECA', '3468201T5B7E9AC', S.Septuples, C.Single],
        ],
        [
            [
                '2143657',
                '2416375',
                '4213657',
                '4126375',
                '1423657',
                '1246375',
                S.Triples,
            ],
            [
                '214365879',
                '241638597',
                '421365879',
                '412638597',
                '142365879',
                '124638597',
                S.Caters,
            ],
            [
                '2143658709E',
                '241638507E9',
                '4213658709E',
                '412638507E9',
                '1423658709E',
                '124638507E9',
                S.Cinques,
            ],
            [
                '2143658709TEA',
                '241638507T9AE',
                '4213658709TEA',
                '412638507T9AE',
                '1423658709TEA',
                '124638507T9AE',
                S.Sextuples,
            ],
            [
                '2143658709TEBAC',
                '241638507T9BECA',
                '4213658709TEBAC',
                '412638507T9BECA',
                '1423658709TEBAC',
                '124638507T9BECA',
                S.Septuples,
            ],
        ],
        SixType.Quick,
        ['1', '3', '1', '3', '1'],
        [
            '+1',
            '+1.3',
            '+1.3.1',
            '+1.3.1.3',
            '+1.3.1.3.1',
        ],
    );

});
