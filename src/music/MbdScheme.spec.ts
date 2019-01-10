/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-19 Leigh Simpson. All rights reserved.
 */

/* tslint:disable:max-line-length */

import { Stage as S } from '../rows';
import {
    testAbstractSchemeImplementation,
} from './AbstractScheme/AbstractScheme.spec';
import MbdScheme from './MbdScheme';

describe('Mbd music scheme', () => {

    testAbstractSchemeImplementation(
        (stage: S = S.Cinques) => new MbdScheme(stage),
        'MBD scheme',
        [
            // 567890E
            [S.Triples, '2314567', 1, '1 567\n'],
            // 56789E0
            [S.Triples, '2314576', 1, '1 576\n'],
            // 657890E
            [S.Triples, '2314657', 1, '1 657\n'],
            // Near misses
            [S.Triples, '2134567', 2, '1 567\n1 near misses (21)\n'],
            [S.Triples, '1324567', 2, '1 567\n1 near misses (32)\n'],
            [S.Triples, '1243567', 2, '1 567\n1 near misses (43)\n'],
            [S.Triples, '1235467', 1, '1 near misses (54)\n'],
            [S.Triples, '1234657', 3, '1 657\n1 near misses (65)\n1 front LB4 (1 1234)\n'],
            [S.Triples, '1234576', 4, '1 576\n1 near misses (76)\n1 front LB5 (1 12345)\n1 front LB4 (1 1234)\n'],
            // Queens music
            [S.Triples, '2315746', 1, '1 468\n'],
            [S.Triples, '3157246', 1, '1 468 (1 2468)\n'],
            [S.Triples, '2175346', 1, '1 468 (1 753468)\n'],
            [S.Triples, '1357246', 1, '1 468 (1 2468, Queens)\n'],
            [S.Triples, '7531246', 1, '1 468 (1 2468, Reverse Queens)\n'],
            [S.Triples, '1275346', 1, '1 468 (1 753468, Whittingtons)\n'],
            // front LB5
            [S.Triples, '1234576', 4, '1 576\n1 near misses (76)\n1 front LB5 (1 12345)\n1 front LB4 (1 1234)\n'],
            [S.Triples, '5432176', 2, '1 front LB5 (1 54321)\n1 front LB4 (1 5432)\n'],
            [S.Triples, '2345617', 2, '1 front LB5 (1 23456)\n1 front LB4 (1 2345)\n'],
            [S.Triples, '6543271', 2, '1 front LB5 (1 65432)\n1 front LB4 (1 6543)\n'],
            // back LB5
            [S.Triples, '6712345', 2, '1 back LB5 (1 12345)\n1 back LB4 (1 2345)\n'],
            [S.Triples, '6754321', 2, '1 back LB5 (1 54321)\n1 back LB4 (1 4321)\n'],
            [S.Triples, '1723456', 2, '1 back LB5 (1 23456)\n1 back LB4 (1 3456)\n'],
            [S.Triples, '7165432', 2, '1 back LB5 (1 65432)\n1 back LB4 (1 5432)\n'],
            // front LB4
            [S.Triples, '1234765', 1, '1 front LB4 (1 1234)\n'],
            [S.Triples, '4321765', 1, '1 front LB4 (1 4321)\n'],
            [S.Triples, '2345176', 1, '1 front LB4 (1 2345)\n'],
            [S.Triples, '5432761', 1, '1 front LB4 (1 5432)\n'],
            [S.Triples, '3456217', 1, '1 front LB4 (1 3456)\n'],
            [S.Triples, '6543721', 1, '1 front LB4 (1 6543)\n'],
            // back LB4
            [S.Triples, '6571234', 1, '1 back LB4 (1 1234)\n'],
            [S.Triples, '6574321', 1, '1 back LB4 (1 4321)\n'],
            [S.Triples, '1762345', 1, '1 back LB4 (1 2345)\n'],
            [S.Triples, '7615432', 1, '1 back LB4 (1 5432)\n'],
            [S.Triples, '2173456', 1, '1 back LB4 (1 3456)\n'],
            [S.Triples, '7216543', 1, '1 back LB4 (1 6543)\n'],
            // Reverse rollups
            [S.Triples, '2317654', 1, '1 reverse rollups (1 7654)\n'],

            // 567890E
            [S.Caters, '231456789', 1, '1 56789\n'],
            // 56789E0
            [S.Caters, '231456798', 1, '1 56798\n'],
            // 657890E
            [S.Caters, '231465789', 1, '1 65789\n'],
            // Near misses
            [S.Caters, '213456789', 2, '1 56789\n1 near misses (21)\n'],
            [S.Caters, '132456789', 2, '1 56789\n1 near misses (32)\n'],
            [S.Caters, '124356789', 2, '1 56789\n1 near misses (43)\n'],
            [S.Caters, '123546789', 1, '1 near misses (54)\n'],
            [S.Caters, '123465789', 3, '1 65789\n1 near misses (65)\n1 front LB4 (1 1234)\n'],
            [S.Caters, '123457689', 3, '1 near misses (76)\n1 front LB5 (1 12345)\n1 front LB4 (1 1234)\n'],
            [S.Caters, '123456879', 3, '1 near misses (87)\n1 front LB5 (1 12345)\n1 front LB4 (1 1234)\n'],
            [S.Caters, '123456798', 4, '1 56798\n1 near misses (98)\n1 front LB5 (1 12345)\n1 front LB4 (1 1234)\n'],
            // Queens music
            [S.Caters, '231457968', 1, '1 680\n'],
            [S.Caters, '231579468', 1, '1 680 (1 4680)\n'],
            [S.Caters, '231497568', 1, '1 680 (1 975680)\n'],
            [S.Caters, '135792468', 1, '1 680 (1 4680, Queens)\n'],
            [S.Caters, '975312468', 1, '1 680 (1 4680, Reverse Queens)\n'],
            [S.Caters, '123497568', 2, '1 680 (1 975680, Whittingtons)\n1 front LB4 (1 1234)\n'],
            // front LB5
            [S.Caters, '123457698', 2, '1 front LB5 (1 12345)\n1 front LB4 (1 1234)\n'],
            [S.Caters, '543217698', 2, '1 front LB5 (1 54321)\n1 front LB4 (1 5432)\n'],
            [S.Caters, '234568791', 2, '1 front LB5 (1 23456)\n1 front LB4 (1 2345)\n'],
            [S.Caters, '654328791', 2, '1 front LB5 (1 65432)\n1 front LB4 (1 6543)\n'],
            // back LB5
            [S.Caters, '769812345', 2, '1 back LB5 (1 12345)\n1 back LB4 (1 2345)\n'],
            [S.Caters, '769854321', 2, '1 back LB5 (1 54321)\n1 back LB4 (1 4321)\n'],
            [S.Caters, '187923456', 2, '1 back LB5 (1 23456)\n1 back LB4 (1 3456)\n'],
            [S.Caters, '187965432', 2, '1 back LB5 (1 65432)\n1 back LB4 (1 5432)\n'],
            // front LB4
            [S.Caters, '123465879', 1, '1 front LB4 (1 1234)\n'],
            [S.Caters, '432165879', 1, '1 front LB4 (1 4321)\n'],
            [S.Caters, '234576981', 1, '1 front LB4 (1 2345)\n'],
            [S.Caters, '543276981', 1, '1 front LB4 (1 5432)\n'],
            [S.Caters, '345687921', 1, '1 front LB4 (1 3456)\n'],
            [S.Caters, '654387921', 1, '1 front LB4 (1 6543)\n'],
            // back LB4
            [S.Caters, '659871234', 1, '1 back LB4 (1 1234)\n'],
            [S.Caters, '659874321', 1, '1 back LB4 (1 4321)\n'],
            [S.Caters, '761982345', 1, '1 back LB4 (1 2345)\n'],
            [S.Caters, '761985432', 1, '1 back LB4 (1 5432)\n'],
            [S.Caters, '879213456', 1, '1 back LB4 (1 3456)\n'],
            [S.Caters, '879216543', 1, '1 back LB4 (1 6543)\n'],
            // Reverse rollups
            [S.Caters, '214398765', 1, '1 reverse rollups (1 8765)\n'],
            [S.Caters, '214359876', 1, '1 reverse rollups (1 9876)\n'],

            // 567890E
            [S.Cinques, '2314567890E', 1, '1 567890E\n'],
            // 56789E0
            [S.Cinques, '231456789E0', 1, '1 56789E0\n'],
            // 657890E
            [S.Cinques, '2314657890E', 1, '1 657890E\n'],
            // Near misses
            [S.Cinques, '2134567890E', 2, '1 567890E\n1 near misses (21)\n'],
            [S.Cinques, '1324567890E', 2, '1 567890E\n1 near misses (32)\n'],
            [S.Cinques, '1243567890E', 2, '1 567890E\n1 near misses (43)\n'],
            [S.Cinques, '1235467890E', 1, '1 near misses (54)\n'],
            [S.Cinques, '1234657890E', 3, '1 657890E\n1 near misses (65)\n1 front LB4 (1 1234)\n'],
            [S.Cinques, '1234576890E', 3, '1 near misses (76)\n1 front LB5 (1 12345)\n1 front LB4 (1 1234)\n'],
            [S.Cinques, '1234568790E', 3, '1 near misses (87)\n1 front LB5 (1 12345)\n1 front LB4 (1 1234)\n'],
            [S.Cinques, '1234567980E', 3, '1 near misses (98)\n1 front LB5 (1 12345)\n1 front LB4 (1 1234)\n'],
            [S.Cinques, '1234567809E', 3, '1 near misses (09)\n1 front LB5 (1 12345)\n1 front LB4 (1 1234)\n'],
            [S.Cinques, '123456789E0', 4, '1 56789E0\n1 near misses (E0)\n1 front LB5 (1 12345)\n1 front LB4 (1 1234)\n'],
            // Queens music
            [S.Cinques, '23145679E80', 1, '1 80T\n'],
            [S.Cinques, '2314579E680', 1, '1 80T (1 680T)\n'],
            [S.Cinques, '231456E9780', 1, '1 80T (1 E9780T)\n'],
            [S.Cinques, '13579E24680', 1, '1 80T (1 680T, Queens)\n'],
            [S.Cinques, 'E9753124680', 1, '1 80T (1 680T, Reverse Queens)\n'],
            [S.Cinques, '531246E9780', 1, '1 80T (1 E9780T, Double Whittingtons)\n'],
            // front LB5
            [S.Cinques, '123457698E0', 2, '1 front LB5 (1 12345)\n1 front LB4 (1 1234)\n'],
            [S.Cinques, '543217698E0', 2, '1 front LB5 (1 54321)\n1 front LB4 (1 5432)\n'],
            [S.Cinques, '234568709E1', 2, '1 front LB5 (1 23456)\n1 front LB4 (1 2345)\n'],
            [S.Cinques, '654328709E1', 2, '1 front LB5 (1 65432)\n1 front LB4 (1 6543)\n'],
            // back LB5
            [S.Cinques, '7698E012345', 2, '1 back LB5 (1 12345)\n1 back LB4 (1 2345)\n'],
            [S.Cinques, '7698E054321', 2, '1 back LB5 (1 54321)\n1 back LB4 (1 4321)\n'],
            [S.Cinques, '18709E23456', 2, '1 back LB5 (1 23456)\n1 back LB4 (1 3456)\n'],
            [S.Cinques, '18709E65432', 2, '1 back LB5 (1 65432)\n1 back LB4 (1 5432)\n'],
            // front LB4
            [S.Cinques, '1234658709E', 1, '1 front LB4 (1 1234)\n'],
            [S.Cinques, '4321658709E', 1, '1 front LB4 (1 4321)\n'],
            [S.Cinques, '23457698E01', 1, '1 front LB4 (1 2345)\n'],
            [S.Cinques, '54327698E01', 1, '1 front LB4 (1 5432)\n'],
            [S.Cinques, '34568709E21', 1, '1 front LB4 (1 3456)\n'],
            [S.Cinques, '65438709E21', 1, '1 front LB4 (1 6543)\n'],
            // back LB4
            [S.Cinques, '658709E1234', 1, '1 back LB4 (1 1234)\n'],
            [S.Cinques, '658709E4321', 1, '1 back LB4 (1 4321)\n'],
            [S.Cinques, '17698E02345', 1, '1 back LB4 (1 2345)\n'],
            [S.Cinques, '17698E05432', 1, '1 back LB4 (1 5432)\n'],
            [S.Cinques, '218709E3456', 1, '1 back LB4 (1 3456)\n'],
            [S.Cinques, '218709E6543', 1, '1 back LB4 (1 6543)\n'],
            // Reverse rollups
            [S.Cinques, '214309E8765', 1, '1 reverse rollups (1 8765)\n'],
            [S.Cinques, '21435E09876', 1, '1 reverse rollups (1 9876)\n'],
            [S.Cinques, '214365E0987', 1, '1 reverse rollups (1 0987)\n'],
            [S.Cinques, '2143657E098', 1, '1 reverse rollups (1 E098)\n'],

            // 567890E
            [S.Sextuples, '2314567890ETA', 1, '1 567890ETA\n'],
            // 56789E0
            [S.Sextuples, '2314567890EAT', 1, '1 567890EAT\n'],
            // 657890E
            [S.Sextuples, '2314657890ETA', 1, '1 657890ETA\n'],
            // Near misses
            [S.Sextuples, '2134567890ETA', 2, '1 567890ETA\n1 near misses (21)\n'],
            [S.Sextuples, '1324567890ETA', 2, '1 567890ETA\n1 near misses (32)\n'],
            [S.Sextuples, '1243567890ETA', 2, '1 567890ETA\n1 near misses (43)\n'],
            [S.Sextuples, '1235467890ETA', 1, '1 near misses (54)\n'],
            [S.Sextuples, '1234657890ETA', 3, '1 657890ETA\n1 near misses (65)\n1 front LB4 (1 1234)\n'],
            [S.Sextuples, '1234576890ETA', 3, '1 near misses (76)\n1 front LB5 (1 12345)\n1 front LB4 (1 1234)\n'],
            [S.Sextuples, '1234568790ETA', 3, '1 near misses (87)\n1 front LB5 (1 12345)\n1 front LB4 (1 1234)\n'],
            [S.Sextuples, '1234567980ETA', 3, '1 near misses (98)\n1 front LB5 (1 12345)\n1 front LB4 (1 1234)\n'],
            [S.Sextuples, '1234567809ETA', 3, '1 near misses (09)\n1 front LB5 (1 12345)\n1 front LB4 (1 1234)\n'],
            [S.Sextuples, '123456789E0TA', 3, '1 near misses (E0)\n1 front LB5 (1 12345)\n1 front LB4 (1 1234)\n'],
            [S.Sextuples, '1234567890TEA', 3, '1 near misses (TE)\n1 front LB5 (1 12345)\n1 front LB4 (1 1234)\n'],
            [S.Sextuples, '1234567890EAT', 4, '1 567890EAT\n1 near misses (AT)\n1 front LB5 (1 12345)\n1 front LB4 (1 1234)\n'],
            // Queens music
            [S.Sextuples, '231456789EA0T', 1, '1 0TB\n'],
            [S.Sextuples, '23145679EA80T', 1, '1 0TB (1 80TB)\n'],
            [S.Sextuples, '23145678AE90T', 1, '1 0TB (1 AE90TB)\n'],
            [S.Sextuples, '13579EA24680T', 1, '1 0TB (1 80TB, Queens)\n'],
            [S.Sextuples, 'AE9753124680T', 1, '1 0TB (1 80TB, Reverse Queens)\n'],
            // front LB5
            [S.Sextuples, '123457698E0AT', 2, '1 front LB5 (1 12345)\n1 front LB4 (1 1234)\n'],
            [S.Sextuples, '543217698E0AT', 2, '1 front LB5 (1 54321)\n1 front LB4 (1 5432)\n'],
            [S.Sextuples, '234568709TEA1', 2, '1 front LB5 (1 23456)\n1 front LB4 (1 2345)\n'],
            [S.Sextuples, '654328709TEA1', 2, '1 front LB5 (1 65432)\n1 front LB4 (1 6543)\n'],
            // back LB5
            [S.Sextuples, '7698E0AT12345', 2, '1 back LB5 (1 12345)\n1 back LB4 (1 2345)\n'],
            [S.Sextuples, '7698E0AT54321', 2, '1 back LB5 (1 54321)\n1 back LB4 (1 4321)\n'],
            [S.Sextuples, '18709TEA23456', 2, '1 back LB5 (1 23456)\n1 back LB4 (1 3456)\n'],
            [S.Sextuples, '18709TEA65432', 2, '1 back LB5 (1 65432)\n1 back LB4 (1 5432)\n'],
            // front LB4
            [S.Sextuples, '1234658709TEA', 1, '1 front LB4 (1 1234)\n'],
            [S.Sextuples, '4321658709TEA', 1, '1 front LB4 (1 4321)\n'],
            [S.Sextuples, '23457698E0AT1', 1, '1 front LB4 (1 2345)\n'],
            [S.Sextuples, '54327698E0AT1', 1, '1 front LB4 (1 5432)\n'],
            [S.Sextuples, '34568709TEA21', 1, '1 front LB4 (1 3456)\n'],
            [S.Sextuples, '65438709TEA21', 1, '1 front LB4 (1 6543)\n'],
            // back LB4
            [S.Sextuples, '658709TEA1234', 1, '1 back LB4 (1 1234)\n'],
            [S.Sextuples, '658709TEA4321', 1, '1 back LB4 (1 4321)\n'],
            [S.Sextuples, '17698E0AT2345', 1, '1 back LB4 (1 2345)\n'],
            [S.Sextuples, '17698E0AT5432', 1, '1 back LB4 (1 5432)\n'],
            [S.Sextuples, '218709TEA3456', 1, '1 back LB4 (1 3456)\n'],
            [S.Sextuples, '218709TEA6543', 1, '1 back LB4 (1 6543)\n'],
            // Reverse rollups
            [S.Sextuples, '214309TEA8765', 1, '1 reverse rollups (1 8765)\n'],
            [S.Sextuples, '21435E0TA9876', 1, '1 reverse rollups (1 9876)\n'],
            [S.Sextuples, '214365TEA0987', 1, '1 reverse rollups (1 0987)\n'],
            [S.Sextuples, '2143657ATE098', 1, '1 reverse rollups (1 E098)\n'],
            [S.Sextuples, '21436587ATE09', 1, '1 reverse rollups (1 TE09)\n'],
            [S.Sextuples, '214365879ATE0', 1, '1 reverse rollups (1 ATE0)\n'],

            // 567890E
            [S.Septuples, '2314567890ETABC', 1, '1 567890ETABC\n'],
            // 56789E0
            [S.Septuples, '2314567890ETACB', 1, '1 567890ETACB\n'],
            // 657890E
            [S.Septuples, '2314657890ETABC', 1, '1 657890ETABC\n'],
            // Near misses
            [S.Septuples, '2134567890ETABC', 2, '1 567890ETABC\n1 near misses (21)\n'],
            [S.Septuples, '1324567890ETABC', 2, '1 567890ETABC\n1 near misses (32)\n'],
            [S.Septuples, '1243567890ETABC', 2, '1 567890ETABC\n1 near misses (43)\n'],
            [S.Septuples, '1235467890ETABC', 1, '1 near misses (54)\n'],
            [S.Septuples, '1234657890ETABC', 3, '1 657890ETABC\n1 near misses (65)\n1 front LB4 (1 1234)\n'],
            [S.Septuples, '1234576890ETABC', 3, '1 near misses (76)\n1 front LB5 (1 12345)\n1 front LB4 (1 1234)\n'],
            [S.Septuples, '1234568790ETABC', 3, '1 near misses (87)\n1 front LB5 (1 12345)\n1 front LB4 (1 1234)\n'],
            [S.Septuples, '1234567980ETABC', 3, '1 near misses (98)\n1 front LB5 (1 12345)\n1 front LB4 (1 1234)\n'],
            [S.Septuples, '1234567809ETABC', 3, '1 near misses (09)\n1 front LB5 (1 12345)\n1 front LB4 (1 1234)\n'],
            [S.Septuples, '123456789E0TABC', 3, '1 near misses (E0)\n1 front LB5 (1 12345)\n1 front LB4 (1 1234)\n'],
            [S.Septuples, '1234567890TEABC', 3, '1 near misses (TE)\n1 front LB5 (1 12345)\n1 front LB4 (1 1234)\n'],
            [S.Septuples, '1234567890EATBC', 3, '1 near misses (AT)\n1 front LB5 (1 12345)\n1 front LB4 (1 1234)\n'],
            [S.Septuples, '1234567890ETBAC', 3, '1 near misses (BA)\n1 front LB5 (1 12345)\n1 front LB4 (1 1234)\n'],
            [S.Septuples, '1234567890ETACB', 4, '1 567890ETACB\n1 near misses (CB)\n1 front LB5 (1 12345)\n1 front LB4 (1 1234)\n'],
            // Queens music
            [S.Septuples, '2314567890EACTB', 1, '1 TB\n'],
            [S.Septuples, '231456789EAC0TB', 1, '1 TB (1 0TB)\n'],
            [S.Septuples, '2314567890CAETB', 1, '1 TB (1 CAETB)\n'],
            [S.Septuples, '13579EAC24680TB', 1, '1 TB (1 0TB, Queens)\n'],
            [S.Septuples, 'CAE9753124680TB', 1, '1 TB (1 0TB, Reverse Queens)\n'],
            // front LB5
            [S.Septuples, '123457698E0ATCB', 2, '1 front LB5 (1 12345)\n1 front LB4 (1 1234)\n'],
            [S.Septuples, '543217698E0ATCB', 2, '1 front LB5 (1 54321)\n1 front LB4 (1 5432)\n'],
            [S.Septuples, '234568709TEBAC1', 2, '1 front LB5 (1 23456)\n1 front LB4 (1 2345)\n'],
            [S.Septuples, '654328709TEBAC1', 2, '1 front LB5 (1 65432)\n1 front LB4 (1 6543)\n'],
            // back LB5
            [S.Septuples, '7698E0ATCB12345', 2, '1 back LB5 (1 12345)\n1 back LB4 (1 2345)\n'],
            [S.Septuples, '7698E0ATCB54321', 2, '1 back LB5 (1 54321)\n1 back LB4 (1 4321)\n'],
            [S.Septuples, '18709TEBAC23456', 2, '1 back LB5 (1 23456)\n1 back LB4 (1 3456)\n'],
            [S.Septuples, '18709TEBAC65432', 2, '1 back LB5 (1 65432)\n1 back LB4 (1 5432)\n'],
            // front LB4
            [S.Septuples, '1234658709TEBAC', 1, '1 front LB4 (1 1234)\n'],
            [S.Septuples, '4321658709TEBAC', 1, '1 front LB4 (1 4321)\n'],
            [S.Septuples, '23457698E0ATCB1', 1, '1 front LB4 (1 2345)\n'],
            [S.Septuples, '54327698E0ATCB1', 1, '1 front LB4 (1 5432)\n'],
            [S.Septuples, '34568709TEBAC21', 1, '1 front LB4 (1 3456)\n'],
            [S.Septuples, '65438709TEBAC21', 1, '1 front LB4 (1 6543)\n'],
            // back LB4
            [S.Septuples, '658709TEBAC1234', 1, '1 back LB4 (1 1234)\n'],
            [S.Septuples, '658709TEBAC4321', 1, '1 back LB4 (1 4321)\n'],
            [S.Septuples, '17698E0ATCB2345', 1, '1 back LB4 (1 2345)\n'],
            [S.Septuples, '17698E0ATCB5432', 1, '1 back LB4 (1 5432)\n'],
            [S.Septuples, '218709TEBAC3456', 1, '1 back LB4 (1 3456)\n'],
            [S.Septuples, '218709TEBAC6543', 1, '1 back LB4 (1 6543)\n'],
            // Reverse rollups
            [S.Septuples, '214309TEBAC8765', 1, '1 reverse rollups (1 8765)\n'],
            [S.Septuples, '21435E0ATCB9876', 1, '1 reverse rollups (1 9876)\n'],
            [S.Septuples, '214365TEBAC0987', 1, '1 reverse rollups (1 0987)\n'],
            [S.Septuples, '2143657ATCBE098', 1, '1 reverse rollups (1 E098)\n'],
            [S.Septuples, '21436587BACTE09', 1, '1 reverse rollups (1 TE09)\n'],
            [S.Septuples, '214365879CBATE0', 1, '1 reverse rollups (1 ATE0)\n'],
            [S.Septuples, '2143658709CBATE', 1, '1 reverse rollups (1 BATE)\n'],
            [S.Septuples, '2143658709ECBAT', 1, '1 reverse rollups (1 CBAT)\n'],
        ],
    );

});
