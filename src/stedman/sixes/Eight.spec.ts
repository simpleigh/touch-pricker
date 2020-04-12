/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { Call as C, Stage as S } from '../../rows';
import SixType from '../SixType';
import { testSixImplementation } from './AbstractSix/AbstractSix.spec';
import Eight from './Eight';

describe('Eight "six" class', () => {

    testSixImplementation(
        (initialRow, _ownership) => new Eight(initialRow, _ownership),
        [
            ['2314567',         '4631275',         S.Triples,   C.Plain],
            ['231456789',       '463128597',       S.Caters,    C.Plain],
            ['2314567890E',     '463128507E9',     S.Cinques,   C.Plain],
            ['2314567890ETA',   '463128507T9AE',   S.Sextuples, C.Plain],
            ['2314567890ETABC', '463128507T9BECA', S.Septuples, C.Plain],
            ['2314567',         '4531267',         S.Triples,   C.Bob],
            ['231456789',       '463127589',       S.Caters,    C.Bob],
            ['2314567890E',     '4631285970E',     S.Cinques,   C.Bob],
            ['2314567890ETA',   '463128507E9TA',   S.Sextuples, C.Bob],
            ['2314567890ETABC', '463128507T9AEBC', S.Septuples, C.Bob],
            ['2314567',         '4531276',         S.Triples,   C.Single],
            ['231456789',       '463127598',       S.Caters,    C.Single],
            ['2314567890E',     '463128597E0',     S.Cinques,   C.Single],
            ['2314567890ETA',   '463128507E9AT',   S.Sextuples, C.Single],
            ['2314567890ETABC', '463128507T9AECB', S.Septuples, C.Single],
        ],
        [
            [
                S.Triples,
                '2143657',
                '2416375',
                '4213657',
                '2431675',
                '4236157',
                '2463175',
                '4261357',
                '4623175',
            ],
            [
                S.Caters,
                '214365879',
                '241638597',
                '421365879',
                '243168597',
                '423615879',
                '246318597',
                '426135879',
                '462318597',
            ],
            [
                S.Cinques,
                '2143658709E',
                '241638507E9',
                '4213658709E',
                '243168507E9',
                '4236158709E',
                '246318507E9',
                '4261358709E',
                '462318507E9',
            ],
            [
                S.Sextuples,
                '2143658709TEA',
                '241638507T9AE',
                '4213658709TEA',
                '243168507T9AE',
                '4236158709TEA',
                '246318507T9AE',
                '4261358709TEA',
                '462318507T9AE',
            ],
            [
                S.Septuples,
                '2143658709TEBAC',
                '241638507T9BECA',
                '4213658709TEBAC',
                '243168507T9BECA',
                '4236158709TEBAC',
                '246318507T9BECA',
                '4261358709TEBAC',
                '462318507T9BECA',
            ],
        ],
        SixType.Eight,
        ['1', '3', '5', '3', '5', '3', '1'],
        [
            '+1',
            '+1.3',
            '+1.3.5',
            '+1.3.5.3',
            '+1.3.5.3.5',
            '+1.3.5.3.5.3',
            '+1.3.5.3.5.3.1',
        ],
    );

});
