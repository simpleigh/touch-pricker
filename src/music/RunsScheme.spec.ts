/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { Stage as S } from '../rows';
import {
    testAbstractSchemeImplementation,
} from './AbstractScheme/AbstractScheme.spec';
import RunsScheme from './RunsScheme';

describe('Runs music scheme', () => {

    testAbstractSchemeImplementation(
        (stage: S = S.Cinques) => new RunsScheme(stage),
        [
            [S.Triples, '7654321', 1, 'Reverse rounds\n'],
            [S.Triples, 'xxx1234', 1, '1 back 4-runs (1 1234)\n'],
            [S.Triples, 'xxx2345', 1, '1 back 4-runs (1 2345)\n'],
            [S.Triples, 'xxx3456', 1, '1 back 4-runs (1 3456)\n'],
            [S.Triples, 'xxx4567', 1, '1 back 4-runs (1 4567)\n'],
            [S.Triples, 'xxx4321', 1, '1 back 4-runs (1 4321)\n'],
            [S.Triples, 'xxx5432', 1, '1 back 4-runs (1 5432)\n'],
            [S.Triples, 'xxx6543', 1, '1 back 4-runs (1 6543)\n'],
            [S.Triples, 'xxx7654', 1, '1 back 4-runs (1 7654)\n'],
            [S.Triples, '1234xxx', 1, '1 front 4-runs (1 1234)\n'],
            [S.Triples, '2345xxx', 1, '1 front 4-runs (1 2345)\n'],
            [S.Triples, '3456xxx', 1, '1 front 4-runs (1 3456)\n'],
            [S.Triples, '4567xxx', 1, '1 front 4-runs (1 4567)\n'],
            [S.Triples, '4321xxx', 1, '1 front 4-runs (1 4321)\n'],
            [S.Triples, '5432xxx', 1, '1 front 4-runs (1 5432)\n'],
            [S.Triples, '6543xxx', 1, '1 front 4-runs (1 6543)\n'],
            [S.Triples, '7654xxx', 1, '1 front 4-runs (1 7654)\n'],
            [S.Triples, 'xx12345', 1, '1 back 5-runs (1 12345)\n'],
            [S.Triples, 'xx23456', 1, '1 back 5-runs (1 23456)\n'],
            [S.Triples, 'xx34567', 1, '1 back 5-runs (1 34567)\n'],
            [S.Triples, 'xx54321', 1, '1 back 5-runs (1 54321)\n'],
            [S.Triples, 'xx65432', 1, '1 back 5-runs (1 65432)\n'],
            [S.Triples, 'xx76543', 1, '1 back 5-runs (1 76543)\n'],
            [S.Triples, '12345xx', 1, '1 front 5-runs (1 12345)\n'],
            [S.Triples, '23456xx', 1, '1 front 5-runs (1 23456)\n'],
            [S.Triples, '34567xx', 1, '1 front 5-runs (1 34567)\n'],
            [S.Triples, '54321xx', 1, '1 front 5-runs (1 54321)\n'],
            [S.Triples, '65432xx', 1, '1 front 5-runs (1 65432)\n'],
            [S.Triples, '76543xx', 1, '1 front 5-runs (1 76543)\n'],
            [
                S.Caters,
                '234516789',
                2,
                '1 front 4-runs (1 2345)\n1 back 4-runs (1 6789)\n',
            ],
        ],
    );

});
